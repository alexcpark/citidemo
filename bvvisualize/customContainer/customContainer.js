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
// Add customContainer method to the BVVIZ scope
BVVIZ.customContainer = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text" title="' + settings.headerTitle + '">' + settings.headerTitle + '</div></div>' );
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
    }

  },

  // Store the customContainer settings
  settings,

  // Store the content container settngs
  contentSettings;

  // Normalize the options object, verify the options parameter, remove options attribute due to invalid inputs
  options = $.isPlainObject( options ) ? options : {};  
  if ( !options.showContainerFrame ) {
    options.inline = true;
  }
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !options.showDescription || $.type( options.description ) !== 'string' || options.description == '' ) {
    delete options.description;
  }
  if ( $.type( options.descriptionFontColor ) !== 'string' || !options.descriptionFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
    delete options.descriptionFontColor;
  }
  if ( !options.category ) {
    delete options.category;
  } else if ( $.type( options.category ) === 'string' ) {
    options.category = String.prototype.split.call( options.category, ',' );
  } else if ( $.type( options.category ) !== 'array' || options.category.length == 0 ) {
    delete options.category;
  }
  BVVIZ.utility.trimArray( options.category );
  if ( $.type( options.contentsTypes ) === 'string' ) {
    options.contentsTypes = String.prototype.split.call( options.contentsTypes, ',' );
  } else if ( $.type( options.contentsTypes ) !== 'array' ) {
    delete options.contentsTypes;
  }
  BVVIZ.utility.trimArray( options.contentsTypes );
  if ( BVVIZ.utility.validateNestedObj( options, 'contents', 'badges' ) ) {
    if ( $.type( options.contents.badges.badgeBackgroundColor ) !== 'string' || !options.contents.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.contents.badges.badgeBackgroundColor;
    }
    if ( $.type( options.contents.badges.badgeFontColor ) !== 'string' || !options.contents.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.contents.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.customContainer, options );  

  // Set the content container settings based on the same options
  // Force default parameters being used on the sub contents
  contentSettings = $.extend ( {}, options.contents, {
      siteId: settings.siteId,
      inline: true,
      headerTitle: '',
      pageSize: 0,
      childContentCards: true,
      category: settings.category
  } );

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
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the customContainer header, banner and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-customContainer' )
      .append(
        ( settings.inline ? '' : render.header() ),
        render.body()
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Trigger load of all types of data
    load();
  }

  function load() {
    var body = target.find('.bvviz-body'),

        // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        
        // Store the calculated width based on results
        cardWidth,

        // Store the count of requests being sent out
        requestCounter = 0,

        // Store the count of promise's always methods being called
        completeCounter = 0;

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Empty the body cards before reload
    body.find('.bvviz-cards').remove();

    function showResult() {
      // Re-calculate the card width after all cards being appended
      $.each( target.find('.bvviz-cards'), function(i, cards){
        cards = $( cards );
        if ( !cardWidth ) {
          cardWidth = BVVIZ.helper.fitContainerCardWidth( body.find('.bvviz-card:first'), body );
        }
        // Apply the calculated width to each cards
        cards.children().width( cardWidth );

        // Use the helper to show the cards with an animation
        BVVIZ.helper.showCards( cards );
      });

      // Remove the loading display
      loading.remove();
    };

    function beforeRequestCallback() {
      // Increase the counter before sending each request
      requestCounter ++;
    };

    function callback() {
      // Increase the counter each this method is called
      completeCounter ++;

      // This visualization component needs to render in a timeout in order to ensure all sub contents have finished loading
      window.setTimeout( function(){
        if ( completeCounter == requestCounter ) {
          showResult();
        }
      }, 10 );
    };

    // Adding content types
    $.each( settings.contentsTypes, function( i, content ){
      var contentsOptions,
          emptyElement,
          callbackObj;

      callbackObj = {
        beforeRequestCallback: beforeRequestCallback,
        callback: callback
      }


      switch ( content ) {
        case 'rewards':
          // extend options by adding callback
          contentsOptions = $.extend( true, {}, BVVIZ.options.playerRewards, contentSettings, callbackObj );
          emptyElement = $( '<div></div>' ).appendTo ( body );
          BVVIZ.playerRewards(
                emptyElement,
                playerId,
                contentsOptions
              );
          break;
        case 'missions':
          contentsOptions = $.extend( true, {}, BVVIZ.options.playerMissions, contentSettings, callbackObj );
          emptyElement = $( '<div></div>' ).appendTo ( body );
          BVVIZ.playerMissions(
                emptyElement,
                playerId,
                contentsOptions
              );
          break;
        case 'tracks':
          contentsOptions = $.extend( true, {}, BVVIZ.options.playerTracks, contentSettings, callbackObj );
          emptyElement = $( '<div></div>' ).appendTo ( body );
          BVVIZ.playerTracks(
                emptyElement,
                playerId,
                contentsOptions
              );
          break;
      }
    });

    // Stop loading after timeout, this could happen when there is no data matchs the specified category
    window.setTimeout ( function(){
      // Remove the loading display
      loading.remove();
    }, 3000 );
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
