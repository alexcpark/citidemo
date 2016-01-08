/*!

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.9

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/

;(function($) {
// Add levelProgress method to the BVVIZ scope
BVVIZ.levelProgress = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Individual level display
    card: function ( currentLevel, nextLevel, playerScores ) {
      // Default level progress with 1 icon for current level 
      var card = $( '<span class="bvviz-card bvviz-invisible bvviz-level"></span>' ),
          currentLevelPointCriteria = currentLevel && currentLevel.player_criteria[0] && currentLevel.player_criteria[0].value,
          nextLevelPointCriteria = nextLevel && nextLevel.player_criteria[0] && nextLevel.player_criteria[0].value,          
          max, value, percentage, label;

          if ( !$.isPlainObject( currentLevel ) ) {
            // Player hasn't started the mission
            max = 1;
            value = 0;
            percentage = 0;
            label = 'Not started yet';
          } else if ( !$.isPlainObject( nextLevel ) ) {
            // Player has finished the last level
            max = 1;
            value = 1;
            percentage = 100;
            label = 'Completed';
          } else {
            // Both current level and next level are defined
            max = 1;
            if ( nextLevel.player_criteria[0] && playerScores == nextLevel.player_criteria[0].value ) {
              // Player has finished current level and next level is defined, switch current level to the next
              value = 0;
              currentLevel = nextLevel;
            } else if ( currentLevel.player_criteria[0] && nextLevel.player_criteria[0] && ( nextLevel.player_criteria[0].value - currentLevel.player_criteria[0].value != 0 ) ) {
              // Player is in progress from current level to the next level
              value = ( playerScores - currentLevel.player_criteria[0].value ) / ( nextLevel.player_criteria[0].value - currentLevel.player_criteria[0].value );
            } else if ( playerScores == 0 ) {
              value = 0;
            } else {
              value = 1;
            }
            // Set the percentage to floor value to make sure 100% is as completed
            percentage = Math.floor( value * 100 );
            label = percentage + '%';
          }

          if ( BVVIZ.utility.isIe8OrLess() ) {
            // Detect current browser is IE8 or less, which doesn't support <progress>
            card.append( 
                $( '<div class="bvviz-label bvviz-line">' + currentLevel.name + '</div>' ),
                $( '<div class="bvviz-progress bvviz-line"></div>').append(
                  $( '<div class="bvviz-progress-bar"></div>' ),
                  $( '<span class="bvviz-progress-label">' + label + '</span>' )
                ),
                $( '<img class="bvviz-level-icon bvviz-current" src="' + currentLevel.image + '">')
              );

          } else {
            card.append( 
                $( '<div class="bvviz-label bvviz-line">' + currentLevel.name + '</div>' ),
                $( '<div class="bvviz-progress bvviz-line"></div>').append(
                  $( '<progress class="bvviz-progress-bar" max="' + max + '" value="' + value + '"></progress>' ),
                  $( '<span class="bvviz-progress-label">' + label + '</span>' )
                ),
                $( '<img class="bvviz-level-icon bvviz-current" src="' + currentLevel.image + '">')
              );

            // Adjust the percent label position and color
            if ( percentage < 30 ) {
              card.find( '.bvviz-progress-label' ).css( 'left', percentage + 5 + '%').addClass( 'bvviz-backlabel' );
            } else if ( percentage < 100 ) {
              card.find( '.bvviz-progress-label' ).css( 'left', percentage - 22 + '%' ).addClass( 'bvviz-forelabel' );            
            } else {
              card.find( '.bvviz-progress-label' ).css( 'left', 5 + '%' ).addClass( 'bvviz-forelabel' );            
            }
          }

      return card;
    }
  },

  // Store the visualization settings
  settings = $.extend( true, {}, options );

  // Create a new JSSDK wrapper object instance
  new BVVIZ.SDKkit( settings.siteId );


  function init() {

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "player" must be provided as an object
    if ( $.type( playerId ) !== 'string' ) {
      return BVVIZ.helper.showError( target, '"player" argument must be a player id.' );
    }

    // Empty the target and add the base classes and rendered level
    target
      .empty()
      .addClass( 'bvviz bvviz-levelProgress' );

    BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players', { players: playerId }, { includes:'rewards:currentlevels' } )
      .ok( function( data ) {
        if ( data && data.players && data.players[0] ) {

          // Get player earned untis, including points and other secondary units
          var playerEarnedUnits = data.players[0].units,
              // Set player earned total default to points (all)
              playerEarnedTotal = data.players[0].units.points.all,
              currentLevelPosition = 0;

          // Loop through all players
          $.each( data.players, function( i, player ) {

            if ( player[ 'rewards:currentlevels' ].length > 0 ) {

              // Loop through all level missions and process current level from each
              $.each( player[ 'rewards:currentlevels' ], function ( i, level ) {

                // Search for the matched mission id
                if ( level.mission_id == missionId ) {

                  currentLevelPosition = parseInt( level.mission_position - 1, 10 ) || 0 ;

                  // get point criteria for current and next level
                  BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions/rewards', 
                        { missions: missionId }, 
                        { offset: parseInt( level.mission_position - 1, 10 ), fields: 'player_criteria', limit: 2 } )
                    .ok( function ( missionInfo ) {
                      var criteria = [],
                          // Check if the mission reward exist
                          missionRewards = BVVIZ.utility.validateNestedObj( missionInfo, 'rewards' ) ? missionInfo.rewards : [],
                          // Check if the 1st player criteria in the mission reward exist
                          criteriaObj = BVVIZ.utility.validateNestedObj( missionInfo, 'rewards', [0], 'player_criteria', [0] ) ? missionInfo.rewards[0].player_criteria[0] : null;

                      try {
                        if ( $.isPlainObject( criteriaObj ) ) {
                          // Calculate the player earned total based on mission player criteria, only 1st player criteria is applicable
                          criteria = $.type( criteriaObj.field ) === 'string' ? String.prototype.split.call( criteriaObj.field, '.' ) : [];
                          if ( criteria.length === 3 ) {
                            // Normalize the criteria unit field to match the player units field 
                            criteria[1] = criteria[1] === 'points' ? criteria[1] : 'unit_' + criteria[1];
                            playerEarnedTotal = playerEarnedUnits[ criteria[1] ][ criteria[2] ];
                          }
                        } else {
                          playerEarnedTotal = 0;
                        }

                        if ( missionRewards.length ) {
                          if ( missionRewards.length == 2 ) {
                            // Both current level and next level found
                            target.append( render.card( missionRewards[0], missionRewards[1], playerEarnedTotal ) );
                          } else {
                            // Could happen when the current reward is the last level
                            target.append( render.card( missionRewards[0], null, playerEarnedTotal ) );
                          }
                        }

                        // If BVVIZ.missionProgress has been included...
                        if ( $.isFunction( BVVIZ.missionProgress ) ) {
                          // ...allow the track icon to be clicked on to open the trackProgress visualization
                          $('.bvviz-level-icon', target).click( function( event ) {
                            BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

                            event.preventDefault();
                            return false;
                          });
                        }

                        // Use the helper to show the cards with an animation
                        BVVIZ.helper.showCards( target );

                      } catch( e ) {
                        // If the reward definition for level mission is not as expected, error could happen (like greater or equal to 0)
                        return false;
                      }

                    })
                    .fail( function ( data ) {
                      // Playser hasn't started the mission yet
                      target.append( render.card( null, null, playerEarnedTotal ) );
                    });
                }

              });
            }

          });
        } 

    }).fail( function( data ) {
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );

  return pub;
};
})(bvjQuery);
