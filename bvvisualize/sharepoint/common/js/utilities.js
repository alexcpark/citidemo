/*!

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.9

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/
;(function($) {
  BVVIZ.eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  BVVIZ.messageEvent = BVVIZ.eventMethod == 'attachEvent' ? 'onmessage' : 'message';

  // Listen to message from iframe windows
  window[ BVVIZ.eventMethod ]( BVVIZ.messageEvent, function(e) {

    var messageData;
    
    try {
        // Construct the return data to send to the app part
        messageData = JSON.parse(e.data);
    }
    catch (error) {
        //console.log("Could not parse the message response.");
        return;
    }

    if ( messageData.message == 'badgeville.html5Message' ) {
      if ( !BVVIZ.inIframe ) {
        switch( messageData.BVVIZ_action ) {
          case 'notification':
            BVVIZ.showNotifications( messageData );
            break;
          case 'notify':
            BVVIZ.notify( messageData.notification, messageData.size, messageData.playerId );
            break;
          case 'showModal':
          {
            BVVIZ.helper.showModal(eval(messageData.method), messageData.args, messageData.modalArgs);
            break;
          }
          default:
            console.log('Failed to find action for: ' + messageData.BVVIZ_action);
            break;
        }      
      } else {
        window.parent.postMessage( e.data, '*' );
      }
    }

  }, false );

  // Check if this is in top window
  BVVIZ.inIframe = function() {
    try {
      return window.self !==  window.top;
    } catch (e) {
      try {
        return window.parent.frames.length > 0
      } catch(e) {
        return true;
      }
    }
  }();

  BVVIZ.loadBadgevilleHeader = function() {
      if (window.frameElement == null) {
        var menu = document.getElementById('welcomeMenuBox');
        if (!menu) { //O365 deployment.
          var o365Main = document.getElementById('O365_MainLink_Me');
          if (o365Main) {
            menu = o365Main.parentElement;
            var div = document.createElement('div');
            div.id = 'BVVIZ-playerRow';
            div.setAttribute('class', 'o365cs-nav-button')
            div.setAttribute('style', 'display: inline-block;height:30px;width:115px;vertical-align:middle;');
            menu.insertBefore(div, menu.firstChild);
          }
          else {
            o365Main = document.getElementsByClassName('o365cs-nav-rightMenus')[0];
            if (o365Main) {
              menu = o365Main.getElementsByClassName('o365cs-nav-topItem')[0].parentNode;
              var div = document.createElement('div');
              div.id = 'BVVIZ-playerRow';
              div.setAttribute('style', 'display: inline-block;height:50px;width:115px;vertical-align:middle;');
              menu.appendChild(div);
            }
          }
        } else{
          var div = document.createElement('div');
          div.id = 'BVVIZ-playerRow';
          div.setAttribute('style', 'display: inline-block;height:30px;width:115px;vertical-align:middle;');
          menu.insertBefore(div, menu.firstChild);
        }
      }
  };
})(bvjQuery);
