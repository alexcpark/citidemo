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
// Add playerMissions method to the BVVIZ scope
BVVIZ.playerMissions = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text" title="' + settings.headerTitle + '">' + settings.headerTitle + '</div></div>' );
    },

    // Individual mission card
    card: function( mission ) {
      // Check is the track image is in place
      var imageFound = !!( BVVIZ.utility.validateNestedObj( mission, 'image' ) && mission.image ),

      // Check if the last earned image is in place, prepare for swapping the level track image on level tracks
          lastEarnedImageFound = !!( BVVIZ.utility.validateNestedObj( mission, 'progress', 'last_earned', 'image' ) && mission.progress.last_earned.image ),

      // Store the display image src
          imageSrc,

      // Whether the image is broken
          imageBroken = false,

      // Store the rendering card
          card;

      if ( mission.type === 'level' && lastEarnedImageFound ) {
        // For level mission, if the last earned image is found in player progress, use the last earned reward image instead
        imageSrc = mission.progress.last_earned.image;
      } else if ( imageFound ) {
        // Use the mission image as src
        imageSrc = mission.image;
      } else {
        // Use the place holder image as src 
        imageSrc = BVVIZ.helper.imageHolderSrc();
        imageBroken = true;
      }

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      card = $( '<div class="bvviz-card bvviz-invisible"></div>' ).append(
        // Replace the background image if the image is not found
        $( '<img class="bvviz-picture' + ( imageBroken ? ' bvviz-broken' : '' ) + '" src="' + imageSrc + '" />' ),
        ( settings.badges.showName ? $( '<div class="bvviz-name" title="' + mission.name +'">' + mission.name + '</div>' ) : '' ),
        ( settings.badges.showCategory ? $('<div class="bvviz-category">' + mission.category + '</div>' ) : '' ),
        ( settings.badges.showProgress ? render.progress( mission ) : '' )
      );

      // If the non-level mission is incomplete, grey out the entire card
      if ( mission.type !== 'level' && !( $.isPlainObject( mission.progress ) && mission.progress.percent >= 100 ) ) {
        card.addClass( 'bvviz-grey' );
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
        card.addClass( 'bvviz-mini');
      }

      // Store the mission id for later use
      card.data( 'bvviz-mission', mission.id );
      return card;
    },

    // Progress indicator inside a mission card
    progress: function( mission ) {
      var progress = mission.progress,
          container = $( '<div class="bvviz-progress"></div>' );
                
      // Only show progress for missions that have been started
      if ( $.isPlainObject( progress ) ) {
        if ( progress.percent < 100 ) {
          container.html( progress.earned + '/' + progress.possible );
        } else if ( progress.percent == 100 ) {
          // Level mission doesn’t support complete state, display ratio fraction instead
          if ( mission.type === 'level' ) {
            container.html( progress.earned + '/' + progress.possible );
          } else {
            if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
              container.html( '&#10003;' );
            } else if ( settings.badges.miniBadge ) {
              container.html( BVVIZ.helper.svgCheckmarkMini() );
            } else if ( BVVIZ.utility.isIe8OrLess() ) {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
            } else {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
            }
          }
        }
      }
      return container;
    }
  },
  
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
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.playerMissions.maxPageSize ) {
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
  settings = $.extend( true, {}, BVVIZ.options.playerMissions, options );

  // Create a new JSSDK wrapper object instance
  new BVVIZ.SDKkit( settings.siteId );

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

    // Empty the target, add the base classes, the missionCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerMissions' )
      .append(
        ( settings.inline ? '' : render.header() ),
        ( settings.childContentCards ? cards : $( '<div class="bvviz-body"></div>' ).append(
          cards
        ) )
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

    // If BVVIZ.missionProgress has been included...
    if ( $.isFunction( BVVIZ.missionProgress ) ) {
      // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
      cards.bind( 'click', function( event ) {
        var eventTarget = $( event.target ),
            card = eventTarget.closest( '.bvviz-card' ),
            missionId;

        // If we can find a mission card from the click, show the missionProgress for that card
        if ( card.length > 0 ) {
          // Get the missionId value from the data on the card
          missionId = card.data( 'bvviz-mission' );

          BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

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
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
        sdkOptions = {
          fields: 'parent_id,category',
          offset: page * pageSize,
          limit: pageSize
        };

    if ( settings.category ) {
      sdkOptions = $.extend( true, sdkOptions, { query: { category: settings.category } } );
    }

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of mission definitions
    BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions', null, sdkOptions
    ).ok( function( missionDefsData ) {

      // We only want to display missions that aren't in tracks, plus only display active missions
      var nonTrackActiveMissions = $.map( missionDefsData.missions, function( mission ) {
            if ( !mission.parent_id && mission.active ) {
              return mission;
            }
          });

      // Make sure that we have at least one mission
      if ( nonTrackActiveMissions.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }
        
        // Request the player progress in the missions found
        BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, {
          query: {
            type: 'all_missions',
            // Use $.map to extract an array of mission ids
            definition_id: $.map( nonTrackActiveMissions, function( mission ) {
              return mission.id;
            })
          }
        }).ok( function( playerMissionsData ) {
          var missionProgressMap = {},
              cardWidth;

          // Convert the playerMissionsData into an object, using the mission Id as the key
          $.each( playerMissionsData.progresses, function( i, progress ) {
            missionProgressMap[ progress.definition_id ] = progress;
          });
          
          // Render each mission definition
          $.each( nonTrackActiveMissions, function( i, missionDef ) {
            // If the player has made progress in the mission, use the progresses object. Otherwise use the definition
            missionDef.progress = missionProgressMap[ missionDef.id ] || missionDef.progress;
            
            // Add the mission card into the display
            cards.append(
              render.card( missionDef )
            );
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
        if ( missionDefsData.missions.length == pageSize ) {
          // Continue load next page
          BVVIZ.helper.loadNextPage( cards, pub );
        }
      } else if ( missionDefsData.missions.length < pageSize ) {
        // We've loaded all the missions, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else if ( nonTrackActiveMissions.length <= pageSize/2 ) {
        // If we didn't get many non-track active missions with this request, request the next page
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
})(bvjQuery);
