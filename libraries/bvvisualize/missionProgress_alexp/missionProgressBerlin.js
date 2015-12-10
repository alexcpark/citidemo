/*!

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.5

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/

;(function($) {
// Add missionProgress method to the BVVIZ scope
BVVIZ.missionProgressBerlin = function( target, publicKey, siteURL, timeframe, playerId, missionId, inline ) {
  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    // Header for the mission itself
    bodyHeader: function( mission ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( mission.progress.percent ? mission.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + mission.tip + '</div>' +
      '</div>' );
    },

    // Individual reward card
    card: function( reward, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-picture-container"></div>').append(
          $('<img class="bvviz-picture" src="' + reward.image + '"/>'),
          $('<div class="bvviz-bridge"></div>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + reward.name + '</div>'),
          $('<div class="bvviz-desc">' + ( reward.hint ? reward.hint : '' ) + '</div>')
        )
      );
      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    }
  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // The number of Rewards that will be requested in a single API call
  pageSize = 10,

  // This boolean will track whether the player has progress in the mission or not
  hasProgress = false,

  // This boolean will track whether the reward images should be connected by a visual "bridge" or not
  useBridge = true;

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
    // "missionId" must be provided as a string
    if ( typeof( missionId ) !== 'string' || missionId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"missionId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-missionProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

	var d = new Date();

    // Load the mission information and player's overall mission progress
	$.ajax({
			url: "https://sandbox.badgeville.com/api/widgets/" + publicKey + "/" + siteURL + "/players/" + playerId + "/missions/" + missionId + ".json?time_frame=" + timeframe + "&reset_config=" + d,
	 	    dataType: 'jsonp'
	}).done(function(data) {
      // Store a reference to the container
      var cards = $( '.bvviz-cards', target );

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !inline ) {
        render.header( data.data.name ).prependTo( target );
      }

      // Render the header for the mission and add it to the body
      // If the player has made progress, use that version of the mission
      if ( data.data.progress.earned > 0 ) {
        render.bodyHeader( data.data ).prependTo( $( '.bvviz-body', target ) );

        hasProgress = true;
      } else {
        // Otherwise use the definition
        render.bodyHeader( data.data ).prependTo( $( '.bvviz-body', target ) );
      }
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
      // Random and Unordered missions don't need the bridge on any elements
      if ( data.data.type != 'ladder' ) {
        useBridge = false;
      }

      // Trigger a load of the first page of data
      load( 0 );

      // If BVVIZ.rewardProgress has been included...
      if ( $.isFunction( BVVIZ.rewardProgress ) ) {
        // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
        cards.bind( 'click', function( event ) {
          var eventTarget = $( event.target ),
              card = eventTarget.closest( '.bvviz-card' ),
              rewardId;

          // If we can find a reward card from the click, show the reward details for that card
          if ( card.length > 0 ) {
            // Get the rewardId value from the data on the card
            rewardId = card.data( 'bvviz-reward' );

            BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId ] );

            event.preventDefault();
            return false;
          }
        });
      }

    // Attach a "fail" listener in case the mission id is invalid
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
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Whether there are earned rewards or not, this function will draw the result
    function drawRows( missionRewardsDefData, playerRewardsData) {
      // This object will store which definition_id's have been earned
      var earnedRewards = {};

      // Create an object map of the earned rewards, using the reward's definition_id as the key
      if ( playerRewardsData ) {
        $.each( playerRewardsData.rewards, function( i, earnedReward ) {
          earnedRewards[ earnedReward.definition_id ] = true;
        });
      }

      // Loop through all the rewards defined on the mission
      $.each( missionRewardsDefData.rewards, function( i, reward ) {
        cards.append(
          // Render the card for each reward, using the earnedRewards map, and add it to the container
          render.card( reward, earnedRewards[ reward.id ] )
            // Add the current row style to the card
            .addClass( currentRowStyle )
        );

        // Change the next row style
        currentRowStyle = currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd';
      });

      // Random and Unordered missions don't need the bridge on any elements
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

    // Load the provided page of rewards in the mission
	var d = new Date();
	$.ajax({
			url: "https://sandbox.badgeville.com/api/widgets/" + publicKey + "/" + siteURL + "/players/" + playerId + "/missions/" + missionId + ".json?time_frame=" + timeframe + "&reset_config=" + d,
			dataType: 'jsonp'
	}).done(function(data) {
		var missionRewardsDefData = new Object()
		missionRewardsDefData.rewards = data.data.reward_definitions;
		$.each( missionRewardsDefData.rewards, function( i, reward ) {
			missionRewardsDefData.rewards[i].image = reward.image_url;
			missionRewardsDefData.rewards[i].type = 'Reward';
			missionRewardsDefData.rewards[i].definition_id = missionRewardsDefData.rewards[i].id;			
		});
		
		var playerRewardsData = new Object()
		playerRewardsData.rewards = data.data.rewards;
		$.each( playerRewardsData.rewards, function( i, reward ) {
//			console.log(reward);
//			console.log(i);
			playerRewardsData.rewards[i].image = reward.definition.image_url;
			playerRewardsData.rewards[i].type = 'Reward';
			playerRewardsData.rewards[i].definition_id = i;
		});

        // If the player has progress, load the earned rewards for the player
        if ( data.data.progress.earned > 0  ) {
              // Draw the rows with player reward data
              drawRows( missionRewardsDefData, playerRewardsData );
        } else {

          // Draw the rows without player reward data
          drawRows( missionRewardsDefData );

        }

        // If we've loaded all the missions, unbind the infinite scroll to prevent extra requests
        if ( missionRewardsDefData.rewards.length < pageSize ) {
          cards.unbind( 'scroll.bvviz' );
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
