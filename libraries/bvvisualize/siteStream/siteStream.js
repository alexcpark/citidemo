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
// Add siteStream method to the BVVIZ scope
BVVIZ.siteStream = function( target, streamId, inline ) {
  
  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
  
  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    activitiesCard: function( notification ) {
      // Both activities and contents stream events generate notification with the same type of 'activity'  
      var timestamp = BVVIZ.utility.validateNestedObj( notification, 'data', 'content', 'created_at' ) ? 
                      notification.data.content.created_at : 
                      BVVIZ.utility.validateNestedObj( notification, 'data', 'created_at' ) ? notification.data.created_at : new Date();
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        imageSrc.match( /^[\w\s]*$/ ) ? 
          $( '<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>' ) : 
          $( '<img class="bvviz-picture" src="' + imageSrc + '" />' ),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( timestamp )
        )
      );
    },

    rewardsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    },

    missionsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // These variables will hold a reference to the container where the notification cards will exist and it's height
  cards,
  cardsHeight,

  // Stores whether or not the feed has been initialized with notifications and a timeout for reinitialization
  initial = true,
  reinitializeTO,

  // These variables will store a queue of notifications waiting to be displayed
  queue = [],
  queueRunning = false,
  queueInterval;

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

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-siteStream' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Set the "cards" variable to the proper container
    cards = $( '.bvviz-cards', target );

    // Request the stream definition
    BVSDK( 'streams', { streams: streamId } ).ok( function( streamData ) {

      // Remove the loading display
      loading.remove();

      // Show an error if the stream definition was not found
      if ( streamData.streams.length !== 1 ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" can not be found.' );
      }

      // Show an error if the stream definition is not the correct type
      if ( streamData.streams[0].consumer !== 'site' ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" is not a "site" stream.' );
      }

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( inline ) {
        $( '.bvviz-body', target ).addClass( 'bvviz-noheader' );
      } else {
        render.header( streamData.streams[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Seed the initial display and subscribe to future notifications for this stream
      BVSDK( 'streams/notifications', { streams: streamId }, {
        fields: 'all'
      }).ok( showNotifications ).subscribe( showNotifications );

    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
   
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  function showNotifications( data ) {

    var childrenHeight = 0;

    // Cancel the reinitialization timeout
    window.clearTimeout( reinitializeTO );

    // Add the new notifications into the queue
    queue.push.apply( queue, data.notifications );

    // Sort the queue to put the most recent item on top
    queue.sort( function( a, b ) {
      return new Date( a.created_at ) - new Date( b.created_at );
    });

    if ( initial ) {
      // Display enough notification cards to fill the container
      cardsHeight = target.find( '.bvviz-body' ).height();
      while ( queue.length > 0 && childrenHeight <= cardsHeight ) {
        childrenHeight += drawCard( queue.shift(), true ).outerHeight();
      }
      initial = false;
    }

    startQueue();
  }

  function startQueue() {
    // Don't need to start the queue if it's already running
    if ( queueRunning ) {
      return false;
    }
    queueRunning = true;

    // Use setInterval to pull an element out of the queue
    queueInterval = window.setInterval( function() {

      // If there is nothing in the queue, clear the interval and reset the state of the queue
      if ( queue.length === 0 ) {
        window.clearInterval( queueInterval );
        queueRunning = false;

        // Set the reinitilization timeout in case new data is not found
        reinitializeTO = window.setTimeout( function() {
          
          // If we've waited the full reinitialize time, re-display the most recent data
          BVSDK( 'streams/notifications', { streams: streamId }, {
            fields: 'all'
          }).ok( showNotifications );

        }, 60000 );

        // Exit out of the interval since there is nothing to do
        return false;
      }

      // Draw the most recent item
      drawCard( queue.shift() );
    }, 2500 );
  }

  function drawCard( notification, initial ) {
    var card;

    // Render the card based on it's type
    if ( render[ notification.type + 'Card' ] ) {
      card = render[ notification.type + 'Card' ]( notification );

      // Switch the current row style
      currentRowStyle = ( currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd' );

    // If a renderer can't be found, don't show the notification
    } else {
      return;
    }

    // If this is not the inital rendering, hide the card so that it can be animated into view
    if ( !initial ) {
      card.hide();
    }

    // Add the card into the stream
    card.prependTo( cards );

    // Animate the card into view
    if ( !initial ) {
      card.slideDown( 1000, function() {
        var childrenHeight = 0;
        // Remove any DOM elements that are out of view
        cards.children().each( function() {
          if ( childrenHeight > cardsHeight ) {
            $( this ).remove();
          } else {
            childrenHeight += $( this ).outerHeight();
          }
        });
      });
    }

    return card;
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
