/*!

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.8

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/

;(function($) {
// Add missionProgress method to the BVVIZ scope
BVVIZ.missionProgress = function( target, playerId, missionId, options ) {
  
  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + ( settings.headerTitle ? settings.headerTitle : name ) + '</div></div>' );
    },

    // Header for the mission itself
    bodyHeader: function( mission ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( mission.progress.percent ? mission.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + mission.hint + '</div>' +
      '</div>' );
    },

    // Individual reward card in list view
    card: function( reward, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-picture-container"></div>').append(
          $('<img class="bvviz-picture" src="' + reward.image + '"/>'),
          $('<div class="bvviz-bridge"></div>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + reward.name + '</div>'),
          $('<div class="bvviz-desc">' + ( reward.hint ? reward.hint : '' ) + '</div>')
        )
      );
      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // This boolean will track whether the player has progress in the mission or not
  hasProgress = false,

  // This boolean will track whether the reward images should be connected by a visual "bridge" or not
  useBridge = true,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionProgress.maxPageSize ) {
    delete options.pageSize;
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.missionProgress, options );


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }
    // "missionId" must be provided as a string
    if ( typeof( missionId ) !== 'string' || missionId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"missionId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-missionProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the mission information and player's overall mission progress
    BVSDK.all(
      BVSDK( 'missions', { missions: missionId }, { fields: 'hint' } ),
      BVSDK( 'players/missions', { players: playerId, missions: missionId }, { fields: 'hint' } )
    ).ok( function( missionDefData, playerMissionData ) {

      // Store a reference to the container
      var cards = $( '.bvviz-cards', target );

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( missionDefData.missions[0].name ).prependTo( target );
      }

      // Render the header for the mission and add it to the body
      // If the player has made progress, use that version of the mission
      if ( playerMissionData && $.isArray( playerMissionData.missions ) ) {
        render.bodyHeader( playerMissionData.missions[0] ).prependTo( $( '.bvviz-body', target ) );

        hasProgress = true;
      } else {
        // Otherwise use the definition
        render.bodyHeader( missionDefData.missions[0] ).prependTo( $( '.bvviz-body', target ) );
      }
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
      
      // Random and Unordered missions don't need the bridge on any elements
      if ( missionDefData.missions[0].type == 'random' || missionDefData.missions[0].type == 'unordered' ) {
        useBridge = false;
      }

      // Trigger a load of the first page of data
      load( 0 );

      // If BVVIZ.rewardProgress has been included...
      if ( $.isFunction( BVVIZ.rewardProgress ) ) {
        // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
        cards.bind( 'click', function( event ) {
          var eventTarget = $( event.target ),
              card = eventTarget.closest( '.bvviz-card' ),
              rewardId;

          // If we can find a reward card from the click, show the reward details for that card
          if ( card.length > 0 ) {
            // Get the rewardId value from the data on the card
            rewardId = card.data( 'bvviz-reward' );

            BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId ] );

            event.preventDefault();
            return false;
          }
        });
      }

    // Attach a "fail" listener in case the mission id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  function load( page ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),
    // Calculate the page size
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Whether there are earned rewards or not, this function will draw the result
    function drawRows( missionRewardsDefData, playerRewardsData) {
      // This object will store which definition_id's have been earned
      var earnedRewards = {};

      // Create an object map of the earned rewards, using the reward's definition_id as the key
      if ( playerRewardsData ) {
        $.each( playerRewardsData.rewards, function( i, earnedReward ) {
          earnedRewards[ earnedReward.definition_id ] = true;
        });
      }

      // Loop through all the rewards defined on the mission
      $.each( missionRewardsDefData.rewards, function( i, reward ) {
        cards.append(
          // Render the card for each reward, using the earnedRewards map, and add it to the container
          render.card( reward, earnedRewards[ reward.id ] )
            // Add the current row style to the card
            .addClass( currentRowStyle )
        );

        // Change the next row style
        currentRowStyle = currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd';
      });

      // Random and Unordered missions don't need the bridge on any elements
      if ( useBridge === false ) {
        $( '.bvviz-bridge', cards ).remove();
      }

      // The first page has some special clean-up
      if ( page === 0 ) {
        if ( useBridge ) {
          
          // The first card dosn't need the bridge
          $( '.bvviz-bridge:first', cards ).remove();
        }

        // Add the "first" class to the first card to remove it's top margin
        $( '.bvviz-card:first', cards ).addClass( 'bvviz-first' );
      }
          
      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Load the provided page of rewards in the mission
    BVSDK( 'missions/rewards', { missions: missionId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( missionRewardsDefData ) {

        // If the player has progress, load the earned rewards for the player
        if ( hasProgress ) {
        
          // Load the player's earned rewards in the mission that match the definition_ids in this page
          BVSDK( 'players/missions/rewards', { players: playerId, missions: missionId }, {
              fields: 'hint',
              
              // Use $.map to extract an array of reward definition ids
              query: { definition_id: $.map( missionRewardsDefData.rewards, function( reward ) {
                  return reward.id;
                })
              }

            }).ok( function( playerRewardsData ) {
            
              // Draw the rows with player reward data
              drawRows( missionRewardsDefData, playerRewardsData );

            });

        } else {

          // Draw the rows without player reward data
          drawRows( missionRewardsDefData );

        }

      if ( missionRewardsDefData.rewards.length < pageSize ) {
        // We've loaded all the rewardss, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else {
        // Request all data without infinite Scroll
        BVVIZ.helper.loadNextPage( cards, pub );
      }

      }).fail( function() {
        
        // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
        cards.unbind( 'scroll.bvviz' );

        // Remove the loading display
        loading.remove();
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
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);
