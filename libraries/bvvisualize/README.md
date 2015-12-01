JavaScript JS SDK Preconfigured Visualizations
==============================================

Version 1.3.8

The preconfigured visualization package contains HTML and Javascript source code, which you can choose to use as-is, modify or extend to meet your needs and brand image, or simply use as inspirational reference. These visualizations were created to serve as examples of what you can display on your website or in your application to bring your engagement program to life. 

* You can access the visualization package (downloadable zip file) and related learning materials in the documentation section of our community: https://community.badgeville.com/node/10316/
* The source code for the visualization package is provided, allowing you to more easily customize the layout and display of information. In addition to common files, each visual has its own JavaScript and CSS file that you can change as needed, and you can even modify the API calls to retrieve different data.
* You host the JavaScript and CSS code for the visualizations on your own servers. We recommend that you include these files in any minification and/or obfuscation processes that you normally run for optimal performance of your website. 
* Badgeville officially supports the default visualization packages only. While we encourage your organization to customize the code to meet your brand needs and individual use cases, we unfortunately can't provide support or troubleshooting expertise once you modify or alter the code in any way.
* You must abide by the license terms of this software, and you must reference the software license in your work as described in the agreement: http://source.badgeville.com/license.



Changes and fixes:

CVIZ-129 RewardProgress support time-reset enabled reward detail display
CVIZ-131 Replace the grey mini checkmark with SVG image in custom container
CVIZ-132 Create a new missionRewards visualization
CVIZ-133 Create a new trackMissions visualization
CVIZ-134 Mission container and track container code clean up and packaging
CVIZ-135 Cairo Viz - Connectors - Provide full ROYGBIV + Grayscale Precompiled Stylesheets
CVIZ-136 Vertical leaderboard tabs dimensions expand to multiline space
CVIZ-137 Change Cairo Visualization deploy process using Docker Container, include _scripts folder into the zip file
CVIZ-140 Include playerRow visualization into main branch
CVIZ-141 Enhance the options for missionRewards and trackMissions
CVIZ-144 Remove pageSize from missionRewards, trackMission, customContainer
CVIZ-146 Swap the level track and level mission image with current level image

* Add Docker container build server scripts triggered by source commit