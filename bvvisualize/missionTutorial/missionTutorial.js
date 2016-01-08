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
// Add missionTutorial method to the BVVIZ scope
BVVIZ.missionTutorial = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      var title = settings.headerTitle ? settings.headerTitle : name ;
      return $( '<div class="bvviz-header"><div class="bvviz-header-text" title="' + title + '">' + title + '</div></div>' );
    },

    // Header for the mission itself
    bodyHeader: function( mission ) {
      var percent = mission.progress.percent ? mission.progress.percent : 0 ,
          container = $( '<div class="bvviz-body-header"></div>' ),
          summaryProgress;

      container.append(
        $( '<div class="bvviz-info">' + ( percent == 100 ? ( mission.message ? mission.message : '' ) : mission.hint ) + '</div>').append(
          '<div class="bvviz-countdown">Days Left: n/a</div>'
        )
      );

      summaryProgress = BVVIZ.helper.showRadialProgress( percent ).prependTo( container );

      BVVIZ.helper.animateRadialProgress( summaryProgress );

      return container;
    },

    // Individual reward card
    card: function( reward, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible ' + ( earned ? 'bvviz-complete' : 'bvviz-not-started' ) + '"' +
          // Add a data attribute to track the reward Id
          ' data-bvviz-reward_id="' + reward.id + '"></div>');

      card.append(
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + reward.name + '</div>'),
          $('<div class="bvviz-desc">' + ( settings.list.showItemProgress ? this.unknownProgress( reward, earned ) : ( reward.hint ? reward.hint : '' ) ) + '</div>')
        ),
        render.checkmark()
      );

      // If badge icons should display, add class name to reserve space for the icons
      if ( settings.list.showBadgeIcon ) {
        card.addClass('bvviz-list-icon')
            .prepend( $('<div class="bvviz-picture-container"></div>').append(
              $('<img class="bvviz-picture" src="' + reward.image + '"/>')
            )
        );
      }

      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    },

    // Checkmark
    checkmark: function() {
      if ( BVVIZ.utility.isIe8OrLess() ) {
        return $( '<div class="bvviz-checkmark-circle bvviz-nosvg"></div>');
      } else {
        return $( '<div class="bvviz-checkmark-circle">' + BVVIZ.helper.svgCheckmarkCircle() + '</div>' );
      }
    },

    // Unknown progress
    unknownProgress: function( reward, earned ) {
      if ( earned ) {
        
        // If the reward is earned and progress_possible is defined, we assume the player has done all of the possible steps
        if ( reward.progress_possible ) {
          return 'Completed (' + reward.progress_possible + '/' + reward.progress_possible + ')';
        }
        
        // If the reward is earned but we don't know progress, just show completed text
        return 'Completed';
      }

      // If the reward is unearned but progress is possible to know, show "Not Started" for now
      //  (The progress will be updated asynchronously if the player has actually started the reward)
      if ( reward.progress_possible ) {
        return 'Not Started (0/' + reward.progress_possible + ')';
      }

      // Otherwise we make no assumptions about the progress nor possibility or progress
      return '&nbsp;';
    },

    // Known progress text
    progress: function( card, progress ) {
      var desc = card.find( '.bvviz-desc' );
      if ( progress.percent == 0 ) {
        desc.html( 'Not Started' );
      } else if ( progress.percent < 100 ) {
        desc.html( 'In Progress (' + progress.earned + '/' + progress.possible + ')' );

        // Remove the "not-started" class and add a "started" one to the card, currently being disabled
        // card.removeClass( 'bvviz-not-started' ).addClass( 'bvviz-started' );
      } else {
        desc.html( 'Completed (' + progress.earned + '/' + progress.possible + ')' );
      }
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // Store the type of mission for later use. 
  // If this is Unordered or Random mission, sort and display the unfinished reward items first
  missionType = null,

  // Store the player's mission progress object
  playerMissionProgress,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionTutorial.maxPageSize ) {
    delete options.pageSize;
  }
  if ( BVVIZ.utility.validateNestedObj( options, 'alternateVisual' ) ) {
    if ( $.type( options.alternateVisual.visualName ) !== 'string' ){
      delete options.alternateVisual.visualName;
    }
    if ( $.type( options.alternateVisual.streamId ) !== 'string' ){
      delete options.alternateVisual.streamId;
    }
    if ( $.type( options.alternateVisual.leaderboardId ) !== 'array' ){
      delete options.alternateVisual.leaderboardId;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.missionTutorial, options );

  // Create a new JSSDK wrapper object instance
  new BVVIZ.SDKkit( settings.siteId );


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Allow for target to be provided as a string or jQuery object
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
      .addClass( 'bvviz bvviz-missionTutorial' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the mission information
    BVSDK.all(
      BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions', { missions: missionId }, {
        fields: 'hint'
      } ),
      BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: {
        type: 'all_missions',
        definition_id: missionId
      }} )
    ).ok( function( missionDefData, playerProgressData ) {
      var body = $( '.bvviz-body', target ),

          cards = $( '.bvviz-cards', target ),

          // Store the return value from the callback function
          callbackSwitch;

      // Store the mission type for track sorting
      missionType = missionDefData.missions[0].type;

      // Store the player mission progress object
      playerMissionProgress = BVVIZ.utility.validateNestedObj( playerProgressData, 'progresses', [0] ) ? playerProgressData.progresses[0] : {};

      // Level missions can not be completed, though they are allowed to have alternate visualization upon "completion"

      // If player has completed a non-level mission, it's possible to switch to alternate visualization on the settings
      if ( playerMissionProgress.percent == 100 && typeof settings.progressCompleteCallback === 'function' && settings.alternateVisual ) {

        // Convert to alternate visualization if this mission is completed
        callbackSwitch = settings.progressCompleteCallback( pub, settings.alternateVisual );

        // If the callback continue flag returns true, stop current visualization and switch to new visualization
        if ( callbackSwitch ) {
          return false;
        }
      }

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( settings.inline ) {
        body.addClass( 'bvviz-noheader');
      } else {
        render.header( missionDefData.missions[0].name ).prependTo( target );
      }

      // Render the summary for the track and add it to the body
      if ( playerMissionProgress ) {
        // If the player has made progress, add that to the track
        missionDefData.missions[0].progress = playerMissionProgress;
      }

      // Render the body
      render.bodyHeader( missionDefData.missions[0] ).prependTo( body );
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );

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

            BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId, { siteId: settings.siteId } ] );

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
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),

    // The number of Rewards that will be requested in a single API call
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize;


    // Whether there are earned rewards or not, this function will draw the result
    function drawRows( missionRewardsDefData, playerRewardsData ) {
      // This object will store which definition_id's have been earned
      var earnedRewards = {},

      // This array will store the unearned definition_id's involved in the mission
      unearnedRewardIds = [];

      // Create an object map of the earned rewards, using the reward's definition_id as the key
      if ( playerRewardsData ) {
        $.each( playerRewardsData.rewards, function( i, earnedReward ) {
          earnedRewards[ earnedReward.definition_id ] = true;
        });
      }

      // Loop through all the rewards defined on the mission
      $.each( missionRewardsDefData.rewards, function( i, reward ) {
        //Add the reward Id into the array if it's not been earned
        if ( !earnedRewards[ reward.id ] ) {
          unearnedRewardIds.push( reward.id );
        }

        // If the mission is Random or Unordered type
        if ( missionType === 'random' || missionType === 'unordered' ) {
          // If it's an earned reward...
          if ( earnedRewards[ reward.id ] ) {

            // Determine the current RowStyle
            currentRowStyle = cards.children().filter(":last").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
          
            // Render the card for each reward, using the earnedRewards map, and add it to the container
            render.card( reward, earnedRewards[ reward.id ] ).appendTo( cards )
              // Add the current row style to the card
              .addClass( currentRowStyle );
          } else {

            // Determine the current RowStyle
            currentRowStyle = cards.children().filter(":first").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';

            // Render the card for each reward, using the earnedRewards map, and add it to the container
            render.card( reward, earnedRewards[ reward.id ] ).prependTo( cards )
              // Add the current row style to the card
              .addClass( currentRowStyle );
          }

        // else the mission is one of Level, ordered or progression
        } else {

          // Determine the current RowStyle
          currentRowStyle = cards.children().filter(":last").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
        
          // Render the card for each reward, using the earnedRewards map, and add it to the container
          render.card( reward, earnedRewards[ reward.id ] ).appendTo( cards )
            // Add the current row style to the card
            .addClass( currentRowStyle );          
        }
      });

      // If there are unearned rewards... this is only for displaying the progress ratio 
      if ( unearnedRewardIds.length > 0 && settings.list.showItemProgress ) {
        // ...request the Progresses object(s) in an async call
       BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: { type: 'all_rewards', definition_id: unearnedRewardIds } } )
          .ok( function( data ) {

            // Loop through the Progresses and add the new data into the relevant card
            $.each( data.progresses, function( i, progress ) {

              // Use the data-bvviz-reward_id attribute as the selector
              render.progress( cards.find( '[data-bvviz-reward_id="' + progress.definition_id + '"]' ), progress );

            });
          });
      }
          
      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Load the provided page of rewards in the mission
   BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions/rewards', { missions: missionId }, {
        fields: [ 'hint', 'progress_possible' ],
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( missionRewardsDefData ) {

        var earnedRewardsMap = {};

        // If the player has progress, load the earned rewards for the player
        if ( playerMissionProgress && playerMissionProgress.percent > 0 ) {
        
          // Load the player's earned rewards in the mission that match the definition_ids in this page
         BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions/rewards', { players: playerId, missions: missionId }, {
              fields: 'hint',
              
              // Use $.map to extract an array of reward definition ids
              query: { definition_id: $.map( missionRewardsDefData.rewards, function( reward ) {
                  return reward.id;
                })
              }

            }).ok( function( playerRewardsData ) {

              // Draw the rows with player reward data
              drawRows( missionRewardsDefData, playerRewardsData );

            }).fail( function() {

              // Remove the loading display
              loading.remove();
            });

        } else {

          // Draw the rows without player reward data
          drawRows( missionRewardsDefData );

        }

        // If we've loaded all the missions, unbind the infinite scroll to prevent extra requests
        if ( missionRewardsDefData.rewards.length < pageSize ) {
          // We've loaded all the rewards, unbind the infinite scroll to prevent extra requests
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

  // Expose the named arguments passed to current visualization
  function namedParam( argName ) {
    var args = {
      target: target, 
      playerId: playerId,
      missionId: missionId,
      options: options
    };

    return args[ argName ] ? args[ argName ] : null ;
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
  pub.namedParam = namedParam;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(bvjQuery);
