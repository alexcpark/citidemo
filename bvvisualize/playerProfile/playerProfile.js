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
// Add playerProfile method to the BVVIZ scope
BVVIZ.playerProfile = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"></div>' );
    },

    // Header content
    headerContent: function() {
      return $('<img class="bvviz-avatar" src="' + player.image + '" />' +
        '<div class="bvviz-name">' + ( player.display_name || player.name || '' ) + '</div>'
      );
    },

    // Navigation buttons
    nav: function () {
      // The load method to trigger is stored in the data-bvviz-target attribute
      return $(
        '<div class="bvviz-nav" data-bvviz-target="rewards">Rewards</div>' +
        '<div class="bvviz-nav" data-bvviz-target="missions">Missions</div>'+
        '<div class="bvviz-nav bvviz-last" data-bvviz-target="tracks">Tracks</div>'
      );
    }
  },

  // Store the player resource once it's found
  player,

  // Store the playerProfile settings
  settings,

  // Store the unitBar settings for playerProfile
  unitBarSettings,

  // Default all modules for inclusion, note: units is not part of the inclusion
  modules = [ 'level', 'expertise', 'teams', 'activities' ],

  // Default all inclusion in the same order of modules passing to the player promise
  inclusions = [ 'rewards:currentlevels', 'progresses:all_tracks', 'teams', 'activities' ];


  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.playerProfile, options );

  // Override the default settings from unitBar
  unitBarSettings = $.extend( { visualization : 'playerProfile', siteId: settings.siteId }, settings.unitBar );

  // Create a new JSSDK wrapper object instance
  new BVVIZ.SDKkit( settings.siteId );


  function init() {
    var nav,

        navChildrenWidth = 0;

    // Define the navigation elements so that we can bind events to it
    nav = $( '<div class="bvviz-body-header"></div>' ).append(
                render.nav()
              );

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

    // Empty the target, add the base classes, the payerProfile header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerProfile' )
      .append(
        render.header(),
        '<div class="bvviz-units"></div>',
        $( '<div class="bvviz-body"></div>' ).append(
          nav,
          '<div class="bvviz-cards bvviz-row"></div>'
        )
      );

    // Need to know the height of all the children elements for the navigation tab
    nav.children( ':visible' ).each(function( i, child ) {
      navChildrenWidth += $( child ).outerWidth( true );
    });

    // Adjust the width of the body header (nav tabs) and each tab width
    if ( navChildrenWidth < nav.width() ) {
      // Adjust the width of the tabs (pad some to allow for decimals)
      nav.width( navChildrenWidth + nav.outerWidth() - nav.width() + .5 );
    } else {
      nav.children( ':visible' ).each(function( i, child ) {
        $( child ).outerWidth( nav.width() / nav.children().length - .5 );
      });
    }

    // Trigger a show of the default data
    show( 'player' );

    // Bind to the nav object and catch bleed-up events so that we can bind to fewer objects
    nav.bind( 'click', function( event ) {
      var eventTarget = $( event.target ),

      // Determine which nav button was clicked on based on the data attribute
          showTarget = eventTarget.data( 'bvviz-target' );

      // If we have a showTarget, trigger that method
      if ( showTarget ) {
        show( showTarget );
      }

      event.preventDefault();
      return false;
    });
  }

  function show( method ) {
    // Show the navigation container
    var nav = $( '.bvviz-body-header', target ),

    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),

    // Use the passed in method value as a selector to find the target button
        newNav = $( '.bvviz-nav[data-bvviz-target=' + method + ']', nav ),

    // Get a reference to the current "cards" element, which is where the content exists
        currentCards = target.find( '.bvviz-cards:first' ),
    // Create a new cards element, giving it the same height as the current one
        newCards =$( '<div class="bvviz-cards bvviz-row"></div>' ).height( currentCards.height() );

    // Remove the "active" class from all the buttons and then add it to the current one
    newNav.siblings().removeClass( 'bvviz-active' );
    newNav.addClass( 'bvviz-active' );

    switch ( method ) {

      // Load player data and render the header and units (slideshow)
      case 'player':
        
        // Show an indicator in the target to indicate that something is happening
        target.append( loading );
        
        // Load the player data
        BVVIZ.SDKkit.getInstanceBySiteId( settings.siteId ).BVSDK( 'players',
               { players: playerId },
               { includes: inclusions }
        ).ok( function( data ) {
          // Get a reference 
          var header = $( '.bvviz-header', target );

          // Populate the "player" variable at the higher scope
          player = data.players[0];
          
          // Render player header
          header.append(
            render.headerContent()
          );

          // Render player's unitBar
          BVVIZ.helper.unitBar( $( '.bvviz-units', target ), player, unitBarSettings );

          // Remove the loading indicator
          loading.remove();

          // Correct the height of the body
          BVVIZ.helper.fitHeight( target );

          // Show the first nav section by default
          show( $( '.bvviz-nav:first', nav ).data( 'bvviz-target' ) );

        }).fail( function( data ) {
          // Show an error on failure
          BVVIZ.helper.showError( target, data );
        });
        break;
      
      // Load the playerRewards visualization
      case 'rewards':
        // replaceWith will remove all data, events and classes
        currentCards.replaceWith(
          newCards
        );
        BVVIZ.playerRewards( newCards, playerId, { siteId: settings.siteId, inline: true } );
        break;

      // Load the playerMissions visualization
      case 'missions':
        // replaceWith will remove all data, events and classes
        currentCards.replaceWith(
          newCards
        );
        BVVIZ.playerMissions( newCards, playerId, { siteId: settings.siteId, inline: true } );
        break;

      // Load the playerTracks visualization
      case 'tracks':
        // replaceWith will remove all data, events and classes
        currentCards.replaceWith(
          newCards
        );
        BVVIZ.playerTracks( newCards, playerId, { siteId: settings.siteId, inline: true } );
        break;
    };
  }

  // Check site pass before init()
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

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(bvjQuery);
