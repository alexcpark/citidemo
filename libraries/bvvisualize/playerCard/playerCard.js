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
// Add playerCard method to the BVVIZ scope
BVVIZ.playerCard = function( target, player, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function() {
      return $( '<div class="bvviz-header-band"></div>' );
    },

    // Individual player identity info
    headerContent: function( player ) {
      return $( '<div>' )
            .append( 
              $( '<img class="bvviz-avatar" src="' + player.image + '" />' ),
              $( '<div class="bvviz-name">' + player.display_name + '</div>' )
            );  
    },

    // More individual player identity info
    subHeaderContent: function( player ) {
      var list = [],
          content = $( '<div class="bvviz-desc">' );

      // If the player holds one or more levels, show the current levels
      if ( $.isArray( player[ 'rewards:currentlevels' ] ) && player[ 'rewards:currentlevels' ].length > 0 ) {
        // Build a comma-separated list of level names
        list = Array.prototype.concat( 
          list, 
          $.map( player[ 'rewards:currentlevels' ], function( level ) {
            return level.name;
          })
        );
      }

      // If the player is on one or more teams, show the team names
      if ( $.isArray( player.teams ) && player.teams.length > 0 ) {
        // Build a comma-separated list of team names
        list = Array.prototype.concat( 
          list, 
          $.map( player.teams, function( team ) {
            return team.display_name;
          })
        );
      }      

      if ( list.length > 0 ) {
        // Render the list as a comma-separated list
        content.append( list.join( ' &#8226; ' ) );
      }

      return content;  
    }

  },

  // Store the playerProfile settings
  settings = $.extend( {}, BVVIZ.options.playerCard, options ),

  // Store the unitBar settings for playerCard
  unitBarSettings = $.extend( { visualization : 'playerCard' }, settings.unitBar ),

  // Default all modules for inclusion, note: units is not part of the inclusion
  modules = [ 'level', 'expertise', 'teams', 'activities' ],

  // Default all inclusion in the same order of modules passing to the player promise
  inclusions = [ 'rewards:currentlevels', 'progresses:all_tracks', 'teams', 'activities' ];


  function init() {

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "player" must be provided as an object or a string representing the player Id
    if ( !( $.isPlainObject( player ) || typeof( player ) === 'string' ) || player.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"player" argument must be an object or a string.' );
    }

    // Prepare the modules being included in the player API request from the settings object
    if ( BVVIZ.utility.validateNestedObj( settings, 'unitBar', 'modules' ) ) {
      $.each( modules, function( index, value ){
        // Replace the item from includes option with '' if it doesn't exist in the options
        if ( $.inArray( value, settings.unitBar.modules ) < 0 ) {
          Array.prototype.splice.call( inclusions, index, 1, '' );
        }
      });

      // Clean the includes option by removing the empty elements ('', null, undefined and 0)
      inclusions = Array.prototype.filter.call( inclusions, 
        function( el ) {
          return el;
        });
    }

    // Empty the target and add the base classes and rendered card
    target
      .empty()
      .addClass( 'bvviz bvviz-playerCard' )
      .append(
        render.header(),
        $( '<div class="bvviz-body"></div>' ).append(
          $( '<div class="bvviz-header-subband"></div>' ),
          $( '<div class="bvviz-card"></div>' ).append(
            $( '<div class="bvviz-units"></div>' )
          )
        )
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Trigger a show of the default data
    show();
  }


  function show() {
    // Get the reference of the sub header
    var subHeader = $( '.bvviz-body-header', target ),

    // Create a loading display
    loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    var showPlayer = function( playerObj ){

      // Get a reference 
      var header = $( '.bvviz-header-band', target ),

          subHeader = $( '.bvviz-header-subband', target );
      
      // Render player header
      header.append(
        render.headerContent( playerObj )
      );

      // Render player sub header
      subHeader.append(
        render.subHeaderContent( playerObj )
      );

      // Render player's unitBar
      BVVIZ.helper.unitBar( $( '.bvviz-units', target ), playerObj, unitBarSettings );

      // If the playerProfile function is defined, add event handler
      if ( $.isFunction( BVVIZ.playerProfile ) ) {
        header.add( subHeader ).bind( 'click', function() {
          BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerObj.id ] );
        });
      }

      // Remove the loading indicator
      loading.remove();
    };

    if ( $.isPlainObject( player ) ) {
      // "player" is an object. Show the player object directly.
      showPlayer( player );
    } else {
      // "player" is a string. Retrieve the player object to display; include modules.
      BVSDK(
        'players',
        { players: player },
        { includes: inclusions }
      ).ok( function( data ) {

        // Populate the "player" variable at the higher scope
        //var player = data.players[0];
        // Show the player at the higher scope
        showPlayer( data.players[0] );

      }).fail( function( data ) {
        // Show an error on failure
        BVVIZ.helper.showError( target, data );
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
  pub.show = show;

  // Mark this as an update-able display that requires a player object
  pub.playerId = $.isPlainObject( player ) ? player.id : player;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );

  return pub;
};
})(jQuery);
