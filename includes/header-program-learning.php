		             <!-- Program Header Visualizations, Onboarding -->
					 <div class="header-profile-highlights">
				  	    <div id="BVVIZ-learning_header_playerStats" class="bvviz-playerStats highlights highlight1 bvviz-container"></div>
					    <div id="BVVIZ-learning_header_learningUnits" class="bvviz-headerTracks highlights highlight2 bvviz-container"></div>
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
								<li class="subnav-page page1"><a href="/pages/learning/progress/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Progress</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage0"><a href="/pages/learning/progress/products/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Overview</a></li>
										<li class="subnav-subpage subpage1"><a href="/pages/learning/progress/products/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Products</a></li>
										<li class="subnav-subpage subpage2"><a href="/pages/learning/progress/tools/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Tools</a></li>
										<li class="subnav-subpage subpage3"><a href="/pages/learning/progress/gamification/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Gamification</a></li>-->
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/learning/community/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/learning/community/context/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/learning/community/leaders/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Leaders</a></li>
									</ul>
								</li>
					    	</ul>
					    </div>';
					// construct Chris' navigation with his proper Id
					$chris_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/pages/learning/progress/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Progress</a>
									<ul class="subnav-subpages">
										<li class="subnav-subpage subpage0"><a href="/pages/learning/progress/products/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Overview</a></li>
										<li class="subnav-subpage subpage1"><a href="/pages/learning/progress/products/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Products</a></li>
										<li class="subnav-subpage subpage2"><a href="/pages/learning/progress/tools/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Tools</a></li>
										<li class="subnav-subpage subpage3"><a href="/pages/learning/progress/gamification/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Gamification</a></li>
									</ul>
								</li>
								<li class="subnav-page page2"><a href="/pages/learning/community/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Community</a>
									<ul class="subnav-subpages">
										<!--<li class="subnav-subpage subpage1"><a href="/pages/learning/community/context/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">You in Context</a></li>-->
										<li class="subnav-subpage subpage2"><a href="/pages/learning/community/leaders/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Leaders</a></li>
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