		             <!-- Program Header Visualizations, Onboarding -->
					 <div class="header-profile-highlights">
				  	    <div id="BVVIZ-collaboration_header_playerStats" class="bvviz-playerStats highlights highlight1 bvviz-container"></div>
					    <div id="BVVIZ-collaboration_header_affinityTracks" class="bvviz-headerTracks highlights highlight2 bvviz-container"></div>
					 </div> <!-- /.header-profile-highlights -->
				   </div> <!-- /.span10 -->
		          </div> <!-- /.row -->
		        </div> <!-- /.container -->
		    </div> <!-- /.page-header -->

			<div class="page-main">
				<div class="container">
					<!-- START PROGRAM SUB NAV -->
					<div class="subnav">
						<ul class="subnav-pages">
							<li class="subnav-page page1"><a href="/pages/collaboration/progress/?program_id=4&player_email=<?php echo $playerEmail; ?>">Progress</a>
								<ul class="subnav-subpages">
									<!--<li class="subnav-subpage subpage1"><a href="/pages/collaboration/progress/culture/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Overview</a></li>
									<li class="subnav-subpage subpage1"><a href="/pages/collaboration/progress/culture/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Cultural Advocacy</a></li>
									<li class="subnav-subpage subpage2"><a href="/pages/collaboration/progress/interests/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Product Interests</a></li>
									<li class="subnav-subpage subpage3"><a href="/pages/collaboration/progress/milestones/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Milestones</a></li>
									<li class="subnav-subpage subpage4"><a href="/pages/collaboration/progress/stats?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Stats</a></li>-->
								</ul>
							</li>
							<li class="subnav-page page2"><a href="/pages/collaboration/community/?program_id=4&player_email=<?php echo $playerEmail; ?>">Community</a>
								<ul class="subnav-subpages">
									<!--<li class="subnav-subpage subpage1"><a href="/pages/collaboration/community/context/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">You in Context</a></li>-->
									<li class="subnav-subpage subpage2"><a href="/pages/collaboration/community/leaders/?program_id=4&player_email=<?php echo $playerEmail; ?>">Leaders</a></li>
								</ul>
							</li>
						</ul>
					</div>
					
					
					<?php
					/*
					// construct Amy's navigation with her proper Id
					$amy_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/pages/collaboration/progress/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Progress</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/collaboration/progress/culture/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Overview</a></li>
										<li class="subnav-subpage subpage1"><a href="/pages/collaboration/progress/culture/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Cultural Advocacy</a></li>
										<li class="subnav-subpage subpage2"><a href="/pages/collaboration/progress/interests/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Product Interests</a></li>
										<li class="subnav-subpage subpage3"><a href="/pages/collaboration/progress/milestones/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Milestones</a></li>
										<li class="subnav-subpage subpage4"><a href="/pages/collaboration/progress/stats?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Stats</a></li>-->
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/collaboration/community/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/collaboration/community/context/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/collaboration/community/leaders/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Leaders</a></li>
									</ul>
								</li>
					    	</ul>
					    </div>';
					// construct Chris' navigation with his proper Id
					$chris_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/pages/collaboration/progress/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Progress</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/collaboration/progress/culture/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Overview</a></li>
										<li class="subnav-subpage subpage1"><a href="/pages/collaboration/progress/culture/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Cultural Advocacy</a></li>
										<li class="subnav-subpage subpage2"><a href="/pages/collaboration/progress/interests/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Product Interests</a></li>
										<li class="subnav-subpage subpage3"><a href="/pages/collaboration/progress/milestones/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Milestones</a></li>
										<li class="subnav-subpage subpage4"><a href="/pages/collaboration/progress/stats?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Stats</a></li>-->
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/collaboration/community/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/collaboration/community/context/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/collaboration/community/leaders/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Leaders</a></li>
									</ul>
								</li>
					    	</ul>
					    </div>';
					
					// Print Choice
					switch($playerId) {
						case $allPlayerIds[0][1][0]:
						case $allPlayerIds[0][1][1]:
						case $allPlayerIds[0][1][2]:
						case $allPlayerIds[0][1][3]:
							echo $amy_nav;
							break;
						case $allPlayerIds[1][1][0]:
						case $allPlayerIds[1][1][1]:
						case $allPlayerIds[1][1][2]:
						case $allPlayerIds[1][1][3]:
							echo $chris_nav;
							break;
						default:
							echo $amy_nav;
					}
					*/
					?>
					<!-- END PROGRAM SUB NAV -->
