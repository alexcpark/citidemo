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
// Add playerCollection method to the BVVIZ scope
BVVIZ.playerCollection = function( target, dataAttr, visualization, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // Store the visualization settings
      settings = $.extend( {}, BVVIZ.options[ visualization ], options ),

  // Store the player API request bundle limit. We have a limit of 30 players in Cairo API
      pageSize = $.isNumeric( settings.pageSize ) &&  settings.pageSize < 30 && settings.pageSize > 0 ? settings.pageSize : 30,

  // Default all modules for player API inclusion, note: units is not part of the inclusion
      modules = [ 'level', 'expertise', 'teams', 'activities' ],

  // Default all inclusion in the same order of modules passing to the player promise
      inclusions = [ 'rewards:currentlevels', 'progresses:all_tracks', 'teams', 'activities' ],

  // Store all the player Ids
      playerIds = [],

  // Hash object to prevent duplicate player Ids being stored
      uniqueIds = {};


  function init() {

    var loading;

    // Allow for target to be provided as a string or JQuery object
    target = $( target );
    attrib = String.prototype.replace.call( dataAttr, /^data\-/, '' ); 

    // Handle error conditions due to invalid inputs:
    // Allow a collection of DOM elements per instance
    if ( target.length == 0 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a collection of DOM nodes.' );
    }
    // "dataAttr" must be a valide DOM attribute embeded in each matched target element
    if ( $( '[' + dataAttr + ']' ).length < 1 ) {
      return BVVIZ.helper.showError( target, '"dataAttr" argument must be a valid DOM attribute.' );
    }

    // Extract a list of unique player ids
    target.map( function() {
      var thisId = $( this ).data( attrib );

      // We have a limit of 30 players in this demo
      if ( playerIds.length >= pageSize ) {
        return false;
      }

      if ( $.type( thisId ) === 'string' && String.prototype.match.call( thisId, /^[A-Fa-f\d]{24}$/ ) && !uniqueIds[ thisId ] ) {
        playerIds.push( thisId );
        // Add this id to the uniqueIds hash to prevent duplicates
        uniqueIds[ thisId ] = true;
      }
    });

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


    // Create a loading display
    loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Show an indicator in the target to indicate that something is happening
    target.first().append( loading );

    // Retrieve the player objects to display; using the configured inclusion object
    BVSDK(
      'players',
      null,
      {
        query: { id: playerIds },
        includes: inclusions
      }
    ).ok( function( data ) {

      if ( $.isFunction( BVVIZ[ visualization ] ) ) {

        // Loop through each player found
        $.each( data.players, function( i, player ) {
          // Find the DOM element(s) for the player and render a visualization inside of each DOM element found
          // Note: Content in the DOM will be replaced 
          // To augment it, add a new DOM element to the target and pass the new element into the individual visualization call
          $( '[' + dataAttr + '=' + player.id + ']' )
            .each( function() {

              // Empty the target and add the base classes and rendered card
              $( this ).empty().addClass( 'bvviz-invisible' );

              // Render the invidual visualization for current player
              BVVIZ[ visualization ] (
                $( this ),
                player,
                settings
              );

            });
        });

        // Remove the loading indicator
        loading.remove();

        // Use the helper to show the individual visualization with an animation
        BVVIZ.helper.showCollection( target );

      } else {
        // Remove the loading indicator
        loading.remove();
      }
    }).fail( function( data ) {

      // Show an error on failure
      BVVIZ.helper.showError( target, data );      
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
 
  return pub;
};
})(jQuery);
