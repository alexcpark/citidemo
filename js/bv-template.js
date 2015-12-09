/*!

Badgeville JS Template Extension JS
Version x.x.x

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/

$(function() {
	
	var pub,
	
	// Define New Visualizations
	goalProgress, // progress bar visualization
	contextLeaderboard, // Leaderboard visualization powered by virtual teams that compares you vs the avg of everyone else
	missionChart; // chart visualization, a first step at leveraging charts to present information we already have
		
	// Options
	// Helpers
	// Utility Functions
	// Any useful plugins
	
	/*****************************
	* Add new visualizations to BVVIZ Scope
	******/
	
	// goalProgress, custom, using jquery plugin
	BVVIZ.missionProgressBar = function ( target, playerId, missionId, options ) {
		
		BVSDK( 'players/missions', { players: playerId, missions: missionId }, { // immediately define and use variable
			fields: ['progress'],
		}).ok( function(missionData) {
			
			// console.log(missionData);
			// console.log(missionData.missions[0].progress.percent);
			
			// initialize bar
			var mainBar = $( "#BVVIZ-onboarding_header_missionProgressBar" ).progressbar({ value: 1 });
			
			// animate width
			$( "#BVVIZ-onboarding_header_missionProgressBar .ui-progressbar-value" ).animate({ width: missionData.missions[0].progress.percent + '%' }, {duration: 700, queue: false}); 
			
			// append text to bar (hidden by default)
			$('.progressBar').append('<div class="bv-progressBar-inner-percent" style="display: none;"><div class="bv-progressBar-inner-value">' + missionData.missions[0].progress.percent + ' %</div>' + '<div class="bv-progressBar-inner-description">' + (($('body').attr('id') == 'bv-page-onboarding' || 'bv-page-guide' ) ? 'onboarded' : '') + '</div></div>');
			
			// show text in bar
			$('.bv-progressBar-inner-percent').toggle({ duration: 100 });
			
			// return bar
			return mainBar;
		});	
	};
	
	
	// goalProgress2, custom, using jquery plugin
	BVVIZ.goalProgress = function ( target, playerId, missionId, options ) {
		
		// store the id's incase i need them later
		var mission_id = missionId,
		player_id = playerId;
		
		// define core function for processing rewards
		BVSDK( 'players', { players: player_id }, { // immediately define and use variable
			fields: 'all'
		}).ok( function(playerData) {
			
			// store player object data
			var playerObject = playerData;
			
			//retrieve the 3 rewards to work with
			BVSDK( 'missions/rewards', { players: playerId, missions: missionId }, { // immediately define and use variable
				fields: 'all'
			}).ok( function(rewardData) {
				
				// re-store ids incase we need them
				var player_id = this.ids.players,
				mission_id = this.ids.missions;
				
				// store length of set
				var dataLength = rewardData.rewards.length, // adding one for "your current" progress bar
				number_goal = [''],
				percent_goal = [''];
				
				// grab goal numbers and store
				for (i = 0; i < dataLength; i++) {
					// iterate and store number goals
					number_goal[i] = rewardData.rewards[i].player_criteria[0].value;
				}
				
				// grab largest goal from numbers
				var number_max = Math.max.apply(null, number_goal),
				current_number = playerObject.players[0].units.unit_revenue.all,
				current_percentage = (current_number / number_max) * 100; // stores your personal score @ the end
			
				// convert goal percentages from numbers & print progress bars
				for (d = 0; d < dataLength; d++) {
					// iterate and store percents
					percent_goal[d] = Math.floor((number_goal[d] / number_max) * 100);
					
					// append each container element to the main progress bar holder
					$('#BVVIZ-goals_header_quarterlyRev').append('<div class="bars bar-' + d + '"></div>');
				
					// print the bars
					$('.bars.bar-' + d ).progressbar({
						value: percent_goal[d]
					});
				
					// on last element, print the flag to the element
					if (d == (dataLength -1)) {
						var goal_flag = '<div class="goal-flag" title="$' + number_max.toLocaleString() + ' revenue needed, in total">Quarterly Goal</div>';
						$('.bars.bar-' + d ).append(goal_flag); // print to last flag
					}
				}
				
				// prepend your current results bar
				$('#BVVIZ-goals_header_quarterlyRev').prepend('<div class="bars bars-me"></div>');
				
				// initialize your progress bar
				$('.bars.bars-me').progressbar({ value: 1 }); 
				// add your flag (has to be after intiailization)
				$('.bars.bars-me .ui-progressbar-value').append('<div class="my-flag" style="display: none" title="You have $'+ current_number.toLocaleString() + '">You</div>');
				$('.my-flag').toggle( 900 ); // has to be higher than animation
				// animate to your value	
				$('.bars.bars-me .ui-progressbar-value').animate({ width: current_percentage + '%' }, {duration: 700, queue: false}); 
				
			});
		});
		
		
	};
	
	// goalProgress2, custom, using jquery plugin
	BVVIZ.missionOverviewBerlin = function ( target, environment, publicKey, siteURL, playerId, missionIdArray, interval ) {
		
		// store missionObject
		var missionIds = missionIdArray,
		missions_url;
		// console.log(missionIds.length);
		
		// process mission object
		for (i = 0; i < missionIds.length; i++) {
			
			// using closure to ensure ajax capture the right iterator value
			(function (i) {
			
				// construct url
				var missions_url = "https://" + ((environment == 'production') ? 'api.v2' : 'sandbox') + ".badgeville.com/api/widgets/" + publicKey + "/" + siteURL + "/players/" + playerId + "/missions/" + missionIds[i] + ".json";

				// grabbing the mission data using the url with updated Id
				$.ajax({
					asynch: false,
					url: missions_url,
					dataType: 'jsonp'
				}).done(function(data) {
				
					// store data results for processing
					var missionData = data;
					console.log(missionData);
					// append containers to elements. add title and description.
					$(target).append('<div class="overview-row' + i + ' main-section-block-break"><p class="main-section-block-title overview-item-title">' + interval + ' ' + missionData.data.name + '</p><p class="overview-item-description">' + missionData.data.tip + '</p><div class="bv-progressBar-top-tally">' + missionData.data.progress.earned + ' out of ' + missionData.data.progress.possible + '</div><div class="bv-missionOverview bv-missionProgressBar' + i + '"></div></div>');
				
					// initialize progress bar
					$('.bv-missionProgressBar' + i).progressbar({ value: 1 });
				
					// animate to current value
					$('.bv-missionProgressBar' + i + ' .ui-progressbar-value').animate({ width: missionData.data.progress.percent + '%' });
					
					// add class
					$('.bv-missionProgressBar' + i).addClass('progressBar');
					
					// append text to bar (hidden by default)
					$('.bv-missionProgressBar' + i).append('<div class="bv-progressBar-inner-percent" style="display: none;"><div class="bv-progressBar-inner-value">' + missionData.data.progress.percent + ' %</div>' + '<div class="bv-progressBar-inner-description"> Complete</div></div>');
					
					// show inner percent
					$('.bv-progressBar-inner-percent').show( 1500 );
					
				});
				
			})(i);
			
		}
		
			
		
		//console.log(tracks_url);
		//console.log(missions_url);
/*
		$.ajax({
			url: missions_url,
			dataType: 'jsonp'
		}).done(function(data) {
			
			// store data results for processing
			var playerData = data,
			missionsData = data.
			
			// process results
			for
			
		});*/
	};
	/*
	// contextualLeaderboard, based on BV leaderboard
	BVVIZ.contextLeaderboard = function ( target, leaderboardIds, options ) {
  
		  // Variables and methods are defined in a private scope and then exposed publicly as needed later
		  var pub = {},
  
		  // The functions in the "render" object control the DOM structure created for each area
		  render = {

		    // Main header
		    header: function() {
		      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
		    },

		    // Navigation tabs
		    nav: function( lbs ) {
		      var navs = [],
		          lbName;
		      $.each( lbs, function( i, lb ) {
		        lbName = !lb.display_name || lb.display_name === '' ? lb.name : lb.display_name;
		        navs.push(
		          $( '<div class="bvviz-nav bvviz-' + i + '" title="' + lbName + '">' + lbName + '</div>' ).data( 'bvviz-lb-num', i )
		        );
		      });
		      navs[ navs.length - 1 ].addClass( 'bvviz-last' );
		      return navs;
		    },
    
		    // A row in the leaderboard (player or team)
		    card: function( rank ) {
		      var displayName = settings.isHorizontal && typeof rank.display_name === typeof '' ? rank.display_name.split(' ')[0] : rank.display_name ,
		          card = $( '<div class="bvviz-card">' )
		        .append(
		          $( '<img class="bvviz-avatar" src="' + rank.image + '" />' ),
		          $( '<div class="bvviz-details"></div>' ).append(
		            $( '<div class="bvviz-name">' + displayName + '</div>' ),
		            $( '<div class="bvviz-desc">' + rank.value + ' ' + rank.label + '</div>' )
		          ),
		          $( '<div class="bvviz-rank">' + rank.id + '</div>' )
		        );
		      // Store the type_id value on the card for later use
		      card.data( 'bvviz_type_id', rank.type_id );
		      return card;
		    },
    
		    // Expandable drawer to show a player. Will include a "View Profile" button if BVVIZ.playerProfile is included on the page
		    playerDrawer: function( player ) {
		      var drawer = $( '<div class="bvviz-drawer">' + 
		                        '<div class="bvviz-units"></div>' + 
		                      '</div>' );
      
		      // Render player's unitBar
		      BVVIZ.helper.unitBar( $( '.bvviz-units', drawer ), player );

		      // If the playerProfile function is defined, add a button
		      if ( $.isFunction( BVVIZ.playerProfile ) ) {
		        $( '<div class="bvviz-view-player-profile">View Profile</div><div class="bvviz-clear"></div>' ).appendTo( drawer );
		      }
		      return drawer;
		    },
    
		    // Expandable drawer to show a team. Will include a "View Profile" button if BVVIZ.teamProfile is included on the page
		    teamDrawer: function( team ) {
		      var drawer = $( '<div class="bvviz-drawer">' + 
		                        '<div class="bvviz-units"></div>' + 
		                      '</div>' );
      
		      // Render player's unitBar
		      BVVIZ.helper.unitBar( $( '.bvviz-units', drawer ), team );

		      // If the teamProfile function is defined, add a button
		      if ( $.isFunction( BVVIZ.teamProfile ) ) {
		        $( '<div class="bvviz-view-team-profile">View Profile</div><div class="bvviz-clear"></div>' ).appendTo( drawer );
		      }
		      return drawer;
		    }
		  },

		  // This will store the leaderboard data once the leaderboards are retrieved
		  leaderboards = [],
  
		  // Stores the position and DOM reference of the current leaderboard that is shown. (Defaults to "nothing shown")
		  currentLB,
		  currentContainer,

		  // Store the leaderboard settings
		  settings;

		  // Normalize the options object for backward compatible support
		  // The previous options parameter is a string, which indicates the orientation
		  options = $.isPlainObject( options ) ? options : { isHorizontal: options === 'horizontal' };

		  // Verify the options parameter, remove options attribute due to invalid inputs:
		  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
		    delete options.headerTitle;
		  }
		  if ( !$.isNumeric( options.pageSize ) || options.pageSize <= 0 ) {
		    delete options.pageSize;
		  }
		  if ( !$.isNumeric( options.showMeIndex ) || options.showMeIndex < 0 ) {
		    delete options.showMeIndex;
		  }
		  if ( !$.isNumeric( options.activeOnLoad ) || options.activeOnLoad < 0 ) {
		    delete options.activeOnLoad;
		  }

		  // Override the default settings from options parameter
		  settings = $.extend( {}, BVVIZ.options.leaderboard, options );

		  function init() {
		    // Capture the current instance for use within Promise object callbacks
		    var lbPromises = [];

		    // This function will be called after all the required data is loaded
		    function completed() {
		      var header,
		          lbHeader,
		          headerNavs = 0,
		          headerChildrenHeight = 0,
		          headerChildrenWidth = 0,
		          lbHeaderChildrenHeight = 0;

		      // Define the header DOM elements, which contains the navigation buttons
		      header = $( '<div class="bvviz-body-header"></div>' ).append(
		        render.nav( leaderboards )
		      );

		      // Add the leaderboard header and the card container into the target
		      target.append(
		        render.header(),
		        $( '<div class="bvviz-body bvviz-col"></div>' ).append(
		          header
		        )
		      );

		      lbHeader = $( '.bvviz-header', target );

		      // Need to know the height of all the children elements for the header
		      header.children( ':visible' ).each(function( i, child ) {
		        headerChildrenHeight += $( child ).outerHeight( true );
		        headerChildrenWidth += $( child ).outerWidth( true );
		        headerNavs ++;
		      });

		      // Need to know the height of all the children elements for the leaderboard header, exclude the margin
		      lbHeader.children( ':visible' ).each(function( i, child ) {
		        lbHeaderChildrenHeight += $( child ).outerHeight();
		      });

		      // Adjust the vertical alignment of header title and sub header titles
		      lbHeader.children().css( 'margin-top', ( lbHeader.height() - lbHeaderChildrenHeight  ) / 2 );
		      header.css( 'padding-top', ( header.height() - headerChildrenHeight ) / 2 );

		      // Adjust the width of the body header (leaderboard tabs) and each leaderboard tab width
		      if ( headerChildrenWidth < header.width() ) {
		        // Adjust the width of the tabs (pad some to allow for decimals)
		        header.width( headerChildrenWidth + header.outerWidth() - header.width() + .5 );
		      } else {
		        header.children( ':visible' ).each(function( i, child ) {
		          $( child ).outerWidth( header.width() / headerNavs );
		        });
		      }

		      // Trigger the default active leaderboard to display
		      show( settings.activeOnLoad );
		    }
    
		    // Allow for target to be provided as a string or JQuery object
		    target = $( target );

		    // Handle error conditions due to invalid inputs:
		    // Only a single DOM element is allowed per instance
		    if ( target.length > 1 ) {
		      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
		    }
		    // "leaderboardIds" must be provided as an array with > 0 values
		    if ( !$.isArray( leaderboardIds ) || leaderboardIds.length <= 0 ) {
		      return BVVIZ.helper.showError( target, '"leaderboardIds" argument must be an array with at least one value.' );
		    }

		    // Empty the target and add the base classes
		    target
		      .empty()
		      .addClass( settings.isHorizontal ? 'bvviz bvviz-leaderboard bvviz-horizontal' : 'bvviz bvviz-leaderboard' );

		    // Clear the currentLB value in case this is a reload
		    currentLB = null;

		    // If we've already loaded the leaderboards, we don't need to do so again
		    if ( leaderboards.length > 0 ) {
		      // Trigger the "completed" method and 
		      completed();
		      return;
		    }
		    // Create a BVSDK Promise for each leaderboard definition
		    $.each( leaderboardIds, function( i, id ) {
		      lbPromises.push(
		        BVSDK( 'leaderboards', { leaderboards: id } )
		      );
		    });

		    // Put all of the defintion Promise objects into a "when" and wait for them all to finish
		    BVSDK.when.apply( BVSDK, lbPromises ).ok( function(){
		      // Use JQuery.map to extract the leaderboard from each data object returned
		      leaderboards = jQuery.map( arguments, function( value, i ) {
		        return value.leaderboards[0];
		      });

		      // Now that we have the leaderboard data, trigger the "completed" method
		      completed();

		    }).fail( function( data ) {
		      // Show an error on failure
		      BVVIZ.helper.showError( target, data );
		    });

		    // Bind the click to the top-level target for greater flexibility
		    target.bind( 'click', function( event ) {
		      // Get the element clicked on via the JQuery event
		      var eventTarget = $( event.target ),
		          card, drawer;

		      // A navigation element was clicked on, so switch the leaderboard displayed
		      if ( eventTarget.hasClass( 'bvviz-nav' ) ) {
		        show( eventTarget.data( 'bvviz-lb-num' ) );
		        event.preventDefault();
		        return false;
		      }

		      // Find the closest player card to the object clicked on
		      card = eventTarget.closest( '.bvviz-card' );
      
		      // "View Profile" for any player card clicked - Requires BVVIZ.playerProfile to be included on the page
		      if ( $.isFunction( BVVIZ.playerProfile ) && card.length && !card.hasClass( 'bvviz-team' ) ) {
		        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ card.data( 'bvviz_type_id' ) ] );
		        event.preventDefault();
		        return false;
		      }
		      // Pending feature: "View Profile" for any team card clicked - Requires BVVIZ.teamProfile to be included on the page
		      if ( $.isFunction( BVVIZ.teamProfile ) && card.length && card.hasClass( 'bvviz-team' ) ) {
		        BVVIZ.helper.showModal( BVVIZ.teamProfile, [ card.data( 'bvviz_type_id' ) ] );
		        event.preventDefault();
		        return false;
		      }

		      // "View Profile" for player clicked - Requires BVVIZ.playerProfile to be included on the page
		      if ( $.isFunction( BVVIZ.playerProfile ) && eventTarget.hasClass( 'bvviz-view-player-profile' ) ) {
		        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ card.data( 'bvviz_type_id' ) ] );
		        event.preventDefault();
		        return false;
		      }
		      // Pending feature: "View Profile" for team clicked - Requires BVVIZ.teamProfile to be included on the page
		      if ( $.isFunction( BVVIZ.teamProfile ) && eventTarget.hasClass( 'bvviz-view-team-profile' ) ) {
		        BVVIZ.helper.showModal( BVVIZ.teamProfile, [ card.data( 'bvviz_type_id' ) ] );
		        event.preventDefault();
		        return false;
		      }

		      event.preventDefault();
		      return false;
		    });
		  }

		  // Show a leaderboard
		  function show( board ) {
		    // Find all the DOM objects that will need to change
		    var currentCards = $( currentContainer ),
    
		    // The new leaderboard should be hidden to start so that it can fade in later
		        newCards = $( '<div class="bvviz-cards bvviz-col bvviz-leaderboard-cards" style="display:none;"></div>' ),
		        newNav = $( '.bvviz-nav.bvviz-' + board, target );

		    if ( currentLB === board ) {
		      // re-load current leaderboard, toggle the player-relative loading or top-rank loading
		      settings.loadLBToggle = !settings.loadLBToggle;

		    } else {      
		      // Swap the leaderboard if the desired board is different, reset to default leaderboard setting
		      settings.loadLBToggle = settings.loadRelative;
		    }

		      // remove the existing horizontal leaderboad scrollable wrapper before attaching new leaderboard
		      target.hasClass( 'bvviz-horizontal' ) && $( '.bvviz-scrollable-wrapper' ).remove();

		      // Remove the "active" class from all the buttons and then add it to the current one
		      newNav.siblings().removeClass( 'bvviz-active' );
		      newNav.addClass( 'bvviz-active' );

		      // Add the new wrapper container for the cards to the body of the viz
		      if ( settings.isHorizontal ) {
		        $('<div/>').addClass('bvviz-scrollable-wrapper')
		          .appendTo( $( '.bvviz-body', target ) )
		          .append( newCards );
		      } else {
		        $( '.bvviz-body', target ).append( newCards );
		      }

		      // Store a reference to the current active cards container
		      currentContainer = newCards;
		      currentLB = board;

		      // Swap the visual areas by fading in the new one and then removing the old one
		      newCards.fadeIn( null, function() {
		        // unbind the existing infinite scrolloing
		        currentCards.unbind( 'scroll.bvviz' );

		        currentCards.remove();

		        // Set up infinite scrolling on the new container
		        if ( settings.isHorizontal ) {
		          BVVIZ.helper.infiniteLeftRightScroll( newCards, pub );
		        } else {
		          BVVIZ.helper.infiniteUpDownScroll( newCards, pub );
		        }

		        // Set up custom load binding on the new contianer
		        BVVIZ.helper.customLoadPrevious( newCards, pub );
		        BVVIZ.helper.customLoadNext( newCards, pub );


		        newCards.data( 'bvviz-pagesize', settings.pageSize );

		        // Load player-relative leaderboard. Get current player's poistion in a specific leaderboard
		        if ( settings.loadLBToggle && BVVIZ.currentPlayer && BVVIZ.currentPlayer.id ) {
		          BVSDK( 'players/positions', { players: BVVIZ.currentPlayer.id, positions: leaderboardIds[ currentLB ] }, {
		            fields: 'all'
		          }).ok( function( data ) {
		            // Adjust index starting from 0, rank value from data is indexed from 1
		            var myRank = data.positions && data.positions[0] && $.isNumeric( data.positions[0].rank ) ? parseInt( data.positions[0].rank, 10 ) - 1 : -1 ;

		            if ( myRank - settings.showMeIndex > 0 ) {
		              // Track the page state at offset start and offset end
		              newCards.data( 'bvviz-offset-start', myRank - settings.showMeIndex );
		              newCards.data( 'bvviz-offset-end', myRank - settings.showMeIndex + settings.pageSize );
		              // Load the player's relative page in the current leaderboard
		              load( myRank - settings.showMeIndex, 'initial' );

		            } else {
		              loadDefaultInitial();
		            }

		          }).fail( function( data ) {
		            loadDefaultInitial();
		          });

		        } else {
		          loadDefaultInitial();
		        }

		        function loadDefaultInitial() {
		          // Track the page state at offset start and offset end
		          newCards.data( 'bvviz-offset-start', 0 );
		          newCards.data( 'bvviz-offset-end', settings.pageSize );

		          // Load the top leaderboard into the container
		          load( 0, 'initial' );
		        }

		      });


		  }

		  // In order to load the player relative leaderboard, we need load the data from a specifc offset
		  // 'offset' - used as the starting point to make leaderboard ranks API call
		  // 'where' - used to indicate whether it's loading from. Possible values are initial, previous or next
		  function load( offset, where ) {
		    var loading,
		        limit = settings.pageSize,
		        offsetStart,
		        offsetEnd;

		    // Normalize offset and limit value when the offset parameter becomes negative
		    if ( offset < 0 ) {
		      limit = settings.pageSize + offset;
		      offset = 0;
		    }

		    // Checking the condition on offset and limit before sending request
		    if ( limit === 0 ) {
		      return;
		    }

		    // Show an indicator in the target to indicate the data is loading
		    loading = BVVIZ.helper.loading( 'bvviz-tr' ),
		    target.append( loading );

		    // Request data from specific offset for the current leaderboard
		    BVSDK( 'leaderboards/ranks', { leaderboards: leaderboardIds[ currentLB ] }, {
		      offset: offset,
		      limit: limit,
		      fields: 'all'
		    }).ok( function( data ) {
		      var first = $( '.bvviz-card:first', currentContainer ),
		          last = $( '.bvviz-card:last', currentContainer ),
		          previousScroll = $( '.bvviz-show-scroll.bvviz-previous', currentContainer ),
		          nextScroll = $( '.bvviz-show-scroll.bvviz-next', currentContainer ),
		          currentRowStyle = '',

		          // Add a temporary storage for appending each new card
		          tempContainer = $(),

		          // temporary value for calculating the extra bottom padding on initial
		          extraPadding = 0;          

		      // Remove the loading from the current container
		      loading.remove();

		      if ( where === 'previous' ) {
		        // Load when scrolling previous. Remove the existing scroll marker from the current container
		        previousScroll.remove();

		        // We need to know what style is for first previous card in the even/odd cycle
		        currentRowStyle = first.hasClass('bvviz-odd') && ( limit % 2 === 0 ) ? 'bvviz-odd' : 'bvviz-even';
		      } else if ( where === 'next' ) {
		        // Load when scrolling next. Remove the existing scroll marker from the current container
		        nextScroll.remove();

		        // We need to know what style is for the next card in the even/odd cycle
		        currentRowStyle = last.hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
		      } else {
		        // default load from initial loading. Remove the existing scroll marker from the current container
		        previousScroll.remove();
		        nextScroll.remove();

		        // We need to know what style is for the next card in the even/odd cycle
		        currentRowStyle = last.hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
		      }

		      $.each( data.ranks, function( i, rank ) {
		        // Check if match the current player
		        if ( BVVIZ.currentPlayer && ( rank.type_id === BVVIZ.currentPlayer.id || rank.email === BVVIZ.currentPlayer.email ) ) {
		          currentRowStyle += ' bvviz-self';
		        }

		        // Check if the leaderboard is team leaderboard
		        if ( rank.type === 'teams' ) {
		          currentRowStyle += ' bvviz-team';
		        }

		        // Add the rank into the leaderboard, using the card renderer and starting it invisible
		        tempContainer = tempContainer.add( render.card( rank ).addClass( 'bvviz-invisible ' + currentRowStyle ) );


		        // Change the next row style
		        currentRowStyle = currentRowStyle.indexOf( 'bvviz-odd' ) >= 0 ? 'bvviz-even' : 'bvviz-odd';

		      });

		      // All the new cards are stored in tempContainer, append or prepend them to the currentContainer
		      if ( where === 'previous' ) {
		        currentContainer.prepend( tempContainer );
		      } else {
		        currentContainer.append( tempContainer );
		      }

		      // Track the page state at offset start and offset end
		      offsetStart = currentContainer.data( 'bvviz-offset-start' ) < offset ? currentContainer.data( 'bvviz-offset-start' ) : offset;
		      offsetEnd = currentContainer.data( 'bvviz-offset-end' ) > offset + limit ? currentContainer.data( 'bvviz-offset-end' ) : offset + limit;
		      currentContainer.data( 'bvviz-offset-start', offsetStart );
		      currentContainer.data( 'bvviz-offset-end', offsetEnd );

		      // Now that it's all, use the helper method to fit the new area into the visualization
		      if ( settings.isHorizontal ) {
		        BVVIZ.helper.fitWidth( target );
		      } else {
		        BVVIZ.helper.fitHeight( target );
		      }

		      // Use the helper method to animate the cards into view
		      BVVIZ.helper.showCards( currentContainer );

		      // Once we have all the data, we can handle bind/unbind the scroll event based on where it load from
		      if ( where === 'previous' ) {
		        // load the previous page, check for scroll up event
		        if ( offset > 0 ) {
		          // there are more previous data which are not loaded
		          insertPreviousScrollIndicator();
		        } else {
		          // reach the first page of data
		          currentContainer.unbind( 'load-previous.bvviz' );
		        }

		      } else if ( where === 'next' ) {
		        // load the next page, check for scroll down event
		        if ( data.ranks.length < settings.pageSize ) {
		          // no more next data...
		          currentContainer.unbind( 'load-next.bvviz' );
		        } else {
		          // more next data...
		          insertNextScrollIndicator();
		        }

		      } else {
		        // default load from initial loading, need to handle both direction scroll events

		        if ( data.ranks.length < settings.pageSize ) {
		          // no more next data...
		          currentContainer.unbind( 'load-next.bvviz' );

		          // current player near the bottom of active leaderboard, padding space for accurate scolling
		          currentContainer.children().each( function(){
		            if ( settings.isHorizontal ) {
		              extraPadding += $(this).outerWidth( true );
		            } else {
		              extraPadding += $(this).outerHeight( true );
		            }
		          });

		          if ( settings.isHorizontal ) {
		            $('<div>').width( currentContainer[0].scrollWidth - extraPadding ).appendTo( currentContainer );
		          } else {
		            $('<div>').height( currentContainer[0].scrollHeight - extraPadding ).appendTo( currentContainer );
		          }
		        } else {
		          // more next data...
		          insertNextScrollIndicator();
		        }

		        if ( offset > 0 ) {
		          // there are more previous data which are not loaded
		          insertPreviousScrollIndicator();
		        } else {
		          // reach the first offset of data
		          currentContainer.unbind( 'load-previous.bvviz' );          
		        }

		      }

		      function insertPreviousScrollIndicator() {
		        // Need to know the previous scroll indicator's height or width, so we can re-position the scroll bar
		        var previousScroll = $( '<div class="bvviz-show-scroll bvviz-previous">More &rsaquo;</div>' )
		          .prependTo( currentContainer ).bind( 'click', function() {
		            $( currentContainer ).trigger( 'scroll.bvviz' );
		          });

		          // Record the previously calculated container's width
		        var previousWidth = $( currentContainer ).parent().width();

		        if ( settings.isHorizontal ) {

		          $( currentContainer )
		            // adjust current container's width for horizontal leaderboard
		            .width( $( currentContainer ).width() + $( '.bvviz-show-scroll', currentContainer ).width() )

		            // re-apply the container with to the parent container
		            // re-position the scroll bar on scrollable wrapper after inserting previous scroll indicator
		            .parent().width( previousWidth ).scrollLeft( previousScroll.width() );
		        } else {
		          currentContainer
		            // re-position the scroll bar on current container after inserting previous scroll indicator
		            .scrollTop( previousScroll.height() );
		        }

		      }

		      function insertNextScrollIndicator() {
		        $( '<div class="bvviz-show-scroll bvviz-next">More &rsaquo;</div>' )
		          .appendTo( currentContainer ).bind( 'click', function() {
		            $( currentContainer ).trigger( 'scroll.bvviz' );
		          });

		        if ( settings.isHorizontal ) {
		          $( currentContainer )
		            // adjust current container's width for horizontal leaderboard
		            .width( $( currentContainer ).width() + $( '.bvviz-show-scroll', currentContainer ).width() );
		        }
		      }

		    }).fail( function( data ) {

		      var previousScroll = $( '.bvviz-show-scroll.bvviz-previous', currentContainer ),
		          nextScroll = $( '.bvviz-show-scroll.bvviz-next', currentContainer );

		      // Remove the loading display
		      loading.remove();

		      if ( where === 'previous' ) {
		        // In the case of a failure (which can happen if offset is less than exists), unbind load-previous
		        currentContainer.unbind( 'load-previous.bvviz' );

		        // Remove the previous scroll marker from the current container
		        previousScroll.remove();
		      } else if ( where === 'next' ) {
		        // In the case of a failure (which can happen if offset is greater than exists), unbind load-next
		        currentContainer.unbind( 'load-next.bvviz' );

		        // To prevent from jumping, hide the next scroll marker from the current container
		        $( '.bvviz-show-scroll.bvviz-next', currentContainer ).css('visibility','hidden');
		      } else {
		        // In the case of an initial loading failure, unbind infinite scroll
		        currentContainer.unbind( 'scroll.bvviz' );
		        currentContainer.unbind( 'load-previous.bvviz' );
		        currentContainer.unbind( 'load-next.bvviz' );
        
		        // Also remove the existing scroll marker from the current container
		        previousScroll.remove();
		        nextScroll.remove();
		      }

		    });
		  }

		  // Load player data and render the drawer
		  function loadPlayer( card ) {
		    // Add a loading icon into the card
		    card.append( BVVIZ.helper.loading() );
		    // Load the player data
		    BVSDK( 'players', { players: card.data( 'bvviz_type_id' ) }, {
		      fields: 'all',
		      includes: 'teams,rewards:currentlevels'
		    }).ok( function( data ) {
		      // Remove the loading icon
		      $( '.bvviz-loading', card ).remove();

		      // Use the renderer for the drawer, attach it and slideToggle it open
		      render.playerDrawer( data.players[0] )
		        .appendTo( card )
		        .slideToggle();
        
		    }).fail(function( data ) {
		      // Show an error on failure
		      BVVIZ.helper.showError( target, data );
		    });
		  }

		  // Load team data and render the drawer
		  function loadTeam( card ) {
		    // Add a loading icon into the card
		    card.append( BVVIZ.helper.loading() );
		    // Load the team data
		    BVSDK( 'teams', { teams: card.data( 'bvviz_type_id' ) }, {
		      fields: 'all'
		    }).ok( function( data ) {
		      // Remove the loading icon
		      $( '.bvviz-loading', card ).remove();

		      // Use the renderer for the drawer, attach it and slideToggle it open
		      render.teamDrawer( data.teams[0] )
		        .appendTo( card )
		        .slideToggle();

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
		  pub.show = show;
		  pub.load = load;
		  return pub;
	};

	// missionChart, custom using plugin
	BVVIZ.missionChart = function (  ) {
		
	};
	*/
	
});