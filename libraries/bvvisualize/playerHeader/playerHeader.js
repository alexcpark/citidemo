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
// Add playerHeader method to the BVVIZ scope
BVVIZ.playerHeader = function( target, player, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // Store the playerHeader settings
      settings = $.extend( {}, BVVIZ.options.playerHeader, options ),

  // Store the unitBar settings for playerProfile
      unitBarSettings = $.extend( { visualization : 'playerHeader' }, settings.unitBar ),

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // playerHeader card
    card: function( cardPlayerObj ) {
      var card = $( '<div class="bvviz-card">' +
        '<img class="bvviz-picture" src="' + cardPlayerObj.image + '" />' +
        '<div class="bvviz-name">' + cardPlayerObj.display_name + '</div>' +
        '<div class="bvviz-units"></div>' +
      '</div>' );

      // Add the unitBar in a timeout since the card must exist in the DOM for proper rendering
      window.setTimeout( function() {
        BVVIZ.helper.unitBar( $( '.bvviz-units', card ), cardPlayerObj, unitBarSettings );
        card.append( '<div class="bvviz-clear"></div>' );
      }, 1 );

      return card;
    }

  };



  function init( playerObj ) {
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "player" must be provided as an object
    if ( !$.isPlainObject( playerObj ) ) {
      return BVVIZ.helper.showError( target, '"player" argument must be an object.' );
    }

    // Empty the target and add the base classes and rendered card
    target
      .empty()
      .addClass( 'bvviz bvviz-playerHeader' )
      .append(
        $( '<div class="bvviz-body"></div>' ).append(
          render.card( playerObj )
        )
      );

    // If BVVIZ.playerProfile is defined, bind to a click of the target to show it
    if ( $.isFunction( BVVIZ.playerProfile ) ) {
      target.bind( 'click', function() {
        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerObj.id ] );
      });
    }
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init( player );
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display that requires a player object
  pub.playerId = player.id;
  BVVIZ.needsPlayer = true;
  pub.needsPlayer = true;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);
