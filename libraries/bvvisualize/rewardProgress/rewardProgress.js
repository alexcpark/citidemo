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
// Add rewardProgress method to the BVVIZ scope
BVVIZ.rewardProgress = function( target, playerId, rewardId, inline ) {
  
  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( title ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + title + '</div></div>' );
    },

    // Header for the reward itself
    bodyHeader: function( reward ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( reward.progress && reward.progress.percent ? reward.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + reward.hint + '</div>' +
      '</div>' );
    },

    // Player reward card
    defCard: function( reward ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-icon-container"></div>').append(
          $('<img class="bvviz-icon" src="' + reward.image + '"/>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-hint">' + ( reward.hint ? reward.hint : '' ) + '</div>'),
          reward.additionalAward ? $('<div class="bvviz-awards bvviz-clearfix">Additional award: ' + reward.additionalAward + '</div>') : null,
          render.progress( reward.playerProgress )
        )
      );
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
      }
      return card;
    },

    // Player reward card
    card: function( reward ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-icon-container"></div>').append(
          $('<img class="bvviz-icon" src="' + reward.image + '"/>'),
          $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-message">' + ( reward.message ? reward.message : '' ) + '</div>'),
          reward.additionalAward ? $('<div class="bvviz-awards bvviz-clearfix">Additional award: ' + reward.additionalAward + '</div>') : null,
          $('<div class="bvviz-timestamp"><span>Completed: ' + BVVIZ.helper.timeToFormatted(reward.created_at) + '</span></div>')
        )
      );
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
      }
      return card;
    },

    // Player time-reset reward card
    resetCard: function( reward ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-icon-container"></div>').append(
          $('<img class="bvviz-icon" src="' + reward.image + '"/>'),
          reward.earned_total_count ? $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>') : ''
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-hint">' + ( reward.hint ? reward.hint : '' ) + '</div>'),
          reward.additionalAward ? $('<div class="bvviz-awards bvviz-clearfix">Additional award: ' + reward.additionalAward + '</div>') : null,
          render.progress( reward.playerProgress ),
          reward.earned_total_count ? $('<div class="bvviz-timestamp"><span>Completed: ' + BVVIZ.helper.timeToFormatted(reward.created_at) + '</span></div>') : ''
        )
      );
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
      }
      return card;
    },

    // Player reward progress
    progress: function( progress ) {
      var progress = $('<progress class="bvviz-progress-bar" max="' + progress.possible + '" value="' + progress.earned + '"></progress>').add(
            $('<div class="bvviz-ratio">' + progress.earned + '/' + progress.possible + '</div>')
          );
      return progress;
    },

    // Reward earned history
    history: function( earnedRewards ) {
      var expand = $('<div class="bvviz-expand bvviz-arrowdown">&#9662;</div>'),
          stamps = '',
          history = '';

      // Loop through the earned reward instances, append additional timestamp data
      $.each( earnedRewards, function( id, timestamp ) {
        stamps += '<div>' + BVVIZ.helper.timeToFormatted( timestamp ) + '</div>';
      })

      history = expand.add( $('<div class="bvviz-more-timestamps"></div>').append( stamps ) );

      // Add event handler for openning more completed timestamps
      expand.on('click', function(event){
        var expand = $( this ),
            target = expand.next();
        if ( !target.hasClass('bvviz-open') ) {
          expand.html('&#9663');
          target.addClass('bvviz-open');
        } else {
          expand.html('&#9662');
          target.removeClass('bvviz-open');
        }
      });

      return history;
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // The number of Rewards that will be requested in a single API call
  pageSize = 10,

  // This boolean will track whether the player has progress in the reward or not
  hasProgress = false,

  // This boolean will track whether the reward images should be connected by a visual "bridge" or not
  useBridge = false;

  // General purpose normalization function
  function normalize( reward ) {

    var normalized = {},
        crieteria = '',
        award = '';

    // reward progress may come from two resources
    // if from rewards definition, should include image, hint, eligibility conditions, additional awards and progress
    // if from player rewards, should include message, timestamp earned, display all instances if earned multiple times

    // Set default hint, message
    normalized.hint = reward.hint ? reward.hint : ( reward.name + ' to earn this reward' );
    normalized.message = reward.message ? reward.message : ( 'Congratulations on earning reward ' + reward.name + '!' );

    // Set default earned total count to 1
    normalized.earned_total_count = $.isNumeric( reward.earned_total_count ) ? reward.earned_total_count : 0 ;

    // Set eligibility display from player criteria and behavior crieteria
    $.each( reward.player_criteria, function( key, value ){
      if ( key > 0 ) {
        crieteria += '</br>' + reward.criteria_union + ' ';
      }

      crieteria += value.field + ' ' + value.operator + ' ' + value.value;
    });

    normalized.eligibility = crieteria ? crieteria : 'N/A';

    // Set the additional award for the reward, this has to be from rewards definition
    $.each( reward.units, function( key, value ){
      if ( value.possible == 0 ) {
        return;
      }

      // Adding delimiters
      award = award ? award + ', ' : award;

      // Appdending additional Units
      award += value.possible + ' ' + value.name;
    });

    normalized.additionalAward = award;

    // Merge the normalized properties into reward object
    return $.extend( reward, normalized, true );
  }

  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        title = '',
        cards;

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
    // "rewardId" must be provided as a string
    if ( typeof( rewardId ) !== 'string' || rewardId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"rewardId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-rewardProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    cards = $( '.bvviz-cards', target );

    BVSDK.all(
      // Load the reward definitions
      BVSDK( 'rewards', null, {
        fields: 'all',
        query: { definition_id: rewardId }
      } ),      
      // Load the reward information and player's overall reward progress
      BVSDK( 'players/rewards', { players: playerId }, {
        fields: 'all',

        // Use distinct-definition_id to ensure that we only get one instance of each definition
        distinct: 'definition_id',

        query: { definition_id: rewardId }

      } ) 
    ).ok( function( rewardsDefData, playerRewardsData ) {

      title = rewardsDefData.rewards && rewardsDefData.rewards[0] && rewardsDefData.rewards[0].name || 'Unnamed Reward';

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !inline ) {
        render.header( title ).prependTo( target );
      }
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Load the reward card details
      load( rewardsDefData, playerRewardsData );

    // Attach a "fail" listener in case the reward id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  function load( rewardsDefData, playerRewardsData ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),

    // This object will store earned reward instances of the reward definition_id
        earnedRewards = {},
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),

    // earned_total_count need to be adjusted based on data from earnedRewards
        earnedCount = 0;

    // Whether there are earned rewards or not, this function will draw the result
    function drawDetails( rewardsDefData, playerRewardsData, rewardProgressData ) {
      // Set the storage for normalized rewardData
      var normalizedReward = {};

      // Normalize the reward defintion 
      if ( rewardsDefData && rewardsDefData.rewards && rewardsDefData.rewards.length > 0 ) {
        normalizedReward = $.extend( true, normalizedReward,  normalize( rewardsDefData.rewards[0] ) );
      }

      // Normalize the player rewards
      if ( playerRewardsData && playerRewardsData.rewards && playerRewardsData.rewards.length > 0 ) {
        normalizedReward = $.extend( true, normalizedReward,  normalize( playerRewardsData.rewards[0] ) );
      }

      // Normalize the reward progress
      if ( rewardProgressData ) {
        // If player has started the progress, normalize using the progress data, otherwise set default values
        if ( rewardProgressData.progresses && rewardProgressData.progresses.length > 0 ) {
          normalizedReward.playerProgress = rewardProgressData.progresses[0];
        } else {
          normalizedReward.playerProgress = {
            earned: 0,
            possible: ( $.isNumeric( normalizedReward.progress_possible ) ? normalizedReward.progress_possible : 1 ),
            percent: 0
          };
        }
      }

      if ( normalizedReward && $.isPlainObject( normalizedReward.interval ) ) {
        // Render time-reset reward details with all rewards data
        cards.append( render.resetCard( normalizedReward ) );

      } else if ( playerRewardsData && playerRewardsData.rewards && playerRewardsData.rewards.length > 0 ) {
        // Render reward details with player rewards data
        cards.append( render.card( normalizedReward ) );

      } else {
        // Render reward details with the reward definition data
        cards.append( render.defCard( normalizedReward ) );

      }

      if ( cards.children().length ) {

        // Remove the loading display
        loading.remove();

        // Use the helper to show the cards with an animation
        BVVIZ.helper.showCards( cards );

      } else {

        // Remove the loading display
        loading.remove();

        // remove the target if no reward data
        target.remove();
      }
    }

    function loadEarnedRewards( page ) {

      function showCountHistory () {
        var count = $( '.bvviz-count', cards ),
            completed = $( '.bvviz-timestamp', cards ),
            completedTimeSpan;

        if ( !$.isEmptyObject(earnedRewards) ) {
          // Should the earned_total_count data field be re-adjusted
          // count.text( parseInt( earnedCount, 10 ) + 'x' );

          // Add the expand button and container element
          completed.append( render.history(earnedRewards) );

          // Re-position the timestamp expand button
          completedTimeSpan = completed.children().first();
          $('.bvviz-expand').css( { 'left': completed.width() - ( completed.width() - completedTimeSpan.outerWidth() ) / 2  + 5 } );

        }
      };

      // Load the additional data of all earned reward instances in the reward 
      BVSDK( 'players/rewards', { players: playerId }, {
          fields: 'created_at',
          offset: page * pageSize,
          limit: pageSize,

          query: { definition_id: rewardId }

        }).ok( function( earnedRewardsData ) {

          // Create an object map of the earned rewards, using the reward's definition_id as the key
          if ( earnedRewardsData ) {
            $.each( earnedRewardsData.rewards, function( i, earnedReward ) {
              // exclude the existing reward instance from player rewards
              if ( playerRewardsData && playerRewardsData.rewards.length > 0 && playerRewardsData.rewards[0].id !== earnedReward.id ) {
                earnedRewards[ earnedReward.id ] = earnedReward.created_at;
              }
              // increment the earned count
              earnedCount++;
            });
          }

          // If the player earned more rewards, load all of the earned rewards for the player
          if ( earnedRewardsData.rewards && earnedRewardsData.rewards.length === pageSize ) {
            // Recursive loading
            page++;
            loadEarnedRewards( page );
          
          } else {
            // Show count and history element if earnedRewards is not empty
            showCountHistory();
          }

        }).fail( function( earnedRewardsData ) {

          // No more earnedRewardsData, show count and history element if earnedRewards is not empty
          showCountHistory();
        });
    }

    function loadRewardProgress( rewardsDefData, playerRewardsData ) {

      // Load the player progress toward the reward and store into reward definition data 
      BVSDK( 'players/progresses', { players: playerId }, {
          fields: 'all',

          query: { type: 'all_rewards', definition_id: rewardId }

        }).ok( function( rewardProgressData ) {
          var details = $( '.bvviz-details', cards );

          if ( BVVIZ.utility.validateNestedObj( rewardProgressData, 'progresses' ) ) {

            // Store the progress data into reward definition data
            if ( rewardsDefData && rewardsDefData.rewards && rewardsDefData.rewards[0] ) {
              rewardsDefData.rewards[0].playerProgress = rewardProgressData.progresses[0];
            } 

            // If the reward progress data is valid, draw the progress bar
            if ( rewardProgressData.progresses.length ) {

              if ( details.length > 0 ) {
                details.append( render.progress( rewardProgressData.progresses[0] ) );
              }
            }
          }

        }).always( function( rewardProgressData ) {

          // Draw the reward details with reward progress
          drawDetails( rewardsDefData, playerRewardsData, rewardProgressData );

          if ( BVVIZ.utility.validateNestedObj( playerRewardsData, 'rewards' ) ) {
            // Append reward earning history if it is time-reset enabled
            if ( playerRewardsData.rewards[0] && playerRewardsData.rewards[0].interval ) {
              loadEarnedRewards( 0 );
            }
          }
        });
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    if ( playerRewardsData.rewards && playerRewardsData.rewards.length > 0 ) {

      // This reward is time-reset enabled, get both player progress and earned history
      if ( playerRewardsData.rewards[0] && playerRewardsData.rewards[0].interval ) {

        // load player reward progress, in callback draw the details with combined reward progress and eaned history
        loadRewardProgress( rewardsDefData, playerRewardsData );

      // This reward has been earned
      } else {

        // Draw the details with player rewards data
        drawDetails( rewardsDefData, playerRewardsData );

        // If this reward is re-earnable, get all reward instances for this player        
        if ( playerRewardsData.rewards[0].allow_duplicates ) {

          loadEarnedRewards( 0 );

        }

      }

    // This reward has not been earned, get player progress
    } else {

      // load player reward progress, in callback draw the details without player rewards data
      loadRewardProgress( rewardsDefData );

    }

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
})(jQuery);
