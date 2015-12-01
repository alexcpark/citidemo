				</div><!-- /.container -->
			</div><!-- /.page-main -->
		
			<div class="footer">
				<div class="footer-banner">
					<div class="container">
						<ul class="nav nav-bottom">
							<li class="bv-logo-r"><a href="/?program_id=1&player_id=5643c424a33c43d250002cb5">&nbsp;</a></li>
							<li><a href="/?program_id=1&player_id=5643c424a33c43d250002cb5">Terms of Use</a></li>
							<li><a href="/?program_id=1&player_id=5643c424a33c43d250002cb5">Privacy Policy</a></li>
							<li><a href="/?program_id=1&player_id=5643c424a33c43d250002cb5">Additional Terms</a></li>
							<li><a href="/?program_id=1&player_id=5643c424a33c43d250002cb5">Accessibility</a></li>
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
						<div class="copyright">Copyright &copy; 2013 Citigroup Inc. All Rights Reserved.</div>
						<div class="eeo">
							<p>Citi is an equal opportunity and affirmative action employer. Minority/Female/Disability/Veteran.</p>
							<p>Citigroup Inc. and its subsidiaries (”Citi”) invites all qualified interested applicants to apply for career opportunities. If you are a person with a disability and need a reasonable accommodation to use our search tools and/or apply for a career opportunity, please contact us.</p>
							<p>To view the “EEO is the Law” poster.</p>
						</div>
					</div>
				</div>
			</div> <!-- /.footer -->
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

		            // global variables to store the instance of visualizations
		            playerRow,
					playerStats,
					certificationsHeader,
					levelProgress,
		            trackProgress1,
					trackProgress2,
					trackProgress3,
					trackProgress4,
		            missionTutorial,
		            specialization,
		            milestones,
		            achievements,
				    siteActivities,
					assetLBs,
					coursesLBAll,
					playerActivities;


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
		                }
		              });

		            $( '.header-profile-name' ).text( profileName );
		            $( '.header-profile-image' ).attr( 'src', profileImage );

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
		          // Render a playerRow visualizations for the player provided
		          playerRow = BVVIZ.playerRow(
		              $( '#BVVIZ-playerRow' ),
		              playerId, // playerId
					  {
				  		  maxIcons:0
					  }
		          );

		          // Render a customContainer visualization with options for the player provided
		          playerStats = BVVIZ.playerRewards(
		            $( '#BVVIZ-playerStats' ),
		            playerId, // playerId
					// options for current visualization instance
		            {
      				  // Whether the header should be rendered
      				  inline: true,
						
			          // Category can be used to filter the data, default is null which request all cards, example: 'education'
			          category: 'stats',
					  
		            }
		          );
				  
		          // Render a customContainer visualization with options for the player provided
		          certificationsHeader = BVVIZ.customContainer(
		            $( '#BVVIZ-customContainer-0' ),
		            playerId, // playerId
		            // options for current visualization instance
		            {
		              // Whether the containter frame (i.e. header, border and background) should be displayed
		              showContainerFrame: false,
						
			          // Category can be used to filter the data, default is null which request all cards, example: 'education'
			          category: 'expertise',

		              // Contents and the order included in the custom container, default has all 3 types
		              contentsTypes: ['tracks'],

		              // Contents options
		              contents: {

		                badges: {

		                  // miniBadge shows a smaller badge icon
		                  miniBadge: false
		                }
		              }
		            }
		          );
				  
				  // Render a trackProgress visualization with options for the player provided
				  trackProgress1 = BVVIZ.trackProgress(
				  	$( '#BVVIZ-trackprogress-1' ),
					playerId, // playerId
					'5638b6af5ec7a9001b001a5c', // trackId
					// options for current visualization instance
				    {
				    	// Whether the header should be rendered
						inline: true,
				    }
				  );
				  
				  // Render a trackProgress visualization with options for the player provided
				  trackProgress2 = BVVIZ.trackProgress(
				  	$( '#BVVIZ-trackprogress-2' ),
					playerId, // playerId
					'5638b7561c19fa5f07001c0d', // trackId
					// options for current visualization instance
				    {
				    	// Whether the header should be rendered
						inline: true,
				    }
				  );
				  
				  // Render a trackProgress visualization with options for the player provided
				  trackProgress3 = BVVIZ.trackProgress(
				  	$( '#BVVIZ-trackprogress-3' ),
					playerId, // playerId
					'5638b7ae7369b2cfd1001c25', // trackId
					// options for current visualization instance
				    {
				    	// Whether the header should be rendered
						inline: true,
				    }
				  );
				  
				  // Render a trackProgress visualization with options for the player provided
				  trackProgress4 = BVVIZ.trackProgress(
				  	$( '#BVVIZ-trackprogress-4' ),
					playerId, // playerId
					'5638b7dd280aab6efc001abc', // trackId
					// options for current visualization instance
				    {
				    	// Whether the header should be rendered
						inline: true,
				    }
				  );
				  
				  // Render a levelProgress visualization for the player provided
		          levelProgress = BVVIZ.levelProgress(
		            $( '#BVVIZ-levelProgress' ),
		            playerId, // playerId
		            '55ef61106d11ef7010002ecb' // missionId (level mission)
		          );

		          // Render a missionTutorial visualization for the player provided
		          missionTutorial = BVVIZ.missionTutorial(
		            $( '#BVVIZ-missionTutorial' ),
		            playerId, // playerId
		            '5636b2d17369b28fad000db5', // missionId (tutorial mission)
		            true
		          );

		          // Render a missionRewards visualization for the player provided.
		          milestones = BVVIZ.missionRewards(
		            $( '#BVVIZ-missionRewards-1' ),
		            playerId, // playerId
					'5637c0ce7369b2f8bf00153c', // missionId
		            // options for current visualization instance
		            {
     				  // Whether the header should be rendered
     				  inline: false,
					  
					  // Whether the containter frame (i.e. header, border and background) should be displayed
		              showContainerFrame: false,

		              // Contents options
		              contents: {

		                badges: {

		                  // miniBadge shows a smaller badge icon
		                  miniBadge: false
		                }
		              }
		            }
		          );

		          // Render a missionRewards visualization for the player provided
		          achievements = BVVIZ.missionRewards(
		            $( '#BVVIZ-missionRewards-2' ),
		            playerId, // playerId
					'5637c0726907ff52b600147d', // missionId
		            // options for current visualization instance
		            {
     				  // Whether the header should be rendered
     				  inline: false,
					  
					  // Whether the containter frame (i.e. header, border and background) should be displayed
		              showContainerFrame: false,

		              // Contents options
		              contents: {

		                badges: {

		                  // miniBadge shows a smaller badge icon
		                  miniBadge: false
		                }
		              }
		            }
		          );
				  
				  // Render a leaderboard visualization
				  assetLbs = BVVIZ.leaderboard(
				  	$( '#BVVIZ-assetLBs' ),
					[
						'563a6b3cb1f543dcd80005ad',
						'563a6b67d1b4cf64c00004fd',
						'563a6b0f19f2260513000489',
						'563a6b586fb70958a800059e'
					], // leaderboard IDs
					{
						inline: true
					}// Options
				  );
				  
				  // Render a leaderboard visualization
				  coursesLBAll = BVVIZ.leaderboard(
				  	$( '#BVVIZ-coursesLB-All' ),
					[
						'563a6ba26fb709b38b00058f'
					] // leaderboard IDs
					// Options 
				  );
				  
		          // Render a playerStream visualization
		          siteActivities = BVVIZ.siteStream(
		            $( '#BVVIZ-siteStream' ),
		            '563a7f10226fcee39000059f', // Following (consumer = "activity") streamId
		            playerId, // playerId
		            // options for current visualization instance
		            {
		              // Whether the header should be rendered
		              inline: true,
             
		              // Callback handler on completion of stream item
		              itemCompleteCallback: handleImgErrorFailover
		            }
		          );
				  
		          // Render a playerStream visualization
		          playerActivities = BVVIZ.playerStream(
		            $( '#BVVIZ-playerStream' ),
		            '563a7936b1f5431112002c6c', // Following (consumer = "activity") streamId
		            playerId, // playerId
		            // options for current visualization instance
		            {
		              // Whether the header should be rendered
		              inline: true,
             
		              // Callback handler on completion of stream item
		              itemCompleteCallback: handleImgErrorFailover
		            }
		          );
				  
		        }

		        // init function
		        function init() {
		          var paramObj = parseURLParam( window.location.search ),
					playerId = ( 'player_id' in paramObj ) ? paramObj['player_id'] : null;

		          if ( $.type( playerId ) !== 'string' ) {
		            // Player ID not passed appropriately
		            renderNotFound();
		            return false;
		          }

		          // Call setPlayer using the player id
		          if ( $.type(BVVIZ.currentPlayer) !== 'object' || $.isEmptyObject(BVVIZ.currentPlayer) ) {
		            BVVIZ.setPlayer( playerId, showProfile );
		          }
				  
				  // may need to pass the page id somewhere for use elsewhere, perhaps in a global variable.

		        }

		        pub.playerRow = playerRow;
				pub.playerStats = playerStats;
				pub.certificationsHeader = certificationsHeader;
		        pub.levelProgress = levelProgress;
				pub.trackProgress1 = trackProgress1;
				pub.trackProgress2 = trackProgress2;
				pub.trackProgress3 = trackProgress3;
				pub.trackProgress4 = trackProgress4;
		        pub.missionTutorial = missionTutorial;
		        pub.milestones = milestones;
		        pub.achievements = achievements;
				pub.assetLBs = assetLBs;
				pub.coursesLBAll = coursesLBAll;
		        pub.siteActivities = siteActivities;
		        pub.playerActivities = playerActivities;
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