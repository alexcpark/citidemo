		             <!-- Program Header Visualizations, Onboarding -->
					 <div class="header-profile-highlights">
				  	    <div id="BVVIZ-onboarding_header_playerMeta" class="highlights highlight1 bvviz-container bvviz-playerMeta"></div>
					    <div id="BVVIZ-onboarding_header_missionProgressBar" class="highlights highlight2 bvviz-container progressBar"></div>
					 </div> <!-- /.header-profile-highlights -->
				   </div> <!-- /.span10 -->
		          </div> <!-- /.row -->
		        </div> <!-- /.container -->
		    </div> <!-- /.page-header -->

			<div class="page-main">
				<div class="container">
					<!-- START PROGRAM SUB NAV -->
					<?php
					// construct Amy's navigation with her proper Id
					$amy_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Progress</a>
									<ul class="subnav-subpages">
										<li class="subnav-subpage subpage0"><a href="/pages/onboarding/progress/checklist/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Checklist</a></li>
									</ul>
								<li>
								<li class="subnav-page page2"><a href="/pages/onboarding/community/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/onboarding/community/context/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/onboarding/community/leaders/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Leaders</a></li>
									</ul>
								</li>
					    	</ul>
					    </div>';
					// construct Chris' navigation with his proper Id
					$chris_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Progress</a>
									<ul class="subnav-subpages">
										<li class="subnav-subpage subpage0"><a href="/pages/onboarding/progress/checklist/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Checklist</a></li>
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/onboarding/community/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/onboarding/community/context/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/onboarding/community/leaders/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Leaders</a></li>
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
					
					?>
					<!-- END PROGRAM SUB NAV -->
