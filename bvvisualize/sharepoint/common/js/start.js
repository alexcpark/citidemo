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

(function () {
    //Only execute this on the top-most window
    ExecuteOrDelayUntilScriptLoaded(BVVIZ.sp2013.ready.load, "sp.js");
    ExecuteOrDelayUntilBodyLoaded(function () {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            RegisterModuleInit("https://bvconnectors.badgeville.com/sharepoint/bvVisualize.js", null);
            //RegisterModuleInit(_spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/Badgeville.SP2013.js", null);
        });
    });

    BVVIZ.sp2013.ready.add(BVVIZ.sp2013.behaviors.init);
    BVVIZ.sp2013.ready.add(BVVIZ.sp2013.visualization.init);

    // Register the listener
    if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('message', sendHostPageInfoListener, false);
    }
    else if (typeof window.attachEvent !== 'undefined') {
        window.attachEvent('onmessage', sendHostPageInfoListener);
    }
})();
