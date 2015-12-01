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
// Add trackMissions method to the BVVIZ scope
BVVIZ.trackMissions = function( target, playerId, trackId, options ) {
  
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

    // Individual mission card
    card: function( mission ) {
      // Replace the background image if the image is not found
      var imageFound = !!( BVVIZ.utility.validateNestedObj( mission, 'image' ) && mission.image ),
      // Use the place holder image as src if the image is not found
          imageSrc = imageFound ? mission.image : BVVIZ.helper.imageHolderSrc();

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      var card = $( '<div class="bvviz-card bvviz-invisible"></div>' ).append(
        $( '<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />' ),
        ( settings.badges.showName ? $( '<div class="bvviz-name" title="' + mission.name +'">' + mission.name + '</div>' ) : '' ),
        ( settings.badges.showProgress ? render.progress( mission ) : '' )
      );

      // If the mission is incomplete, grey out the entire card
      if ( !( $.isPlainObject( mission.progress ) && mission.progress.percent >= 100 ) ) {
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
  
  // Store the trackMissions settings
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
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.trackMissions.maxPageSize ) {
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
  settings = $.extend( {}, BVVIZ.options.trackMissions, options );

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
      .addClass( 'bvviz bvviz-trackMissions' )
      .append(
        ( settings.childContentCards ? cards : render.body().append( cards ) )
      );

    // Load the mission information and player's overall mission progress
    BVSDK( 'tracks', { tracks: trackId }
    ).ok( function( trackDefData ) {

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( trackDefData.tracks[0].name ).prependTo( target );
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

    // Attach a "fail" listener in case the track id is invalid
    }).fail( function( data ) {

      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

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

          BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId ] );

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
          offset: page * pageSize,
          limit: pageSize
        };

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of mission definitions
    BVSDK( 'tracks/missions', { tracks: trackId }, sdkOptions
    ).ok( function( missionDefsData ) {

      // We only want to display missions that aren't in tracks, plus only display active missions
      var activeMissions = $.map( missionDefsData.missions, function( mission ) {
            if ( mission.active ) {
              return mission;
            }
          });

      // Make sure that we have at least one mission
      if ( activeMissions.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }
        
        // Request the player progress in the missions found
        BVSDK.all(
          BVSDK( 'players/missions', { players: playerId }, {
            query: {
              // Use $.map to extract an array of mission ids
              id: $.map( activeMissions, function( mission ) {
                return mission.id;
              })
            }
          }),
          BVSDK( 'players/progresses', { players: playerId }, { query: {
            type: 'all_missions',
            definition_id: $.map( activeMissions, function( mission ) {
                return mission.id;
              })
            }
          })
        ).ok( function( playerMissionsData, missionProgressData ) {
          var missionProgressMap = {},
              cardWidth;

          if ( playerMissionsData && playerMissionsData.missions ) {
            // Convert the player mission into an object and merge into progress map, using the mission Id as the key
            $.each( playerMissionsData.missions, function( i, mission ) {
              missionProgressMap[ mission.id ] = mission;
            });
          }
          
          // Render each mission definition
          $.each( activeMissions, function( i, missionDef ) {

            // Merge the player mission progress into progress map, using the mission definition Id as the key
            try {
              $.each( missionProgressData.progresses, function( j, progress ) {
                // If the mission definition id found match in the progress, generate a progress object which hasn't been started
                if ( missionDef.id == progress.definition_id ) {
                  missionProgressMap[ missionDef.id ] = missionDef;
                  missionProgressMap[ missionDef.id ].progress = progress;
                }
              });
            } catch (e) {}

            // If the player has made progress in the mission, use the progress. Otherwise use the definition
            cards.append( 
              render.card( missionProgressMap[ missionDef.id ] ? missionProgressMap[ missionDef.id ] : missionDef )
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

      if ( missionDefsData.missions.length < pageSize ) {
        // We've loaded all the missions, unbind the infinite scroll to prevent extra requests
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
