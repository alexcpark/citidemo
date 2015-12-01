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
// Add trackProgress method to the BVVIZ scope
BVVIZ.trackProgress = function( target, playerId, trackId, options ) {
  
  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    // Header for the track itself
    bodyHeader: function( track ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( track.progress.percent ? track.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + track.hint + '</div>' +
      '</div>' );
    },

    // Individual mission card
    card: function( mission ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-picture-container"></div>').append(
          '<img class="bvviz-picture" src="' + mission.image + '"/>' +
          '<div class="bvviz-bridge"></div>'
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + mission.name + '</div>'),
          $('<div class="bvviz-desc">' + mission.hint + '</div>')
        ),
        '<div class="bvviz-percent">' + ( mission.progress.percent ? mission.progress.percent : 0 ) + '%</div>'
      );
      if ( !mission.progress.percent || mission.progress.percent < 100 ) {
        card.addClass( 'bvviz-grey' );
      }
      // Store the mission id on the card's data so we can use it to open a missionProgress
      card.data( 'bvviz-mission', mission.id );
      return card;
    }
  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // This boolean will track whether the player has progress in the track or not
  hasProgress = false,

  // This boolean will track whether the mission images should be connected by a visual "bridge" or not
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
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.trackProgress.maxPageSize ) {
    delete options.pageSize;
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.trackProgress, options );


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
      .addClass( 'bvviz bvviz-trackProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the track information and player's overall track progress
    BVSDK.all(
      BVSDK( 'tracks', { tracks: trackId }, { fields: 'hint' } ),
      BVSDK( 'players/progresses', { players: playerId }, { query: {
        type: 'all_tracks',
        definition_id: trackId
      }} )
    ).ok( function( trackDefData, playerProgressData ) {

      var cards = $( '.bvviz-cards', target );

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( trackDefData.tracks[0].name ).prependTo( target );
      }

      // Render the header for the track and add it to the body
      // If the player has made progress, add that to the track
      if ( playerProgressData && $.isArray( playerProgressData.progresses ) && playerProgressData.progresses.length > 0 ) {
        trackDefData.tracks[0].progress = playerProgressData.progresses[0];

        hasProgress = playerProgressData.progresses[0].percent > 0;
      }
      
      // Render the body
      render.bodyHeader( trackDefData.tracks[0] ).prependTo( $( '.bvviz-body', target ) );
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
      
      // Random and Unordered tracks don't need the bridge on any elements
      if ( trackDefData.tracks[0].type == 'random' || trackDefData.tracks[0].type == 'unordered' ) {
        useBridge = false;
      }

      // Trigger a load of the first page of data
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

            BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId ] );

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
      var startedMissions = {};

      // Create an object map of the earned missions, using the missions's id as the key
      if ( playerMissionsData ) {
        $.each( playerMissionsData.missions, function( i, mission ) {
          startedMissions[ mission.id ] = mission;
        });
      }

      // Loop through all the missions defined on the track
      $.each( trackMissionsDefData.missions, function( i, mission ) {
        cards.append(
          // Render the card for each mission, using the startedMissions map, and add it to the container
          render.card( startedMissions[ mission.id ] || mission )
            // Add the current row style to the card
            .addClass( currentRowStyle )
        );

        // Change the next row style
        currentRowStyle = currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd';
      });

      // Random and Unordered tracks don't need the bridge on any elements
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

    // Load the provided page of missions in the track
    BVSDK( 'tracks/missions', { tracks: trackId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( trackMissionsDefData ) {

        // load the earned missions for the player regardless if the player has progress or not
        
        // Load the player's earned missions in the track that match the definition_ids in this page
        BVSDK( 'players/missions', { players: playerId }, {
            fields: 'hint',
            
            // Use $.map to extract an array of mission definition ids
            query: { id: $.map( trackMissionsDefData.missions, function( mission ) {
                return mission.id;
              })
            }

          }).ok( function( playerMissionsData ) {
          
            // Draw the rows with player mission data
            drawRows( trackMissionsDefData, playerMissionsData );

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
