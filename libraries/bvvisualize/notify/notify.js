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
// The BVVIZ object will need a queue container for this visualization
BVVIZ.queue = BVVIZ.queue || {};
BVVIZ.queue.notify = BVVIZ.queue.notify || [];

// Notification can either be a Reward, Activity, or MissionHistory object.
BVVIZ.notify = function( notification, size, playerId, completeCB ) {
  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

    // Create a target element
    target = $('<div class="bvviz bvviz-notify bvviz-' + size + '" id="bvviz-notify-' + size + '"></div>'),

    // The functions in the "render" object control the DOM structure created for each area
    render = {
      
      // Small notification
      small: function( resource ) {
        var imageSrc = BVVIZ.utility.validateNestedObj( resource, 'image' ) && resource.image ? resource.image : BVVIZ.helper.imageHolderSrc();
        target.addClass( 'bvviz-background' );
        if ( imageSrc.match( /^[\w\s]+$/ ) ) {
          return $( '<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>' +
            '<div class="bvviz-details">' + ( resource.message ? resource.message : resource.name ) + '</div>' )
            .add(
              this.units( resource.units )
            );          
        } else if ( imageSrc.indexOf( 'http' ) > -1 ) {
          return $( '<img class="bvviz-picture" src="' + imageSrc + '" />' +
            '<div class="bvviz-details">' + ( resource.message ? resource.message : resource.name ) + '</div>' )
            .add(
              this.units( resource.units )
            );
        }
        return $( '<div class="bvviz-details">' + ( resource.message ? resource.message : resource.name ) + '</div>' ).add(
          this.units( resource.units )
        );
      },

      // Medium notification
      medium: function( resource ) {
        var card = $( '<div class="bvviz-card bvviz-background">' +
            '<div class="bvviz-details">' +
              '<div class="bvviz-name">' + resource.name + '</div>' +
              '<div class="bvviz-desc">' + resource.message + '</div>' +
            '</div>' +
          '</div>' ).prepend(
            this.units( resource.units )
          );

        // If the playerId was provided and playerProfile function is defined, add a button
        if ( playerId && $.isFunction( BVVIZ.playerProfile ) ) {
          card.prepend(
            $( '<div class="bvviz-view-player-profile bvviz-inverted">View Profile</div>' )
              .bind( 'click', function() {
                BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId ] );
              })
          );
        }

        return card;
      },
      // Container for the medium notification
      mediumContainer: function( resource ) {
        var imageSrc = BVVIZ.utility.validateNestedObj( resource, 'image' ) && resource.image ? resource.image : BVVIZ.helper.imageHolderSrc();
        return $( '<div class="bvviz-container">' +
          '<img class="bvviz-rays" src="' + BVVIZ.helper.imageHolderSrc() + '" />' +
          '<img class="bvviz-picture" src="' + imageSrc + '" />' +
          '<div class="bvviz-body bvviz-col">' +
            '<div class="bvviz-cards bvviz-col"></div>' +
          '</div>' +
        '</div>');
      },

      // Large notification
      large: function( resource ) {
        var imageSrc = BVVIZ.utility.validateNestedObj( resource, 'image' ) && resource.image ? resource.image : BVVIZ.helper.imageHolderSrc();
        var card = $( '<div class="bvviz-container"></div>' ).append(
          // Add a "close" button that triggers largeOut when clicked
          $( '<div class="bvviz-close">x</div>' ).bind( 'click', largeOut ),
          '<img class="bvviz-picture" src="' + imageSrc + '" />' +
          '<div class="bvviz-details">' +
            '<div class="bvviz-name">' + resource.name + '</div>' +
            '<div class="bvviz-desc">' + resource.message + '</div>' +
          '</div>',
          this.units( resource.units )
        );

        // If the playerId was provided and playerProfile function is defined, add a button
        if ( playerId && $.isFunction( BVVIZ.playerProfile ) ) {
          card.append(
            $( '<div class="bvviz-view-player-profile bvviz-inverted">View Profile</div>' )
              .bind( 'click', function() {
                BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId ] );
              })
          );
        }

        return card;
      },

      // Units in the notification
      units: function( units ) {
        var unitsContainer = $( '<div class="bvviz-units"></div>' );

        if ( !units ) {
          return unitsContainer;
        }
        
        // Add each unit type that has been earned and is not 0 into the container
        $.each( units, function( type, unit ) {
          // MissionHistories don't return unit.earned, so if there's a possible value, use that.
          if ( !unit.earned && unit.possible ) {
            unit.earned = unit.possible;
          }
          // If a non-zero value was earned, show it.
          if ( unit.earned && unit.earned !== 0 ) {
            unitsContainer.append(
              '<div class="bvviz-unit">' + ( unit.earned > 0 ? '+' : '' ) + unit.earned + ' ' + unit.display_name + '</div>'
            );
          }
        });

        return unitsContainer;
      }

    },

    // Store a reference to the delay timer used
    timer;

  function init() {
    // Handle error conditions due to invalid inputs by not doing anything:
    // notification must be an object
    if ( typeof( notification ) != 'object' ) {
      return;
    }

    // Start the animation based on the size passed in
    switch ( size ) {
      case 'small':
        smallIn();
        break;
      case 'large':
        largeIn();
        break;
      default: // Assume 'medium'
        mediumIn();
    }
  }

  // General purpose normalization function
  function normalize() {
    return {
      // notifications may come from two resources
      // if from activities, behaviors sub resources should be included
      // if from notifications, data sub resources should be included
      name: notification.name || ( notification.data && notification.data.name ) || ( notification.behaviors && notification.behaviors.length > 0 ? notification.behaviors[0].name : null ),
      message: notification.message || '',
      image: notification.image || ( notification.data && notification.data.image ) || ( notification.behaviors && notification.behaviors.length > 0 ? notification.behaviors[0].image : null ),
      units: notification.units
    };
  }

  // Timer object to allow pausing and resuming of delays
  function Timer( callback, delay ) {
    var remaining = delay,
        timerId,
        start;

    // Pause the timer
    function pause() {
        window.clearTimeout( timerId );
        remaining -= new Date() - start;
    };

    // Resume the timer
    function resume() {
        start = new Date();
        timerId = window.setTimeout( callback, remaining );
    };

    // Start the timer immediately
    resume();

    // Return the timer so that we can trigger methods on it
    return {
      pause: pause,
      resume: resume
    };
  }

  // General purpose delay function
  function delay( then, seconds ) {
    // timer is declared higher up in order to access it later
    timer = new Timer( then, seconds * 1000 );
  }

  // General purpose pause function
  function pause() {
    // Pause the timer if it exists
    if ( timer ) {
      timer.pause();
    }
  }

  // General purpose resume function
  function resume() {
    // Resume the timer if it exists
    if ( timer ) {
      timer.resume();
    }
  }

  // General purpose function to remove the notification and move the queue forward
  function done() {

    // After the element is removed from view, remove it from the DOM
    target.remove();

    // Pause the timer (which acts as a clearTimeout)
    pause();

    // If a callback was defined, trigger it now
    try {
      completeCB( notification, size, playerId );
    } catch(e) {}

    // If there is another element in the queue of the same size, show it
    if ( BVVIZ.queue.notify.length > 0 ) {
      $.each( BVVIZ.queue.notify, function( i, q ) {
        if ( q[ 1 ] === size ) {
          BVVIZ.notify.apply( BVVIZ, BVVIZ.queue.notify.splice( i, 1 )[0] );
          return false;
        }
      });
    }
  }

  // Animation to show small notification
  function smallIn() {
    // Normalize the data
    var normalized = normalize(),

        width;

    // If we don't have a name, nothing to display
    if ( !normalized.name ) {
      return;
    }

    // Normalize the object passed in and render it with the correct rendering function
    target.append(
      render.small( normalized )
    );
    
    // Add the target into the body element of the page
    target.appendTo( 'body' );
    
    // Capture the width of the target
    width = target.width();
    
    // Move the target out of view
    target
      .css({
        right: width * -1
      })
      // Animate the target into view from the left
      .animate({
        right: '+=' + ( width + 20 )
      },
      null,
      // Attach a callback to delay the removal
      function() {
        delay( smallOut, 3 );
      })
      // Clicking the notification should remove it
      .bind( 'click', smallOut )
      // Allow the notification to be paused/resumed when it is hovered over/out
      .bind( 'mouseenter', pause )
      .bind( 'mouseleave', resume );
  }
  // Animation to remove small notification
  function smallOut() {
    // Slide the target out of view to the right
    target.stop().animate({
      right: '-=' + ( target.width() + 20 )
    },
    done );
  }

  // Animation to show medium notification
  function mediumIn () {
    
    // Normalize the data
    var normalized = normalize(),

    // Render the container based on the normalized object
        container = render.mediumContainer( normalized );

    // If we don't have a name, nothing to display
    if ( !normalized.name ) {
      return;
    }

    // Render a medium card and add it to the container
    container.find( '.bvviz-cards' ).append(
      render.medium( normalized )
    );

    // Add the container into the target and add it to the body
    target
      .append( container )
      .appendTo( 'body' )
    // Use the slideToggle animation from JQuery
      .slideToggle( function () {

        // Add a close button after the animation is complete so that it's not clicked on during animation
        container.prepend(
          $( '<div class="bvviz-close">x</div>' )
            .bind( 'click', mediumOut )
        );

        // Delay the closure by 5 seconds
        delay( mediumOut, 5);
      })
      // Allow the notification to be paused/resumed when it is hovered over/out
      .bind( 'mouseenter', pause )
      .bind( 'mouseleave', resume );
  }
  // Animation to remove medium notification
  function mediumOut() {
    
    // Unbind and remove the close button instantly so that there are no double-clicks
    target.find( '.bvviz-close' ).unbind( 'click' ).remove();

    // Slide the container in the target out of view
    target.stop().slideToggle({
      complete: done
    });

  }

  // Animation to show large notification
  function largeIn() {
    // Normalize the data
    var normalized = normalize();

    // If we don't have a name, nothing to display
    if ( !normalized.name ) {
      return;
    }
    
    // Render the notification using the normalized version of the object
    var container = render.large( normalized )
          // Allow the notification to be paused/resumed when it is hovered over/out
          .bind( 'mouseenter', pause )
          .bind( 'mouseleave', resume ),

        // Need to store the height of the target
        height = 0;

    // Add the container into the target and add it to the body
    target
      .append( container )
      .appendTo( 'body' );

    // Capture the height of the target now that it's in the DOM
    height = target.height();

    target
      // Shift the target to be just out of view on the top of the window
      .css({
        top: -height
      })
      // Animate the target into view from the top
      .animate(
        { top: '+=' + ( height + 100 ) },
        null,
        function () {
          // Delay the closure by 5 seconds
          delay( largeOut, 5 );
        });
  }
  // Animation to remove large notification
  function largeOut() {
    
    // Unbind the close button instantly so that there are no double-clicks
    target.find( '.bvviz-close' ).unbind( 'click' );

    // Slide the target out of view to the top
    target.stop().animate(
      { top: '-' + target.height() },
      // When complete, trigger done to remove the element, etc.
      done
    );
  }

  // Ensure size is provided (or assume "medium") and lower-cased
  size = size && size.length > 0 ? size.toLowerCase() : 'medium';

  // Check for existing notification
  if ( $( '#bvviz-notify-' + size ).length > 0 ) {
    
    // If there's an existing notification, add this one to the queue
    //  The queue is populated with a clone of "arguments"
    BVVIZ.queue.notify.push( Array.prototype.slice.call( arguments ) );

  } else {

    // Initialize the visualization automatically upon passing site check
    BVVIZ.waitForSiteCheck( function( sitePass ){
      if ( sitePass ) {
        init();
      } else {
        return false;
      }
    });

    // If notification is an activity object with more than one behavior...
    if ( notification && notification.verb && notification.behaviors && notification.behaviors.length > 1 ) {
      // ...create a notification for each behavior after the first
        $.each( notification.behaviors, function( i, behavior ) {
          // Clone the activity notification
          var clonedNotification = $.extend( {}, notification );

          // Skip the first behavior as that has already been displayed via the "init" call
          if ( i === 0 ) {
            return;
          }

          // Set the "behaviors" array to the current behavior
          clonedNotification.behaviors = [ behavior ];

          // Trigger a new notification for the cloned notification
          BVVIZ.notify( clonedNotification, size, playerId );
        });

      // Remove all but the first behavior from the passed-in notification to avoid duplicates
      notification.behaviors = notification.behaviors.slice( 0, 1 );
    }

  }

  // Expose some of the methods publicly and return the pub object
  switch ( size ) {
    case 'small':
      pub.hide = smallOut;
      break;
    case 'large':
      pub.hide = largeOut;
      break;
    default: // Assume 'medium'
      pub.hide = mediumOut;
  }

  return pub;
};
})(jQuery);
