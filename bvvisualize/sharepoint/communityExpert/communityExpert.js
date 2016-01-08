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
	
	BVVIZ.sp2013.CommunityExpert = new function () {
	    var _this = this;
	    _this.init = init;
	    _this.dispose = dispose;
	    _this.processCommunityExperts = processCommunityExperts;
	    _this.listItems = [];
	    //selector 1: Community Site path
	    _this.communitySiteSelector = ".ms-comm-membersContainer .ms-comm-authorTitle .ms-imnSpan ms-subtleLink, ";
	    //selector 2: Discussion List subject path
	    _this.discussionSelector = ".ms-comm-forumContainer .ms-comm-authorTitle .ms-imnSpan .ms-subtleLink, ";
	    //selector 3: Discussion List threaded view path
	    _this.discussionThreadSelector = ".ms-disc .ms-imnSpan .ms-subtleLink, ";
	    //selector 4: Discussion List flat view path
	    _this.discussionFlatSelector = ".ms-comm-metalineItem .ms-imnSpan .ms-subtleLink, ";
	    //selector 5: Discussion List management view path
	    _this.discussionManagementSelector = ".ms-peopleux-userdetails .ms-imnSpan .ms-subtleLink";

	    new function () {
	        BVVIZ.sp2013.ready.add(init);
	        window.unload = dispose;
	    }

	    function dispose() {
	        _this = null;
	    }

	    function init(success) {
	        bvjQuery(".ms-peopleux-imgUserLink").removeClass("ms-subtleLink").addClass("ms-subtleLink_bv");    // to accomodate similar class assignments
	        setInterval(function () { BVVIZ.sp2013.CommunityExpert.processCommunityExperts(); }, 3000);
	    }

	    function processCommunityExperts() {
	        var communityUsers = bvjQuery(
	            _this.communitySiteSelector +
	            _this.discussionSelector +
	            _this.discussionThreadSelector +
	            _this.discussionFlatSelector +
	            _this.discussionManagementSelector);

	        userIds = {},
	        deferreds = [];

	        if (communityUsers.length > 0) {
	            bvjQuery(communityUsers).each(function (index, value) {
	                var $this = bvjQuery(this),
	                    alreadyFound = $this.data('alreadyFound') || false,
	                    userId;

	                if (!alreadyFound) {
	                    userId = $this.attr('href').split('=')[1];
	                    if (userId.length > 0) {
	                        userIds[userId] = true;
	                        InsertPlayerRow($this.parent().parent(), userId);
	                    }
	                    $this.data('alreadyFound', true);
	                }
	            });

	            bvjQuery.each(userIds, function (userId) {
	                deferreds.push(BindBadgevilleUserInfo(userId));
	            });

	            bvjQuery.when.apply($, deferreds).done(function () {
	                var results = arguments;
	                function getPlayers(getEmails, spUserId) {
	                    BVSDK('players',
	                      null,
	                      {
	                          query: { email: getEmails },
	                          fields: 'all',
	                          includes: ['teams', 'rewards:currentlevels', 'progresses:all_tracks']
	                      }

	                    ).ok(function (data) {
	                        bvjQuery.each(data.players, function (i, player) {
	                            bvjQuery('.bvExpertRow_' + spUserId).each(function () {
	                                BVVIZ.playerRow(bvjQuery(this), player);
	                            });
	                        });
	                    });
	                }

	                bvjQuery.each(results, function (i, value) {
	                    if (value.bvName) {
	                        getPlayers(value.bvName, value.spUserId);
	                    }
	                });
	            });
	        }
	    }

	    function InsertPlayerRow(parentNode, spUserId, index) {
	        var _insertSpan = '<span class="bvExpertRow bvExpertRow_' + spUserId + '" ></span>';
	        bvjQuery(parentNode).after(_insertSpan);
	    }

	    function BindBadgevilleUserInfo(spUserId) {
	        var defered = new bvjQuery.Deferred(),
	            items;

	        var context = SP.ClientContext.get_current();
	        web = context.get_web();
	        var userInfoList = web.get_siteUserInfoList();
	        var camlQuery = new SP.CamlQuery();
	        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>' + spUserId + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
	        items = userInfoList.getItems(camlQuery);
	        context.load(items);
	        context.executeQueryAsync(
	            Function.createDelegate(this, function () {
	                var item = items.itemAt(0),
	                    bvName;
	                if (item) {
	                    BVSDK('emailhash', { 'emailhash': item.get_item('EMail') }).ok(function (data) {
	                        if (data) {
	                            playerHash = data.emailhash;
	                            defered.resolve({
	                                spUserId: spUserId,
	                                bvName: playerHash
	                            });
	                        }                        
	                    });
	                }
	            }),
	            Function.createDelegate(this, function (sender, args) {
	                console.log('Error: ' + args.get_message());
	                defered.reject({
	                    userId: spUserId
	                });
	            })

	        );
	        return defered;
	    }
	}
})(bvjQuery);
