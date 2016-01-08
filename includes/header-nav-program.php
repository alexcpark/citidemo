		    <!-- Fixed navbar -->
		    <nav class="navbar">
		      <div class="navbar-inner">
		        <div class="span12" style="float:none; margin:auto;">
		          <ul class="nav">
		            <?php
					/***********
					* Construct Navigation Link/URLs with the proper playerId
					************/
					
					// Define function for retrieving playerId
					function getPlayerId() {
						// Grab URL
						$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
						// Parse the URL
						$parts = parse_url($url);
						// Parse out the parts
						parse_str($parts['query'], $query);
						//var_dump($query);
						// Store for return
						$result = $query['player_id'];
						// Return
						return $result;
					}
					
					// store playerId
					$playerId = getPlayerId();
					
					// define playerId source collection
					$allPlayerIds = [
						['Amy Smith',
							['5643c424a33c43d250002cb5','5643c2f2b1f5431173002d7a','564a5e987369b2315f000d68','564a61586907ff0771000767']
						],
						['Chris Johnson',
							['5654cd69d1b4cf8bde002b2a','5655dedfb4b280ec79003862','565ca3d35ec7a9a1a500598a','565ca315d1b4cf342d005719']
						],
						['Jack Wright',
							['565e8d4b856d29bf2c000016','565e985b856d29b1f0000013','565f2ad8856d29cda4000013','565e99bb856d29ced5000013']
						],
						['Roselyn Sanchez',
							['565e8d4c856d29bf2c000018','565e985c856d29b1f0000014','565f2ad9856d29cda4000014','565e99bb856d29ced5000014']
						],
						['Obi Obinze',
							['565e8d4c856d29bf2c00001a','565e985c856d29b1f0000015','565f2ad9856d29cda4000015','565e99bb856d29ced5000015']
						],
						['Lucas McFadden',
							['565e8d4c856d29bf2c00001c','565e985c856d29b1f0000016','565f2ad9856d29cda4000016','565e99bb856d29ced5000016']
						],
						['Julianne Thompson',
							['565e8d4c856d29bf2c00001e','565e985c856d29b1f0000017','565f2ad9856d29cda4000017','565e99bb856d29ced5000017']
						],
						['Jessica Warren-Locke',
							['56595aa7280aabee1f004a09','565e985c856d29b1f0000018','565f2ad9856d29cda4000018','565e99bb856d29ced5000018']
						]
					];
					
					// construct Amy's Navigation with her proper Id
					$amy_nav = '
						<li class="nav-onboarding"><a href="/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Onboarding</a></li>
			            <li class="nav-goals"><a href="/pages/goals/progress/?program_id=2&player_id=' . $allPlayerIds[0][1][1] . '">Goals</a></li>
			            <li class="nav-learning"><a href="/pages/learning/progress/?program_id=3&player_id=' . $allPlayerIds[0][1][2] . '">Learning</a></li>
						<li class="nav-collaboration"><a href="/pages/collaboration/progress/?program_id=4&player_id=' . $allPlayerIds[0][1][3] . '">Collaboration</a></li>
						<li class="nav-guide"><a href="/pages/guide/?program_id=1&player_id=' . $allPlayerIds[0][1][0] . '">Guide</a></li>
						<li class="nav-link outgoing-link"><a href="http://badgeville.io/564a586fa33c439ee30006cc?player_email=amy%40citidemo.badgeville.com" target="_blank">Mobile</a></li>
						<li class="nav-link outgoing-link"><a href="https://badgevilledemos.sharepoint.com"><< Bank Net</a></li>';
					
					// construct Chris' Nav with his proper Id
					$chris_nav = '
						<li class="nav-onboarding"><a href="/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Onboarding</a></li>
			            <li class="nav-goals"><a href="/pages/goals/progress/?program_id=2&player_id=' . $allPlayerIds[1][1][1] . '">Goals</a></li>
			            <li class="nav-learning"><a href="/pages/learning/progress/?program_id=3&player_id=' . $allPlayerIds[1][1][2] . '">Learning</a></li>
						<li class="nav-collaboration"><a href="/pages/collaboration/progress/?program_id=4&player_id=' . $allPlayerIds[1][1][3] . '">Collaboration</a></li>
						<li class="nav-guide"><a href="/pages/guide/?program_id=1&player_id=' . $allPlayerIds[1][1][0] . '">Guide</a></li>
						<li class="nav-link outgoing-link"><a href=http://badgeville.io/564a586fa33c439ee30006cc?player_email=chris%40citidemo.badgeville.com" target="_blank">Mobile</a></li>						
						<li class="nav-link outgoing-link"><a href="https://badgevilledemos.sharepoint.com">Bank Net</a></li>';
							
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
		          </ul>
		        </div><!-- /.navbar-inner -->
		      </div><!-- /.container -->
		    </nav><!-- /.navbar -->
			
			<!-- Fixed header content -->
		    <div class="page-header">
		      <div class="container">
		        <div class="row">
		          <div class="span2">
		            <!-- BVVIZ - img tag to be filled with player image src url (please set with API) -->
					<img class="header-profile-image" src="">
		          </div>
		          <div class="span10">
		            <!-- BVVIZ - h2 tag to be filled with player name (please set on player create) -->
					<h2 class="header-profile-name"></h2>
		            <!-- BVVIZ - p tags to be filled with player name (please set on player create) -->
					<div class="header-profile-info">
		                <p class="header-profile-info-row">
							<span class="header-profile-title"></span>
			                <span class="header-profile-team header-profile-department"></span>
						</p>
						<p class="header-profile-info-row">
							<span class="header-profile-location-city"></span>
							<span class="header-profile-location-country"></span>
						</p>
						<!-- BVVIZ - DIV tag to be filled with playerCard display -->
						<!--<div id="BVVIZ-playerRow" class="bvviz bvviz-playerRow"></div>-->
  		                <!-- BVVIZ - (DIV tag to be filled with playerCard display) -->
  		                <!--<div id="BVVIZ-levelProgress" style="width:150px;" class="bvviz bvviz-levelProgress"></div>-->
					 </div> <!-- /.header-profile-info -->