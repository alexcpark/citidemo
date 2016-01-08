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
	BVVIZ.sp2013.behaviors = {
	    init: function(){
	        var activity = {}
	        activity.content_url = encodeURIComponent( window.location.origin + _spPageContextInfo.serverRequestPath);
	        activity.content_title = encodeURIComponent(document.title);
	        
	        // note credit
	        if (window.bvNotesCredit && window.bvNotesCredit != "") {
	            var microfeed = bvjQuery("#ms-microfeeddiv");
	            if (microfeed.length > 0) {
	                bvjQuery(microfeed).bind('click', function (event) {// create a new post
	                    var target = bvjQuery(event.target);
	                    if (target.is("#ms-postbutton") || target.is("[id*='ms-postreplybutton']")) {
	                            activity.verb = bvNotesCredit;
	                            BVVIZ.credit(BVVIZ.currentPlayer, activity);
	                    }
	                });
	            }
	        }

	        // like credit
	        bvjQuery(".ms-webpartzone-cell").bind('click', function (event) {
	            var target = bvjQuery(event.target);

	            if (target.is("a[id^='ms-likebutton']:not(:contains('Like'))")) {
	                if (window.bvLikeCredit && window.bvLikeCredit != "") {
	                    activity.verb = bvLikeCredit;
	                    BVVIZ.credit(BVVIZ.currentPlayer, activity);
	                }
	            }
	            else if (target.is("a[id^='likesElement']:not(:contains('Unlike'))")) {
	                var listId = BVVIZ.sp2013.utility.getListInfo(target);
	                var itemId = "";
	                if (bvjQuery(target).attr("id").indexOf('likesElement') > -1) {
	                    itemId = bvjQuery(target).attr("id").split('-')[1];
	                }
	                else {
	                    itemId = bvjQuery(target).closest("tr").attr("id").split(',')[1];
	                }

	                if (itemId.indexOf("best") > -1) {
	                    itemId = itemId.substring(4, itemId.length);
	                }

	                BVVIZ.sp2013.behaviors.creditUserFromList(BVVIZ.currentPlayer, 'Like', activity, listId, itemId);
	            }
	        });

	        // rating
	        var elements = bvjQuery("span.ms-comm-ratingsImageContainer > img");
	        if (elements.length && bvRatingCredit != null) {
	            elements.click(function () {
	                var listId = BVVIZ.sp2013.utility.getListInfo(this);
	                var itemId = "";
	                var itemContainer = bvjQuery(this).closest("span[id^='averageRatingElement']");
	                if (itemContainer) {//id.indexOf('likesElement')>-1){
	                    itemId = bvjQuery(itemContainer).attr("id").split('-')[1];
	                }
	                else{
	                    itemId = bvjQuery(this).closest("tr").attr("id").split(',')[1];
	                }

	                if (itemId.indexOf("best") > -1) {
	                    itemId = itemId.substring(4, itemId.length);
	                }

	                var activity = {}
	                activity.verb = bvRatingCredit;
	                activity.content_url = encodeURIComponent(_spPageContextInfo.siteAbsoluteUrl);
	                activity.content_title = encodeURIComponent(document.title);

	                BVVIZ.sp2013.behaviors.creditUserFromList(BVVIZ.currentPlayer, 'Rate', activity, listId, itemId);
	            });
	        }

	        //download credit
	        document.addEventListener('click', function (e) {
	            var elem, evt = e ? e : event;

	            if (evt.srcElement) {
	                elem = evt.srcElement;
	            }
	            else if (evt.target) {
	                elem = evt.target;
	            }
	            var closestAnchor = bvjQuery(elem).closest("a");
	            var dlButtonClicked = (bvjQuery(closestAnchor).attr("id") == 'Ribbon.Documents.Copies.Download-Large');
	            var dlLinkClicked = (bvjQuery(closestAnchor).attr("id") == 'ID_DownloadACopy');

	            if (dlButtonClicked || dlLinkClicked) {
	                var selectedRow = bvjQuery("tr.s4-itm-selected");
	                var listId = BVVIZ.sp2013.utility.getListInfo(selectedRow);
	                var itemId = bvjQuery(selectedRow).attr("id").split(',')[1];

	                if (listId == "") {
	                    listId = _spPageContextInfo.pageListId;
	                    listId = listId.substring(1, listId.length - 1);
	                }

	                BVVIZ.sp2013.behaviors.creditUserFromList(BVVIZ.currentPlayer, 'Download', activity, listId, itemId);
	            }
	        }, true);

	        //search credit
	        var searchTerm = BVVIZ.sp2013.utility.getQueryStringParameter('k');
	        if (searchTerm && window.bvSearchCredit && window.bvSearchCredit != '')
	        {
	            activity.verb = bvSearchCredit;
	            activity.search_term = searchTerm;
	            BVVIZ.credit(BVVIZ.currentPlayer, activity);
	        }
	    },
	    creditUserFromList: function (currentPlayer, behavior, activity, listId, itemId) {
	        bvjQuery.ajax({
	            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('BadgevilleConfiguration')/items?$filter=Operation eq '" + behavior + "' and Title eq '" + listId + "'",
	            method: "GET",
	            headers: { "Accept": "application/json; odata=verbose" },
	            success: function (data) {
	                if (data.d.results && data.d.results.length > 0) {
	                    bvjQuery.each(data.d.results, function (index, element) {
	                        activity.verb = element.Verb;
	                        var creditPlayer = element.CreditPlayer;
	                        var attributeMap = JSON.parse(element.ListMap);

	                        var ctx = new SP.ClientContext.get_current();
	                        var web = ctx.get_web();
	                        var list = web.get_lists().getById(listId);

	                        var item = list.getItemById(itemId);
	                        ctx.load(item);

	                        ctx.executeQueryAsync(function () {
	                            for (var i = 0; i < attributeMap.length; i++) {
	                                activity[attributeMap[i].key] = item.get_item(attributeMap[i].value);
	                            }

	                            var spUser = item.get_item(creditPlayer);
	                            if (spUser && spUser.get_email) {
	                                var email = spUser.get_email();
	                                BVSDK('emailhash', { 'emailhash': email }).ok(function (data) {
	                                    if (data) {
	                                        playerHash = data.emailhash;
	                                        BVVIZ.credit(playerHash, activity);
	                                    }
	                                });
	                            }

	                            //if (creditOp) {
	                            //    var spUser = item.get_item('Author');
	                            //    if (spUser) {
	                            //        var email = spUser.get_email();
	                            //        BVSDK('emailhash', { 'emailhash': email }).ok(function (data) {
	                            //            if (data) {
	                            //                playerHash = data.emailhash;
	                            //                badgeville.sp2013.behaviors.credit(playerHash, activity);
	                            //            }
	                            //        });
	                            //    }
	                            //}
	                            //else {
	                            //    badgeville.sp2013.behaviors.credit(currentPlayer, activity);
	                            //}
	                        },
	                        Function.createDelegate(this, BVVIZ.sp2013.utility.logError));
	                    });
	                }
	            },
	            error: function () { }
	        });
	    }
	};
})(bvjQuery);
