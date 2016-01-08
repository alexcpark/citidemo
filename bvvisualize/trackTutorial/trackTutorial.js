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
// Add trackTutorial method to the BVVIZ scope
BVVIZ.trackTutorial = function( target, playerId, trackId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      var title = settings.headerTitle ? settings.headerTitle : name ;
      return $( '<div class="bvviz-header"><div class="bvviz-header-text" title="' + title + '">' + title + '</div></div>' );
    },

    // Header for the track itself
    bodyHeader: function( track ) {
      var percent = track.progress.percent ? track.progress.percent : 0 ,
          container = $( '<div class="bvviz-body-header"></div>' ),
          summaryProgress;

      container.append(
        $( '<div class="bvviz-info">' + ( percent == 100 ? ( track.message ? track.message : '' ) : track.hint ) + '</div>').append(
          '<div class="bvviz-countdown">Days Left: n/a</div>'
        )
      );

      summaryProgress = BVVIZ.helper.showRadialProgress( percent ).prependTo( container );

      BVVIZ.helper.animateRadialProgress( summaryProgress );

      return container;
    },

    // Individual mission card
    card: function( mission, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible ' + ( earned ? 'bvviz-complete' : 'bvviz-not-started' ) + '"></div>');

      card.append(
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + mission.name + '</div>'),
          $('<div class="bvviz-desc">' + ( settings.list.showItemProgress ? this.progress( mission.progress ) : ( mission.hint ? mission.hint : '' ) ) + '</div>')
        ),
        render.checkmark()
      );

      // If badge icons should display, add class name to reserve space for the icons
      if ( settings.list.showBadgeIcon ) {
        card.addClass('bvviz-list-icon')
            .prepend( $('<div class="bvviz-picture-container"></div>').append(
              $('<img class="bvviz-picture" src="' + mission.image + '"/>')
            )
        );
      }

      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the mission object for later use
      card.data( 'bvviz-mission', mission.id );
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

    // Known progress text
    progress: function( progress ) {
      if ( typeof( progress.percent ) == 'undefined' || progress.percent === null || progress.percent == 0 ) {
        return 'Not Started' ;
      } else if ( progress.percent < 100 ) {
        return 'In Progress (' + progress.earned + '/' + progress.possible + ')' ;
      } else {
        return 'Completed (' + progress.earned + '/' + progress.possible + ')' ;
      }
    }    
  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // Store the type of track for later use
  // If this is unordered track, display the track summary and the mission items
  // If this is ordered track or level track, display the current mission in progress within the track
  trackType = null,

  // Store current mission object in progress
  currentMission = null,

  // Store the last earned mission index for calculating the current mission in Level and Ordered track
  lastEarnedIndex = -1,

  // Store the entire set of track missions definition, this is required because of possible multiple page loading
  trackMissionsMap = [],

  // Store the player's track progress object
  playerTrackProgress = {},

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

  // Override the default settings from options parameter, track tutorial and mission tutorial share the same default settings
  settings = $.extend( true, {}, BVVIZ.options.missionTutorial, options );

  // Create a new JSSDK wrapper object instance
  new BVVIZ.SDKkit( settings.siteId );


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
    // "trackId" must be provided as a string
    if ( typeof( trackId ) !== 'string' || trackId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"trackId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-trackTutorial' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the track information and player's overall track progress
    BVSDK.all(
      BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks', { tracks: trackId }, { fields: 'hint' } ),
      BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: {
        type: 'all_tracks',
        definition_id: trackId
      }} )
    ).ok( function( trackDefData, playerProgressData ) {

      var body = $( '.bvviz-body', target ),

          cards = $( '.bvviz-cards', target ),

          // Store the return value from the callback function
          callbackSwitch;


      // Store the track type for routing to different display
      trackType = trackDefData.tracks[0].type;

      // Store the player track progress object
      playerTrackProgress = BVVIZ.utility.validateNestedObj( playerProgressData, 'progresses', [0] ) ? playerProgressData.progresses[0] : {};

      // Level tracks can not be completed, though they are allowed to have alternate visualization upon "completion"

      // If player has completed a non-level track, it's possible to switch to alternate visualization on the settings
      if ( playerTrackProgress.percent == 100 && typeof settings.progressCompleteCallback === 'function' && settings.alternateVisual ) {

        // Convert to alternate visualization if this track is completed
        callbackSwitch = settings.progressCompleteCallback( pub, settings.alternateVisual );

        // If the callback continue flag returns true, stop current visualization and switch to new visualization
        if ( callbackSwitch ) {
          return false;
        }
      }

      // If current track is Unordered type, display the track summary and mission items
      if ( trackType === 'unordered' ) {

        // If this isn't an inline display, render the main header and add it to the top of the target
        if ( settings.inline ) {
          body.addClass( 'bvviz-noheader');
        } else {
          render.header( trackDefData.tracks[0].name ).prependTo( target );
        }

        // Render the summary for the track and add it to the body
        if ( playerTrackProgress ) {
          // If the player has made progress, add that to the track
          trackDefData.tracks[0].progress = playerTrackProgress;
        }

        // Render the body
        render.bodyHeader( trackDefData.tracks[0] ).prependTo( body );
    
        // Remove the loading display (load() will add one for itself)
        loading.remove();

        // Correct the height of the body
        BVVIZ.helper.fitHeight( target );

        // Set up infinte scrolling on the new container
        BVVIZ.helper.infiniteScroll( cards, pub );
      }

      // No matter what track type it is, we need trigger the load function
      // If it is Unordered type, it triggers a load of the first page of data
      // If it is Level or Ordered type, it triggers loading tracks/missions data and display mission tutorial
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

    // Attach a "fail" listener in case the track id is invalid
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

    // Whether there are earned missions or not, this function will draw the result
    function drawRows( trackMissionsDefData, playerMissionsData ) {
      // This object will store which id's have been started
      var startedMissions = {},

      // This object will store which id's have been earned
          earnedMissions = {}; 

      // Create an object map of the earned missions, using the missions's id as the key
      if ( playerMissionsData ) {
        $.each( playerMissionsData.missions, function( i, mission ) {
          startedMissions[ mission.id ] = mission;
          if ( mission.progress && mission.progress.percent == 100 ) {
            earnedMissions[ mission.id ] = true;
          }
        });
      }

      // Loop through all the missions defined on the track
      $.each( trackMissionsDefData.missions, function( i, mission ) {

        // This track should only be Unordered type. If it's an earned mission...
        if ( earnedMissions[ mission.id ] ) {

          // Determine the current RowStyle
          currentRowStyle = cards.children().filter(":last").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';

          // Render the card for each mission, using the startedMissions map, and add it to the container
          render.card( startedMissions[ mission.id ] || mission, earnedMissions[ mission.id ] ).appendTo( cards )
            // Add the current row style to the card
            .addClass( currentRowStyle );
        } else {

          // Determine the current RowStyle
          currentRowStyle = cards.children().filter(":first").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';

          // Render the card for each mission, using the startedMissions map, and add it to the container
          render.card( startedMissions[ mission.id ] || mission, earnedMissions[ mission.id ] ).prependTo( cards )
            // Add the current row style to the card
            .addClass( currentRowStyle );
        }
      });

      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Check if a loading indicator has not been included in the target. It remains loading with Ordered and Level track
    if ( $(loading, target).length < 0 ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of missions in the track
    BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks/missions', { tracks: trackId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( trackMissionsDefData ) {

        // Save the track missions definition to map
        trackMissionsMap = trackMissionsMap.concat( trackMissionsDefData.missions );

        // If the last earned mission exists
        if ( playerTrackProgress && playerTrackProgress.last_earned ) {
          // Loop through the track missions data, locate the last earned mission index
          $.each( trackMissionsDefData.missions, function( i, mission ){
            if ( playerTrackProgress.last_earned.definition_id === mission.id ) {
              lastEarnedIndex = page * pageSize + i;
              return false;
            }
          })
        }

        // Load the player's missions in the track that match the ids in this page
        BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions', { players: playerId }, {
            fields: 'hint',
            
            // Use $.map to extract an array of mission ids
            query: { id: $.map( trackMissionsDefData.missions, function( mission ) {
                return mission.id;
              })
            }

          }).ok( function( playerMissionsData ) {

            // If the track is Unordered type...
            if ( trackType === 'unordered' ) {

              // Draw the rows with player mission data
              drawRows( trackMissionsDefData, playerMissionsData );

            // else the track should be Ordered or Level type...
            } else {

              // If all the track missions are processed...
              if ( trackMissionsDefData.missions.length < pageSize ) {

                // The player has completed all the mission in the track
                if ( playerTrackProgress.percent == 100 ) { 
                  // Assigning the last mission from track definition
                  currentMission = trackMissionsMap.slice( -1 )[0] || {};

                // The last earned mission is found in the track
                } else if ( lastEarnedIndex >= 0 ) {
                  // The current mission should be the one after the last earned mission
                  currentMission = trackMissionsMap[ lastEarnedIndex + 1 ] || trackMissionsMap.slice( -1 )[0] || {} ;                

                // The player has not started any mission in the track...
                } else {
                  // Assigning the first mission from track definition
                  currentMission = trackMissionsMap[0] || {};                
                }

                if ( typeof currentMission.id === typeof '' ) {
                  // Render current mission tutorial
                  pub = BVVIZ.missionTutorial.call( this, target, playerId, currentMission.id, settings );
                  return false;
                } else {
                  // No mission is defined in the track, remove the target from DOM
                  target.remove();
                }
              }
            }

          });

      if ( trackMissionsDefData.missions.length < pageSize ) {
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

  // Expose the named arguments passed to current visualization
  function namedParam( argName ) {
    var args = {
      target: target, 
      playerId: playerId,
      trackId: trackId,
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
})(jQuery);
