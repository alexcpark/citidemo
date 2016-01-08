/*!

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.2

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/

;(function($) {
// Add playerRow method to the BVVIZ scope
BVVIZ.playerRow = function( target, playerIdOrObject, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
      playerId = false,
      player = false,

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // playerRow card
    card: function( playerObj, maxIcons ) {
      var card = $( ),
          totalIcons = 0;

      // Pass in options setting of maxIcons, by default show only 3
      // maxIcons = BVVIZ.options.playerRow.maxIcons;

      // Current Levels
      if ( $.isArray( playerObj[ 'rewards:currentlevels' ] ) ) {
        $.each( playerObj[ 'rewards:currentlevels' ], function( i, level ) {
          var clickTarget;
          
          // If we've reach the max number of icons, exit out of the loop
          if ( totalIcons >= maxIcons ) {
            return false;
          }
          // Create the display for this track. Use the last earned reward as a reflection of the player's level in the mission
          clickTarget = $(
            '<div class="bvviz-data bvviz-level">' + 
              '<img src="' + level.image + '" />' +
            '</div>'
          );

          // If BVVIZ.missionProgress has been included...
          if ( $.isFunction( BVVIZ.missionProgress ) ) {
            // ...allow the track icon to be clicked on to open the trackProgress visualization
            clickTarget.click( function( event ) {
              BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerObj.id, level.mission_id, { siteId: settings.siteId } ] );

              event.preventDefault();
              return false;
            });
          }

          // Insert the mission icon into the container
          card = card.add( clickTarget );

          // Increment the total number of icons displayed
          totalIcons++;
        });
      }

      // Level Track Progresses
      if ( $.isArray( playerObj[ 'progresses:all_tracks' ] ) && totalIcons < maxIcons ) {

        // Sort the tracks by percent complete, descending
        playerObj[ 'progresses:all_tracks' ].sort( function( track1, track2 ){
          return track2.percent - track1.percent;
        });

        // Loop through all the track progresses found and display them
        $.each( playerObj[ 'progresses:all_tracks' ], function( i, track ) {
          var clickTarget;

          // If we've reach the max number of icons, exit out of the loop
          if ( totalIcons >= maxIcons ) {
            return false;
          }
          
          // Add this check in case the percent is at 0 (which can happen if tracks are modified)
          //  OR the track is NOT a level type (in which case the display shouldn't be shown in this context)
          if ( track.percent > 0 && track.type === 'level_track' && track.last_earned ) {
            // Create the display for this track. Use the last earned mission as a reflection of the player's level in the track
            clickTarget = $( '<div class="bvviz-data bvviz-track">' + 
                '<img src="' + track.last_earned.image + '" />' +
              '</div>' );

            // If BVVIZ.trackProgress has been included...
            if ( $.isFunction( BVVIZ.trackProgress ) ) {
              // ...allow the track icon to be clicked on to open the trackProgress visualization
              clickTarget.click( function( event ) {
                BVVIZ.helper.showModal( BVVIZ.trackProgress, [ playerObj.id, track.definition_id, { siteId: settings.siteId } ] );

                event.preventDefault();
                return false;
              });
            }

            // Insert the track icon into the container
            card = card.add( clickTarget );
            
            // Increment the total number of icons displayed
            totalIcons++;
          }
        });
      }

      card = card.add( [ '<div class="bvviz-data bvviz-unit">',
                    '<div class="bvviz-value">', playerObj.units.points.all, '</div>',
                    '<div class="bvviz-label">', playerObj.units.points.abbreviation, '</div>',
                  '</div>' ].join('') );

      card = card.add( '<div class="bvviz-clear"></div>' );

      return card;
    }

  },

  // Store the playerRow settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { maxIcons: parseInt( options, 10 ) };
  if ( !$.isNumeric( options.maxIcons ) || options.maxIcons < 0 ) {
    delete options.maxIcons;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.playerRow, options );

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
    // "playerIdOrObject" must be provided as a string or object
    if ( typeof( playerIdOrObject ) !== 'string' ) {
      if ( typeof( playerIdOrObject ) !== 'object' || !playerIdOrObject.id ) {
        return BVVIZ.helper.showError( target, '"playerIdOrObject" argument must be a string or object.' );
      }
    } else if ( playerIdOrObject.length === 0 ) {
      return BVVIZ.helper.showError( target, '"playerIdOrObject" argument must be a string or object.' );
    }

    if ( typeof( playerIdOrObject ) === 'object' ) {
      player = playerIdOrObject;
      playerId = playerIdOrObject.id;
    } else {
      playerId = playerIdOrObject;
    }

    // Empty the target and add the base classes
    target
      .empty()
      .addClass( 'bvviz bvviz-playerRow' )
      .append(
        $( '<div class="bvviz-row"></div>' )
      );

    // If BVVIZ.playerProfile is defined, bind to a click of the target to show it
    if ( $.isFunction( BVVIZ.playerProfile ) ) {
      target.bind( 'click', function() {
        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId, { siteId: settings.siteId } ] );
      });
    }

    if ( !player ) {
      BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players', { players: playerId }, { fields: 'all', includes: 'rewards:currentlevels,progresses:all_tracks' } )
        .ok( function( data ) {
          player = data.players[0];
          target.find( '.bvviz-row' ).append( render.card( player, settings.maxIcons ) );
        });
    } else {
      target.find( '.bvviz-row' ).append( render.card( player, settings.maxIcons ) );
    }
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init( playerIdOrObject );
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display
  if ( typeof( playerIdOrObject ) === 'string' ) {
    pub.playerId = playerIdOrObject;
  } else {
    pub.playerId = playerIdOrObject.id;
  }
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(bvjQuery);
