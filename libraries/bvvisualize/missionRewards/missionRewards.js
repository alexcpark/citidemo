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
// Add missionRewards method to the BVVIZ scope
BVVIZ.missionRewards = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + ( settings.headerTitle ? settings.headerTitle : name ) + '</div></div>' );
    },

    // Main body
    body: function() {
      var body = $( '<div class="bvviz-body"></div>' ).append( render.description() );
      if ( !settings.showContainerFrame ) {
        body.addClass( 'bvviz-noframe');
      }
      if ( settings.inline ) {
        body.addClass( 'bvviz-noheader');
      }

      return body;
    },

    // Body header
    description: function() {
      var desc = settings.description ? $( '<div class="bvviz-body-title">' + settings.description + '</div>' ) : '';
      // If descriptionFontColor option set to a valid value, add inline style
      if ( settings.description && settings.descriptionFontColor ) {
        desc.css( 'color', settings.descriptionFontColor );
      }

      return desc;
    },

    // Individual reward card
    card: function( reward ) {
      // Replace the background image if the image is not found
      var imageFound = !!( BVVIZ.utility.validateNestedObj( reward, 'image' ) && reward.image ),
      // Use the place holder image as src if the image is not found
          imageSrc = imageFound ? reward.image : BVVIZ.helper.imageHolderSrc();

      // Hide the badge if unearned badge should be covered
      imageSrc = !reward.earned_by && settings.badges.lockUnearned ? BVVIZ.helper.imageHolderSrc() : imageSrc;

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      var card = $( '<div class="bvviz-card bvviz-invisible"></div>' );

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini').append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showProgress ? render.progress( reward ) : '' ),
          render.count( reward )
        );
      } else {
        card.append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showProgress ? render.progress( reward ) : '' )
        );
      }

      // If the reward has not been earned, grey it out
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
        if ( settings.badges.lockUnearned ) {
          card.addClass('bvviz-locked');
        }
      }

      // If this is mini badge or has custom background color, clear the badge border
      if ( settings.badges.miniBadge || !settings.badges.showBadgeBorder ) {
        card.addClass( 'bvviz-borderless' );
      }

      // If the badgeBackgroundColor option set to a valid value, add inline style
      if ( settings.badges.badgeBackgroundColor ) {
        card.css( 'background-color', settings.badges.badgeBackgroundColor );
      }

      // If the badgeFontColor option set to a valid value, add inline style
      if ( settings.badges.badgeFontColor ) {
        card.css( 'color', settings.badges.badgeFontColor );
      }

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    },

    // Progress indicator inside a reward card
    progress: function( reward ) {
      var progress = reward.progress,
          container = $( '<div class="bvviz-progress"></div>' );
      
      if ( $.isNumeric( reward.earned_total_count ) ) {
        // Show rewards that have been completed
          if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
            container.html( '&#10003;' );
          } else if ( settings.badges.miniBadge ) {
            container.html( BVVIZ.helper.svgCheckmarkMini() );
          } else if ( BVVIZ.utility.isIe8OrLess() ) {
            container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
          } else {
            container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
          }
      } else if ( $.isPlainObject( progress ) ) {
        // Show progress for rewards that has progress object returned, otherwise the rewards are not progressable
        container.html( progress.earned + '/' + progress.possible );
      } 

      return container;
    },

    // Reward count indicator for repeatable rewards
    count: function( reward ) {
      return reward.earned_total_count ? $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>') : '';
    },

    // Tooltip
    dialog: function( reward ) {
      return $( '<div class="bvviz bvviz-missionRewards bvviz-dialog">' + 
        '<div class="bvviz-name">' + reward.name + '</div>' +
        '<div class="bvviz-desc">' + reward.hint + '</div>' +
      '</div>' );
    }
  },
  
  // Store the missionRewards settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };
  if ( !options.showContainerFrame || options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !options.showDescription || $.type( options.description ) !== 'string' || options.description == '' ) {
    delete options.description;
  }
  if ( $.type( options.descriptionFontColor ) !== 'string' || !options.descriptionFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
    delete options.descriptionFontColor;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionRewards.maxPageSize ) {
    delete options.pageSize;
  }
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.missionRewards, options );

  function init() {
    // Define the card container so that we can bind events to it
    var cards = $( '<div class="bvviz-cards bvviz-row"></div>' );

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

    // Empty the target, add the base classes, the rewardCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-missionRewards' )
      .append(
        ( settings.childContentCards ? cards : render.body().append( cards ) )
      );

    // Load the mission information and player's overall mission progress
    BVSDK( 'missions', { missions: missionId }
    ).ok( function( missionDefData ) {

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( missionDefData.missions[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Unless we want request all data and disable infinite Scroll
      if ( settings.pageSize !== 0 ) {
        // Set up infinte scrolling on the new container
        BVVIZ.helper.infiniteScroll( cards, pub );
      }

      // Trigger a load of the initial page of data
      load( 0 );

    // Attach a "fail" listener in case the mission id is invalid
    }).fail( function( data ) {

      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

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

  }

  function load( page ) {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        cards = $( '.bvviz-cards', target ),
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize;

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of rewards in the mission
    BVSDK( 'missions/rewards', { missions: missionId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize,
        // Ensure that we only show active rewards
        query: ( { active: true } )
    } ).ok( function( rewardDefsData ) {
      var rewardDefIdArray = $.map( rewardDefsData.rewards, function( reward ) {
            return reward.id;
          } );

      // Make sure that we have at least one reward
      if ( rewardDefsData.rewards.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }

        BVSDK.all(

          // Load the player progress toward the reward and store into reward definition data 
          BVSDK( 'players/progresses', { players: playerId }, {
             // There should only be 1 RewardProgression per player-RewardDefinition ID pair, refer PLAT-715
            query: { type: 'all_rewards', definition_id: rewardDefIdArray }

          } ),
          // Request the player earned reward progress in the rewards found
          BVSDK( 'players/missions/rewards', { players: playerId, missions: missionId }, {
            fields: ['earned_total_count'],
            
            // Use $.map to extract an array of reward definition ids
            query: { definition_id: rewardDefIdArray }
          } )
        ).ok( function( rewardsProgressData, playerRewardsData ) {

          var rewardProgressMap = {},
              cardWidth;

          if ( playerRewardsData && playerRewardsData.rewards ) {
            $.each( playerRewardsData.rewards, function( i, reward ) {
              // Convert the playerRewardsData into an object, using the reward Id as the key
              rewardProgressMap[ reward.definition_id ] = reward;

              // Merge the player reward progress into playerRewardsData object, using the reward definition Id as the key
              try {
                $.each( rewardsProgressData.progresses, function( j, progress ) {
                  // If the reward definition object found match the progress, merge into progress object
                  if ( reward.definition_id == progress.definition_id ) {
                    rewardProgressMap[ reward.definition_id ].progress = progress;
                  }
                });
              } catch (e) {}
            });
          }

          $.each( rewardDefsData.rewards, function( i, rewardDef ) {
            // Merge the player reward progress into rewardDefsData object, using the reward definition Id as the key
            try {
              $.each( rewardsProgressData.progresses, function( j, progress ) {
                // If the reward definition object found match the progress, merge into progress object
                if ( rewardDef.id == progress.definition_id ) {
                  rewardDef.progress = progress;
                }
              });
            } catch (e) {}

            // Display all mission rewards in the applied order
            if ( settings.badges.showUnearned ) {
              // Render both earned and unearned rewards
              // If the player has earned the reward, use the progress map. Otherwise use the definition
              cards.append( 
                render.card( rewardProgressMap[ rewardDef.id ] ? rewardProgressMap[ rewardDef.id ] : rewardDef )
              );
            } else {
              // Display card only if the player has earned the reward, use the progress map
              if ( rewardProgressMap[ rewardDef.id ] ) {
                cards.append( 
                  render.card( rewardProgressMap[ rewardDef.id ] )
                );
              }
            }
          });

          // If this is the child content of custom container, then slient loading, otherwise show the cards
          if ( !settings.childContentCards ) {
            // Calculate the card width after card being appended
            if ( !cardWidth ) {
              cardWidth = BVVIZ.helper.fitRowCardWidth( cards.children(":first"), cards );
            }
            // Apply the calculated width to each cards
            cards.children().width( cardWidth );

            // Remove the loading display
            loading.remove();

            // Use the helper to show the cards with an animation
            BVVIZ.helper.showCards( cards );
          }

        }).always( function() {
          if ( $.isFunction( settings.callback ) ) {
            settings.callback();
          }      
        });
      } else {
        // Remove the loading display
        loading.remove();
      }

      if ( rewardDefsData.rewards.length < pageSize ) {
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
