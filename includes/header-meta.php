<!DOCTYPE HTML>
<!--

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.8

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

-->
<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<title>Badgeville: Citi Smarter Worklife Challenge</title>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="Description" content="">
		<meta name="Keywords" content="">
		<meta name="robots" content="noindex, nofollow"><!-- REMEMBER TO REMOVE -->
		<link rel="icon" href="./favicon.ico" type="image/x-icon" />
		<link rel="shortcut icon" href="./favicon.ico" />
		<link rel="icon" type="image/ico" href="./favicon.ico" />
		
	    <!--
	      DEPLOYMENT NOTE: The following files should be merged together and minified and/or
	                       obfuscated during deployment for optimal performance.
	    -->
		
	    <!-- JQUERY FILES - NOT INCLUDED IN THIS ZIP FILE -->
	      <!-- Include a working version of JQuery for the current browser -->
	      <!--[if IE 8]>
	        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	      <![endif]-->
	      <!--[if gt IE 8]>
	        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	      <![endif]-->
	      <!--[if !IE]-->
	        <script src="/js/jquery.min.js"></script>
	      <!--[endif]-->
	      <!-- Include a working version of JQuery UI for the current browser -->
	      <script src="/js/jquery-ui.min.js"></script>
	      <link href="/css/jquery-ui.css" rel="stylesheet" type="text/css">
		
	    <!-- Bootstrap Frontend Library -->
	      <link href="/css/bootstrap.min.nr.css" rel="stylesheet">
		
	    <!-- BVSDK FILES - NOT INCLUDED IN THIS ZIP FILE -->
	      <!-- Original, Include the BVSDK library
	        <script src="./js/badgeville.js#key=9c2bcfccb3074a941b91b6133bf1882e&sites_id=562e576062f1c1c7ea000995"></script>
		  -->
		  
		  <!-- Beta-testing BVSDK Library -->
	  
		  <?php
		  
		  /***********
		  * Construct the proper URL for site initialization
		  ************/
		  
		  // Define function for retrieving program ID
		  function getProgramId() {
			  // Grab URL
			  $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
			  // Parse the URL
			  $parts = parse_url($url);
			  // Parse out the parts
			  parse_str($parts['query'], $query);
			  // Store for return
			  $result = $query['program_id'];
			  // Return
			  return $result;
		  }
		  
		  // Store Keys
		  $site_keys = [
			  ['9dd5467dc19d5d4f4661c4b91e4a6f29', '56420d8c280aab4561001e17'], // Program ID & Key
			  ['9dd5467dc19d5d4f4661c4b91e4a6f29', '56439a91392bd9b347001628'], // Program ID & Key
			  ['9dd5467dc19d5d4f4661c4b91e4a6f29', '56420de8d1b4cfb899001bde'], // Program ID & Key
			  ['9dd5467dc19d5d4f4661c4b91e4a6f29', '564245bdd1b4cfbf41001e3a'] // Program ID & Key
		  ];
		  
		  $programId = getProgramId();
		  $url_base = 'https://api.v2.badgeville.com/sdk/js/v1/badgeville.js#';
		  // craft urls
		  $url_program1 = '<script src="' . $url_base . 'key=' . $site_keys[0][0] . '&sites_id=' . $site_keys[0][1] .'"></script>'; // onboarding url
		  $url_program2 = '<script src="' . $url_base . 'key=' . $site_keys[1][0] . '&sites_id=' . $site_keys[1][1] .'"></script>'; // goals url
		  $url_program3 = '<script src="' . $url_base . 'key=' . $site_keys[2][0] . '&sites_id=' . $site_keys[2][1] .'"></script>'; // learning url
		  $url_program4 = '<script src="' . $url_base . 'key=' . $site_keys[3][0] . '&sites_id=' . $site_keys[3][1] .'"></script>'; // collaboration url
		  
		  // Print Choice
		  switch ($programId) {
		      case '1':
		          echo $url_program1;
		          break;
		      case '2':
		          echo $url_program2;
		          break;
		      case '3':
		          echo $url_program3;
		          break;
		      case '4':
		          echo $url_program4;
		          break;
		      case '5':
		          echo $url_program1;
				  break;
			  default:
			  	  echo $url_program1;
				  break;
		  }
		 ?> 

		
	    <!-- REQUIRED BVVIZ FILES (ORIGINAL) -->
	      <!-- Include the global BVVIZ files -->
	      <script src="/libraries/bvvisualize/common/js/bvviz.js"></script>
	      <link href="/libraries/bvvisualize/common/css/bvviz.css" rel="stylesheet" type="text/css" />

	      <!-- Include the utility file -->
	      <script src="/libraries/bvvisualize/common/js/utilities.js"></script>

	      <!-- Include the playerCard files -->
	      <script src="/libraries/bvvisualize/playerCard/playerCard.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerCard.css" rel="stylesheet" type="text/css" />
		  
	      <!-- Include the playerMeta files -->
	      <script src="/libraries/bvvisualize/playerMeta/playerMeta.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerMeta.css" rel="stylesheet" type="text/css" />

	    <!-- OPTIONAL BVVIZ FILES (ORIGINAL) -->
	      <!-- These sets are optional and need only be included if you want the functionality involved -->
	      <script src="/libraries/bvvisualize/playerProfile/playerProfile.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerProfile.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/playerRewards/playerRewards.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerRewards.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/playerMissions/playerMissions.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerMissions.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/playerTracks/playerTracks.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerTracks.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/levelProgress/levelProgress.js"></script>
	      <link href="/libraries/bvvisualize/common/css/levelProgress.css" rel="stylesheet" type="text/css" />
		  
	      <script src="/libraries/bvvisualize/missionProgress/missionProgress.js"></script>
	      <link href="/libraries/bvvisualize/common/css/missionProgress.css" rel="stylesheet" type="text/css" />
		  
	      <script src="/libraries/bvvisualize/missionTutorial_Ra/missionTutorial_Ra.js"></script>
	      <link href="/libraries/bvvisualize/common/css/missionTutorial.css" rel="stylesheet" type="text/css" />
		  
	      <script src="/libraries/bvvisualize/missionTutorial/missionTutorial.js"></script>
	      <link href="/libraries/bvvisualize/common/css/missionTutorial.css" rel="stylesheet" type="text/css" />
		  
	      <script src="/libraries/bvvisualize/playerStats/playerStats.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerStats.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/trackProgress/trackProgress.js"></script>
	      <link href="/libraries/bvvisualize/common/css/trackProgress.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/rewardProgress/rewardProgress.js"></script>
	      <link href="/libraries/bvvisualize/common/css/rewardProgress.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/leaderboard/leaderboard.js"></script>
	      <link href="/libraries/bvvisualize/common/css/leaderboard.css" rel="stylesheet" type="text/css" />

	      <script src="/libraries/bvvisualize/playerStream/playerStream.js"></script>
	      <link href="/libraries/bvvisualize/common/css/playerStream.css" rel="stylesheet" type="text/css" />
		  
	      <script src="/libraries/bvvisualize/siteStream/siteStream.js"></script>
	      <link href="/libraries/bvvisualize/common/css/siteStream.css" rel="stylesheet" type="text/css" />
		
	    <!-- REQUIRED & OPTIONAL BVVIZ FILES (CONSOLIDATED)-->
	      <!-- Original production, BVVIZ FILES - CLOUD
	        <link rel="stylesheet" href="http://bvconnectors.badgeville.com/bvviz/current/bvVisualize-light-teal.css" type="text/css" />
	        <script src="http://bvconnectors.badgeville.com/bvviz/current/bvVisualize.js"></script>
	      -->
		
	      <!-- Beta-testing, BVVIZ FILES - LOCAL -->
			<link rel="stylesheet" href="/css/bvVisualize-light-teal_debug.css" type="text/css">
	        <!--<script src="/js/bvVisualize_debug.js"></script>-->
		
		<!-- REQUIRED TEMPLATE FILES -->
		  <!-- These sets are required and cover additional specifically for this template or demo -->
		  <script type="text/javascript" src="/js/bv-template.js"></script>
		  <link rel="stylesheet" href="/css/bv-template.css" type="text/css" media="screen" />
	</head>