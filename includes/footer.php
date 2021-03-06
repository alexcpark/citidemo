				</div><!-- /.container -->
			</div><!-- /.page-main -->
		
			<div class="footer">
				<div class="footer-banner">
					<div class="container">
						<ul class="nav nav-bottom">
							<!--<li class="bv-logo-r"><a href="/?program_id=1&player_id=5643c424a33c43d250002cb5">&nbsp;</a></li>-->
							<li><a href="/?program_id=1&player_email=<?php echo $playerEmail; ?>">Terms of Use</a></li>
							<li><a href="/?program_id=1&player_email=<?php echo $playerEmail; ?>">Privacy Policy</a></li>
							<li><a href="/?program_id=1&player_email=<?php echo $playerEmail; ?>">Additional Terms</a></li>
							<li><a href="/?program_id=1&player_email=<?php echo $playerEmail; ?>">Accessibility</a></li>
							<li class="social">Follow us:<ul>
									<li class="rss"></li>
									<li class="facebook"></li>
									<li class="twitter"></li>
								</ul>
							</li>
						</ul>
					</div> <!-- /.container -->
				</div> <!-- /.footer-banner -->
				<div class="footer-legal">
					<div class="container">
						<div class="copyright">Copyright &copy; 2013 Bank Digital Inc. All Rights Reserved.</div>
						<div class="eeo">
							<p>Bank Digital is an equal opportunity and affirmative action employer. Minority/Female/Disability/Veteran.</p>
							<p>Bank Digital Inc. and its subsidiaries (”Bank Digital”) invites all qualified interested applicants to apply for career opportunities. If you are a person with a disability and need a reasonable accommodation to use our search tools and/or apply for a career opportunity, please contact us.</p>
							<p>To view the “EEO is the Law” poster.</p>
						</div>
					</div>
				</div>
			</div> <!-- /.footer -->
			
		  <?php
  		  // Define & store verb
  		  switch ($programId) {
  		      case '1':
				  $verb = 'visit-rc-onboarding';
  		          break;
  		      case '2':
				  $verb = 'visit-rc-goals';
  		          break;
  		      case '3':
				  $verb = 'visit-rc-learning';
  		          break;
  		      case '4':
				  $verb = 'visit-rc-collaboration';
  		          break;
  		      case '5':
				  $verb = 'visit-rc-guide';
  				  break;
  			  default:
				  $verb = '';
  				  break;
  		  }
		  ?>
			
		    <script type="text/javascript">
			  
		      var BVProfile = function() {

		        var pub = {},

	            // Configuration settings
	            notFoundMsg = 'Badgeville player not found',
	            defaultImg = 'http://bvconnectors.badgeville.com/bvviz/images/person.png',
	            warning = $( '<div class="container">' ).append(
	                        $( '<div class="alert">' ).append(
	                          $( '<strong>Warning!</strong>' ).append( ' Please check your site settings and the players involved.' )
	                        )
	                      ),

			    // global variables to store the instance of visualizations: section_page_viz (41 total)
	            onboarding_header_playerMeta, // playerCard
				onboarding_header_missionProgressBar, // goalProgress (progress bar only)
			    onboarding_progress0_playerStream, // playerStream (My Activities) (designed for simple, easier control [buttons])
				onboarding_progress0_missionTutorial, // missionTutorial (tasklist)
				onboarding_community0_siteStream, // siteStream (designed to be auto scrolling and more detailed.)
				onboarding_community1_leaderboardContext, // modified radar chart
				onboarding_community2_leaderboardLeaders, // standard leaderboard to see top performers in svrl categories ( simple)
				goals_header_playerStats, // missionRewards
				goals_header_quarterlyRev, // missionTutorial_alex (progress bar only) (quarter)
				goals_progress0_playerStream, // playerStream (My Activities) (designed for simple, easier control [buttons])
				goals_progress0_missionOverview, // overview of all progress missions
				goals_progress0_weeklyLeads, // missionTutorial_alex (progress bar only, repeatable)
				goals_progress0_weeklyOpps, // missionTutorial_alex (progress bar only, repeatable)
				goals_progress0_weeklyRev, // missionTutorial_alex (progress bar only, repeatable)
				goals_progress1_weeklyLeads, // missionTutorial_alex (for checklist, repeatable)
				goals_progress2_weeklyOpps, // missionTutorial_alex (for checklist, repeatable)
				goals_progress3_weeklyRev, // missionTutorial_alex (for checklist, repeatable)
				goals_community0_siteStream, // siteStream (designed to be auto scrolling and more detailed.)
				goals_community1_leaderboardContext, // modified radar chart
				goals_community2_leaderboardLeaders, // standard leaderboard to see top performers in svrl categories ( simple)
				learning_header_playerStats, // missionRewards
				learning_header_learningUnits, // tracks (queried by category)
				learning_progress0_playerStream, // playerStream (My Activities) (designed for simple, easier control [buttons])
				learning_progress0_missionOverview, // overview of all progress missions
				learning_progress0_productProgress, // missionTutorial_alex (progress bar only, repeatable)
				learning_progress0_toolsProgress, // missionTutorial_alex (progress bar only, repeatable)
				learning_progress0_gamificationProgress, // missionTutorial_alex (progress bar only, repeatable)
				learning_progress1_productProgress, // 
				learning_progress2_toolsProgress, // 
				learning_progress3_gamificationProgress, //
				learning_community0_siteStream, // siteStream (designed to be auto scrolling and more detailed.)
				learning_community1_leaderboardContext, // modified radar chart, // 
				learning_community2_leaderboardLeaders, // standard leaderboard to see top performers in svrl categories ( simple)
				collaboration_header_playerStats, // missionRewards 
				collaboration_header_affinityTracks, // playerTracks (queried by category) or community expert
				collaboration_progress0_playerStream, // playerStream (My Activities) (designed for simple, easier control [buttons])
				collaboration_progress0_cultureChart, // missionChart
				collaboration_progress0_productChart, // missionChart
				collaboration_progress1_ceProgress, // missionProgress
				collaboration_progress1_idProgress, // missionProgress
				collaboration_progress1_trProgress, // missionProgress 
				collaboration_progress1_irProgress, // missionProgress
				collaboration_progress2_depositsProgress, // missionProgress
				collaboration_progress2_bondsProgress, // missionProgress
				collaboration_progress2_fundsProgress, // missionProgress
				collaboration_progress2_stocksProgress, // missionProgress
				collaboration_progress3_missionRewards, // milestones?
				collaboration_progress4_missionRewards, // extended stats?
				collaboration_community0_siteStream, // siteStream (designed to be auto scrolling and more detailed.)
				collaboration_community1_leaderboardContext, // modified radar chart
				collaboration_community2_leaderboardLeaders; // standard ldrbd to see top performers in svrl categories ( simple)

		        // Utility function
		        function parseURLParam( query ) {
		          var o = {};
		          query = (query.indexOf('?') === 0) ? query.substr(1) : query ;
		          var p = query.split('&');
		          for ( var i=0; i<p.length; i++ ) {
		            var q = p[i].split('=');
		            if ( q[1] && q[1] != '' ) {
		              o[q[0]] = q[1];
		            }
		          }
		          return o;
		        }

		        function handleImgErrorFailover( target ) {
		          // Try to fix the the broken image in the activity stream by replacing the source extension
		          target.find('img').one( 'error', function( event ){
		            this.src = this.src.toString().replace( '.jpg', '.png' );
		          })
		        }

		        function showProfile( flag, playerObj ) {
		          var profileImage = playerObj && playerObj.image ? playerObj.image : defaultImg,
		              profileName = playerObj && playerObj.display_name || playerObj && plaerObj.name || 'Unknown',
		              playerId;

		          if ( $.isPlainObject( playerObj ) ) {
		            playerId = playerObj.id + '';

		            // Retrieve the 'title' and 'department' data from player's custom attributes, 
		            // The attributes of 'title' and 'department' need to be set up from admin console
		            BVSDK( 'players', { players: playerId }, { fields:'custom' } )
		              .ok( function( data ) {
		                if ( BVVIZ.utility.validateNestedObj( data, 'players', [0], 'custom' ) ) {
		                  var playerCustom = data.players[0].custom,
							separator = ',&nbsp;';
						  $( '.header-profile-title' ).append( playerCustom.title ? playerCustom.title + separator : 'Title, ' );
		                  $( '.header-profile-team' ).append( playerCustom.department ? playerCustom.department: 'Department' );
						  $( '.header-profile-location-city' ).append( playerCustom.location_city ? playerCustom.location_city + separator : 'City, ' );
						  $( '.header-profile-location-country' ).append( playerCustom.location_country ? playerCustom.location_country : 'Country' );
						  $( '.header-profile-image' ).attr( 'src', data.players[0].image);
		                }
		              });

		            $( '.header-profile-name' ).text( profileName );
		            $( '.header-profile-image' ).attr( 'src', profileImage );
		            
		            if(profileName == 'Chris Johnson') {
		            	$( '.header-profile-image' ).attr( 'src', 'http://rwdserver.com/sandbox/badgeville/sites/internal/arc/citibank/images/profile-chrisjohnson-cropped.jpg' );
		        	} else if(profileName == 'Amy Smith'){
		            	$( '.header-profile-image' ).attr( 'src', 'http://rwdserver.com/sandbox/badgeville/clients/arc/skillport/images/profile-amysmith.jpg' );
		            };

		            // If the playerProfile function is defined, add event handler
		            if ( $.isFunction( BVVIZ.playerProfile ) ) {
		              $( '.header-profile-image' ).bind( 'click', function() {
		                BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId ] );
		              });
		            }

		            // Show page main
		            $( '.main-section').show();

		            // Initialize the visualizations
		            loadBVVIZ( playerId );
					
					BVSDK( 'players/activities', { players: playerId } ).create( {verb: '<?php echo $verb; ?>'} );	

		          } else {
		            renderNotFound();
		          }
		        }

		        // Default display when player not found
		        function renderNotFound() {
		          $( '.header-profile-name' ).text( notFoundMsg )
		          $( '.header-profile-image' ).attr( 'src', defaultImg );
		          $( '.page-main' ).empty().prepend( warning );
		        }

		        // Initialize the visualizations
		        function loadBVVIZ( playerId ) {
			          
					/*******************************************************
					* Onboarding
					***********************************************/
					
					// Onboarding Global Header, Stats
					onboarding_header_playerMeta = BVVIZ.playerMeta(
						$( '#BVVIZ-onboarding_header_playerMeta' ),
						playerId // playerId
			        );
					
					// Onboarding Global Header, goalProgress Bar
					onboarding_header_missionProgressBar = BVVIZ.missionProgressBar(
						$( '#BVVIZ-onboarding_header_missionProgressBar' ),
						playerId, // playerId
						'564a591ab4b280a083000d97' // missionId
			        );
					
					// Onboarding0 Progress, My Activities
					onboarding_progress0_playerStream = BVVIZ.playerStream(
						$( '#BVVIZ-onboarding_progress0_playerStream' ),
						'56615b887369b2fb26000f9e', // Following (consumer = "activity") streamId
						playerId, // playerId
						// options for current visualization instance
						{
							// Whether the header should be rendered
							inline: true,

							// Callback handler on completion of stream item
							itemCompleteCallback: handleImgErrorFailover
						}
					);
					
					// Onboarding0 Progress Overview, missionTutorial
					onboarding_progress0_missionTutorial = BVVIZ.missionTutorial_Ra(
						$( '#BVVIZ-onboarding_progress0_missionTutorial' ),
						playerId, // playerId
						'564a591ab4b280a083000d97', // missionId (tutorial mission)
						true
					);
					
					// Onboarding0 Community, Everyone's Activities
					onboarding_community0_siteStream = BVVIZ.siteStream(
			            $( '#BVVIZ-onboarding_community0_siteStream' ),
			            '564b83a6280aabc8550017d2', // Following (consumer = "activity") streamId
			            playerId, // playerId
			            // options for current visualization instance
			            {
			              // Whether the header should be rendered
			              inline: true,
             
			              // Callback handler on completion of stream item
			              itemCompleteCallback: handleImgErrorFailover
			            }
			          );
					  
					// Onboarding1 Community, Contextual Leaderboard (You vs. Everyone)
					  
					// Onboarding2 Community, Leaders
  					onboarding_community2_leaderboardLeaders = BVVIZ.leaderboard(
  						$( '#BVVIZ-onboarding_community2_leaderboardLeaders' ),
  						[
  							'564b820db4b280d5e0000fa2'
  						], // leaderboard IDs
  						{
  							inline: true
  						}// Options
  					);
					
					
					/*******************************************************
					* Goals
					***********************************************/
					
					// Goals Header, Stats
					goals_header_playerStats = BVVIZ.playerStats(
						$( '#BVVIZ-goals_header_playerStats' ),
						playerId, // playerId
						// options for current visualization instance
						{
							  // Whether the header should be rendered
							  inline: true,
							
					          // Category can be used to filter the data, default is null which request all cards, example: 'education'
					          category: 'stats-goals'
				        }
			        );
					
					// Goals Header, Progress Bar for Quarterly Revenue Goals ( Good, Better, Best )  goalProgress Bar
					goals_header_quarterlyRev = BVVIZ.goalProgress(
						$( '#BVVIZ-goals_header_quarterlyRev' ),
						playerId, // playerId
						'5654e36ba33c43783f002de2' // missionId
			        );
					
  					// Goals0 Progress, My Activities
  					goals_progress0_playerStream = BVVIZ.playerStream(
  						$( '#BVVIZ-goals_progress0_playerStream' ),
  						'565cad0862f1c1bb5200543f', // Following (consumer = "activity") streamId
  						playerId, // playerId
  						// options for current visualization instance
  						{
  							// Whether the header should be rendered
  							inline: true,

  							// Callback handler on completion of stream item
  							itemCompleteCallback: handleImgErrorFailover
  						}
  					);
					
					// Goals Progress0 Overview
					goals_progress0_missionOverview = BVVIZ.missionOverviewBerlin(
						$( '#BVVIZ-goals_progress0_missionOverview' ),
						'production', //environment 'production' or 'sandbox'
						'15b9f975039d1d5b97193f62a42224d5', // publicKey
						'goals.bankdigital.com', // siteURL
						playerId, // playerId
						// array of mission ids
						[
							'5654e4286907ffd6fc002d7d',
							'5654e3deb1f54315c7002e8b',
							'5654e36ba33c43783f002de2'
						],
						// interval hourly, daily, weekly, monthly, quarterly, annually
						'Weekly'
						
					);
					
					// Goals Progress1, Weekly Lead Checklist
					goals_progress1_weeklyLeads = BVVIZ.missionTutorialBerlin_Ra(
						$( '#BVVIZ-goals_progress1_weeklyLeads' ),
						'15b9f975039d1d5b97193f62a42224d5', // publicKey
						'goals.bankdigital.com', // siteURL
						'weekly', // hourly, weekly, monthly, quarterly
						playerId, // playerId
						'5654e4286907ffd6fc002d7d', // missionId (tutorial mission)
						true
					);
					
					// Goals Progress2, Weekly Opportunities Checklist
					goals_progress2_weeklyOpps = BVVIZ.missionTutorialBerlin_Ra(
						$( '#BVVIZ-goals_progress2_weeklyOpps' ),
						'15b9f975039d1d5b97193f62a42224d5', // publicKey
						'goals.bankdigital.com', // siteURL
						'weekly', // hourly, weekly, monthly, quarterly
						playerId, // playerId
						'5654e3deb1f54315c7002e8b', // missionId (tutorial mission)
						true
					);
					
					// Goals Progress3, Weekly Revenue Checklist
					goals_progress3_weeklyRev = BVVIZ.missionTutorialBerlin_Ra(
						$( '#BVVIZ-goals_progress3_weeklyRev' ),
						'15b9f975039d1d5b97193f62a42224d5', // publicKey
						'goals.bankdigital.com', // siteURL
						'weekly', // hourly, weekly, monthly, quarterly
						playerId, // playerId
						'5654e36ba33c43783f002de2', // missionId (tutorial mission)
						true
					);
					
					// Goals Community, Everyone's Activities
					goals_community0_siteStream = BVVIZ.siteStream(
			            $( '#BVVIZ-goals_community0_siteStream' ),
			            '564b83d87369b295910010ef', // Following (consumer = "activity") streamId
			            playerId, // playerId
			            // options for current visualization instance
			            {
			              // Whether the header should be rendered
			              inline: true,
             
			              // Callback handler on completion of stream item
			              itemCompleteCallback: handleImgErrorFailover
			            }
			          );
					  
					// Goals Community, Contextual Leaderboard (You vs. Everyone)
					
					// Goals Community, Leaders
  					goals_community2_leaderboardLeaders = BVVIZ.leaderboard(
  						$( '#BVVIZ-goals_community2_leaderboardLeaders' ),
  						[
  							'564b820db4b280d5e0000fa2'
  						], // leaderboard IDs
  						{
  							inline: true
  						}// Options
  					);
					
					// Render a leaderboard visualization
					
					/*******************************************************
					* Learning
					***********************************************/
					
					// Learning Header, Stats
					learning_header_playerStats = BVVIZ.playerStats(
						$( '#BVVIZ-learning_header_playerStats' ),
						playerId, // playerId
						// options for current visualization instance
						{
							  // Whether the header should be rendered
							  inline: true,
							
					          // Category can be used to filter the data, default is null which request all cards, example: 'education'
					          category: 'stats-learning'
				        }
			        );
					
					// Learning Header, List of learning units and your progress in each
					learning_header_learningUnits = BVVIZ.playerTracks(
						$( '#BVVIZ-learning_header_learningUnits' ),
						playerId, // playerId
						{
							// Whether the header should be rendered
							inline: true,

							// Category can be used to filter the data, default is null which request all cards, example: 'education'
							category: 'learning-tracks',

							// Whether the cards are rendered as the child content inside a custom container
							childContentCards: false

						}
					); 
					
  					// Learning Progress0, My Activities
  					learning_progress0_playerStream = BVVIZ.playerStream(
  						$( '#BVVIZ-learning_progress0_playerStream' ),
  						'56618e751c19fa1c7d001139', // Following (consumer = "activity") streamId
  						playerId, // playerId
  						// options for current visualization instance
  						{
  							// Whether the header should be rendered
  							inline: true,

  							// Callback handler on completion of stream item
  							itemCompleteCallback: handleImgErrorFailover
  						}
  					);
					
					// Learning Progress0 Overview
					learning_progress0_missionOverview = BVVIZ.missionOverview(
						$( '#BVVIZ-learning_progress0_missionOverview' ),
						playerId, // playerId
						// array of mission ids
						[
							'5654e4286907ffd6fc002d7d',
							'5654e3deb1f54315c7002e8b',
							'5654e36ba33c43783f002de2'
						]
					);
					
					// Learning Progress0 Overview, "product" learning unit progress
					// Learning Progress0 Overview, "tools" learning unit progress
					// Learning Progress0 Overview, "gamification" learning unit progress
					// Learning Progress1, Detailed "product" progress
					// Learning Progress2, Detailed "tools" progress
					// Learning Progress3, Detailed "gamification" progress
					// Learning Progress4, My Activities
					// Learning Community, Everyone's Activities
					learning_community0_siteStream = BVVIZ.siteStream(
			            $( '#BVVIZ-learning_community0_siteStream' ),
			            '564b83eb1c19fa4990001656', // Following (consumer = "activity") streamId
			            playerId, // playerId
			            // options for current visualization instance
			            {
			              // Whether the header should be rendered
			              inline: true,
             
			              // Callback handler on completion of stream item
			              itemCompleteCallback: handleImgErrorFailover
			            }
			          );
					// Learning Community, Contextual Leaderboard (You vs. Everyone)
					// Learning Community, Leaders
					learning_community2_leaderboardLeaders = BVVIZ.leaderboard(
						$( '#BVVIZ-learning_community2_leaderboardLeaders' ),
						[
							'564b820db4b280d5e0000fa2'
						], // leaderboard IDs
						{
							inline: true
						}// Options
					);
					
					/*******************************************************
					* Collaboration
					***********************************************/
					
					// Collaboration Header, Stats
					collaboration_header_playerStats = BVVIZ.playerStats(
						$( '#BVVIZ-collaboration_header_playerStats' ),
						playerId, // playerId
						// options for current visualization instance
						{
							  // Whether the header should be rendered
							  inline: true,
							
					          // Category can be used to filter the data, default is null which request all cards, example: 'education'
					          category: 'stats-collab-top'
				        }
			        );
					
					// Collaboration Header, List of Tracks
			        collaboration_header_affinityTracks = BVVIZ.playerMissions(
			          $( '#BVVIZ-collaboration_header_affinityTracks' ),
			          playerId, // playerId
						{
						          // Whether the header should be rendered
						          inline: true,

						          category: 'collaboration-show',

						          // Whether the cards are rendered as the child content inside a custom container
						          childContentCards: false,
         
						} // options for current playerMissions
			        );
					
					// Collaboration Progress0, My Activities
					collaboration_progress0_playerStream = BVVIZ.playerStream(
						$( '#BVVIZ-collaboration_progress0_playerStream' ),
						'56618ec85ec7a929f400105d', // Following (consumer = "activity") streamId
						playerId, // playerId
						// options for current visualization instance
						{
							// Whether the header should be rendered
							inline: true,

							// Callback handler on completion of stream item
							itemCompleteCallback: handleImgErrorFailover
						}
					);
					
					// Collaboration Progress0 Overview, Overview of Cultural Advocacy Missions
					// Collaboration Progress0 Overview, Overview of Product Interest Missions
					// Collaboration Progress1, Detailed "Collaboration & Efficiency" progress
					// Collaboration Progress1, Detailed "Inclusion & Diversity" progress
					// Collaboration Progress1, Detailed "Tangible Results" progress
					// Collaboration Progress1, Detailed "Integrity & Responsibility" progress
					// Collaboration Progress2, Detailed "Deposits" progress
					// Collaboration Progress2, Detailed "Bonds" progress
					// Collaboration Progress2, Detailed "Funds" progress
					// Collaboration Progress2, Detailed "Stocks" progress
					// Collaboration Progress3, List of achievable milestones
					// Collaboration Progress4, List of extended stats
					// Collaboration Progress5, My Activities
					// Collaboration Community, Everyone's Activities
  					collaboration_community0_siteStream = BVVIZ.siteStream(
  			            $( '#BVVIZ-collaboration_community0_siteStream' ),
  			            '564a600b6fb709815500062c', // Following (consumer = "activity") streamId
  			            playerId, // playerId
  			            // options for current visualization instance
  			            {
  			              // Whether the header should be rendered
  			              inline: true,
             
  			              // Callback handler on completion of stream item
  			              itemCompleteCallback: handleImgErrorFailover
  			            }
  			          );
					// Collaboration Community, Contextual Leaderboard (You vs. Everyone)
					
					// Collaboration Community, Leaders
  					collaboration_community2_leaderboardLeaders = BVVIZ.leaderboard(
  						$( '#BVVIZ-collaboration_community2_leaderboardLeaders' ),
  						[
  							'564b820db4b280d5e0000fa2'
  						], // leaderboard IDs
  						{
  							inline: true
  						}// Options
  					);
					
		        }

		        // init function
		        function init() {
			          var paramObj = parseURLParam( window.location.search ),
						playerEmail = ( 'player_email' in paramObj ) ? paramObj['player_email'] : null;
				      var playerId = '';

			          if ( $.type( playerEmail ) !== 'string' ) {
			            // Player ID not passed appropriately
			            renderNotFound();
			            return false;
			          }

			          // Call setPlayer using the player id
			          playerEmail = BVVIZ.encryptEmail(playerEmail);
			          if ( $.type(BVVIZ.currentPlayer) !== 'object' || $.isEmptyObject(BVVIZ.currentPlayer) ) {
			          	BVSDK( 'players', { players: playerEmail } ).ok( function( data ) {
			          		playerId = data.players[0].id;
				            BVVIZ.setPlayer( playerId, showProfile );
				        });
			          }
		        }
				
				pub.onboarding_header_playerMeta = onboarding_header_playerMeta;
				pub.onboarding_header_missionProgressBar = onboarding_header_missionProgressBar;
				pub.onboarding_progress0_playerStream = onboarding_progress0_playerStream;
				pub.onboarding_progress0_missionTutorial = onboarding_progress0_missionTutorial;
				pub.onboarding_community0_siteStream = onboarding_community0_siteStream;
				pub.onboarding_community1_leaderboardContext = onboarding_community1_leaderboardContext;
				pub.onboarding_community2_leaderboardLeaders = onboarding_community2_leaderboardLeaders;
				pub.goals_header_playerStats = goals_header_playerStats;
				pub.goals_header_quarterlyRev = goals_header_quarterlyRev;
				pub.goals_progress0_playerStream = goals_progress0_playerStream;
				pub.goals_progress0_weeklyLeads = goals_progress0_weeklyLeads;
				pub.goals_progress0_weeklyOpps = goals_progress0_weeklyOpps;
				pub.goals_progress0_weeklyRev = goals_progress0_weeklyRev;
				pub.goals_progress0_missionOverview = goals_progress0_missionOverview;
				pub.goals_progress1_weeklyLeads = goals_progress1_weeklyLeads;
				pub.goals_progress2_weeklyOpps = goals_progress2_weeklyOpps;
				pub.goals_progress3_weeklyRev = goals_progress3_weeklyRev;
				pub.goals_community0_siteStream = goals_community0_siteStream;
				pub.goals_community1_leaderboardContext = goals_community1_leaderboardContext;
				pub.goals_community2_leaderboardLeaders = goals_community2_leaderboardLeaders;
				pub.learning_header_playerStats = learning_header_playerStats;
				pub.learning_header_learningUnits = learning_header_learningUnits;
				pub.learning_progress0_playerStream = learning_progress0_playerStream;
				pub.learning_progress0_missionOverview = learning_progress0_missionOverview;
				pub.learning_progress0_productProgress = learning_progress0_productProgress;
				pub.learning_progress0_toolsProgress = learning_progress0_toolsProgress;
				pub.learning_progress0_gamificationProgress = learning_progress0_gamificationProgress;
				pub.learning_progress1_productProgress = learning_progress1_productProgress;
				pub.learning_progress2_toolsProgress = learning_progress2_toolsProgress;
				pub.learning_progress3_gamificationProgress = learning_progress3_gamificationProgress;
				pub.learning_community0_siteStream = learning_community0_siteStream;
				pub.learning_community1_leaderboardContext = learning_community1_leaderboardContext;
				pub.learning_community2_leaderboardLeaders = learning_community2_leaderboardLeaders;
				pub.collaboration_header_playerStats = collaboration_header_playerStats;
				pub.collaboration_header_affinityTracks = collaboration_header_affinityTracks;
				pub.collaboration_progress0_playerStream = collaboration_progress0_playerStream;
				pub.collaboration_progress0_cultureChart = collaboration_progress0_cultureChart;
				pub.collaboration_progress0_productChart = collaboration_progress0_productChart;
				pub.collaboration_progress1_ceProgress = collaboration_progress1_ceProgress;
				pub.collaboration_progress1_idProgress = collaboration_progress1_idProgress;
				pub.collaboration_progress1_trProgress = collaboration_progress1_trProgress;
				pub.collaboration_progress1_irProgress = collaboration_progress1_irProgress;
				pub.collaboration_progress2_depositsProgress = collaboration_progress2_depositsProgress;
				pub.collaboration_progress2_bondsProgress = collaboration_progress2_bondsProgress;
				pub.collaboration_progress2_fundsProgress = collaboration_progress2_fundsProgress;
				pub.collaboration_progress2_stocksProgress = collaboration_progress2_stocksProgress;
				pub.collaboration_progress3_missionRewards = collaboration_progress3_missionRewards;
				pub.collaboration_progress4_missionRewards = collaboration_progress4_missionRewards;
				pub.collaboration_community0_siteStream = collaboration_community0_siteStream;
				pub.collaboration_community1_leaderboardContext = collaboration_community1_leaderboardContext;
				pub.collaboration_community2_leaderboardLeaders = collaboration_community2_leaderboardLeaders;
				pub.init = init;

		        return pub;
		      }

		      // Always place BVVIZ calls inside a JQuery "ready" block to ensure that the DOM is ready
		      $(function() {
		        // Global reference variable
		        arcDemo = BVProfile();

		        // Initialize the ARC demo page
		        arcDemo.init();

		      });
			  
		    </script>
			  
	</body>
</html>