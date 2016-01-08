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
    BVVIZ.sp2013 = BVVIZ.sp2013 || {};

    BVVIZ.sp2013.ready = {
        funcs: [],
        isReady : false,
        readySuccess : false,
        add: function (f) {
            var fcall = f;
            if (typeof f != "function") {
                fcall = new Function(f);
            }
            if(!this.isReady){
                this.funcs[this.funcs.length] = fcall;
            }
            else{
                fcall(this.readySuccess);
            }
        },
        execute: function (success) {
            this.isReady = true;
            this.readySuccess = success;
            for (var i = 0; i < this.funcs.length; i++) {
                try {
                    this.funcs[i](success);
                } catch (ex) {
                    console.log(ex.message);
                }
            }
        },
        load: function () {
            var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/sp.userprofiles.peoplemanager/getmyproperties"
            $.ajax({
              url: url,
              type: "GET",
              headers: { "accept": "application/json;odata=verbose" },
              success: function(data){
                    var email = data.d.Email;
                    var profileProperties = data.d.UserProfileProperties.results;
                    var siteUrl = decodeURIComponent(_spPageContextInfo.siteAbsoluteUrl);
                    var userImage = encodeURIComponent(siteUrl + '/_layouts/15/userphoto.aspx?accountname=' + encodeURIComponent(data.d.Email));
                    
                    if (email && email !== "")
                    {
                        // ugh, really don't like that these are separated.
                        if (window.bvHeaderEnabled === true) {
                            BVVIZ.loadBadgevilleHeader();
                        }

                        var badgevilleId = BVVIZ.encryptEmail( email );
                        var playerObj = {
                            name: data.d.DisplayName,
                            email: badgevilleId,
                            display_name: data.d.DisplayName,
                            image: userImage};    
                             
                        try {
                            BVSDK('players', { players: badgevilleId }).ok( function( findData ) {
                                // player found match
                                var player;
                                if (findData.players && findData.players.length > 0) {
                                  player = findData.players[0];
                                }
                                if ( player.id.length > 0 ) {                                   
                                    // call setPlayer to get notifications
                                    BVVIZ.setPlayer( player.id, function( flag, player ){
                                        if (window.bvHeaderEnabled === true) {
                                            BVVIZ.playerRow(bvjQuery('#BVVIZ-playerRow'), player);
                                        }
                                        BVVIZ.sp2013.ready.execute(true);
                                    });
                                }
                            }).fail(function (data) {
                                // player NOT found, in callback, in addition to using setPlayer to get notification, you also need credit the player for first log in
                                if (data && data.length > 0) {
                                  console.log('Badgeville Player can\'t be found', data.toString() );
                                }
                                // load properties
                                BVVIZ.setPlayer( playerObj, function( flag, player ){       
                                    if (window.bvHeaderEnabled === true) {
                                        BVVIZ.playerRow(bvjQuery('#BVVIZ-playerRow'), player);
                                    }   
                                    BVVIZ.sp2013.ready.execute(true);
                                });                             
                            });
                        } 
                        catch (e) {
                            console.log('Badgeville Site can not be found');
                            return;
                        }
                    }
              },
              error: function(data){console.log(data);}
            });
        }
    };
})(bvjQuery);

// We need to integrate/refactor this into a generalized HTML5 message passing module.
var sendHostPageInfoListener = function (e) {
    if (bvAppWebUrl && bvAppWebUrl.indexOf(e.origin) < 0) return;

    var messageData;
    
    try {
        // Construct the return data to send to the app part
        messageData = JSON.parse(e.data);
    }
    catch (error) {
        console.log("Could not parse the message response.");
        return;
    }
    if (messageData.message == "badgeville.pageView") {
        var returnData = {};
        returnData.action = "badgeville.pageView";
        returnData.player = BVVIZ.currentPlayer;
        returnData.sharePointPageUrl = _spPageContextInfo.siteAbsoluteUrl;
        returnData.contentTitle = document.title;
        var returnDataString = JSON.stringify(returnData);
        e.source.postMessage(returnDataString, e.origin);
    }
    if (messageData.message == "badgeville.mySitePageView") {

        var mySiteuser = BVVIZ.sp2013.utility.getQueryStringParameter('accountname');
        //if (mySiteuser) {
            var returnData = {};

            returnData.action = "badgeville.mySitePageView";
            returnData.sharePointPageUrl = _spPageContextInfo.siteAbsoluteUrl;
            returnData.contentTitle = document.title;
            returnData.player = BVVIZ.currentPlayer;
            returnData.mySitePlayer = decodeURIComponent(mySiteuser);
            var returnDataString = JSON.stringify(returnData);
            e.source.postMessage(returnDataString, e.origin);
        //}
    }
    if (messageData.message == "badgeville.mySitePlayerProfile") {
        var mySiteuser = BVVIZ.sp2013.utility.getQueryStringParameter('accountname');
        //if (mySiteuser) {
            var returnData = {};

            returnData.action = "badgeville.mySitePlayerProfile";
            returnData.player = decodeURIComponent(mySiteuser);
            var returnDataString = JSON.stringify(returnData);
            e.source.postMessage(returnDataString, e.origin);
        //}
    }
    if (messageData.message == "badgeville.mySitePlayerStream") {
        var mySiteuser = BVVIZ.sp2013.utility.getQueryStringParameter('accountname');
        //if (mySiteuser) {
            var returnData = {};

            returnData.action = "badgeville.mySitePlayerStream";
            returnData.player = decodeURIComponent(mySiteuser);
            var returnDataString = JSON.stringify(returnData);
            e.source.postMessage(returnDataString, e.origin);
        //}
    }
};
