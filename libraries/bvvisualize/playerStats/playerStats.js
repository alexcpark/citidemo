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
// Add playerRewards method to the BVVIZ scope
BVVIZ.playerStats = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
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
          ( settings.badges.showCategory ? $('<div class="bvviz-category">' + reward.category + '</div>' ) : '' ),
          ( settings.badges.showProgress ? $('<div class="bvviz-count">' + reward.earned_total_count + '</div>' ) : '0' ),
          render.count( reward )
        );
      } else {
        card.append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showCategory ? $('<div class="bvviz-category">' + reward.category + '</div>' ) : '' ),
          ( settings.badges.showProgress ? $('<div class="bvviz-count">' + reward.earned_total_count + '</div>' ) : '0' )
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
      return $( '<div class="bvviz bvviz-playerRewards bvviz-dialog">' + 
        '<div class="bvviz-name">' + reward.name + '</div>' +
        '<div class="bvviz-desc">' + reward.hint + '</div>' +
      '</div>' );
    }
  },
  
  // Store the playerRewards settings
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
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.playerRewards.maxPageSize ) {
    delete options.pageSize;
  }
  if ( !options.category ) {
    delete options.category;
  } else if ( $.type( options.category ) === 'string' ) {
    options.category = String.prototype.split.call( options.category, ',' );
  } else if ( $.type( options.category ) !== 'array' || options.category.length == 0 ) {
    delete options.category;
  }
  BVVIZ.utility.trimArray( options.category );
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.playerRewards, options );

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
      .addClass( 'bvviz bvviz-playerRewards' )
      .append(
        ( settings.inline ? '' : render.header() ),
        ( settings.childContentCards ? cards : $( '<div class="bvviz-body"></div>' ).append( cards ) )
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Unless we want request all data and disable infinite Scroll
    if ( settings.pageSize !== 0 ) {
      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
    }

    // Trigger a load of the initial page of data
    load( 0 );
	/*
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
    }*/

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

    // Load the provided page of reward definitions
    BVSDK( 'rewards', null, {
      fields: ['earnable_by','category','earned_total_count'],
      offset: page * pageSize,
      limit: pageSize,
      // Ensure that we only show rewards that are not included in missions or tracks
      query: ( settings.category ? { type: 'Reward', active: true, category: settings.category } : { type: 'Reward', active: true } )
    } ).ok( function( rewardDefsData ) {
		
	  var rewardDefIdArray = $.map( rewardDefsData.rewards.reverse(), function( reward ) {
            return reward.earnable_by == 'players' ? reward.id : null;
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
          BVSDK( 'players/rewards', { players: playerId }, {
            fields: ['category','earned_total_count'],

            // Use distinct=definition_id to ensure that we only get one instance of each definition
            distinct: 'definition_id',
            
            // Use $.map to extract an array of reward definition ids
            query: { definition_id: rewardDefIdArray }
          } )
        ).ok( function( rewardsProgressData, playerRewardsData ) {

          var rewardProgressMap = {},
              cardWidth;

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

            // If the reward is earnable by players, display the rewards, team rewards will not be displayed
            if ( rewardDef.earnable_by === 'players' ) {
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

      // If we want request all data and disable infinite Scroll
      if ( settings.pageSize === 0 ) {
        if ( rewardDefsData.rewards.length == pageSize ) {
          // Continue load next page
          BVVIZ.helper.loadNextPage( cards, pub );
        }
      } else {
        if ( rewardDefsData.rewards.length < pageSize ) {
          // We've loaded all the rewards, unbind the infinite scroll to prevent extra requests
          cards.unbind( 'scroll.bvviz' ); 
        }
      }

    }).fail( function() {
      // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
      cards.unbind( 'scroll.bvviz' );

      // Remove the loading display
      loading.remove();
    });
  }

  function showDialog( card ) {
    // Pull the reward object out of the data store
    var reward = card.data( 'bvviz-reward' ),
    // Create an overlay object for the dialog
        overlay = $('<div class="bvviz-overlay"></div>'),
        body = card.closest( '.bvviz-body' ),
        dialogContent;

    // If no reward object was found or JQuery.dialog is not defined, there is nothing to do
    if ( reward && $.isFunction( overlay.dialog ) ) {
      // Render the inner content
      dialogContent = render.dialog( reward );

      // Bind to a click on the overlay so that clicking it will close the dialog
      overlay.bind( 'click', function () {
        $( '.ui-dialog-titlebar-close', dialogContent.closest( '.ui-dialog' ) ).trigger( 'click' );
      });

      // Remove any existing overlays
      $( '.bvviz-overlay', card.parents( '.bvviz-body' ).last() ).click();

      // Put the overlay into the topmost "body" element
      card.parents( '.bvviz-body' ).last().append( overlay );

      // Shift the card above the overlay
      card.css( 'z-index', 2 );

      // Show the dialogContent in a JQuery.dialog box
      dialogContent.dialog({
        position: { my: 'center top', at: 'center bottom+5', of: card },
        resizable: false,
        draggable: false,
        width: ( body.width() - ( body.width() / 3 ) ),
        dialogClass: 'bvviz',
        open: function( event, ui ) {
          var dialog = $( '.ui-dialog:last' ),
              cardMarginWidth = card.outerWidth( true ) - card.width();
          
          // Move the dialog box to fit within the body
          dialog.css({
            left: target.offset().left + ( body.width() / 6 )
          });

          // Remove the min-height value that the JQuery.dialog method adds
          $( '.ui-dialog-content', dialog ).css( 'min-height', '0' );
          
          // Unfocus the button to remove highlight
          $( '.ui-dialog-titlebar-close', dialog ).blur();
        },
        close: function( event, ui ) {
          // Remove the z-index on the card
          card.css( 'z-index', '' );

          // Remove the overlay
          overlay.remove();

          // Destroy the dialog to remove it from the DOM
          dialogContent.dialog( 'destroy' );
        }
      });
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
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(jQuery);
