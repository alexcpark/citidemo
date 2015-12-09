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
								<li class="subnav-page page1"><a href="/pages/guide/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Overview</a></li>
								<li class="subnav-page page3"><a href="/pages/guide/how_to_play/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">How to Play</a></li>
								<li class="subnav-page page4"><a href="/pages/guide/where_to_play/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Where to Play</a></li>
								<li class="subnav-page page5"><a href="/pages/guide/key_activities/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Key Activities</a></li>
								<li class="subnav-page page2"><a href="/pages/guide/types_of_success/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Examples of Success</a></li>
					    	</ul>
					    </div>';
					// construct Chris' navigation with his proper Id
					$chris_nav = '
					    <div class="subnav">
					    	<ul class="subnav-pages">
								<li class="subnav-page page1"><a href="/pages/guide/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Overview</a></li>
								<li class="subnav-page page3"><a href="/pages/guide/how_to_play/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">How to Play</a></li>
								<li class="subnav-page page4"><a href="/pages/guide/where_to_play/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Where to Play</a></li>
								<li class="subnav-page page5"><a href="/pages/guide/key_activities/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Key Activities</a></li>
								<li class="subnav-page page2"><a href="/pages/guide/types_of_success/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Examples of Success</a></li>
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