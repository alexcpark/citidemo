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
// Add playerNotificationBox method to the BVVIZ scope
BVVIZ.playerNotificationBox = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
  
  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text" title="' + name + '">' + name + '</div></div>' );
    },

    activitiesCard: function( notification ) {
      // Both activities and contents stream events generate notification with the same type of 'activity'  
      var timestamp = BVVIZ.utility.validateNestedObj( notification, 'data', 'content', 'created_at' ) ? 
                      notification.data.content.created_at : 
                      BVVIZ.utility.validateNestedObj( notification, 'data', 'created_at' ) ? notification.data.created_at : new Date();
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card bvviz-odd' + ((notification.read_at!=null) ? ' ' + cardread:'') + '" id=' + notification.id + '></div>' ).append(
        imageSrc.match( /^[\w\s]*$/ ) ? 
          $('<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>') : 
          $( '<img class="bvviz-picture" src="' + imageSrc + '" />' ),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( timestamp )
        )
      );
    },

    rewardsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card bvviz-odd' + ((notification.read_at!=null) ? ' ' + cardread:'') + '" id=' + notification.id + '></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    },

    missionsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card bvviz-odd' + ((notification.read_at!=null) ? ' ' + cardread:'') + '" id=' + notification.id + '></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    }
  },
  
  // card read or not
  cardread = 'bvviz-read',

  // These variables will hold a reference to the container where the notification cards will exist and it's height
  cards,
  cardsHeight,

  // Stores whether or not the feed has been initialized with notifications and a timeout for reinitialization
  reinitializeTO,
  
  // fromid, next / prev buttons
  pagenumber = 0,
  fromid = '',
  previds = [],
  nextids = [],

  // These variables will store a queue of notifications waiting to be displayed
  queue = [],

  // Store the list settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
  	options.inline = true;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.siteStream, options );

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

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerNotificationBox' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Set the "cards" variable to the proper container
    cards = $( '.bvviz-cards', target );

	// If this isn't an inline display, render the main header and add it to the top of the target
	if ( settings.inline ) {
		$( '.bvviz-body', target ).addClass( 'bvviz-noheader' );
	} else {
		render.header( options.name ).prependTo( target );
	}
	
	// Correct the height of the body
	BVVIZ.helper.fitHeight( target );

	// Seed the initial display for this visual
	if(pagenumber==0){
		BVSDK( 'players/notifications', { players: playerId }, {
			limit: options.perpage,
			fields: 'all'
		}).ok(showNotifications);
	}
	
	cards.bind( 'click', function( event ) {
		var eventTarget = $( event.target );
		
		if(eventTarget[0].className == 'bvviz-next'){
			nextids[pagenumber] = $('.bvviz-card.bvviz-odd').last()[0].id;
			fromid = nextids[pagenumber];
			$( ".bvviz-cards.bvviz-col" ).empty();
			pagenumber++;

//		console.log(pagenumber);
//		console.log(fromid);
			
			BVSDK( 'players/notifications', { players: playerId }, {
				limit: options.perpage,
				from_id: fromid,			
				fields: 'all'
			}).ok(showNotifications);
		} else if(eventTarget[0].className == 'bvviz-previous'){
			fromid = previds[pagenumber-1];
			$( ".bvviz-cards.bvviz-col" ).empty();
			pagenumber--;

//		console.log(pagenumber);
//		console.log(fromid);
			
			BVSDK( 'players/notifications', { players: playerId }, {
				limit: options.perpage,
				from_id: fromid,			
				fields: 'all'
			}).ok(showNotifications);
		}
		

	});
	
    // remove loading
	loading.remove();
  }

  function showNotifications(data) {

    var childrenHeight = 0;

	previds[pagenumber] = data.notifications[0].id;

	// Display enough notification cards to fill the container
	cardsHeight = target.find( '.bvviz-body' ).height();
	
	// loop through all items in reverse.
	var i = data.notifications.length-1;
	while ( i>=0 && childrenHeight <= cardsHeight ) {
		childrenHeight += drawCard( data.notifications[i], true ).outerHeight();
		
		// mark read all items shown on feed if unread
		if(data.notifications[i].read_at == null){
			BVSDK( 'players/notifications', { players: playerId, notifications: data.notifications[i].id } ).action( 'mark_read' );
		}
		
		i--;
	}

	

	
    // next and previous buttons
	if(pagenumber>0){
		$('.bvviz-cards').append('<button class="bvviz-previous">previous ' + options.perpage + '</button>');
	}
	if(data.notifications.length == options.perpage){
		$('.bvviz-cards').append('<button class="bvviz-next">next ' + options.perpage + '</button>');
	}
  }


  function drawCard( notification ) {
    var card;

    // Render the card based on it's type
    if ( render[ notification.type + 'Card' ] ) {
      card = render[ notification.type + 'Card' ]( notification );

      // Execute callback handler if it's defined
      if ( typeof settings.itemCompleteCallback === 'function' ) {
        settings.itemCompleteCallback( card );
      }

    // If a renderer can't be found, don't show the notification
    } else {
      return;
    }

    // Add the card into the list
    card.prependTo( cards );

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
})(bvjQuery);
