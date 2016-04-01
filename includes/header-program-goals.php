		             <!-- Program Header Visualizations, Onboarding -->
					 <div class="header-profile-highlights">
				  	    <div id="BVVIZ-goals_header_playerStats" class="bvviz-playerStats highlights highlight1 bvviz-container"></div>
					    <div id="BVVIZ-goals_header_quarterlyRev" class="bvviz-goalProgress highlights highlight2 bvviz-container progressBar"></div>
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
							<li class="subnav-page page1"><a href="/pages/goals/progress/?program_id=2&player_email=<?php echo $playerEmail; ?>">Progress</a>
								<ul class="subnav-subpages">
									<li class="subnav-subpage subpage0"><a href="/pages/goals/progress/overview/?program_id=2&player_email=<?php echo $playerEmail; ?>">Overview</a></li>
									<li class="subnav-subpage subpage1"><a href="/pages/goals/progress/leads/?program_id=2&player_email=<?php echo $playerEmail; ?>">Leads</a></li>
									<li class="subnav-subpage subpage2"><a href="/pages/goals/progress/opportunities/?program_id=2&player_email=<?php echo $playerEmail; ?>">Opportunities</a></li>
									<li class="subnav-subpage subpage3"><a href="/pages/goals/progress/revenue/?program_id=2&player_email=<?php echo $playerEmail; ?>">Revenue</a></li>
								</ul>
							</li>
							<li class="subnav-page page2"><a href="/pages/goals/community/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Community</a>
								<ul class="subnav-subpages">
									<!--<li class="subnav-subpage subpage1"><a href="/pages/goals/community/context/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">You in Context</a></li>-->
									<li class="subnav-subpage subpage2"><a href="/pages/goals/community/leaders/?program_id=2&player_email=<?php echo $playerEmail; ?>">Leaders</a></li>
								</ul>
							</li>
						</ul>
					</div>
					
					<?php
					
					/*
					// construct Amy's Navigation with her proper Id
					$amy_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/pages/goals/progress/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Progress</a>
									<ul class="subnav-subpages">
										<li class="subnav-subpage subpage0"><a href="/pages/goals/progress/overview/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Overview</a></li>
										<li class="subnav-subpage subpage1"><a href="/pages/goals/progress/leads/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Leads</a></li>
										<li class="subnav-subpage subpage2"><a href="/pages/goals/progress/opportunities/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Opportunities</a></li>
										<li class="subnav-subpage subpage3"><a href="/pages/goals/progress/revenue/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Revenue</a></li>
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/goals/community/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/goals/community/context/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/goals/community/leaders/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Leaders</a></li>
									</ul>
								</li>
					    	</ul>
					    </div>';
					
					// construct Chris' navigation with his proper Id
					$chris_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/pages/goals/progress/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Progress</a>
									<ul class="subnav-subpages">
										<li class="subnav-subpage subpage0"><a href="/pages/goals/progress/overview/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Overview</a></li>
										<li class="subnav-subpage subpage1"><a href="/pages/goals/progress/leads/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Leads</a></li>
										<li class="subnav-subpage subpage2"><a href="/pages/goals/progress/opportunities/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Opportunities</a></li>
										<li class="subnav-subpage subpage3"><a href="/pages/goals/progress/revenue/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Revenue</a></li>
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/goals/community/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/goals/community/context/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/goals/community/leaders/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Leaders</a></li>
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