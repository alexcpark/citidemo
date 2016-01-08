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

	BVVIZ.sp2013.utility = new function () {

	    var _this = this;
	    _this.loadScript = loadScript;
	    _this.getQueryStringParameter = getQueryStringParameter;
	    _this.getListInfo = getListInfo;

	    new function () {
	        window.onunload = dispose;
	    }

	    function dispose() {
	        _this = null;
	    }
	        
	    function getQueryStringParameter(param) {
	        if (document.URL.indexOf('?') < 0) return;
	        var params = document.URL.split("?")[1].split("&");
	        for (var i = 0; i < params.length; i = i + 1) {
	            var singleParam = params[i].split("=");
	            if (singleParam[0] == param) {
	                return singleParam[1];
	            }
	        }
	    }

	    function getListInfo(elem) {
	        var relatedListId = null;
	        // is this a list view control?
	        bvjQuery(elem).closest(".ms-webpartzone-cell").each(function () {
	            bvjQuery.each(this.attributes, function (i, attrib) {
	                if (attrib.name.indexOf('_relatedlistid') > -1) {
	                    relatedListId = attrib.value;
	                    relatedListId = relatedListId.substring(1, relatedListId.length - 1);
	                    return false;
	                }
	            });
	            if (relatedListId) { return false;}
	        });
	        //is this a list view page?
	        if (!relatedListId) {
	            relatedListId = _spPageContextInfo.pageListId;
	            relatedListId = relatedListId.substring(1, relatedListId.length - 1);
	        }

	        return relatedListId;
	    }
	    
	    function loadScript(url) {
	        var s = document.createElement('script');
	        s.async = true;
	        s.src = url;
	        document.head.appendChild(s);
	    }

	    function logError(sender, args) {
	        var message = args.get_message() + ' [' + args.get_errorCode() + ']';
	        console.log(message);
	    }
	};
})(bvjQuery);
