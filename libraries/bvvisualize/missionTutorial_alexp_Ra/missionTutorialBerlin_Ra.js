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
// Add missionTutorial method to the BVVIZ scope
BVVIZ.missionTutorialBerlin_Ra = function( target, publicKey, siteURL, timeframe, playerId, missionId, inline ) {
  
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
      return $( '<div class="bvviz-body-header"></div>' ).append(
        $('<div></div>').progressbar({
          value: mission.progress.percent
        }).prepend(
          $( '<div class="bvviz-percent">' + ( mission.progress.percent ? mission.progress.percent : 0 ) + '%</div>' )
        )
      );
    },

    // Individual reward card
    card: function( reward, earned ) {
      var card =  $( '<div class="bvviz-card bvviz-invisible ' + ( earned ? 'bvviz-complete' : 'bvviz-not-started' ) + '"' +
        // Add a data attribute to track the reward Id
        ' data-bvviz-reward_id="' + reward.id + '"></div>' ).append(
        this.checkmark(),
        $( '<div class="bvviz-details"></div>' ).append(
        '<div class="bvviz-image"><img src="' + reward.image + '" /></div><div class="bvviz-name">' + reward.name + '</div>',
          $( '<div class="bvviz-desc"></div>' ).append(
            this.unknownProgress( reward, earned )
          )
        )
      );

      // If the reward.hint has been requested and there is a hint value, add the drawer
      if ( reward.hint && reward.hint.length > 0 ) {
        card.append(
          this.knobs(),
          '<div class="bvviz-drawer">' + 
            '<div>' + reward.hint + '</div>' +
          '</div>'
        );
      }

      return card;
    },

    // Checkmark
    checkmark: function() {
      if ( BVVIZ.utility.isIe8OrLess() ) {
        return $( '<div class="bvviz-checkmark">' +
          '<div class="bvviz-checkmark-underlay"></div>' +
          '<div class="bvviz-checkmark-overlay bvviz-mid"></div>' +
          '<div class="bvviz-checkmark-overlay bvviz-left"></div>' +
          '<div class="bvviz-checkmark-overlay bvviz-right"></div>' +
        '</div>' );
      } else {
        return $( '<div class="bvviz-checkmark-circle">' + BVVIZ.helper.svgCheckmarkCircle() + '</div>' );
      }
    },

    // Drawer knobs
    knobs: function() {
      return $( '<div class="bvviz-knobs">' +
        '<div class="bvviz-knob"></div>' +
        '<div class="bvviz-knob"></div>' +
        '<div class="bvviz-knob"></div>' +
      '</div>' );
    },

    // Unknown progress
    unknownProgress: function( reward, earned ) {
      if ( earned ) {
        
        // If the reward is earned and progress_possible is defined, we assume the player has done all of the possible steps
        if ( reward.progress_possible ) {
          return 'Completed (' + reward.progress_possible + '/' + reward.progress_possible + ')';
        }
        
        // If the reward is earned but we don't know progress, just show completed text
        return 'Completed';
      }

      // If the reward is unearned but progress is possible to know, show "Not Started" for now
      //  (The progress will be updated asynchronously if the player has actually started the reward)
      if ( reward.progress_possible ) {
        return 'Not Started (0/' + reward.progress_possible + ')';
      }

      // Otherwise we make no assumptions about the progress nor possibility or progress
      return '&nbsp;';
    },

    // Known progress text
    progress: function( card, progress ) {
      var desc = card.find( '.bvviz-desc' );
      if ( progress.percent == 0 ) {
        desc.html( 'Not Started' );
      } else if ( progress.percent < 100 ) {
        desc.html( 'In Progress (' + progress.earned + '/' + progress.possible + ')' );

        // Remove the "not-started" class and add a "started" one to the card
        card.removeClass( 'bvviz-not-started' ).addClass( 'bvviz-started' );
      } else {
        desc.html( 'Completed (' + progress.earned + '/' + progress.possible + ')' );
      }
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // The number of Rewards that will be requested in a single API call
  pageSize = 10,

  // This boolean will track whether the player has progress in the mission or not
  hasProgress = false;

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
      .addClass( 'bvviz bvviz-missionTutorial' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Bind the click to the top-level target for greater flexibility
    target.bind( 'click', function( event ) {
      // Get the element clicked on via the JQuery event
      var eventTarget = $( event.target ),
          
          // Find the closest player card to the object clicked on
          card = eventTarget.closest( '.bvviz-card' );

      // If a card can't be found, exit out of this bind. Don't cancel the event
      if ( !card.length ) {
        return;
      }

      // Cancel any animation in progress and toggle the drawer, if it exists
      $( '.bvviz-drawer', card ).stop().slideToggle();

    });

// 	    url: "https://api.v2.badgeville.com/api/widgets/670674115ba55d2418aa7ff776fc09e5/apark.badgeville.com/players/50c7730149f83855480044d4/tracks/558870e16d11eff03e000c7a.json",
	// load tracks information
	var d = new Date();
//	d.setMinutes (d.getMinutes() + 30);
//	d.setMinutes (0);

	$.ajax({
			url: "https://api.v2.badgeville.com/api/widgets/" + publicKey + "/" + siteURL + "/players/" + playerId + "/missions/" + missionId + ".json?time_frame=" + timeframe + "&reset_config=" + d,
	 	    dataType: 'jsonp'
	}).done(function(data) {

      if ( !inline ) {
        render.header(data.data.name).prependTo( target );
      }

      // Render the header for the mission and add it to the body
      // If the player has made progress, use that version of the mission
      if ( data.data.progress.earned > 0) {
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
      BVVIZ.helper.infiniteScroll( $( '.bvviz-cards', target ), pub );

      // Trigger a load of the first page of data
      load( 0 );

    // Attach a "fail" listener in case the mission id is invalid
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
      var earnedRewards = {},

      // This array will store the unearned definition_id's involved in the mission
      unearnedRewardIds = [],

      // This object will store the possible progress for each definition
      missionRewardsPossible = {};

      // Create an object map of the earned rewards, using the reward's definition_id as the key
      if ( playerRewardsData ) {
        $.each( playerRewardsData.rewards, function( i, earnedReward ) {
          earnedRewards[ earnedReward.definition_id ] = true;
        });
      }

      // Loop through all the rewards defined on the mission
      $.each( missionRewardsDefData.rewards, function( i, reward ) {
        //Add the reward Id into the array if it's not been earned
        if ( !earnedRewards[ reward.id ] ) {
          unearnedRewardIds.push( reward.id );
        }
        
        cards.append(
          // Render the card for each reward, using the earnedRewards map, and add it to the container
          render.card( reward, earnedRewards[ reward.id ] )
            // Add the current row style to the card
            .addClass( currentRowStyle )
        );

        // Change the next row style
        currentRowStyle = currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd';
      });

      // If there are unearned rewards...
      if ( unearnedRewardIds.length > 0 ) {
        // ...request the Progresses object(s) in an async call
        BVSDK( 'players/progresses', { players: playerId }, { query: { type: 'all_rewards', definition_id: unearnedRewardIds } } )
          .ok( function( data ) {
            // Loop through the Progresses and add the new data into the relevant card
            $.each( data.progresses, function( i, progress ) {

              // Use the data-bvviz-reward_id attribute as the selector
              render.progress( cards.find( '[data-bvviz-reward_id="' + progress.definition_id + '"]' ), progress );

            });
		});
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
			url: "https://api.v2.badgeville.com/api/widgets/" + publicKey + "/" + siteURL + "/players/" + playerId + "/missions/" + missionId + ".json?time_frame=" + timeframe + "&reset_config=" + d,
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
        if ( data.data.progress.earned > 0 ) {
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
