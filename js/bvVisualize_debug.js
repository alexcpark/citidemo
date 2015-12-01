/*! Build f0bde5c80da1  */
/*!
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);
/*!
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();
/*!
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
* The dateFormat function has been modified to avoid namespace conflict. It has been intergrated into bvVisualize.js
*/
/*!
 * <progress> polyfill by Lea Verou, under MIT license 
 * @author Lea Verou http://leaverou.me
 * https://github.com/LeaVerou/HTML5-Progress-polyfill
 * The js and css files have been customized and intergrated into bvVisualize.js
 */
/*!

Badgeville JS SDK Preconfigured Visualizations
Version 1.3.8

Copyright 2014 Badgeville, Inc.

Licensed under Badgeville's Free Software License Agreement (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at http://source.badgeville.com/license
Unless required by applicable law or mutually agreed to in writing, software distributed under the License is 
distributed on an "AS-IS" BASIS, WITHOUT WARRANTIES, COMMITMENTS OR LIABILITY OF ANY KIND, either express or 
implied. See the License for the specific language governing rights, permissions, restrictions and limitations 
under the License.

*/

var BVVIZ = {};

;(function($) {
BVVIZ = {

  // Default options to initialize individual visualization component
  options: {

    leaderboard: {
      // Leaderboard orientation, false for 'vertical', true for 'horizontal', default is false
      isHorizontal: false,

      // The number of Ranks that will be requested in a single API call
      pageSize: 10,

      // Leaderboard title displayed in the header, if it's undefined, the default 'Leaderbaord' is displayed
      headerTitle: 'Leaderboard',

      // Initial leaderboard load setting, true for player-relative, false for top-rank, default to player-relative
      loadRelative: true,

      // The current player's display index when player-relative is applied
      showMeIndex: 3,

      // The index of leaderbard being active on initial loading
      activeOnLoad: 0
    },

    playerProfile: {
      // Player Summary options
      unitBar: {

        // Module list and order
        modules: [ 'units', 'level', 'expertise', 'teams', 'activities' ],

        // Titles displayed in the unitbar for each module
        titles: { 'level': 'Level',
                  'expertise': 'Expertise',
                  'teams': 'Teams',
                  'activities': 'Recent Activity'
                }
      }
    },

    playerCard: {
      // Player Summary options
      unitBar: {

        // Module list and order
        modules: [ 'units', 'level', 'expertise', 'teams', 'activities' ],

        // Titles displayed in the unitbar for each module
        titles: { 'level': 'Level',
                  'expertise': 'Expertise',
                  'teams': 'Teams',
                  'activities': 'Recent Activity'
                }
      }
    },

    playerHeader: {
      // Player Summary options
      unitBar: {
        // Player Summary spread single line or multi lines, should be always single line for playerHeader
        singleLine: true,

        // Module list and order, recent activities is not applicable
        modules: [ 'units', 'level', 'expertise', 'teams' ]

        // There is no titles for each module in player header 
      },

      // The max number of Players that will be bundled together in in a single API request, default is 30
      pageSize: 30
    },

    playerRow: {
      // Maximum icons to be displayed. By default show only 3 icons, exincluding the points display
      maxIcons: 4
    },

    playerRewards: {
      // Whether the header should be rendered
      inline: false,

      // The title displayed in the header, default 'Reward' is displayed
      headerTitle: 'Rewards',

      // The number of rewards that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of rewards that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 30,

      // Category can be used to filter the data, default is null which request all cards, example: 'education'
      category: null,

      // Whether the cards are rendered as the child content inside a custom container
      childContentCards: false,

      // Callback function, evoked before the cards API request are sent out 
      beforeRequestCallback: null,

      // Callback function, evoked when all cards loading are completed
      callback: null,

      badges: {
        // badgeBackgroundColor can override default CSS background color
        badgeBackgroundColor: '',

        // badgeFontColor can override default CSS font color
        badgeFontColor: '',

        // Show or hide badge border
        showBadgeBorder: true,

        // Show or hide badge name
        showName: true,

        // Show or hide category for debug purposes
        showCategory: false,

        // Show or hide badge progress fraction
        showProgress: true,

        // Show or hide unearned badge icons
        showUnearned: true,

        // Replace unearned badge icons with default question mark images
        lockUnearned: false,

        // miniBadge shows a smaller badge icon
        miniBadge: false
      }
    },

    playerMissions: {
      // Whether the header should be rendered
      inline: false,

      // The title displayed in the header, default 'Mission Cards' is displayed
      headerTitle: 'Mission Cards',

      // The number of missions that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of missions that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10,

      // Category can be used to filter the data, default is null which request all cards, example: 'education'
      category: null,

      // Whether the cards are rendered as the child content inside a custom container
      childContentCards: false,

      // Callback function, evoked before the cards API request are sent out 
      beforeRequestCallback: null,

      // Callback function, evoked when all cards loading are completed
      callback: null,

      badges: {
        // badgeBackgroundColor can override default CSS background color
        badgeBackgroundColor: '',

        // badgeFontColor can override default CSS font color
        badgeFontColor: '',

        // Show or hide badge border
        showBadgeBorder: true,

        // Show or hide badge name
        showName: true,

        // Show or hide badge progress fraction
        showProgress: true,

        // Show or hide category for debug purposes
        showCategory: false,

        // miniBadge shows a smaller badge icon
        miniBadge: false
      }
    },

    playerTracks: {
      // Whether the header should be rendered
      inline: false,

      // The title displayed in the header, default 'Track Cards' is displayed
      headerTitle: 'Track Cards',

      // The number of tracks that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of tracks that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10,

      // Category can be used to filter the data, default is null which request all cards, example: 'education'
      category: null,

      // Whether the cards are rendered as the child content inside a custom container
      childContentCards: false,

      // Callback function, evoked before the cards API request are sent out 
      beforeRequestCallback: null,

      // Callback function, evoked when all cards loading are completed
      callback: null,

      badges: {
        // badgeBackgroundColor can override default CSS background color
        badgeBackgroundColor: '',

        // badgeFontColor can override default CSS font color
        badgeFontColor: '',

        // Show or hide badge border
        showBadgeBorder: true,

        // Show or hide badge name
        showName: true,

        // Show or hide badge progress fraction
        showProgress: true,

        // Show or hide category for debug purposes
        showCategory: false,

        // miniBadge shows a smaller badge icon
        miniBadge: false
      }
    },

    rewardProgress: {
      // Whether the header should be rendered
      inline: false,

      // The number of rewards that will be requested in a single API call, default is 10
      pageSize: 10,

      // The max number of rewards that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 30
    },

    missionProgress: {
      // Whether the header should be rendered
      inline: false,

      // The number of items that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of missions that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10
    },

    missionTutorial: {
      // Whether the header should be rendered
      inline: false,

      // The number of items that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of missions that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10,

      // Parameters for converting to alternate visualization on completion of this tutorial
      // 0 - display current mission tutorial without alternation
      // 1 - site stream, site stream ID is required, options object can be applied
      // 2 - player stream, following stream ID is required, options object can be applied
      // 3 - vertical leaderboard, leaderboard IDs are required, options object can be applied
      // 4 - player profile, options object can be applied
      alternateVisual: {
        // Valid values include: 'siteStream', 'playerStream', 'leaderboard', 'playerProfile'
        visualName: null,

        // This value is required when visualName is 'siteStream' or 'playerStream'
        streamId: null,

        // This value is required when visualName is 'leaderboard'
        leaderboardId: null,

        // This options object can be passed into alternate visualization
        options: null
      },

      list: {
        // Whether display the reward badge icon
        showBadgeIcon: true,

        // Whether replace the hint text with the reward progress, default should display the hint text
        showItemProgress: false
      },

      // Callback on progress being completed, default function is to convert to alternate visualization
      progressCompleteCallback: function( _this, alternateArgs ) {
        var target,

            // Predefined list which can be used as the alternate visualization
            targetVisual = [ 'siteStream', 'playerStream', 'leaderboard', 'playerProfile' ];

        // "_this" and "alternateArgs" must be an object instance
        if ( typeof( _this ) !== 'object' || typeof( alternateArgs ) !== 'object' ) {
           return false;
        }

        // namedParam must be provided as a public function
        if ( !$.isFunction( _this.namedParam ) ) {
           return false;
        }

        // Alternate Visual name must be provided as a string, it should also match one of the predefined visualizations
        if ( typeof( alternateArgs.visualName ) !== 'string' || $.inArray( alternateArgs.visualName, targetVisual ) < 0 ) {
          return false;
        }

        // Allow for target to be provided as a string or JQuery object
        target = $( _this.namedParam( 'target') );

        // Handle error conditions due to invalid inputs:
        // Only a single DOM element is allowed per instance
        if ( target.length < 0 || target.length > 1 ) {
          throw new Error( '"target" must reference a single DOM node.' );
        }

        // Try to render the alternate visualization...
        try {
          switch ( alternateArgs.visualName ) {
            case 'siteStream':
              _this = BVVIZ[ alternateArgs.visualName ].call( this, target, alternateArgs.streamId, alternateArgs.options );
              return true;
              break;
            case 'playerStream':
              _this = BVVIZ[ alternateArgs.visualName ].call( this, target, alternateArgs.streamId, _this.namedParam( 'playerId'), alternateArgs.options );
              return true;
              break;
            case 'leaderboard':
              _this = BVVIZ[ alternateArgs.visualName ].call( this, target, alternateArgs.leaderboardId, alternateArgs.options );
              return true;
              break;
            case 'playerProfile':
              _this = BVVIZ[ alternateArgs.visualName ].call( this, target, _this.namedParam( 'playerId'), alternateArgs.options );
              return true;
              break;
            default:
              return false;
          }

        } catch (e) {
          return BVVIZ.helper.showError( 'Alternate visualization fail to be initialized: ', e );
        }
      }
    },

    missionRewards: {
      // Whether the header should be rendered
      inline: false,

      // Whether the containter frame (i.e. header, border and background) should be displayed
      showContainerFrame: true,

      // The title displayed in the header, default the mission name is displayed
      headerTitle: '',

      // Whether display the container description, normally it describes the identifier such as categories
      showDescription: false,

      // Container description text
      description: '',

      // Override default container description CSS font color
      descriptionFontColor: '',

      // The number of Missions that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of missions that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10,

      // Whether the cards are rendered as the child content inside a custom container
      childContentCards: false,

      badges: {
        // badgeBackgroundColor can override default CSS background color
        badgeBackgroundColor: '',

        // badgeFontColor can override default CSS font color
        badgeFontColor: '',

        // Show or hide badge border
        showBadgeBorder: true,

        // Show or hide badge name
        showName: true,

        // Show or hide badge progress fraction
        showProgress: true,

        // Show or hide unearned badge icons
        showUnearned: true,

        // Replace unearned badge icons with default question mark images
        lockUnearned: false,

        // miniBadge shows a smaller badge icon
        miniBadge: false
      }
    },

    trackProgress: {
      // Whether the header should be rendered
      inline: false,

      // The number of items that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of missions that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10
    },

    trackMissions: {
      // Whether the header should be rendered
      inline: false,

      // Whether the containter frame (i.e. header, border and background) should be displayed
      showContainerFrame: true,

      // The title displayed in the header, default the track name is displayed
      headerTitle: '',

      // Whether display the container description, normally it describes the identifier such as categories
      showDescription: false,

      // Container description text
      description: '',

      // Override default container description CSS font color
      descriptionFontColor: '',

      // The number of tracks that will be requested in a single API call, default is 10
      // When set to 0, all data should be requested
      pageSize: 10,

      // The max number of tracks that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10,

      // Whether the cards are rendered as the child content inside a custom container
      childContentCards: false,

      badges: {
        // badgeBackgroundColor can override default CSS background color
        badgeBackgroundColor: '',

        // badgeFontColor can override default CSS font color
        badgeFontColor: '',

        // Show or hide badge border
        showBadgeBorder: true,

        // Show or hide badge name
        showName: true,

        // Show or hide badge progress fraction
        showProgress: true,

        // miniBadge shows a smaller badge icon
        miniBadge: false
      }
    },

    customContainer: {
      // Whether the header should be rendered
      inline: true,

      // Whether the containter frame (i.e. header, border and background) should be displayed
      showContainerFrame: true,

      // The title displayed in the header, default 'Achievements' is displayed
      headerTitle: 'Achievements',

      // Whether display the container description, normally it describes the identifier such as categories
      showDescription: true,

      // Container description text
      description: '',

      // Override default container description CSS font color
      descriptionFontColor: '',

      // Category can be used to filter the data, default is null which request all cards, example: 'education'
      category: '',

      // Contents and the order included in the custom container, default has all 3 types
      contentsTypes: ['tracks', 'missions', 'rewards'],

      // Contents options
      contents: {

        // Default setting for passing to the sub content - it's always set to 0, all data should be requested
        pageSize: 0,

        // Default setting for passing to the sub content - it's always set to true, 
        // Indicating the cards are rendered as the child content inside a custom container
        childContentCards: true,

        badges: {
          // badgeBackgroundColor can override default CSS background color
          badgeBackgroundColor: '',

          // badgeFontColor can override default CSS font color
          badgeFontColor: '',

          // Show or hide badge border
          showBadgeBorder: true,

          // Show or hide badge name
          showName: true,

          // Show or hide badge progress fraction
          showProgress: true,

          // Show or hide category for debug purposes
          showCategory: false,

          // Show or hide unearned badge icons (only applicable to Rewards)
          showUnearned: true,

          // Replace unearned badge icons with default question mark images (only applicable to Rewards)
          lockUnearned: true,

          // miniBadge shows a smaller badge icon
          miniBadge: false
        }
      }
    },

    siteStream: {
      // Whether the header should be rendered
      inline: false,
     
      // Reserve a callback handler on completion of stream item
      itemCompleteCallback: null 
    }
  },

  setOptions: function( visualization, options ) {
    var mandatoryProp = {};

    // Check if current visualization has options configured
    if ( BVVIZ.utility.validateNestedObj( BVVIZ.options, visualization ) ) {
      // Note: some of the visualization default properties are mandatory settings, hence should be protected from overwritten
      if ( visualization ===  'playerHeader' ) {
        mandatoryProp = {
          unitBar : { singleLine: true }
        };
      }

      // Merge passed option into default options
      BVVIZ.options[ visualization ] = BVVIZ.utility.recursiveOverwrite( BVVIZ.options[ visualization ], options, mandatoryProp );
    } else {

      return false;
    }
  },

  // Common helper methods
  helper: {

    // Indicates that data is loading
    loading: function( locationClass ) {
      return $('<div class="bvviz-loading' + ( locationClass ? ' ' + locationClass : '' ) + '">' +
        '<span id="bvviz-loading_1"></span>' + 
        '<span id="bvviz-loading_2"></span>' + 
        '<span id="bvviz-loading_3"></span>' + 
      '</div>');
    },

    // Controls how errors are displayed
    showError: function( targets, data ) {
      if ( $.isPlainObject( data ) ) {
        targets.html( '' );
        throw new Error( 'Badgeville JSSDK Error ' + data.errors[0].code + ': ' + data.errors[0].messages[0] );
      } else {
        targets.html( '' );
        throw new Error( data );
      }
    },

    // Use this method to show a visualization as a modal popup.
    showModal: function( method, args, modalArgs ) {
      var target = $( '<div></div>' );

      // Extend the passed in modal options with the defaults we assume
      modalArgs = $.extend({
        modal: true,
        show: 400,
        width: 380,
        height: 490,
        resizable: false,
        draggable: false,
        dialogClass: 'bvviz',
        open: function() {
          var dialog = $( '.ui-dialog:last' );
          // Use the dialog container as the first argument (the "target")
          args.unshift( $( this ) );

          // Trigger the method, passing in the adjusted arguments
          method.apply( BVVIZ, args );

          // Close the dialog when the overlay is clicked on
          $( '.ui-widget-overlay:last' ).one( 'click', function() {
            $( '.ui-dialog-titlebar-close', dialog ).trigger( 'click' );
          });

        },
        close: function() {
          // Destroy the dialog to remove it from the DOM
          target.dialog( 'destroy' );
          target.remove();
        }
      },
      modalArgs );
      
      // Trigger the dialog with the arguments
      target.appendTo( 'body' ).dialog( modalArgs );
    },

    // Slideshow of player or team units
    unitBar: function( target, playerOrTeam, options ) {
      // This visualization component needs to render in a timeout in order to ensure it's actually part of the DOM
      window.setTimeout( function() {

        // Define the container for all the items in the unitBar
        var unitBarItems = $( '<div class="bvviz-unitbar-items"></div>' ),

        // Define a container that all the unit displays will be placed into
            container = $( '<div class="bvviz-unitbar-container"></div>' ),

        // Boundry element to limit how much dragging can be done
            boundry = $( '<div class="bvviz-unitbar-boundry"></div>' ),

        // Store how wide the row of units is
            unitsWidth = 0,

        // We'll use the container's width a few times, so store it
            targetWidth = target.width(),

        // These will be used for dragging
            leftArrow, rightArrow, maxLeft, unitWidth,

        // Store the passed options, rendered html on various configuration
            settings, render, 

        // Store the total unit type count including 'points', it shows no more than 3 in multiline display
            unitCount = 0;

        options = $.isPlainObject( options ) ? options : {};

        // Override the default settings from options parameter
        if ( options.visualization === 'playerCard' ) {
          settings = $.extend( {}, BVVIZ.options.playerCard.unitBar, options );
        } else if ( options.visualization === 'playerHeader' ) {
          settings = $.extend( {}, BVVIZ.options.playerHeader.unitBar, options );
        } else {
          settings = $.extend( {}, BVVIZ.options.playerProfile.unitBar, options );
        }

        // NOTE: The order of the below appends can be changed based on the desired order of display
        //        By default: points display first, then levels, then expertise, then teams, then recent activity

        // The functions in the "render" object control the DOM structure created for each unitbar module
        // 'units', 'level', 'expertise', 'teams', 'activities'
        render = {
          // A combined unitbar module on all units (player or team), render multi line display
          units: function( playerOrTeam ) {
            var title = BVVIZ.utility.validateNestedObj( settings, 'titles', 'units' ) ? settings.titles.units : '',
                units = $( '<div class="bvviz-unit">' )
              .append(
                title ? $( '<div class="bvviz-title bvviz-line">' + title + '</div>' ) : '',
                $( '<div class="bvviz-table">' ).append(
                  $( '<div class="bvviz-row">' ).append(
                    $( '<div class="bvviz-cell bvviz-units-rightalign bvviz-value">' + playerOrTeam.units.points.all + '</div>' ),
                    $( '<div class="bvviz-cell bvviz-units-leftalign bvviz-value">' + playerOrTeam.units.points.display_name + '</div>' )
                  )
                )
              );

              // Secondary unit types ("points" are explicitly shown above)
              $.each( playerOrTeam.units, function( key, unit ) {
                // Always increment the unti type count
                unitCount ++;

                if ( key === 'points' ) {
                  // Skip "points"
                  return true;
                }
                if ( unitCount > 3 ) {
                  // break on more the 3 unit types
                  return false;
                }
                units.find( '.bvviz-table' ).append(
                  $( '<div class="bvviz-row">' ).append(
                    $( '<div class="bvviz-cell bvviz-units-rightalign bvviz-value">' + unit.all + '</div>' ),
                    $( '<div class="bvviz-cell bvviz-units-leftalign bvviz-value">' + unit.display_name + '</div>' )
                  )
                );
              });

            return units;
          },

          // A single unitbar module on each unit (player or team), render single line display
          basic_unit: function( unit ) {
            var unit = $( '<div class="bvviz-unit">' )
              .append(
                $( '<div class="bvviz-units-rightalign bvviz-value">' + unit.all + '</div>' ),
                $( '<div class="bvviz-units-leftalign bvviz-label">' + unit.display_name + '</div>' )
              );

            return unit;
          },

          // A combined unitbar module on all teams (player or team), render multi line display
          teams: function( playerOrTeam ) {
            var title = BVVIZ.utility.validateNestedObj( settings, 'titles', 'teams' ) ? settings.titles.teams : '',
                teams = $( '<div class="bvviz-unit">' )
              .append(
                title ? $( '<div class="bvviz-title bvviz-line">' + title + '</div>' ) : ''
              );

              // Current Teams
              $.each( playerOrTeam.teams, function( i, team ) {
                // Display no more than 3 teams
                if ( i >= 3 ) {
                  return;
                }
                teams.append(
                  $( '<div class="bvviz-label">' + team.display_name + '</div>' )
                );
              });

            return teams;
          },

          // A single unitbar module on each team (player or team), render single line display
          basic_team: function( team ) {
            var team = $( '<div class="bvviz-unit">' )
              .append(
                $( '<div class="bvviz-label">' + team.display_name + '</div>' )
              );

            return team;
          },

          // A single unitbar module on each level, render multi line display
          level: function( currentlevel ) {
            var title = BVVIZ.utility.validateNestedObj( settings, 'titles', 'level' ) ? settings.titles.level : '',
                level = $( '<div class="bvviz-unit bvviz-level">' )
              .append(
                title ? $( '<div class="bvviz-title bvviz-line">' + title + '</div>' ) : ''
              );
              
              // Level progress 
              if ( $.isFunction( BVVIZ.levelProgress ) ) {
                BVVIZ.levelProgress( $( '<div></div>' ).appendTo( level ), playerOrTeam.id, currentlevel.mission_id, { siteId: settings.siteId } );
              }

            return level;
          },

          // A single unitbar module on each level, render single line display
          basic_level: function( currentlevel ) {
            var level = $( '<div class="bvviz-unit bvviz-basic">' )
              .append(
                $( '<img src="' + currentlevel.image + '" />' ),
                $( '<span class="bvviz-label">' + currentlevel.name + '</span>' )
              );

            return level;
          },

          // A single unitbar module on each track progress, render multi line display
          track: function( track ) {
            var title = BVVIZ.utility.validateNestedObj( settings, 'titles', 'expertise' ) ? settings.titles.expertise : '',
                track = $( '<div class="bvviz-unit bvviz-track">' )
              .append(
                title ? $( '<div class="bvviz-title bvviz-line">' + title + '</div>' ) : '',
                $( '<div class="bvviz-flex">').append(
                  $( '<div class="bvviz-flex-item-1 bvviz-units-rightalign">' ).append(
                    $( '<img src="' + track.last_earned.image + '" />' )
                  ),
                  $( '<div class="bvviz-flex-item-2 bvviz-label bvviz-units-leftalign"><br>' + track.last_earned.name + '</div>' )
                )
              );

            return track;
          },

          // A single unitbar module on each track progress, render single line display
          basic_track: function( track ) {
            var track = $( '<div class="bvviz-unit bvviz-basic">' )
              .append(
                $( '<img src="' + track.last_earned.image + '" />' ),
                $( '<span class="bvviz-label">' + track.last_earned.name + '</span>' )
              );

            return track;
          },

          // A unitbar module on each track progress
          activities: function( activity ) {
            var title = BVVIZ.utility.validateNestedObj( settings, 'titles', 'activities' ) ? settings.titles.activities : '',
                // Image could be empty, default to a placeholder image
                imageSrc = BVVIZ.utility.validateNestedObj ( activity, 'behaviors', [0], 'image' ) ? activity.behaviors[0].image : BVVIZ.helper.imageHolderSrc(),
                // behaviors could be empty if activity is generated from 'bv_adjust_units'
                actSrc = BVVIZ.utility.validateNestedObj( activity, 'behaviors', [0], name ) ? activity.behaviors[0].name : ( BVVIZ.utility.validateNestedObj( activity, 'verb' ) ? activity.verb : '' ),
                actTime = BVVIZ.utility.validateNestedObj( activity, 'created_at' ) ? activity.created_at : new Date(),
                act = $( '<div class="bvviz-unit bvviz-activity">' )
              .append(
                title ? $( '<div class="bvviz-title bvviz-line">' + title + '</div>' ) : '',
                $( '<div class="bvviz-flex">' ).append(
                  // Image can either from the sprite icon or an uploaded image
                  $( '<div class="bvviz-flex-item-1">' ).append(
                    imageSrc.match( /^[\w\s]*$/ ) ? $('<span class="bvviz-sprite-icon ' + imageSrc + '"></span>') : $( '<img src="' + imageSrc + '" />' )
                  ),
                  $( '<div class="bvviz-flex-item-3 bvviz-label bvviz-units-leftalign">' + actSrc + '<br>' + BVVIZ.helper.timeToFormatted( actTime, 'mm/dd/yyyy' ) + '</div>' )
                )
              );

            return act;
          }
        };

        // Points module
        function appendUnits() {
          if ( settings.singleLine ) {
            // Units single line display
            if ( $.isPlainObject( playerOrTeam.units.points ) ) {
              container.append( render.basic_unit( playerOrTeam.units.points ) );
            }

            // Secondary unit types ("points" are explicitly shown above)
            $.each( playerOrTeam.units, function( key, unit ) {
              if ( key === 'points' ) {
                // Skip "points"
                return true;
              }
              container.append( render.basic_unit( unit ) );
            });
          } else {
            // Units multi line display
            container.append( render.units( playerOrTeam ) );
          }
        }

        // Current Levels module
        function appendLevels() {
          if ( $.isArray( playerOrTeam[ 'rewards:currentlevels' ] ) ) {
            $.each( playerOrTeam[ 'rewards:currentlevels' ], function( i, level ) {
              if ( settings.singleLine ) {
                container.append( render.basic_level( level ) );
              } else {
                container.append( render.level( level ) );
              }
            });
          }
        }

        // Track Progresses, only a level type (track.type === 'level_track') is considered
        function appendTracks() {
          if ( $.isArray( playerOrTeam[ 'progresses:all_tracks' ] ) ) {

            // Sort the tracks by percent complete, descending
            playerOrTeam[ 'progresses:all_tracks' ].sort( function( track1, track2 ){
              return track2.percent - track1.percent;
            });

            // Loop through all the track progresses found and display them
            $.each( playerOrTeam[ 'progresses:all_tracks' ], function( i, track ) {
              var clickTarget;

              // Add this check in case the percent is at 0 (which can happen if tracks are modified)
              //  OR the track is NOT a level type (in which case the display shouldn't be shown in this context)
              if ( track.percent > 0 && track.type === 'level_track' && track.last_earned ) {
                // Create the display for this track. Use the last earned mission as a reflection of the player's level in the track
                clickTarget = settings.singleLine ? render.basic_track( track ) : render.track( track );

                // If BVVIZ.trackProgress has been included...
                if ( $.isFunction( BVVIZ.trackProgress ) ) {
                  // ...allow the track icon to be clicked on to open the trackProgress visualization
                  clickTarget.click( function( event ) {
                    // Prevent the click event from firing on drag and drop
                    if ( !container.data('dragging') ) {
                      BVVIZ.helper.showModal( BVVIZ.trackProgress, [ playerOrTeam.id, track.definition_id, { siteId: settings.siteId } ] );
                    }

                    event.preventDefault();
                    return false;
                  });
                }

                // Insert the track icon into the container
                container.append( clickTarget );
              }
            });
          }
        }

        // Teams module
        function appendTeams() {
          if ( $.isArray( playerOrTeam[ 'teams' ] ) ) {
            if ( settings.singleLine ) {
              // Current Teams as single line display
              $.each( playerOrTeam.teams, function( i, team ) {
                container.append( render.basic_team( team ) );
              });
            } else {
              // Current Teams as combined display, append the teams when the player belongs to any
              if ( BVVIZ.utility.validateNestedObj( playerOrTeam, 'teams') && playerOrTeam.teams.length > 0 ) {
                container.append( render.teams( playerOrTeam ) );
              }
            }
          }
        }

        // Recent activity, not applicable for single line display
        function appendActivities() {
          if ( $.isArray( playerOrTeam[ 'activities' ] ) && playerOrTeam[ 'activities' ][0] && !settings.singleLine ) {
            // Only append the most recent activity
            container.append( render.activities( playerOrTeam[ 'activities' ][0] ) );
          }
        }

        // Append rendered module hmtl to the contianer DOM in the order of the settings modules
        $.each( settings.modules, function( index, value ){
          switch ( value ) {
            case 'units':
              appendUnits();
              break;
            case 'level':
              appendLevels();
              break;
            case 'expertise':
              appendTracks();
              break;
            case 'teams':
              appendTeams();
              break;
            case 'activities':
              appendActivities();
              break;
          }
        });


        // Set the target to include the proper classes and attach all the elements required
        target
          .addClass( 'bvviz bvviz-unitbar' )
          .append(
            $( '<div class="bvviz-units-arrow bvviz-units-left">&#10216;</div>' ),
            $( '<div class="bvviz-units-arrow bvviz-units-right">&#10217;</div>' ),
            $( '<div class="bvviz-units-fade bvviz-units-leftFade"></div>' ),
            $( '<div class="bvviz-units-fade bvviz-units-rightFade"></div>' ),
            unitBarItems.append( boundry.append( container ) )
          );

        // Adjust the width of row of units (pad some to allow for decimals on multi line mode)
        unitsWidth += settings.singleLine ? 0 : 5;

        // Start the DOM calculation
        container.children().each( function() {
          // Capture the width of each unit
          unitsWidth += $( this ).outerWidth( true );
        });

        // Add a class to the last unit element to remove the border
        container.children( ':last' ).addClass( 'bvviz-last' );

        // Add the clearing node
        container.append( '<div class="bvviz-clear"></div>' );

        // Use dragging if the width is larger than the container
        if ( targetWidth < unitsWidth ) {

          // Store a record of the left and right arrow for faster execution
          rightArrow = target.find( '.bvviz-units-arrow.bvviz-units-right' );
          // Hide the left arrow to start
          leftArrow = target.find( '.bvviz-units-arrow.bvviz-units-left' ).hide();

          // Capture the maximum left value we want
          maxLeft = Math.abs( targetWidth - unitsWidth );

          // Capture how wide the first unit object is (assumes they are all the same size)
          unitWidth = container.children().first().outerWidth( true );

          // Adjust the boundry width to be large enough to fit the overlap
          boundry.width( unitsWidth + ( unitsWidth - targetWidth ) )
            // Move the boundry to the left the overlap amount
            .css( 'left', ( targetWidth - unitsWidth ) );
          
          // Set the width of the container so that no elements wrap
          container.width( unitsWidth )
            // Move the container to the right so that it positions itself on the left edge of the boundry
            .css( 'left', ( unitsWidth - targetWidth ) );

          // Make the container horizontally draggable within the boundry box
          container
            .css( 'cursor', 'ew-resize' )
            .draggable({
              containment: boundry,
              axis: 'x',
              start: function( event, ui ) {
                // Set data to indicate dragging event
                ui.helper.data( 'dragging', true );
              },
              stop: function( event, ui ) {
                // Set data dragging to false to clear dragging event, this action need a delay to work with click event
                setTimeout( function(){ 
                  ui.helper.data( 'dragging', false ); 
                }, 1 );
                // Show both the arrows in case either are hidden
                leftArrow.show();
                rightArrow.show();

                // A left position of 0 means it's dragged all the way to the left
                if ( ui.position.left === 0 ) {
                  // Hide the right-side arrow
                  rightArrow.hide();

                // A left position >= maxLeft means it's dragged all the way to the right
                } else if ( ui.position.left >= maxLeft ) {
                  // Hide the left-side arrow
                  leftArrow.hide();
                }
              }
            });

          // When each arrow is clicked on, shift the container over the distance of one unit area
          rightArrow.click( function( event ) {
            var currentLeft = parseInt( container.css( 'left' ) );
            if ( currentLeft > 0 ) {

              // Ensure that we don't move the container out of the boundary box
              container.animate({
                left: Math.max( currentLeft - unitWidth, 0 )
              });

              // Show/hide the arrows based on the final position of the container
              leftArrow.show();
              if ( Math.max( currentLeft - unitWidth, 0 ) === 0 ) {
                rightArrow.hide();
              }
            }

            // Prevent a default event from bubbling up
            event.preventDefault();
            return false;
          });

          // Do the same for the left arrow as was done for the right arrow
          leftArrow.click( function( event ) {
            var currentLeft = parseInt( container.css( 'left' ) );
            if ( currentLeft < maxLeft ) {
              container.animate({
                left: Math.min( currentLeft + unitWidth, maxLeft )
              });
              rightArrow.show();
              if ( Math.min( currentLeft + unitWidth, maxLeft ) === maxLeft ) {
                leftArrow.hide();
              }
            }
            event.preventDefault();
            return false;
          });

        // Otherwise hide the arrows
        } else {
          target.find( '.bvviz-units-arrow' ).remove();
        }

      // Use a 1-second timeout
      }, 1 );
    },

    // Animation to display loaded cards.
    showCards: function( cards ) {
      var card = $( '.bvviz-card.bvviz-invisible:first', cards );
      if ( card.length ) {
        card.removeClass( 'bvviz-invisible' ).hide().fadeIn({
          complete: function( ) {
            BVVIZ.helper.showCards( cards );
          },
          duration: 100
        });
      }
    },

    // Animation to display loaded visualization collection.
    showCollection: function( collection ) {
      var visual = $( collection ).filter( '.bvviz-invisible' ).first();
      if ( visual.length ) {
        visual.removeClass( 'bvviz-invisible' ).hide().fadeIn({
          complete: function( ) {
            BVVIZ.helper.showCollection( collection );
          },
          duration: 100
        });
      }
    },

    // Use this method to show a radial progress wheel
    showRadialProgress: function( percent ) {
      return $( '<div class="bvviz-radial-progress" data-progress="' + percent + '">' ).append(
          $( '<div class="bvviz-circle">' ).append(
            $( '<div class="bvviz-mask bvviz-full"><div class="bvviz-fill"></div></div>' ),
            $( '<div class="bvviz-mask bvviz-half"><div class="bvviz-fill"></div><div class="bvviz-fill bvviz-fix"></div></div>' )
          ),
          $( '<div class="bvviz-inset">').append( $( '<div class="bvviz-percentage">'+ percent + '%</div>') )
        )
    },

    // Feature to load more data while scrolling.
    infiniteScroll: function( DOMTarget, VIZInstance ) {
      $( DOMTarget ).bind( 'scroll.bvviz', function( e ) {
        var DOMTarget = $( e.currentTarget ), page;
        if ( $( '.bvviz-loading', DOMTarget.closest( '.bvviz' ) ).length > 0 ) {
          return; // already loading
        }
        if (DOMTarget[0].scrollHeight - DOMTarget.scrollTop() > DOMTarget.outerHeight(true) + ( $('.bvviz-show-scroll', DOMTarget).height() / 2 ) ) { 
          return; // not to bottom yet
        }
        if ( $( '.bvviz-loading', DOMTarget ).length > 0 ) {
          return; // allow loading one at a time
        }
        BVVIZ.helper.loadNextPage( DOMTarget, VIZInstance );
        return false; // to prevent jumping around
      });
    },

    // Feature to load more data while scrolling. deprecated and replaced by infiniteLeftRightScroll()
    infiniteHorizontalScroll: function( DOMTarget, VIZInstance ) {
      $( DOMTarget ).parent().bind( 'scroll.bvviz', function( e ) {
        var DOMTarget = $( e.currentTarget ), page;
        if ( $( '.bvviz-loading', DOMTarget.closest( '.bvviz' ) ).length > 0 ) {
          return; // already loading
        }
        if (DOMTarget[0].scrollWidth - DOMTarget.scrollLeft() > DOMTarget.outerWidth(true) + ( $('.bvviz-show-scroll', DOMTarget).width() / 2 ) ) { 
          return; // not to right yet
        }
        if ( $( '.bvviz-loading', DOMTarget ).length > 0 ) {
          return; // allow loading one at a time
        }
        BVVIZ.helper.loadNextPage( DOMTarget, VIZInstance );
        return false; // to prevent jumping around
      });
    },

    // Feature to load more data while scrolling both up and down. DOMTarget is the current cards container
    infiniteUpDownScroll: function( DOMTarget, VIZInstance ) {
      // store the previous scroll location for checking which direction of scrolling
      var previousScroll = DOMTarget.scrollTop(),
          initialBinding = true;

      $( DOMTarget ).bind( 'scroll.bvviz', function( e ) {
        // DOMTarget is same as the current cards container
        var DOMTarget = $( e.currentTarget ),
            upScrollIndicator = $('.bvviz-show-scroll.bvviz-previous', DOMTarget),
            downScrollIndicator = $('.bvviz-show-scroll.bvviz-next', DOMTarget),
            // Compare against the previousScroll to calculate whether it's up scroll or down scroll
            currentScroll = DOMTarget.scrollTop();

        if ( $( '.bvviz-loading', DOMTarget.closest( '.bvviz' ) ).length > 0 ) {
          return; // already loading
        }
        if ( $( '.bvviz-loading', DOMTarget ).length > 0 ) {
          return; // allow loading one at a time
        }
        if ( initialBinding && upScrollIndicator.length ) {
          // initial binding when cards loaded from the middle offset and up scroll indicator is inserted
          // re-set the previous scroll
          previousScroll = currentScroll;
          initialBinding = false;
          return;
        }
        if ( currentScroll > previousScroll ) {
          // Scrolling down...
          // Updating the previous scroll
          previousScroll = currentScroll;

          // down scroll indicator is removed from container indicating no more next
          if ( !downScrollIndicator.length ) {
            return; 
          }

          // not a triggering event, not to bottom yet
          if ( !e.isTrigger && DOMTarget[0].scrollHeight - DOMTarget.scrollTop() > DOMTarget.outerHeight(true) + ( downScrollIndicator.height() / 2 ) ) { 
            return;
          }

          $( DOMTarget ).trigger( 'load-next.bvviz' );

          return false;  // to prevent jumping around
        } else {
          // Scrolling up...
          // Updating the previous scroll
          previousScroll = currentScroll;

          // up scroll indicator is removed from container indicating no more previous
          if ( !upScrollIndicator.length ) {
            return; 
          }

          // not a triggering event, not to top yet
          if ( !e.isTrigger && DOMTarget.scrollTop() > ( upScrollIndicator.height() / 2 ) ) { 
            return;
          }

          $( DOMTarget ).trigger( 'load-previous.bvviz' );

          return false; // to prevent jumping around
        }

        return false; // to prevent jumping around
      });

    },

    // Feature to load more data while scrolling both left and right. DOMTarget is the current cards container
    infiniteLeftRightScroll: function( DOMTarget, VIZInstance ) {
      // store the previous scroll location for checking which direction of scrolling
      var previousScroll = DOMTarget.scrollLeft(),
          initialBinding = true;

      $( DOMTarget ).parent().bind( 'scroll.bvviz', function( e ) {
        // DOMTarget is replaced with horizontal scrollable wrapper
        var DOMTarget = $( e.currentTarget ),
            // original current cards container
            cardsContainer = DOMTarget.find('.bvviz-cards'),
            leftScrollIndicator = $('.bvviz-show-scroll.bvviz-previous', DOMTarget),
            rightScrollIndicator = $('.bvviz-show-scroll.bvviz-next', DOMTarget),
            // Compare against the previousScroll to calculate whether it's up scroll or down scroll
            currentScroll = DOMTarget.scrollLeft();

        if ( $( '.bvviz-loading', DOMTarget.closest( '.bvviz' ) ).length > 0 ) {
          return; // already loading
        }
        if ( $( '.bvviz-loading', DOMTarget ).length > 0 ) {
          return; // allow loading one at a time
        }
        if ( initialBinding && leftScrollIndicator.length ) {
          // initial binding when loaded from the middle offset
          // re-set the previous scroll
          previousScroll = currentScroll;
          initialBinding = false;
          return;
        }
        if ( currentScroll > previousScroll ) {
          // Scrolling right...
          // Updating the previous scroll
          previousScroll = currentScroll;

          // right scroll indicator is removed from container indicating no more next
          if ( !rightScrollIndicator.length ) {
            return;
          }

          // not a triggering event, not to right most yet
          if ( !e.isTrigger && DOMTarget[0].scrollWidth - DOMTarget.scrollLeft() > DOMTarget.outerWidth(true) + ( rightScrollIndicator.width() / 2 ) ) { 
            return;
          }

          $( cardsContainer ).trigger( 'load-next.bvviz' );

          return false; // to prevent jumping around
        } else {
          // Scrolling left...
          // Updating the previous scroll
          previousScroll = currentScroll;

          // left scroll indicator is removed from container indicating no more previous
          if ( !leftScrollIndicator.length ) {
            return;
          }

          // not a triggering event, not to left most yet
          if ( !e.isTrigger && DOMTarget.scrollLeft() > ( leftScrollIndicator.width() / 2 ) ) { 
            return;
          }

          $( cardsContainer ).trigger( 'load-previous.bvviz' );

          return false; // to prevent jumping around
        }

        return false; // to prevent jumping around
      });
    },

    // Binding custom event for loading previous batch starting at offset... 
    // only applicable to bi-directional scrolling
    customLoadPrevious: function( DOMTarget, VIZInstance ) {
      $( DOMTarget ).bind( 'load-previous.bvviz', function( e ) {
        // Track the batch state
        var dataOffsetStart = DOMTarget.data( 'bvviz-offset-start' ) || 0,
            dataLimit =  DOMTarget.data( 'bvviz-pagesize' ) || 10 ;

        // Trigger a load of the previous offset in the visualization
        VIZInstance.load( dataOffsetStart - dataLimit, 'previous' );
      });
    },

    // Binding custom event for loading next batch starting at offset... 
    // only applicable to bi-directional scrolling
    customLoadNext: function( DOMTarget, VIZInstance ) {
      $( DOMTarget ).bind( 'load-next.bvviz', function( e ) {
        // Track the batch state
        var dataOffsetEnd = DOMTarget.data( 'bvviz-offset-end' ) || 10;

        // Trigger a load of the previous offset in the visualization
        VIZInstance.load( dataOffsetEnd, 'next' );
      });
    },

    // Load next page...
    loadNextPage: function( DOMTarget, VIZInstance ) {
      // Track the page state
      var page = DOMTarget.data( 'bvviz-page' ) || 1;
      DOMTarget.data( 'bvviz-page', page + 1 );

      // Trigger a load of the next page in the visualization
      VIZInstance.load( page );
    },

    // Fit the heights of both the "body" and "cards" elements
    fitHeight: function( target ) {
      var body = $( '.bvviz-body', target ),
          cards = $( '.bvviz-cards:visible', body ),
          bodySiblingsHeight = 0,
          cardsSiblingsHeight = 0,
          bodyMarginBorder,
          cardsMarginBorder,
          overflow;

      // Determine the margins and borders involved
      bodyMarginBorder = body.outerHeight( true ) - body.height();
      cardsMarginBorder = cards.outerHeight( true ) - cards.height();

      // Need to know the height of all the sibling elements for the body
      body.siblings( ':visible' ).each(function( i, sibling ) {
        bodySiblingsHeight += $( sibling ).outerHeight( true );
      });

      // Need to know the height of all the sibling elements for the cards
      cards.siblings( ':visible' ).each(function( i, sibling ) {
        cardsSiblingsHeight += $( sibling ).outerHeight( true );
      });
    
      // Determine if the parent can contain the body element and it's siblings
      overflow = body.parent().height() < body.outerHeight( true ) + bodySiblingsHeight;

      // Adjust the body to either hide the overflow or else fill the parent
      if ( overflow ) {
        body.height( body.parent().height() - bodySiblingsHeight - bodyMarginBorder );
      } else {
        body.height( body.height() + body.parent().height() - body.outerHeight( true ) - bodySiblingsHeight );
      }

      // Fit the cards container to the new body
      cards.height( body.height() - cardsMarginBorder - cardsSiblingsHeight );
    },

    // Fit the widths of both the "body" and "cards" elements for horizontal leaderboard
    fitWidth: function( target ) {
      // horizontal leaderboard is using border-box as box model for easy calculation
      var body = $( '.bvviz-body', target ),
          cards = $( '.bvviz-cards:visible', body ),
          card = $( '.bvviz-card', cards ),
          bodySiblingsWidth = 0,
          cardsSiblingsWidth = 0,
          bodyMarginBorder,
          cardsMarginBorder,
          overflow;

      // Determine the margins and borders involved
      bodyMarginBorder = body.outerWidth( true ) - body.width();
      cardsMarginBorder = cards.outerWidth( true ) - cards.width();
      // Adjust for mozilla browser
      cardsWrapperBorder = cards.parent().outerHeight(true) - cards.parent().height() + .5;

      // Need to know the width of all the sibling elements for the body
      body.siblings( ':visible' ).each(function( i, sibling ) {
        bodySiblingsWidth += $( sibling ).outerWidth( true );
      });

      // Need to know the width of all the sibling elements for the cards wrapper container
      cards.parent().siblings( ':visible' ).each(function( i, sibling ) {
        cardsSiblingsWidth += $( sibling ).outerWidth( true );
      });

      // Determine if the body element parent can contain the cards and it's siblings
      overflow = body.parent().width() < body.outerWidth( true ) + bodySiblingsWidth || cards.width() < card.outerWidth( true ) * card.size() ;

      if ( overflow ) {
        // Adjust the body to fill the parent
        body.width( body.parent().width() - bodySiblingsWidth - bodyMarginBorder );
        // Fit the cards wrapper container to the new body
        cards.parent().width( body.width() - cardsMarginBorder - cardsSiblingsWidth - cardsWrapperBorder );
        // Adjust the cards width to hold all the cards
        cards.width( card.outerWidth( true ) * card.size() );
      } else {
        // Adjust the body to hide the overflow 
        body.width( body.width() + body.parent().width() - body.outerWidth( true ) - bodySiblingsWidth );
        // Fit the cards container to the new body
        cards.width( body.width() - cardsMarginBorder - cardsSiblingsWidth - cardsWrapperBorder );
      }
    },

    // Calculate the width of individual card within the "cards" container
    fitRowCardWidth: function( card, cards ) {
      var scrollbarWidth = cards[0].offsetWidth - cards[0].clientWidth,
          rowWidth = cards.innerWidth() - scrollbarWidth,
          cardMarginBorder = card.outerWidth( true ) - card.width(),
          rowCardCount = parseInt( rowWidth / card.outerWidth(), 10 ) || 1;

      return rowWidth / rowCardCount - cardMarginBorder - .5;
    },

    // Calculate the width of individual card within the high level "body" container
    fitContainerCardWidth: function( card, body ) {
      var cards = body.find('.bvviz-cards:first'),
          //scrollbarWidth = body[0].offsetWidth - body[0].clientWidth - ( body.outerWidth() - body.width() ),
          rowWidth = cards.innerWidth(),
          cardMarginBorder = card.outerWidth( true ) - card.width(),
          rowCardCount = parseInt( rowWidth / card.outerWidth(), 10 ) || 1;

      return rowWidth / rowCardCount - cardMarginBorder - .5;
    },

    // Animate bvviz-radial-progress wheel
    animateRadialProgress: function( target ) {
      target = $( target );
      if ( !target.length || !target.hasClass('bvviz-radial-progress') ) {
        return false;
      }
      target.data('percent', target.attr('data-progress')).attr('data-progress', 0);
      setTimeout( function() {
        target.attr('data-progress', target.data('percent'));
      }, 400, target );
    },

    // Convert a timestamp into a relative time string (eg; "2 minutes ago", "in 3 days", etc.)
    timeToString: function( timestamp ) {
      var ret;

      function timestampToString() {  
        var today = new Date(),
            date = new Date( BVVIZ.utility.parseDateString( timestamp ) ),
            months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            difference, unit, seconds, minutes, hours, days, weeks, diff, future;

        difference = today.getTime() - date.getTime();
        future = ( difference < 0 ) ? true : false;
        difference = Math.abs(difference);
        seconds = difference / 1000;
        minutes = seconds / 60;
        hours = minutes / 60;
        days = hours / 24;
        weeks = days / 7;

        if ( seconds < 60 ) {
          unit = 'second' + ( ( diff = seconds ) >= 2 ? 's' : '' );
        } else if ( minutes < 60 ) {
          unit = 'minute' + ( ( diff = minutes ) >= 2 ? 's' : '' );
        } else if ( hours < 24 ) {
          unit = 'hour' + ( ( diff = hours ) >= 2 ? 's' : '' );
        } else if ( days < 7 ) {
          unit = 'day' + ( ( diff = days ) >= 2 ? 's' : '' );
        } else if ( weeks < 10 ) {
          unit = 'week' + ( ( diff = weeks ) >= 2 ? 's' : '' );
        } else {
          return ( future ? 'on ' : '' ) + months[ date.getMonth() ] + ' ' + date.getDate() + ', ' + date.getFullYear();    
        }
        return + ( future ? 'in ' : '' ) + Math.max( 1, Math.floor( diff ) ) + ' ' + unit + ( future ? '' : ' ago' );
      }

      ret = $( '<div class="bvviz-timestamp">' + timestampToString() + '</div>' )
        .bind( 'bvviz.timestamp', function () {
          ret.html( timestampToString() );
        });

      BVVIZ.utility.timestampRunner.schedule( timestamp );

      return ret;
    },

    // Convert a timestamp into a normalized date display
    timeToFormatted: function( timestamp, formatMask ) {
      // Set the default BVVIZ date format mask
      formatMask = $.type( formatMask ) === 'string' ? formatMask : 'mm/dd/yyyy HH:MMTT';
      // convert UTC value into a formatted date display
      return BVVIZ.dateFormat ( new Date( BVVIZ.utility.parseDateString( timestamp ) ), formatMask );
    },

    // Create an inline SVG for (corner) checkmark
    svgCheckmarkCorner: function() {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="41.45" height="41.45" viewBox="0 0 41.45 41.45"><path class="bvviz-checkmark-bg" fill="" d="M5.9 0C2.6 0 0 2.6 0 5.9v33.4L39.3 0H5.9z"/><path fill="#D8D3CD" d="M0 41.45L41.45 0h-2.217L0 39.235"/><path fill="#FFF" d="M21.725 7.84L19.61 5.65l-7.5 7.772-3.27-3.437-2.115 2.19 5.377 5.65"/></svg>';
    },

    // Create an inline SVG for (mini) checkmark
    svgCheckmarkMini: function() {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path class="bvviz-checkmark-mini" fill="#37A6DE" d="M12 2.8L10.3 1l-6 6.2-2.6-2.8L0 6.2l4.3 4.6 7.7-8z"/></svg>';
    },

    // Create an inline SVG for (circle) checkmark
    svgCheckmarkCircle: function() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27"><path class="bvviz-checkmark-bg" fill="#fff" d="M13.5 24.9c-6.1 0-11.4-5.1-11.4-11.4S7.2 2.2 13.5 2.2s11.4 4.9 11.4 11.4S20 24.9 13.5 24.9z"/><path class="bvviz-checkmark-border" fill="#D2D2D2" d="M13.5 0C6.2 0 0 6 0 13.5S6.1 27 13.5 27 27 20.8 27 13.5 21.2 0 13.5 0zm0 24.9c-6.1 0-11.4-5.1-11.4-11.4S7.2 2.2 13.5 2.2s11.4 4.9 11.4 11.4S20 24.9 13.5 24.9z"/><path class="bvviz-checkmark-check" fill="#36A8DE" d="M11.7 15.4L8 11.9l-2.5 2.2 6.2 6.1L21.8 9.6l-2.2-2.5"/></svg>';
    },

    // set image src to a base64 1x1px transparent placeholder gif
    imageHolderSrc: function() {
     return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }

  },


  // BVVIZ utility functions
  utility: {  
    /* 
    * Using conditional comments to detect browser and version, 
    * return true if the browser is ie8 or under
    */
    isIe8OrLess: function() {
      var div = document.createElement('div');
      div.innerHTML = '<!--[if lt IE 9]><i></i><![endif]-->';
      return ( div.getElementsByTagName('i').length == 1 );
    },

    trimArray: function( arr ) {
      if ( $.type( arr ) === 'array' ) {
        for ( var i = 0; i < arr.length; i++ ) {
          arr[i] = arr[i].trim();
        }
      }
    },

    /*
    * Validate if nested attribute exists within an object,
    * if it exists (true), you can safely reference the attribute through obj.level.level2...
    */
    validateNestedObj: function ( obj /*, level1, level2, ... levelN*/ ) {
      var args = Array.prototype.slice.call( arguments, 1 );

      for ( var i = 0; i < args.length; i++ ) {
        if ( !obj || !obj.hasOwnProperty( args[i] ) ) {
          return false;
        }
        obj = obj[ args[i] ];
      }
      return true;
    },

    /*
    * Can't use jQuery deep extend method, otherwise the nested array properties will be augmented instead of being overwritten
    * Create our own recursive extension function to overwrite the default settings with the passed in values.
    * If the passed in proterty type doesn't match the default property type, ignore them.
    */
    recursiveOverwrite: function ( obj /*, obj1, obj2, ... objN*/ ) {
      var prop;
      $.each( Array.prototype.slice.call( arguments, 1 ), function( idx, source ) {
        if ( source ) {
          for ( prop in source ) {
            if ( source[ prop ].constructor === Object ) {
              if ( !obj[ prop ] || obj[ prop ].constructor === Object ) {
                obj[ prop ] = obj[ prop ] || {};
                BVVIZ.utility.recursiveOverwrite( obj[ prop ], source[ prop ] );
              } else {
                // Make sure the extra object property has the data type as the orignal object property
                if ( obj[ prop ].constructor === source[ prop ].constructor ) {
                  obj[ prop ] = source[ prop ];
                } else {
                  delete source[ prop ];
                }
              }
            } else {
              // Make sure the extra object property has the data type as the orignal object property
              if ( obj[ prop ] && obj[ prop ].constructor === source[ prop ].constructor ) {
                obj[ prop ] = source[ prop ];
              } else {
                delete source[ prop ];
              }
            }
          }
        }
      });
      return obj;
    },

    /*
    * Convert the server date string to javascript epoch value * 1000
    * 2015-03-13T23:22:44Z
    * 2015-2-13T00:00:00.000Z
    * 2015-02-13T00:00:00.000-08:00
    * 2013-11-01T00:00:00.000-07:00 
    */
    parseDateString: function( dStr ) {

      var eVal = 0,   // number of milseconds have elapsed since Jan 1, 1970
          tOffset,  // timezone offset
          milSecPerHour = 60 * 60 * 1000,   // milseconds per hour
          arr = /^\s*(\d{4})\-(\d{1,2})\-(\d{1,2})T(\d{2}):(\d{2}):(\d{2})\.?(\d{3})?Z?((\-)(\d{2}):(\d{2}))?\s*$/.exec(dStr) ;

      if ( $.isArray(arr) ){

        eVal = Date.UTC(arr[1],--arr[2],+arr[3],+arr[4]||0,+arr[5]||0,+arr[6]||0);

        tOffset = parseInt(arr[10], 10);

        // adjust the timezone offset value
        if ( tOffset > 0 ) {
          if ( arr[9] === '-' ) {
            eVal += milSecPerHour * tOffset;
          } else {
            eVal -= milSecPerHour * tOffset;
          }
        }
      
      } else if ( $.type( dStr) === 'date' ) {
        eVal = dStr.getTime();

      } else if ( $.type( dStr) === 'string' ) {
        arr = dStr.split( '-' );
        eVal = Date.UTC( arr[0], parseInt(arr[1]) - 1, arr[2].split('T')[0] );
        
        //console.log("<parseDate> "+dStr+"   "+parseInt(mo+1)+"/"+day+"/"+yr+"  ... "+eVal);
      }

      return eVal;
    },

    // Function to automate relative time updates
    timestampRunner: {
      options: {
        minLen: 10000,
        maxLen: 60000,
        scaleRate: .5
      }, 
      job: null,
      time: null,
      timeoutLen: null,
      schedule: function( timestamp ) {
        var now = new Date().getTime(),
            timeoutLen,
            newTime;
        //determine timeout length
        if ( timestamp ) {
          //base on new action
          timeoutLen = now - new Date( BVVIZ.utility.parseDateString( timestamp ) ).getTime();
        } else {
          //base on last action/job and handle scaleing
          timeoutLen = this.timeoutLen + Math.floor( this.timeoutLen * this.options.scaleRate );
        }
        //handle limits
        timeoutLen = timeoutLen < this.options.minLen ? this.options.minLen : ( timeoutLen > this.options.maxLen ? this.options.maxLen : timeoutLen );
        if ( isNaN( timeoutLen ) ) {
          return false;
        }
        //determine to schedule job
        newTime = now + timeoutLen;
        if ( this.job == null || newTime < this.time ) {
          if ( this.job != null ) {
            window.clearTimeout( this.job );
          }
          this.job = window.setTimeout( function (){
            $( '.bvviz-timestamp' ).trigger( 'bvviz.timestamp' );
            BVVIZ.utility.timestampRunner.job = null;
            BVVIZ.utility.timestampRunner.schedule( false );
          }, timeoutLen );
          this.time = newTime;
          this.timeoutLen = timeoutLen;
          return true;
        }
        return false;
      }
    }

  },


  /*
  * Date Format 1.2.3
  * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
  * MIT license
  *
  * Includes enhancements by Scott Trenda <scott.trenda.net>
  * and Kris Kowal <cixar.com/~kris.kowal/>
  *
  * Accepts a date, a mask, or a date and a mask.
  * Returns a formatted version of the given date.
  * The date defaults to the current date/time.
  * The mask defaults to dateFormatMasks.default.
  *
  * The dateFormat function is used by function timeToFormatted(), it has been modified to avoid namespace conflict
  */
  dateFormat: function () {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g,
      pad = function (val, len) {
          val = String(val);
          len = len || 2;
          while (val.length < len) val = "0" + val;
          return val;
      };

      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc) {
          var dF = BVVIZ.dateFormat;

          // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
          if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
              mask = date;
              date = undefined;
          }

          // Passing date through Date applies Date.parse, if necessary
          date = date ? new Date(date) : new Date;
          if (isNaN(date)) throw SyntaxError("invalid date");

          mask = String(BVVIZ.dateFormatMasks[mask] || mask || BVVIZ.dateFormatMasks["default"]);

          // Allow setting the utc argument via the mask
          if (mask.slice(0, 4) == "UTC:") {
              mask = mask.slice(4);
              utc = true;
          }

          var _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
            d: d,
            dd: pad(d),
            ddd: BVVIZ.dateFormati18n.dayNames[D],
            dddd: BVVIZ.dateFormati18n.dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: BVVIZ.dateFormati18n.monthNames[m],
            mmmm: BVVIZ.dateFormati18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? "a" : "p",
            tt: H < 12 ? "am" : "pm",
            T: H < 12 ? "A" : "P",
            TT: H < 12 ? "AM" : "PM",
            Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

          return mask.replace(token, function ($0) {
              return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
          });
      };
  }(),

  // Some common format strings for dateFormat
  dateFormatMasks : {
      "default": "ddd mmm dd yyyy HH:MM:ss",
      shortDate: "m/d/yy",
      mediumDate: "mmm d, yyyy",
      longDate: "mmmm d, yyyy",
      fullDate: "dddd, mmmm d, yyyy",
      shortTime: "h:MM TT",
      mediumTime: "h:MM:ss TT",
      longTime: "h:MM:ss TT Z",
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  },

  // Internationalization strings for dateFormat
  dateFormati18n : {
      dayNames: [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
      monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
  }

};
})(jQuery);


/*
 * Polyfill for Array.prototype.filter method from MDN
 * It creates a new array with all elements that pass the test implemented by the provided function
 * Allowing use of filter method in ECMA-262 implementations when natively support is not provided
 */
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

/*
 * Polyfill for String.prototype.trim method from MDN
 * It removes whitespace from both ends of a string
 * Allowing use of trim method in ECMA-262 implementations when natively support is not provided
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

/*
 * A pseudo-shim of Object.create method for pre-ES5 browsers
 */
if (!Object.create) {
  Object.create = function( proto, props ) {
    if ( typeof props !== 'undefined' ) {
      throw new Error( 'The multiple-argument version of Object.create is not provided by this browser and cannot be shimmed.' );
    }
    function ctor() { }
    ctor.prototype = proto;

    return new ctor();
  };
}

/*
 * <progress> polyfill by Lea Verou, under MIT license 
 * @author Lea Verou http://leaverou.me
 */
(function(){

// Test browser support first
if('position' in document.createElement('progress')) {
  return;
}

/**
 * Private functions
 */

// Smoothen out differences between Object.defineProperty
// and __defineGetter__/__defineSetter__
var defineProperty, supportsEtters = true;

if(Object.defineProperty) {
  // Changed to fix issue #3 https://github.com/LeaVerou/HTML5-Progress-polyfill/issues/3
  defineProperty = function(o, property, etters) {
    etters.enumerable = true;
    etters.configurable = true;
    
    try {
      Object.defineProperty(o, property, etters);
    } catch(e) {
      if(e.number === -0x7FF5EC54) {
        etters.enumerable = false;
        Object.defineProperty(o, property, etters);
      }
    }
  }
}
else {
  if ('__defineSetter__' in document.body) {
    defineProperty = function(o, property, etters) {
      o.__defineGetter__(property, etters.get);
      
      if(etters.set) {
        o.__defineSetter__(property, etters.set);
      }
    };
  }
  else {
    // Fallback to regular properties if getters/setters are not supported
    defineProperty = function(o, property, etters) {
        o[property] = etters.get.call(o);
      },
      supportsEtters = false;
  }
}

try {
  [].slice.apply(document.images)
  
  var arr = function(collection) {
    return [].slice.apply(collection);
  }
} catch(e) {
  var arr = function(collection) {
    var ret = [], len = collection.length;
    
    for(var i=0; i<len; i++) {
      ret[i] = collection[i];
    }
    
    return ret;
  }
}

// Does the browser use attributes as properties? (IE8- bug)
var attrsAsProps = (function(){
  var e = document.createElement('div');
  e.foo = 'bar';
  return e.getAttribute('foo') === 'bar';
})();

var self = window.ProgressPolyfill = {
  DOMInterface: {
    max: {
      get: function(){
        return parseFloat(this.getAttribute('aria-valuemax')) || 1;
      },
      
      set: function(value) {
        this.setAttribute('aria-valuemax', value);
        
        if(!attrsAsProps) {
          this.setAttribute('max', value);
        }
        
        self.redraw(this);
      }
    },
    
    value: {
      get: function(){
        return parseFloat(this.getAttribute('aria-valuenow')) || 0;
      },
      
      set: function(value) {
        value = Math.min(value, this.max);
        this.setAttribute('aria-valuenow', value);
        
        if(!attrsAsProps) {
          this.setAttribute('value', value);
        }
        
        self.redraw(this);
      }
    },
    
    position: {
      get: function(){
        return this.hasAttribute('aria-valuenow')? this.value/this.max : -1;
      }
    },
    
    labels: {
      get: function(){
        var label = this.parentNode;
        
        while(label && !/^label$/i.test(label.nodeName)) {
          label = label.parentNode;
        }
        
        var labels = label? [label] : [];
        
        if(this.id && document.querySelectorAll) {
          var forLabels = arr(document.querySelectorAll('label[for="' + this.id + '"]'));
          
          if(forLabels.length) {
            labels = labels.concat(forLabels);
          }
        }
        
        return labels;
      }
    }
  },
  
  redraw: function redraw(progress) {
    if(!self.isInited(progress)) {
      self.init(progress);
    }
    else if(!attrsAsProps) {
      progress.setAttribute('aria-valuemax', parseFloat(progress.getAttribute('max')) || 1);
      
      if(progress.hasAttribute('value')) {
        progress.setAttribute('aria-valuenow', parseFloat(progress.getAttribute('value')) || 0);
      }
      else {
        progress.removeAttribute('aria-valuenow');
      }
    }
        
    if(progress.position !== -1) {
       progress.style.paddingRight = progress.offsetWidth * (1-progress.position) + 'px';
    }
  },
  
  isInited: function(progress) {
    return progress.getAttribute('role') === 'progressbar';
  },
  
  init: function (progress) {
    if(self.isInited(progress)) {
      return; // Already init-ed
    }
    
    // Add ARIA
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', parseFloat(progress.getAttribute('max')) || 1);
    
    if(progress.hasAttribute('value')) {
      progress.setAttribute('aria-valuenow', parseFloat(progress.getAttribute('value')) || 0);
    }
    
    // We can't add them on a prototype, as it's the same for all unknown elements
    for(var attribute in self.DOMInterface) {
      defineProperty(progress, attribute, {
        get: self.DOMInterface[attribute].get,
        set: self.DOMInterface[attribute].set
      });
    }
    
    self.redraw(progress);
  },
  
  // Live NodeList, will update automatically
  progresses: document.getElementsByTagName('progress')
};



for(var i=self.progresses.length-1; i>=0; i--) {
  self.init(self.progresses[i]);
}

// Take care of future ones too, if supported
if(document.addEventListener) {
  document.addEventListener('DOMAttrModified', function(evt) {
    var node = evt.target, attribute = evt.attrName;
    
    if(/^progress$/i.test(node.nodeName) && (attribute === 'max' || attribute === 'value')) {
      self.redraw(node);
    }
  }, false);
  
  document.addEventListener('DOMNodeInserted', function(evt) {
    var node = evt.target;
    
    if(/^progress$/i.test(node.nodeName)) {
      self.init(node);
    }
  }, false);
}

})();



;(function($) {

  // Utility method to get the type of objects (string, object, function, etc.)
  var TYPES = {};
  function getType( val ) {
    var type = Object.prototype.toString.call( val );
    return val === null ? '[object Null]' : type === Object.prototype.toString.call( 0 ) && isNaN(val) ? '[object NaN]' : type;
  }
  TYPES.st = getType( '' );
  TYPES.ob = getType( {} );
  TYPES.fu = getType( function(){} );

  // Create a common object for all visualizations
  BVVIZ.Visualization = function( siteId ) {
    this.siteId = siteId || BVVIZ.currentSite;
  };

  // Create prototype functions for all visualizations
  BVVIZ.Visualization.prototype.BVSDK = function( path, ids, options ){

    if ( this.siteId !== BVVIZ.currentSite ) {
      path = 'sites/' + path;
      ids = ids || {};
      ids.sites = this.siteId;
    }

    return BVSDK( path, ids, options );      
  }

  // Store the instances of Visualizations
  BVVIZ.Visualization.instances = [];

  // Method to get Visualization instance
  BVVIZ.Visualization.getInstanceBySiteId = function( siteId ) {
    siteId = siteId ? siteId : BVVIZ.currentSite;

    for ( var i = 0; i < BVVIZ.Visualization.instances.length; i++ ) {
      if ( BVVIZ.Visualization.instances[i].siteId = siteId ) {
        return BVVIZ.Visualization.instances[i];
      }
    }

    return null;
  }

  // BVVIZ.getCurrentSite will:
  //  - Extract out the current site id from script JSSDK includes 
  BVVIZ.getCurrentSite = function() {
    var scripts = window.document.getElementsByTagName( 'script' ),
        s = scripts.length,
        scriptSrc,
        config = {};
    // Find this <script> tag for this script    
    while( s-- ) {
      if ( scripts[ s ][ 'src' ].match( /badgeville\.js/ ) ) {
        scriptSrc = scripts[ s ][ 'src' ];
        break;
      }
    }
    if ( getType( scriptSrc ) === TYPES.st ) {
      // Extract out the hash value from the script src and create config object
      //  ../badgeville.js#key=1 => { key: 1 }
      scriptSrc.replace( /[\?&#]+([^\?=&#]+)=([^&#]*)/gi, function( m, k, v ) {
        v = v === 'false' ? false : v === 'true' ? true : v;
        config[ k ] = v;
      });
      return config['sites_id'] || '';
    } else {
      return '';
    }
  };

  // Store current site id
  BVVIZ.currentSite = BVVIZ.getCurrentSite();
  // To avoid running multiple site checks, we initialize checking flag to false
  BVVIZ.checkSiteStarted = false;
  // Initialize the site check timer
  BVVIZ.checkSiteTimeStarted = 0;

  // BVVIZ.checkSite will:
  //  - Call Cairo API to check the sites value of 'cairo-viz'
  //  - Decide whether the cairo visualizations should be rendered for current site or not.
  BVVIZ.checkSite = function( callback ) {
    // Set the site check flag to true indicating the API request has been sent
    BVVIZ.checkSiteStarted = true;

    // Start the site check timer
    BVVIZ.checkSiteTimeStarted = new Date();

    // If no site id is provided in the script tag, skip the site check
    if ( !BVVIZ.currentSite ) {
      BVVIZ.siteVizEnabled = true;
      return false;
    }

    BVSDK ( 
      'sites',
      { sites: BVVIZ.currentSite },
      { fields: 'cairo_viz' }
    ).ok( function( data ) {
      BVVIZ.siteVizEnabled = false;
      if ( BVVIZ.utility.validateNestedObj( data, 'sites' ) ) {
        if ( BVVIZ.currentSite === '' ) {
          // Can't locate the current site id
          if ( data.sites.length == 1 ) {
            // Assigning the only found site id
            BVVIZ.currentSite = data.sites[0].id;
          } else if ( data.sites.length > 1 ) {
            // Assume the site is enabled
            BVVIZ.siteVizEnabled = true;
          }
        }
        $.each( data.sites, function( i, site ) {
          if ( site.id === BVVIZ.currentSite ) {
            if ( site.cairo_viz === true ) {
              // Property 'cairo_viz' is set to true when site is enabled
              BVVIZ.siteVizEnabled = true;
              if ( getType( callback ) === TYPES.fu ) {
                callback();
              }
            } else if ( typeof site.cairo_viz == 'undefined' ) {
              // Property 'cairo_viz' is not defined, assume the site is enabled
              BVVIZ.siteVizEnabled = true;
              if ( getType( callback ) === TYPES.fu ) {
                callback();
              }
            }
          } 
        });
      }
    }).fail( function( data ) {
      BVVIZ.siteVizEnabled = false;
    }).always( function( data ){
      if ( typeof BVVIZ.siteVizEnabled === 'undefined' ) {
        // If resource 'sites' of Cairo API doesn't returns normally, assume the site is shut down.
        BVVIZ.siteVizEnabled = false;
      }
    });
  };

  // BVVIZ.waitForSiteCheck will:
  //  - Keep looking for value of 'siteVizEnabled' every 0.05 second, until it's defined or it passed 5 seconds
  BVVIZ.waitForSiteCheck = function( callback ) {
    if ( !BVVIZ.checkSiteStarted ) {
      // Start running the site check if it's not running yet
      BVVIZ.checkSite();
    }

    if ( getType( callback ) === TYPES.fu ) {
      if ( typeof BVVIZ.siteVizEnabled !== 'undefined' ) {
        if ( BVVIZ.siteVizEnabled === true ) {
          callback( true );
        } else {
          callback( false );
        }
      } else {
        window.setTimeout( function(){
          if ( new Date() - BVVIZ.checkSiteTimeStarted < 5000 ) {
            BVVIZ.waitForSiteCheck( callback );
          } else {
            callback( false );
          }
        }, 50 );
      }
    } else {
      return false;
    }
  };

  // BVVIZ.config will store values that are used globaly within the tools below (but NOT the visualizations)
  BVVIZ.config = {
    // Controls which optional arguments are added to requests for player objects
    playerOptions: {
      fields: 'all',
      includes: [ 'teams', 'rewards:currentlevels' ]
    },

    // Controls which optional arguments are added to requests for content objects
    contentOptions: {},

    // Controls which optional arguments are added to requests during activity creation
    activityOptions: {
      includes: [ 'rewards', 'missionhistories', 'tracks' ]
    }
  };

  // This object will store the ids of any objects that are shown in a notification. This helps avoid duplicates.
  var shownObjects = {};

  // BVVIZ.setPlayer will:
  //  - Find or create the matching player
  //  - Update the player object if called again with the same email
  //  - Store the current player in BVVIZ.currentPlayer for easy access
  //  - Auto-update any player-based visualizations any time the player object is found to have changed
  //  - Automatically display visual notifications when notification events occur (requires a player Stream to be configured)
  //  - Trigger the "callback" function (if provided), passing in a success indicator (true/false) and the current player object
  BVVIZ.setPlayer = function( playerObject, callback ) {
    var find, create;

    // Function to show a collection of notifications
    function showNotifications( data ) {
      // Only continue if the BVVIZ.notify method was included
      if ( getType( BVVIZ.notify ) === TYPES.fu ) {
        $.each( data.notifications, function( i, notification ) {
          // Function to mark a notification as having been "read"
          function notificationDone() {
            BVSDK( 'players/notifications', { players: BVVIZ.currentPlayer.id, notifications: notification.id } ).action( 'mark_read' );
          }

          // Only show notifications that have not yet been "read"
          if ( !notification.read_at && !shownObjects[ notification.id ] ) {

            // Mark the notification has been shown to avoid duplicate
            shownObjects[ notification.id ] = true;
            
            // Determine the notification size based on the type of notification. Pass in the "notificationDone" callback
            switch( notification.type ) {
              case 'activities':
                BVVIZ.notify( notification, 'small', BVVIZ.currentPlayer.id, notificationDone );
                break;
              case 'rewards':
                BVVIZ.notify( notification, 'medium', BVVIZ.currentPlayer.id, notificationDone );
                break;
              case 'missions':
              case 'tracks':
                BVVIZ.notify( notification, 'large', BVVIZ.currentPlayer.id, notificationDone );
                break;
            }
          // If the object has been shown, but the notification hasn't been marked read, mark it as read to avoid duplicates
          } else if ( !notification.read_at ) {
             notificationDone();  
          }
        });
      }
    }

    // Function to update the player record, if needed
    function updatePlayer() {
      var updateNeeded = false;

      // Email can not be updated
      delete playerObject.email;

      // An update only needs to be sent if there are actually changes
      for ( key in playerObject ) {
        if ( playerObject[ key ] !== BVVIZ.currentPlayer[ key ] ) {
          updateNeeded = true;
          break;
        }
      }
      if ( updateNeeded ) {
        // Update the player with the new data
        BVSDK( 'players', { players: BVVIZ.currentPlayer.id } ).update( playerObject, BVVIZ.config.playerOptions ).always( function( data ) {
          if ( data.errors ) {
            throw new Error( 'Badgeville: Error updating player (' + data.errors[0].message + ')' );
          }
          // Capture the email and store the player object for future use
          data.players[0].email = BVVIZ.currentPlayer.email;
          BVVIZ.currentPlayer = data.players[0];

          // Trigger a player_update event in case any displayable properties changed
          $(BVVIZ).trigger( 'player_update', { playerId: BVVIZ.currentPlayer.id } );

          // Trigger the callback if needed
          if ( getType( callback ) === TYPES.fu ) {
            callback( true, BVVIZ.currentPlayer );
          }
        });
      } else {
        // Trigger the callback if needed
        if ( getType( callback ) === TYPES.fu ) {
          callback( false, BVVIZ.currentPlayer );
        }
      }
    }

    // Initialize the visualization automatically upon passing site check
    BVVIZ.waitForSiteCheck( function( sitePass ){
      if ( sitePass ) {
        // Site is enabled, go ahead setPlayer

        if ( !( getType( playerObject ) === TYPES.st && playerObject.indexOf( '@' ) === -1 ) && ( getType( playerObject ) !== TYPES.ob || !playerObject.email ) ) {
          throw new Error( 'Badgeville: setPlayer requires either a player id or an object to be provided with at least a key of "email".' );
        }

        if ( BVVIZ.currentPlayer ) {
          // Player is set; this should be an update if emails match
          if ( BVVIZ.currentPlayer.email === playerObject.email ) {
            updatePlayer();

          } else {
            console.error( 'Badgeville: Player is already set.' );

            // Trigger the callback if needed
            if ( getType( callback ) === TYPES.fu ) {
              callback( false, BVVIZ.currentPlayer );
            }
          }

        } else {
          // Player is not set; find or create as needed
          if ( getType( playerObject ) === TYPES.st ) {
            // If a string was provided, assume it was either an email or an ID (set it as "email" in either case)
            playerObject = { email: playerObject };
          }
          // Find the player via email or id
          find = BVSDK( 'players', { players: playerObject.email }, BVVIZ.config.playerOptions );
          // Create the player if it doesn't exist
          create = BVSDK( 'players' ).create( playerObject, BVVIZ.config.playerOptions );

          // Use BVSDK.all to determine when both Promises have completed
          BVSDK.all( find, create ).ok( function( findData, createData ) {
            // Whether found or created, capture the player object
            var player;
            if ( findData.players && findData.players.length > 0 ) {
              player = findData.players[0];
            } else if ( createData.players && createData.players.length > 0 ) {
              player = createData.players[0];
            }
            // Capture the email and store the player object for future use
            player.email = playerObject.email;
            BVVIZ.currentPlayer = player;

            // Bind to the "player_update" event on the BVVIZ object, which will trigger visualizations to re-draw
            $(BVVIZ).bind( 'player_update', function( event, data ) {

              // Re-init all of the relevant player instances (based on matching playerId)
              function reInit( playerData ) {
                $.each( BVVIZ.instances, function( i, instance ) {
                  if ( playerData.playerId === instance.playerId ) {
                    if ( instance.needsPlayer ) {
                      instance.init( playerData.players[0] );
                    } else {
                      instance.init();
                    }
                  }
                });
              }

              // If the update matches the current player, re-initialize the visualizations
              if ( BVVIZ.currentPlayer.id === data.playerId ) {
                // If there are any visualizations that need a player object, retrieve that then call reInit
                if ( BVVIZ.needsPlayer ) {
                  BVSDK( 'players', { players: data.playerId }, BVVIZ.config.playerOptions )
                    .ok( reInit );
                } 
                // If no player object needed, don't call reInit

              }
            });

            // Listen for any player notification events so that visual notifications can be displayed
            BVSDK( 'players/notifications', { players: BVVIZ.currentPlayer.id }, { fields: 'all' } )
              .subscribe( function( data ) {
                // Trigger a "player_update" since it's likely that player information has changed
                $(BVVIZ).trigger( 'player_update', { playerId: BVVIZ.currentPlayer.id } );
                showNotifications( data );
              })
              // Also look for any notifications that may have occured while the player was not online
              .ok( showNotifications );

            // Just in case the player needs to be updated, trigger a player update
            updatePlayer();

          }).fail( function() {
            console.error( 'Badgeville: Player can neither be found nor created.' );
            // Trigger the callback if needed
            if ( getType( callback ) === TYPES.fu ) {
              callback( false, BVVIZ.currentPlayer );
            }
          });
        }
      }
    });
  };
  BVVIZ.currentPlayer = false;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.needsPlayer = false;

  // BVVIZ.getContent will:
  //  - Find or create a Content object based on the current document properties (META tags, Links and Document properties)
  //  - Store the content object in BVVIZ.content for easy access
  //  - Trigger the callback (if provided), passing in the content object
  BVVIZ.getContent = function( callback ) {
    var content = BVVIZ.getContentData(),
        find, create;

    // Use the content previously found
    if ( BVVIZ.content ) {
      if ( getType( callback ) === TYPES.fu ) {
        callback( BVVIZ.content );
      }
      return;
    }

    // Content should not be used when BVVIZ.getContentData returns false
    if ( content === false ) {
      BVVIZ.content = false;
      // Trigger the callback if needed
      if ( getType( callback ) === TYPES.fu ) {
        callback( BVVIZ.content );
      }
      return;
    }

    // Define the FIND and the CREATE promise objects
    find = BVSDK( 'contents', null, $.extend( { query: { url: content.url } }, BVVIZ.config.contentOptions ) );
    create = BVSDK( 'contents' ).create( content, BVVIZ.config.contentOptions );

    
    BVSDK.all( find, create ).ok(function( findData, createData ) {
      // Whether found or created, capture the content object
      if ( findData.contents.length > 0 ) {
        BVVIZ.content = findData.contents[0];
      } else if ( createData.contents.length > 0 ) {
        BVVIZ.content = createData.contents[0];
      }

      // Trigger the callback if needed
      if ( getType( callback ) === TYPES.fu ) {
        callback( BVVIZ.content );
      }
    }).fail(function(){
      // Both find and create failed; don't use content
      BVVIZ.content = false;
      // Trigger the callback if needed
      if ( getType( callback ) === TYPES.fu ) {
        callback( BVVIZ.content );
      }
    });
  };
  // BVVIZ.getContentData should return the content object that will be used for the current page
  //  - This function could be overwritten to return a more complex object (based on OGP data, for example)
  //  - Returning false will prevent content from being used
  BVVIZ.getContentData = function() {
    // Function to find the current URL (based on OG tags, canonical link or document.location)
    function getCurrentURL() {
      var target = $( 'meta[name="og:url"], meta[property="og:url"]' );
      if ( target.length > 0 ) {
        return target.attr( 'content' );
      }
      target = $( 'link[rel="canonical"]' );
      if ( target.length > 0 ) {
        return target.attr( 'href' );
      }
      return window.location.href;
    }

    return {
      url: encodeURIComponent( getCurrentURL() ),
      title: encodeURIComponent( document.title )
    };
  };
  BVVIZ.content = false;

  // BVVIZ.credit will:
  //  - Call BVVIZ.getContent to find/create a piece of content for the current page (if desired) 
  //  - Create an activity for the current player, passing in the content_id (if desired)
  //  - Trigger the callback (if provided), passing in the results of the activity creation Promise (success or failure)
  BVVIZ.credit = function( activity, callback ) {
    if ( getType( BVVIZ.currentPlayer ) === TYPES.ob ) {
      if ( getType( activity ) === TYPES.st && activity.length > 0 ) {
        activity = { verb: activity };
      }
      if ( getType( activity ) === TYPES.ob && getType( activity.verb ) === TYPES.st && activity.verb.length > 0 ) {
        BVVIZ.getContent( function( content ) {
          if ( getType( content ) === TYPES.ob && content.id ) {
            activity.content_id = content.id;
          }

          BVSDK( 'players/activities', { players: BVVIZ.currentPlayer.id } )
            .create( activity, BVVIZ.config.activityOptions )
              .always( function( data ) {

                // notifications display should be using streams, notifications are disabled when generating acivities
                // Trigger the callback if needed
                if ( getType( callback ) === TYPES.fu ) {
                  callback.apply( this, arguments );
                }
              });
        });
      } else {
        throw new Error( 'Badgeville: BVVIZ.credit requires a verb (either as a string or an object property).' );
      }
    } else {
      throw new Error( 'Badgeville: BVVIZ.credit called before BVVIZ.setPlayer is complete.' );
    }
  };

  // BVVIZ.creditOther will:
  //  - Call BVVIZ.getContent to find/create a piece of content for the current page (if desired) 
  //  - Create an ASYNCHRONOUS activity for the player ID (or email) provided, passing in the content_id (if desired)
  //  - Trigger the callback (if provided), passing in the results of the activity creation Promise (success or failure)
  BVVIZ.creditOther = function( playerId, activity, callback ) {
    if ( getType( playerId) === TYPES.st ) {
      if ( getType( activity ) === TYPES.st && activity.length > 0 ) {
        activity = { verb: activity };
      }
      if ( getType( activity ) === TYPES.ob && getType( activity.verb ) === TYPES.st && activity.verb.length > 0 ) {
        BVVIZ.getContent( function( content ) {
          if ( getType( content ) === TYPES.ob && content.id ) {
            activity.content_id = content.id;
          }

          BVSDK( 'players/activities', { players: playerId } )
            .create( activity, BVVIZ.config.activityOptions )
              .always( callback );
        });
      } else {
        throw new Error( 'Badgeville: BVVIZ.creditOther requires a verb (either as a string or an object property).' );
      }
    } else {
      throw new Error( 'Badgeville: BVVIZ.creditOther called without a player ID (or email) being provided.' );
    }
  };

  // BVVIZ.encryptEmail will:
  //  - call CryptoJS as the secure cryptographic algorithms to safely store the user's emails
  //  - Require JavaScript library of md5.js and sha1.js to be included
  BVVIZ.encryptEmail = function( email ) {
    if ( getType( CryptoJS ) === TYPES.ob ) { 
      var emailarray = email.split('@'),

          hashedname = CryptoJS.MD5(emailarray[0]).toString(CryptoJS.enc.Base64),
          hashedemail = CryptoJS.MD5(email).toString(CryptoJS.enc.Base64),
          firstpartname = hashedname.substring(0,3),
          secondpartname = hashedname.substring(3),    
          newname = firstpartname + hashedemail + secondpartname,
          finalname = (CryptoJS.SHA1(newname)).toString(CryptoJS.enc.Base64),
          finalemail = finalname + '@' + emailarray[1];

      return finalemail;
    } else {
      throw new Error('Failed to encrypt email. CryptoJS library md5.js & sha1.js are NOT included.')
      return email;
    }
  };

})(jQuery);



;(function($) {
// Add leaderboard method to the BVVIZ scope
BVVIZ.leaderboard = function( target, leaderboardIds, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
  
  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
    },

    // Navigation tabs
    nav: function( lbs ) {
      var navs = [],
          lbName;
      $.each( lbs, function( i, lb ) {
        lbName = !lb.display_name || lb.display_name === '' ? lb.name : lb.display_name;
        navs.push(
          $( '<div class="bvviz-nav bvviz-' + i + '" title="' + lbName + '">' + lbName + '</div>' ).data( 'bvviz-lb-num', i )
        );
      });
      navs[ navs.length - 1 ].addClass( 'bvviz-last' );
      return navs;
    },
    
    // A row in the leaderboard (player or team)
    card: function( rank ) {
      var displayName = settings.isHorizontal && typeof rank.display_name === typeof '' ? rank.display_name.split(' ')[0] : rank.display_name ,
          card = $( '<div class="bvviz-card">' )
        .append(
          $( '<img class="bvviz-avatar" src="' + rank.image + '" />' ),
          $( '<div class="bvviz-details"></div>' ).append(
            $( '<div class="bvviz-name">' + displayName + '</div>' ),
            $( '<div class="bvviz-desc">' + rank.value + ' ' + rank.label + '</div>' )
          ),
          $( '<div class="bvviz-rank">' + rank.id + '</div>' )
        );
      // Store the type_id value on the card for later use
      card.data( 'bvviz_type_id', rank.type_id );
      return card;
    },
    
    // Expandable drawer to show a player. Will include a "View Profile" button if BVVIZ.playerProfile is included on the page
    playerDrawer: function( player ) {
      var drawer = $( '<div class="bvviz-drawer">' + 
                        '<div class="bvviz-units"></div>' + 
                      '</div>' );
      
      // Render player's unitBar
      BVVIZ.helper.unitBar( $( '.bvviz-units', drawer ), player );

      // If the playerProfile function is defined, add a button
      if ( $.isFunction( BVVIZ.playerProfile ) ) {
        $( '<div class="bvviz-view-player-profile">View Profile</div><div class="bvviz-clear"></div>' ).appendTo( drawer );
      }
      return drawer;
    },
    
    // Expandable drawer to show a team. Will include a "View Profile" button if BVVIZ.teamProfile is included on the page
    teamDrawer: function( team ) {
      var drawer = $( '<div class="bvviz-drawer">' + 
                        '<div class="bvviz-units"></div>' + 
                      '</div>' );
      
      // Render player's unitBar
      BVVIZ.helper.unitBar( $( '.bvviz-units', drawer ), team );

      // If the teamProfile function is defined, add a button
      if ( $.isFunction( BVVIZ.teamProfile ) ) {
        $( '<div class="bvviz-view-team-profile">View Profile</div><div class="bvviz-clear"></div>' ).appendTo( drawer );
      }
      return drawer;
    }
  },

  // This will store the leaderboard data once the leaderboards are retrieved
  leaderboards = [],
  
  // Stores the position and DOM reference of the current leaderboard that is shown. (Defaults to "nothing shown")
  currentLB,
  currentContainer,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the leaderboard settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a string, which indicates the orientation
  options = $.isPlainObject( options ) ? options : { isHorizontal: options === 'horizontal' };

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize <= 0 ) {
    delete options.pageSize;
  }
  if ( !$.isNumeric( options.showMeIndex ) || options.showMeIndex < 0 ) {
    delete options.showMeIndex;
  }
  if ( !$.isNumeric( options.activeOnLoad ) || options.activeOnLoad < 0 ) {
    delete options.activeOnLoad;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.leaderboard, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Capture the current instance for use within Promise object callbacks
    var lbPromises = [];

    // This function will be called after all the required data is loaded
    function completed() {
      var header,
          lbHeader,
          headerNavs = 0,
          headerChildrenHeight = 0,
          headerChildrenWidth = 0,
          lbHeaderChildrenHeight = 0;

      // Define the header DOM elements, which contains the navigation buttons
      header = $( '<div class="bvviz-body-header"></div>' ).append(
        render.nav( leaderboards )
      );

      // Add the leaderboard header and the card container into the target
      target.append(
        render.header(),
        $( '<div class="bvviz-body bvviz-col"></div>' ).append(
          header
        )
      );

      lbHeader = $( '.bvviz-header', target );

      // Need to know the height of all the children elements for the header
      header.children( ':visible' ).each(function( i, child ) {
        headerChildrenHeight += $( child ).outerHeight( true );
        headerChildrenWidth += $( child ).outerWidth( true );
        headerNavs ++;
      });

      // Need to know the height of all the children elements for the leaderboard header, exclude the margin
      lbHeader.children( ':visible' ).each(function( i, child ) {
        lbHeaderChildrenHeight += $( child ).outerHeight();
      });

      // Adjust the vertical alignment of header title and sub header titles
      lbHeader.children().css( 'margin-top', ( lbHeader.height() - lbHeaderChildrenHeight  ) / 2 );
      header.css( 'padding-top', ( header.height() - headerChildrenHeight ) / 2 );

      // Adjust the width of the body header (leaderboard tabs) and each leaderboard tab width
      if ( headerChildrenWidth < header.width() ) {
        // Adjust the width of the tabs (pad some to allow for decimals)
        header.width( headerChildrenWidth + header.outerWidth() - header.width() + .5 );
      } else {
        header.children( ':visible' ).each(function( i, child ) {
          $( child ).outerWidth( header.width() / headerNavs );
        });
      }

      // Trigger the default active leaderboard to display
      show( settings.activeOnLoad );
    }
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "leaderboardIds" must be provided as an array with > 0 values
    if ( !$.isArray( leaderboardIds ) || leaderboardIds.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"leaderboardIds" argument must be an array with at least one value.' );
    }

    // Empty the target and add the base classes
    target
      .empty()
      .addClass( settings.isHorizontal ? 'bvviz bvviz-leaderboard bvviz-horizontal' : 'bvviz bvviz-leaderboard' );

    // Clear the currentLB value in case this is a reload
    currentLB = null;

    // If we've already loaded the leaderboards, we don't need to do so again
    if ( leaderboards.length > 0 ) {
      // Trigger the "completed" method and 
      completed();
      return;
    }
    // Create a BVSDK Promise for each leaderboard definition
    $.each( leaderboardIds, function( i, id ) {
      lbPromises.push(
        BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'leaderboards', { leaderboards: id } )
      );
    });

    // Put all of the defintion Promise objects into a "when" and wait for them all to finish
    BVSDK.when.apply( BVSDK, lbPromises ).ok( function(){
      // Use JQuery.map to extract the leaderboard from each data object returned
      leaderboards = jQuery.map( arguments, function( value, i ) {
        return value.leaderboards[0];
      });

      // Now that we have the leaderboard data, trigger the "completed" method
      completed();

    }).fail( function( data ) {
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

    // Bind the click to the top-level target for greater flexibility
    target.bind( 'click', function( event ) {
      // Get the element clicked on via the JQuery event
      var eventTarget = $( event.target ),
          card, drawer;

      // A navigation element was clicked on, so switch the leaderboard displayed
      if ( eventTarget.hasClass( 'bvviz-nav' ) ) {
        show( eventTarget.data( 'bvviz-lb-num' ) );
        event.preventDefault();
        return false;
      }

      // Find the closest player card to the object clicked on
      card = eventTarget.closest( '.bvviz-card' );
      
      // "View Profile" for any player card clicked - Requires BVVIZ.playerProfile to be included on the page
      if ( $.isFunction( BVVIZ.playerProfile ) && card.length && !card.hasClass( 'bvviz-team' ) ) {
        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ card.data( 'bvviz_type_id' ), { siteId: settings.siteId } ] );
        event.preventDefault();
        return false;
      }
      // Pending feature: "View Profile" for any team card clicked - Requires BVVIZ.teamProfile to be included on the page
      if ( $.isFunction( BVVIZ.teamProfile ) && card.length && card.hasClass( 'bvviz-team' ) ) {
        BVVIZ.helper.showModal( BVVIZ.teamProfile, [ card.data( 'bvviz_type_id' ), { siteId: settings.siteId } ] );
        event.preventDefault();
        return false;
      }

      // "View Profile" for player clicked - Requires BVVIZ.playerProfile to be included on the page
      if ( $.isFunction( BVVIZ.playerProfile ) && eventTarget.hasClass( 'bvviz-view-player-profile' ) ) {
        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ card.data( 'bvviz_type_id' ), { siteId: settings.siteId } ] );
        event.preventDefault();
        return false;
      }
      // Pending feature: "View Profile" for team clicked - Requires BVVIZ.teamProfile to be included on the page
      if ( $.isFunction( BVVIZ.teamProfile ) && eventTarget.hasClass( 'bvviz-view-team-profile' ) ) {
        BVVIZ.helper.showModal( BVVIZ.teamProfile, [ card.data( 'bvviz_type_id' ), { siteId: settings.siteId } ] );
        event.preventDefault();
        return false;
      }

      event.preventDefault();
      return false;
    });
  }

  // Show a leaderboard
  function show( board ) {
    // Find all the DOM objects that will need to change
    var currentCards = $( currentContainer ),
    
    // The new leaderboard should be hidden to start so that it can fade in later
        newCards = $( '<div class="bvviz-cards bvviz-col bvviz-leaderboard-cards" style="display:none;"></div>' ),
        newNav = $( '.bvviz-nav.bvviz-' + board, target );

    if ( currentLB === board ) {
      // re-load current leaderboard, toggle the player-relative loading or top-rank loading
      settings.loadLBToggle = !settings.loadLBToggle;

    } else {      
      // Swap the leaderboard if the desired board is different, reset to default leaderboard setting
      settings.loadLBToggle = settings.loadRelative;
    }

      // remove the existing horizontal leaderboad scrollable wrapper before attaching new leaderboard
      target.hasClass( 'bvviz-horizontal' ) && $( '.bvviz-scrollable-wrapper', target ).remove();

      // Remove the "active" class from all the buttons and then add it to the current one
      newNav.siblings().removeClass( 'bvviz-active' );
      newNav.addClass( 'bvviz-active' );

      // Add the new wrapper container for the cards to the body of the viz
      if ( settings.isHorizontal ) {
        $('<div/>').addClass('bvviz-scrollable-wrapper')
          .appendTo( $( '.bvviz-body', target ) )
          .append( newCards );
      } else {
        $( '.bvviz-body', target ).append( newCards );
      }

      // Store a reference to the current active cards container
      currentContainer = newCards;
      currentLB = board;

      // Swap the visual areas by fading in the new one and then removing the old one
      newCards.fadeIn( null, function() {
        // unbind the existing infinite scrolloing
        currentCards.unbind( 'scroll.bvviz' );

        currentCards.remove();

        // Set up infinite scrolling on the new container
        if ( settings.isHorizontal ) {
          BVVIZ.helper.infiniteLeftRightScroll( newCards, pub );
        } else {
          BVVIZ.helper.infiniteUpDownScroll( newCards, pub );
        }

        // Set up custom load binding on the new contianer
        BVVIZ.helper.customLoadPrevious( newCards, pub );
        BVVIZ.helper.customLoadNext( newCards, pub );


        newCards.data( 'bvviz-pagesize', settings.pageSize );

        // Load player-relative leaderboard. Get current player's poistion in a specific leaderboard
        if ( settings.loadLBToggle && BVVIZ.currentPlayer && BVVIZ.currentPlayer.id ) {
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/positions', { players: BVVIZ.currentPlayer.id, positions: leaderboardIds[ currentLB ] }, {
            fields: 'all'
          }).ok( function( data ) {
            // Adjust index starting from 0, rank value from data is indexed from 1
            var myRank = data.positions && data.positions[0] && $.isNumeric( data.positions[0].rank ) ? parseInt( data.positions[0].rank, 10 ) - 1 : -1 ;

            if ( myRank - settings.showMeIndex > 0 ) {
              // Track the page state at offset start and offset end
              newCards.data( 'bvviz-offset-start', myRank - settings.showMeIndex );
              newCards.data( 'bvviz-offset-end', myRank - settings.showMeIndex + settings.pageSize );
              // Load the player's relative page in the current leaderboard
              load( myRank - settings.showMeIndex, 'initial' );

            } else {
              loadDefaultInitial();
            }

          }).fail( function( data ) {
            loadDefaultInitial();
          });

        } else {
          loadDefaultInitial();
        }

        function loadDefaultInitial() {
          // Track the page state at offset start and offset end
          newCards.data( 'bvviz-offset-start', 0 );
          newCards.data( 'bvviz-offset-end', settings.pageSize );

          // Load the top leaderboard into the container
          load( 0, 'initial' );
        }

      });


  }

  // In order to load the player relative leaderboard, we need load the data from a specifc offset
  // 'offset' - used as the starting point to make leaderboard ranks API call
  // 'where' - used to indicate whether it's loading from. Possible values are initial, previous or next
  function load( offset, where ) {
    var loading,
        limit = settings.pageSize,
        offsetStart,
        offsetEnd;

    // Normalize offset and limit value when the offset parameter becomes negative
    if ( offset < 0 ) {
      limit = settings.pageSize + offset;
      offset = 0;
    }

    // Checking the condition on offset and limit before sending request
    if ( limit === 0 ) {
      return;
    }

    // Show an indicator in the target to indicate the data is loading
    loading = BVVIZ.helper.loading( 'bvviz-tr' ),
    target.append( loading );

    // Request data from specific offset for the current leaderboard
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'leaderboards/ranks', { leaderboards: leaderboardIds[ currentLB ] }, {
      offset: offset,
      limit: limit,
      fields: 'all'
    }).ok( function( data ) {
      var first = $( '.bvviz-card:first', currentContainer ),
          last = $( '.bvviz-card:last', currentContainer ),
          previousScroll = $( '.bvviz-show-scroll.bvviz-previous', currentContainer ),
          nextScroll = $( '.bvviz-show-scroll.bvviz-next', currentContainer ),
          currentRowStyle = '',

          // Add a temporary storage for appending each new card
          tempContainer = $(),

          // temporary value for calculating the extra bottom padding on initial
          extraPadding = 0;          

      // Remove the loading from the current container
      loading.remove();

      if ( where === 'previous' ) {
        // Load when scrolling previous. Remove the existing scroll marker from the current container
        previousScroll.remove();

        // We need to know what style is for first previous card in the even/odd cycle
        currentRowStyle = first.hasClass('bvviz-odd') && ( limit % 2 === 0 ) ? 'bvviz-odd' : 'bvviz-even';
      } else if ( where === 'next' ) {
        // Load when scrolling next. Remove the existing scroll marker from the current container
        nextScroll.remove();

        // We need to know what style is for the next card in the even/odd cycle
        currentRowStyle = last.hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
      } else {
        // default load from initial loading. Remove the existing scroll marker from the current container
        previousScroll.remove();
        nextScroll.remove();

        // We need to know what style is for the next card in the even/odd cycle
        currentRowStyle = last.hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
      }

      $.each( data.ranks, function( i, rank ) {
        // Check if match the current player
        if ( BVVIZ.currentPlayer && ( rank.type_id === BVVIZ.currentPlayer.id || rank.email === BVVIZ.currentPlayer.email ) ) {
          currentRowStyle += ' bvviz-self';
        }

        // Check if the leaderboard is team leaderboard
        if ( rank.type === 'teams' ) {
          currentRowStyle += ' bvviz-team';
        }

        // Add the rank into the leaderboard, using the card renderer and starting it invisible
        tempContainer = tempContainer.add( render.card( rank ).addClass( 'bvviz-invisible ' + currentRowStyle ) );


        // Change the next row style
        currentRowStyle = currentRowStyle.indexOf( 'bvviz-odd' ) >= 0 ? 'bvviz-even' : 'bvviz-odd';

      });

      // All the new cards are stored in tempContainer, append or prepend them to the currentContainer
      if ( where === 'previous' ) {
        currentContainer.prepend( tempContainer );
      } else {
        currentContainer.append( tempContainer );
      }

      // Track the page state at offset start and offset end
      offsetStart = currentContainer.data( 'bvviz-offset-start' ) < offset ? currentContainer.data( 'bvviz-offset-start' ) : offset;
      offsetEnd = currentContainer.data( 'bvviz-offset-end' ) > offset + limit ? currentContainer.data( 'bvviz-offset-end' ) : offset + limit;
      currentContainer.data( 'bvviz-offset-start', offsetStart );
      currentContainer.data( 'bvviz-offset-end', offsetEnd );

      // Now that it's all, use the helper method to fit the new area into the visualization
      if ( settings.isHorizontal ) {
        BVVIZ.helper.fitWidth( target );
      } else {
        BVVIZ.helper.fitHeight( target );
      }

      // Use the helper method to animate the cards into view
      BVVIZ.helper.showCards( currentContainer );

      // Once we have all the data, we can handle bind/unbind the scroll event based on where it load from
      if ( where === 'previous' ) {
        // load the previous page, check for scroll up event
        if ( offset > 0 ) {
          // there are more previous data which are not loaded
          insertPreviousScrollIndicator();
        } else {
          // reach the first page of data
          currentContainer.unbind( 'load-previous.bvviz' );
        }

      } else if ( where === 'next' ) {
        // load the next page, check for scroll down event
        if ( data.ranks.length < settings.pageSize ) {
          // no more next data...
          currentContainer.unbind( 'load-next.bvviz' );
        } else {
          // more next data...
          insertNextScrollIndicator();
        }

      } else {
        // default load from initial loading, need to handle both direction scroll events

        if ( data.ranks.length < settings.pageSize ) {
          // no more next data...
          currentContainer.unbind( 'load-next.bvviz' );

          // current player near the bottom of active leaderboard, padding space for accurate scolling
          currentContainer.children().each( function(){
            if ( settings.isHorizontal ) {
              extraPadding += $(this).outerWidth( true );
            } else {
              extraPadding += $(this).outerHeight( true );
            }
          });

          if ( settings.isHorizontal ) {
            $('<div>').width( currentContainer[0].scrollWidth - extraPadding ).appendTo( currentContainer );
          } else {
            $('<div>').height( currentContainer[0].scrollHeight - extraPadding ).appendTo( currentContainer );
          }
        } else {
          // more next data...
          insertNextScrollIndicator();
        }

        if ( offset > 0 ) {
          // there are more previous data which are not loaded
          insertPreviousScrollIndicator();
        } else {
          // reach the first offset of data
          currentContainer.unbind( 'load-previous.bvviz' );          
        }

      }

      function insertPreviousScrollIndicator() {
        // Need to know the previous scroll indicator's height or width, so we can re-position the scroll bar
        var previousScroll = $( '<div class="bvviz-show-scroll bvviz-previous">More &rsaquo;</div>' )
          .prependTo( currentContainer ).bind( 'click', function() {
            $( currentContainer ).trigger( 'scroll.bvviz' );
          });

          // Record the previously calculated container's width
        var previousWidth = $( currentContainer ).parent().width();

        if ( settings.isHorizontal ) {

          $( currentContainer )
            // adjust current container's width for horizontal leaderboard
            .width( $( currentContainer ).width() + $( '.bvviz-show-scroll', currentContainer ).width() )

            // re-apply the container with to the parent container
            // re-position the scroll bar on scrollable wrapper after inserting previous scroll indicator
            .parent().width( previousWidth ).scrollLeft( previousScroll.width() );
        } else {
          currentContainer
            // re-position the scroll bar on current container after inserting previous scroll indicator
            .scrollTop( previousScroll.height() );
        }

      }

      function insertNextScrollIndicator() {
        $( '<div class="bvviz-show-scroll bvviz-next">More &rsaquo;</div>' )
          .appendTo( currentContainer ).bind( 'click', function() {
            $( currentContainer ).trigger( 'scroll.bvviz' );
          });

        if ( settings.isHorizontal ) {
          $( currentContainer )
            // adjust current container's width for horizontal leaderboard
            .width( $( currentContainer ).width() + $( '.bvviz-show-scroll', currentContainer ).width() );
        }
      }

    }).fail( function( data ) {

      var previousScroll = $( '.bvviz-show-scroll.bvviz-previous', currentContainer ),
          nextScroll = $( '.bvviz-show-scroll.bvviz-next', currentContainer );

      // Remove the loading display
      loading.remove();

      if ( where === 'previous' ) {
        // In the case of a failure (which can happen if offset is less than exists), unbind load-previous
        currentContainer.unbind( 'load-previous.bvviz' );

        // Remove the previous scroll marker from the current container
        previousScroll.remove();
      } else if ( where === 'next' ) {
        // In the case of a failure (which can happen if offset is greater than exists), unbind load-next
        currentContainer.unbind( 'load-next.bvviz' );

        // To prevent from jumping, hide the next scroll marker from the current container
        $( '.bvviz-show-scroll.bvviz-next', currentContainer ).css('visibility','hidden');
      } else {
        // In the case of an initial loading failure, unbind infinite scroll
        currentContainer.unbind( 'scroll.bvviz' );
        currentContainer.unbind( 'load-previous.bvviz' );
        currentContainer.unbind( 'load-next.bvviz' );
        
        // Also remove the existing scroll marker from the current container
        previousScroll.remove();
        nextScroll.remove();
      }

    });
  }

  // Load player data and render the drawer
  function loadPlayer( card ) {
    // Add a loading icon into the card
    card.append( BVVIZ.helper.loading() );
    // Load the player data
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players', { players: card.data( 'bvviz_type_id' ) }, {
      fields: 'all',
      includes: 'teams,rewards:currentlevels'
    }).ok( function( data ) {
      // Remove the loading icon
      $( '.bvviz-loading', card ).remove();

      // Use the renderer for the drawer, attach it and slideToggle it open
      render.playerDrawer( data.players[0] )
        .appendTo( card )
        .slideToggle();
        
    }).fail(function( data ) {
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  // Load team data and render the drawer
  function loadTeam( card ) {
    // Add a loading icon into the card
    card.append( BVVIZ.helper.loading() );
    // Load the team data
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'teams', { teams: card.data( 'bvviz_type_id' ) }, {
      fields: 'all'
    }).ok( function( data ) {
      // Remove the loading icon
      $( '.bvviz-loading', card ).remove();

      // Use the renderer for the drawer, attach it and slideToggle it open
      render.teamDrawer( data.teams[0] )
        .appendTo( card )
        .slideToggle();

    }).fail( function( data ) {
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.show = show;
  pub.load = load;
  return pub;
};
})(jQuery);


;(function($) {
// Add levelProgress method to the BVVIZ scope
BVVIZ.levelProgress = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Individual level display
    card: function ( currentLevel, nextLevel, playerScores ) {
      // Default level progress with 1 icon for current level 
      var card = $( '<span class="bvviz-card bvviz-invisible bvviz-level"></span>' ),
          currentLevelPointCriteria = currentLevel && currentLevel.player_criteria[0] && currentLevel.player_criteria[0].value,
          nextLevelPointCriteria = nextLevel && nextLevel.player_criteria[0] && nextLevel.player_criteria[0].value,          
          max, value, percentage, label;

          if ( !$.isPlainObject( currentLevel ) ) {
            // Player hasn't started the mission
            max = 1;
            value = 0;
            percentage = 0;
            label = 'Not started yet';
          } else if ( !$.isPlainObject( nextLevel ) ) {
            // Player has finished the last level
            max = 1;
            value = 1;
            percentage = 100;
            label = 'Completed';
          } else {
            // Both current level and next level are defined
            max = 1;
            if ( nextLevel.player_criteria[0] && playerScores == nextLevel.player_criteria[0].value ) {
              // Player has finished current level and next level is defined, switch current level to the next
              value = 0;
              currentLevel = nextLevel;
            } else if ( currentLevel.player_criteria[0] && nextLevel.player_criteria[0] && ( nextLevel.player_criteria[0].value - currentLevel.player_criteria[0].value != 0 ) ) {
              // Player is in progress from current level to the next level
              value = ( playerScores - currentLevel.player_criteria[0].value ) / ( nextLevel.player_criteria[0].value - currentLevel.player_criteria[0].value );
            } else if ( playerScores == 0 ) {
              value = 0;
            } else {
              value = 1;
            }
            // Set the percentage to floor value to make sure 100% is as completed
            percentage = Math.floor( value * 100 );
            label = percentage + '%';
          }

          if ( BVVIZ.utility.isIe8OrLess() ) {
            // Detect current browser is IE8 or less, which doesn't support <progress>
            card.append( 
                $( '<div class="bvviz-label bvviz-line">' + currentLevel.name + '</div>' ),
                $( '<div class="bvviz-progress bvviz-line"></div>').append(
                  $( '<div class="bvviz-progress-bar"></div>' ),
                  $( '<span class="bvviz-progress-label">' + label + '</span>' )
                ),
                $( '<img class="bvviz-level-icon bvviz-current" src="' + currentLevel.image + '">')
              );

          } else {
            card.append( 
                $( '<div class="bvviz-label bvviz-line">' + currentLevel.name + '</div>' ),
                $( '<div class="bvviz-progress bvviz-line"></div>').append(
                  $( '<progress class="bvviz-progress-bar" max="' + max + '" value="' + value + '"></progress>' ),
                  $( '<span class="bvviz-progress-label">' + label + '</span>' )
                ),
                $( '<img class="bvviz-level-icon bvviz-current" src="' + currentLevel.image + '">')
              );

            // Adjust the percent label position and color
            if ( percentage < 30 ) {
              card.find( '.bvviz-progress-label' ).css( 'left', percentage + 5 + '%').addClass( 'bvviz-backlabel' );
            } else if ( percentage < 100 ) {
              card.find( '.bvviz-progress-label' ).css( 'left', percentage - 22 + '%' ).addClass( 'bvviz-forelabel' );            
            } else {
              card.find( '.bvviz-progress-label' ).css( 'left', 5 + '%' ).addClass( 'bvviz-forelabel' );            
            }
          }

      return card;
    }
  },

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the visualization settings
  settings = $.extend( true, {}, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "player" must be provided as an object
    if ( $.type( playerId ) !== 'string' ) {
      return BVVIZ.helper.showError( target, '"player" argument must be a player id.' );
    }

    // Empty the target and add the base classes and rendered level
    target
      .empty()
      .addClass( 'bvviz bvviz-levelProgress' );

    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players', { players: playerId }, { includes:'rewards:currentlevels' } )
      .ok( function( data ) {
        if ( data && data.players && data.players[0] ) {

          // Get player earned untis, including points and other secondary units
          var playerEarnedUnits = data.players[0].units,
              // Set player earned total default to points (all)
              playerEarnedTotal = data.players[0].units.points.all,
              currentLevelPosition = 0;

          // Loop through all players
          $.each( data.players, function( i, player ) {

            if ( player[ 'rewards:currentlevels' ].length > 0 ) {

              // Loop through all level missions and process current level from each
              $.each( player[ 'rewards:currentlevels' ], function ( i, level ) {

                // Search for the matched mission id
                if ( level.mission_id == missionId ) {

                  currentLevelPosition = parseInt( level.mission_position - 1, 10 ) || 0 ;

                  // get point criteria for current and next level
                  BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions/rewards', 
                        { missions: missionId }, 
                        { offset: parseInt( level.mission_position - 1, 10 ), fields: 'player_criteria', limit: 2 } )
                    .ok( function ( missionInfo ) {
                      var criteria = [],
                          // Check if the mission reward exist
                          missionRewards = BVVIZ.utility.validateNestedObj( missionInfo, 'rewards' ) ? missionInfo.rewards : [],
                          // Check if the 1st player criteria in the mission reward exist
                          criteriaObj = BVVIZ.utility.validateNestedObj( missionInfo, 'rewards', [0], 'player_criteria', [0] ) ? missionInfo.rewards[0].player_criteria[0] : null;

                      try {
                        if ( $.isPlainObject( criteriaObj ) ) {
                          // Calculate the player earned total based on mission player criteria, only 1st player criteria is applicable
                          criteria = $.type( criteriaObj.field ) === 'string' ? String.prototype.split.call( criteriaObj.field, '.' ) : [];
                          if ( criteria.length === 3 ) {
                            // Normalize the criteria unit field to match the player units field 
                            criteria[1] = criteria[1] === 'points' ? criteria[1] : 'unit_' + criteria[1];
                            playerEarnedTotal = playerEarnedUnits[ criteria[1] ][ criteria[2] ];
                          }
                        } else {
                          playerEarnedTotal = 0;
                        }

                        if ( missionRewards.length ) {
                          if ( missionRewards.length == 2 ) {
                            // Both current level and next level found
                            target.append( render.card( missionRewards[0], missionRewards[1], playerEarnedTotal ) );
                          } else {
                            // Could happen when the current reward is the last level
                            target.append( render.card( missionRewards[0], null, playerEarnedTotal ) );
                          }
                        }

                        // If BVVIZ.missionProgress has been included...
                        if ( $.isFunction( BVVIZ.missionProgress ) ) {
                          // ...allow the track icon to be clicked on to open the trackProgress visualization
                          $('.bvviz-level-icon', target).click( function( event ) {
                            BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

                            event.preventDefault();
                            return false;
                          });
                        }

                        // Use the helper to show the cards with an animation
                        BVVIZ.helper.showCards( target );

                      } catch( e ) {
                        // If the reward definition for level mission is not as expected, error could happen (like greater or equal to 0)
                        return false;
                      }

                    })
                    .fail( function ( data ) {
                      // Playser hasn't started the mission yet
                      target.append( render.card( null, null, playerEarnedTotal ) );
                    });
                }

              });
            }

          });
        } 

    }).fail( function( data ) {
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );

  return pub;
};
})(jQuery);


;(function($) {
// Add missionProgress method to the BVVIZ scope
BVVIZ.missionProgress = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + ( settings.headerTitle ? settings.headerTitle : name ) + '</div></div>' );
    },

    // Header for the mission itself
    bodyHeader: function( mission ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( mission.progress.percent ? mission.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + mission.hint + '</div>' +
      '</div>' );
    },

    // Individual reward card in list view
    card: function( reward, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-picture-container"></div>').append(
          $('<img class="bvviz-picture" src="' + reward.image + '"/>'),
          $('<div class="bvviz-bridge"></div>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + reward.name + '</div>'),
          $('<div class="bvviz-desc">' + ( reward.hint ? reward.hint : '' ) + '</div>')
        )
      );
      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // This boolean will track whether the player has progress in the mission or not
  hasProgress = false,

  // This boolean will track whether the reward images should be connected by a visual "bridge" or not
  useBridge = true,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionProgress.maxPageSize ) {
    delete options.pageSize;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.missionProgress, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }
    // "missionId" must be provided as a string
    if ( typeof( missionId ) !== 'string' || missionId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"missionId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-missionProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the mission information and player's overall mission progress
    BVSDK.all(
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions', { missions: missionId }, { fields: 'hint' } ),
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions', { players: playerId, missions: missionId }, { fields: 'hint' } )
    ).ok( function( missionDefData, playerMissionData ) {

      // Store a reference to the container
      var cards = $( '.bvviz-cards', target );

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( missionDefData.missions[0].name ).prependTo( target );
      }

      // Render the header for the mission and add it to the body
      // If the player has made progress, use that version of the mission
      if ( playerMissionData && $.isArray( playerMissionData.missions ) ) {
        render.bodyHeader( playerMissionData.missions[0] ).prependTo( $( '.bvviz-body', target ) );

        hasProgress = true;
      } else {
        // Otherwise use the definition
        render.bodyHeader( missionDefData.missions[0] ).prependTo( $( '.bvviz-body', target ) );
      }
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
      
      // Random and Unordered missions don't need the bridge on any elements
      if ( missionDefData.missions[0].type == 'random' || missionDefData.missions[0].type == 'unordered' ) {
        useBridge = false;
      }

      // Trigger a load of the first page of data
      load( 0 );

      // If BVVIZ.rewardProgress has been included...
      if ( $.isFunction( BVVIZ.rewardProgress ) ) {
        // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
        cards.bind( 'click', function( event ) {
          var eventTarget = $( event.target ),
              card = eventTarget.closest( '.bvviz-card' ),
              rewardId;

          // If we can find a reward card from the click, show the reward details for that card
          if ( card.length > 0 ) {
            // Get the rewardId value from the data on the card
            rewardId = card.data( 'bvviz-reward' );

            BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId, { siteId: settings.siteId } ] );

            event.preventDefault();
            return false;
          }
        });
      }

    // Attach a "fail" listener in case the mission id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  function load( page ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),
    // Calculate the page size
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Whether there are earned rewards or not, this function will draw the result
    function drawRows( missionRewardsDefData, playerRewardsData) {
      // This object will store which definition_id's have been earned
      var earnedRewards = {};

      // Create an object map of the earned rewards, using the reward's definition_id as the key
      if ( playerRewardsData ) {
        $.each( playerRewardsData.rewards, function( i, earnedReward ) {
          earnedRewards[ earnedReward.definition_id ] = true;
        });
      }

      // Loop through all the rewards defined on the mission
      $.each( missionRewardsDefData.rewards, function( i, reward ) {
        cards.append(
          // Render the card for each reward, using the earnedRewards map, and add it to the container
          render.card( reward, earnedRewards[ reward.id ] )
            // Add the current row style to the card
            .addClass( currentRowStyle )
        );

        // Change the next row style
        currentRowStyle = currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd';
      });

      // Random and Unordered missions don't need the bridge on any elements
      if ( useBridge === false ) {
        $( '.bvviz-bridge', cards ).remove();
      }

      // The first page has some special clean-up
      if ( page === 0 ) {
        if ( useBridge ) {
          
          // The first card dosn't need the bridge
          $( '.bvviz-bridge:first', cards ).remove();
        }

        // Add the "first" class to the first card to remove it's top margin
        $( '.bvviz-card:first', cards ).addClass( 'bvviz-first' );
      }
          
      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Load the provided page of rewards in the mission
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions/rewards', { missions: missionId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( missionRewardsDefData ) {

        // If the player has progress, load the earned rewards for the player
        if ( hasProgress ) {
        
          // Load the player's earned rewards in the mission that match the definition_ids in this page
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions/rewards', { players: playerId, missions: missionId }, {
              fields: 'hint',
              
              // Use $.map to extract an array of reward definition ids
              query: { definition_id: $.map( missionRewardsDefData.rewards, function( reward ) {
                  return reward.id;
                })
              }

            }).ok( function( playerRewardsData ) {
            
              // Draw the rows with player reward data
              drawRows( missionRewardsDefData, playerRewardsData );

            });

        } else {

          // Draw the rows without player reward data
          drawRows( missionRewardsDefData );

        }

      if ( missionRewardsDefData.rewards.length < pageSize ) {
        // We've loaded all the rewardss, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else {
        // Request all data without infinite Scroll
        BVVIZ.helper.loadNextPage( cards, pub );
      }

      }).fail( function() {
        
        // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
        cards.unbind( 'scroll.bvviz' );

        // Remove the loading display
        loading.remove();
      });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// Add missionRewards method to the BVVIZ scope
BVVIZ.missionRewards = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + ( settings.headerTitle ? settings.headerTitle : name ) + '</div></div>' );
    },

    // Main body
    body: function() {
      var body = $( '<div class="bvviz-body"></div>' ).append( render.description() );
      if ( !settings.showContainerFrame ) {
        body.addClass( 'bvviz-noframe');
      }
      if ( settings.inline ) {
        body.addClass( 'bvviz-noheader');
      }

      return body;
    },

    // Body header
    description: function() {
      var desc = settings.description ? $( '<div class="bvviz-body-title">' + settings.description + '</div>' ) : '';
      // If descriptionFontColor option set to a valid value, add inline style
      if ( settings.description && settings.descriptionFontColor ) {
        desc.css( 'color', settings.descriptionFontColor );
      }

      return desc;
    },

    // Individual reward card
    card: function( reward ) {
      // Replace the background image if the image is not found
      var imageFound = !!( BVVIZ.utility.validateNestedObj( reward, 'image' ) && reward.image ),
      // Use the place holder image as src if the image is not found
          imageSrc = imageFound ? reward.image : BVVIZ.helper.imageHolderSrc();

      // Hide the badge if unearned badge should be covered
      imageSrc = !reward.earned_by && settings.badges.lockUnearned ? BVVIZ.helper.imageHolderSrc() : imageSrc;

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      var card = $( '<div class="bvviz-card bvviz-invisible"></div>' );

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini').append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showProgress ? render.progress( reward ) : '' ),
          render.count( reward )
        );
      } else {
        card.append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showProgress ? render.progress( reward ) : '' )
        );
      }

      // If the reward has not been earned, grey it out
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
        if ( settings.badges.lockUnearned ) {
          card.addClass('bvviz-locked');
        }
      }

      // If this is mini badge or has custom background color, clear the badge border
      if ( settings.badges.miniBadge || !settings.badges.showBadgeBorder ) {
        card.addClass( 'bvviz-borderless' );
      }

      // If the badgeBackgroundColor option set to a valid value, add inline style
      if ( settings.badges.badgeBackgroundColor ) {
        card.css( 'background-color', settings.badges.badgeBackgroundColor );
      }

      // If the badgeFontColor option set to a valid value, add inline style
      if ( settings.badges.badgeFontColor ) {
        card.css( 'color', settings.badges.badgeFontColor );
      }

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    },

    // Progress indicator inside a reward card
    progress: function( reward ) {
      var progress = reward.progress,
          container = $( '<div class="bvviz-progress"></div>' );
      
      if ( $.isNumeric( reward.earned_total_count ) ) {
        // Show rewards that have been completed
          if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
            container.html( '&#10003;' );
          } else if ( settings.badges.miniBadge ) {
            container.html( BVVIZ.helper.svgCheckmarkMini() );
          } else if ( BVVIZ.utility.isIe8OrLess() ) {
            container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
          } else {
            container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
          }
      } else if ( $.isPlainObject( progress ) ) {
        // Show progress for rewards that has progress object returned, otherwise the rewards are not progressable
        container.html( progress.earned + '/' + progress.possible );
      } 

      return container;
    },

    // Reward count indicator for repeatable rewards
    count: function( reward ) {
      return reward.earned_total_count ? $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>') : '';
    },

    // Tooltip
    dialog: function( reward ) {
      return $( '<div class="bvviz bvviz-missionRewards bvviz-dialog">' + 
        '<div class="bvviz-name">' + reward.name + '</div>' +
        '<div class="bvviz-desc">' + reward.hint + '</div>' +
      '</div>' );
    }
  },

  // BVVIZ Visualization object instance 
  bvvizVisual,
  
  // Store the missionRewards settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };
  if ( !options.showContainerFrame || options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !options.showDescription || $.type( options.description ) !== 'string' || options.description == '' ) {
    delete options.description;
  }
  if ( $.type( options.descriptionFontColor ) !== 'string' || !options.descriptionFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
    delete options.descriptionFontColor;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionRewards.maxPageSize ) {
    delete options.pageSize;
  }
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.missionRewards, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Define the card container so that we can bind events to it
    var cards = $( '<div class="bvviz-cards bvviz-row"></div>' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the rewardCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-missionRewards' )
      .append(
        ( settings.childContentCards ? cards : render.body().append( cards ) )
      );

    // Load the mission information and player's overall mission progress
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions', { missions: missionId }
    ).ok( function( missionDefData ) {

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( missionDefData.missions[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Unless we want request all data and disable infinite Scroll
      if ( settings.pageSize !== 0 ) {
        // Set up infinte scrolling on the new container
        BVVIZ.helper.infiniteScroll( cards, pub );
      }

      // Trigger a load of the initial page of data
      load( 0 );

    // Attach a "fail" listener in case the mission id is invalid
    }).fail( function( data ) {

      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

    // If BVVIZ.rewardProgress has been included...
    if ( $.isFunction( BVVIZ.rewardProgress ) ) {
      // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
      cards.bind( 'click', function( event ) {
        var eventTarget = $( event.target ),
            card = eventTarget.closest( '.bvviz-card' ),
            rewardId;

        // If we can find a reward card from the click, show the reward details for that card
        if ( card.length > 0 ) {
          // Get the rewardId value from the data on the card
          rewardId = card.data( 'bvviz-reward' );

          BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId, { siteId: settings.siteId } ] );

          event.preventDefault();
          return false;
        }
      });
    }

  }

  function load( page ) {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        cards = $( '.bvviz-cards', target ),
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize;

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of rewards in the mission
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions/rewards', { missions: missionId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize,
        // Ensure that we only show active rewards
        query: ( { active: true } )
    } ).ok( function( rewardDefsData ) {
      var rewardDefIdArray = $.map( rewardDefsData.rewards, function( reward ) {
            return reward.id;
          } );

      // Make sure that we have at least one reward
      if ( rewardDefsData.rewards.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }

        BVSDK.all(

          // Load the player progress toward the reward and store into reward definition data 
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, {
             // There should only be 1 RewardProgression per player-RewardDefinition ID pair, refer PLAT-715
            query: { type: 'all_rewards', definition_id: rewardDefIdArray }

          } ),
          // Request the player earned reward progress in the rewards found
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions/rewards', { players: playerId, missions: missionId }, {
            fields: ['earned_total_count'],
            
            // Use $.map to extract an array of reward definition ids
            query: { definition_id: rewardDefIdArray }
          } )
        ).ok( function( rewardsProgressData, playerRewardsData ) {

          var rewardProgressMap = {},
              cardWidth;

          if ( playerRewardsData && playerRewardsData.rewards ) {
            $.each( playerRewardsData.rewards, function( i, reward ) {
              // Convert the playerRewardsData into an object, using the reward Id as the key
              rewardProgressMap[ reward.definition_id ] = reward;

              // Merge the player reward progress into playerRewardsData object, using the reward definition Id as the key
              try {
                $.each( rewardsProgressData.progresses, function( j, progress ) {
                  // If the reward definition object found match the progress, merge into progress object
                  if ( reward.definition_id == progress.definition_id ) {
                    rewardProgressMap[ reward.definition_id ].progress = progress;
                  }
                });
              } catch (e) {}
            });
          }

          $.each( rewardDefsData.rewards, function( i, rewardDef ) {
            // Merge the player reward progress into rewardDefsData object, using the reward definition Id as the key
            try {
              $.each( rewardsProgressData.progresses, function( j, progress ) {
                // If the reward definition object found match the progress, merge into progress object
                if ( rewardDef.id == progress.definition_id ) {
                  rewardDef.progress = progress;
                }
              });
            } catch (e) {}

            // Display all mission rewards in the applied order
            if ( settings.badges.showUnearned ) {
              // Render both earned and unearned rewards
              // If the player has earned the reward, use the progress map. Otherwise use the definition
              cards.append( 
                render.card( rewardProgressMap[ rewardDef.id ] ? rewardProgressMap[ rewardDef.id ] : rewardDef )
              );
            } else {
              // Display card only if the player has earned the reward, use the progress map
              if ( rewardProgressMap[ rewardDef.id ] ) {
                cards.append( 
                  render.card( rewardProgressMap[ rewardDef.id ] )
                );
              }
            }
          });

          // If this is the child content of custom container, then slient loading, otherwise show the cards
          if ( !settings.childContentCards ) {
            // Calculate the card width after card being appended
            if ( !cardWidth ) {
              cardWidth = BVVIZ.helper.fitRowCardWidth( cards.children(":first"), cards );
            }
            // Apply the calculated width to each cards
            cards.children().width( cardWidth );

            // Remove the loading display
            loading.remove();

            // Use the helper to show the cards with an animation
            BVVIZ.helper.showCards( cards );
          }

        }).always( function() {
          if ( $.isFunction( settings.callback ) ) {
            settings.callback();
          }      
        });
      } else {
        // Remove the loading display
        loading.remove();
      }

      if ( rewardDefsData.rewards.length < pageSize ) {
        // We've loaded all the rewards, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else {
        // Request all data without infinite Scroll
        BVVIZ.helper.loadNextPage( cards, pub );
      }


    }).fail( function() {
      // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
      cards.unbind( 'scroll.bvviz' );

      // Remove the loading display
      loading.remove();
    });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(jQuery);


;(function($) {
// Add missionTutorial method to the BVVIZ scope
BVVIZ.missionTutorial = function( target, playerId, missionId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    // Header for the mission itself
    bodyHeader: function( mission ) {
      var percent = mission.progress.percent ? mission.progress.percent : 0 ,
          container = $( '<div class="bvviz-body-header"></div>' ),
          summaryProgress;

      container.append(
        $( '<div class="bvviz-info">' + ( percent == 100 ? mission.message : mission.hint ) + '</div>').append(
          '<div class="bvviz-countdown">Days Left: n/a</div>'
        )
      );

      summaryProgress = BVVIZ.helper.showRadialProgress( percent ).prependTo( container );

      BVVIZ.helper.animateRadialProgress( summaryProgress );

      return container;
    },

    // Individual reward card
    card: function( reward, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible ' + ( earned ? 'bvviz-complete' : 'bvviz-not-started' ) + '"' +
          // Add a data attribute to track the reward Id
          ' data-bvviz-reward_id="' + reward.id + '"></div>');

      card.append(
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + reward.name + '</div>'),
          $('<div class="bvviz-desc">' + ( settings.list.showItemProgress ? this.unknownProgress( reward, earned ) : ( reward.hint ? reward.hint : '' ) ) + '</div>')
        ),
        render.checkmark()
      );

      // If badge icons should display, add class name to reserve space for the icons
      if ( settings.list.showBadgeIcon ) {
        card.addClass('bvviz-list-icon')
            .prepend( $('<div class="bvviz-picture-container"></div>').append(
              $('<img class="bvviz-picture" src="' + reward.image + '"/>')
            )
        );
      }

      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    },

    // Checkmark
    checkmark: function() {
      if ( BVVIZ.utility.isIe8OrLess() ) {
        return $( '<div class="bvviz-checkmark-circle bvviz-nosvg"></div>');
      } else {
        return $( '<div class="bvviz-checkmark-circle">' + BVVIZ.helper.svgCheckmarkCircle() + '</div>' );
      }
    },

    // Unknown progress
    unknownProgress: function( reward, earned ) {
      if ( earned ) {
        
        // If the reward is earned and progress_possible is defined, we assume the player has done all of the possible steps
        if ( reward.progress_possible ) {
          return 'Completed (' + reward.progress_possible + '/' + reward.progress_possible + ')';
        }
        
        // If the reward is earned but we don't know progress, just show completed text
        return 'Completed';
      }

      // If the reward is unearned but progress is possible to know, show "Not Started" for now
      //  (The progress will be updated asynchronously if the player has actually started the reward)
      if ( reward.progress_possible ) {
        return 'Not Started (0/' + reward.progress_possible + ')';
      }

      // Otherwise we make no assumptions about the progress nor possibility or progress
      return '&nbsp;';
    },

    // Known progress text
    progress: function( card, progress ) {
      var desc = card.find( '.bvviz-desc' );
      if ( progress.percent == 0 ) {
        desc.html( 'Not Started' );
      } else if ( progress.percent < 100 ) {
        desc.html( 'In Progress (' + progress.earned + '/' + progress.possible + ')' );

        // Remove the "not-started" class and add a "started" one to the card, currently being disabled
        // card.removeClass( 'bvviz-not-started' ).addClass( 'bvviz-started' );
      } else {
        desc.html( 'Completed (' + progress.earned + '/' + progress.possible + ')' );
      }
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // Store the type of mission for later use. 
  // If this is Unordered or Random mission, sort and display the unfinished reward items first
  missionType = null,

  // Store the player's mission progress object
  playerMissionProgress,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionTutorial.maxPageSize ) {
    delete options.pageSize;
  }
  if ( BVVIZ.utility.validateNestedObj( options, 'alternateVisual' ) ) {
    if ( $.type( options.alternateVisual.visualName ) !== 'string' ){
      delete options.alternateVisual.visualName;
    }
    if ( $.type( options.alternateVisual.streamId ) !== 'string' ){
      delete options.alternateVisual.streamId;
    }
    if ( $.type( options.alternateVisual.leaderboardId ) !== 'array' ){
      delete options.alternateVisual.leaderboardId;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.missionTutorial, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Allow for target to be provided as a string or jQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }
    // "missionId" must be provided as a string
    if ( typeof( missionId ) !== 'string' || missionId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"missionId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-missionTutorial' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the mission information
    BVSDK.all(
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions', { missions: missionId }, {
        fields: 'hint'
      } ),
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: {
        type: 'all_missions',
        definition_id: missionId
      }} )
    ).ok( function( missionDefData, playerProgressData ) {
      var body = $( '.bvviz-body', target ),

          cards = $( '.bvviz-cards', target ),

          // Store the return value from the callback function
          callbackSwitch;

      // Store the mission type for track sorting
      missionType = missionDefData.missions[0].type;

      // Store the player mission progress object
      playerMissionProgress = BVVIZ.utility.validateNestedObj( playerProgressData, 'progresses', [0] ) ? playerProgressData.progresses[0] : {};

      // Level missions can not be completed, though they are allowed to have alternate visualization upon "completion"

      // If player has completed a non-level mission, it's possible to switch to alternate visualization on the settings
      if ( playerMissionProgress.percent == 100 && typeof settings.progressCompleteCallback === 'function' && settings.alternateVisual ) {

        // Convert to alternate visualization if this mission is completed
        callbackSwitch = settings.progressCompleteCallback( pub, settings.alternateVisual );

        // If the callback continue flag returns true, stop current visualization and switch to new visualization
        if ( callbackSwitch ) {
          return false;
        }
      }

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( settings.inline ) {
        body.addClass( 'bvviz-noheader');
      } else {
        render.header( missionDefData.missions[0].name ).prependTo( target );
      }

      // Render the summary for the track and add it to the body
      if ( playerMissionProgress ) {
        // If the player has made progress, add that to the track
        missionDefData.missions[0].progress = playerMissionProgress;
      }

      // Render the body
      render.bodyHeader( missionDefData.missions[0] ).prependTo( body );
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );

      // Trigger a load of the first page of data
      load( 0 );

      // If BVVIZ.rewardProgress has been included...
      if ( $.isFunction( BVVIZ.rewardProgress ) ) {
        // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
        cards.bind( 'click', function( event ) {
          var eventTarget = $( event.target ),
              card = eventTarget.closest( '.bvviz-card' ),
              rewardId;

          // If we can find a reward card from the click, show the reward details for that card
          if ( card.length > 0 ) {
            // Get the rewardId value from the data on the card
            rewardId = card.data( 'bvviz-reward' );

            BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId, { siteId: settings.siteId } ] );

            event.preventDefault();
            return false;
          }
        });
      }

    // Attach a "fail" listener in case the mission id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  function load( page ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),

    // The number of Rewards that will be requested in a single API call
        pageSize = settings.pageSize > 0 ? settings.pageSize : settings.maxPageSize ;

    // Whether there are earned rewards or not, this function will draw the result
    function drawRows( missionRewardsDefData, playerRewardsData ) {
      // This object will store which definition_id's have been earned
      var earnedRewards = {},

      // This array will store the unearned definition_id's involved in the mission
      unearnedRewardIds = [];

      // Create an object map of the earned rewards, using the reward's definition_id as the key
      if ( playerRewardsData ) {
        $.each( playerRewardsData.rewards, function( i, earnedReward ) {
          earnedRewards[ earnedReward.definition_id ] = true;
        });
      }

      // Loop through all the rewards defined on the mission
      $.each( missionRewardsDefData.rewards, function( i, reward ) {
        //Add the reward Id into the array if it's not been earned
        if ( !earnedRewards[ reward.id ] ) {
          unearnedRewardIds.push( reward.id );
        }

        // If the mission is Random or Unordered type
        if ( missionType === 'random' || missionType === 'unordered' ) {
          // If it's an earned reward...
          if ( earnedRewards[ reward.id ] ) {

            // Determine the current RowStyle
            currentRowStyle = cards.children().filter(":last").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
          
            // Render the card for each reward, using the earnedRewards map, and add it to the container
            render.card( reward, earnedRewards[ reward.id ] ).appendTo( cards )
              // Add the current row style to the card
              .addClass( currentRowStyle );
          } else {

            // Determine the current RowStyle
            currentRowStyle = cards.children().filter(":first").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';

            // Render the card for each reward, using the earnedRewards map, and add it to the container
            render.card( reward, earnedRewards[ reward.id ] ).prependTo( cards )
              // Add the current row style to the card
              .addClass( currentRowStyle );
          }

        // else the mission is one of Level, ordered or progression
        } else {

          // Determine the current RowStyle
          currentRowStyle = cards.children().filter(":last").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';
        
          // Render the card for each reward, using the earnedRewards map, and add it to the container
          render.card( reward, earnedRewards[ reward.id ] ).appendTo( cards )
            // Add the current row style to the card
            .addClass( currentRowStyle );          
        }
      });

      // If there are unearned rewards... this is only for displaying the progress ratio 
      if ( unearnedRewardIds.length > 0 && settings.list.showItemProgress ) {
        // ...request the Progresses object(s) in an async call
       BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: { type: 'all_rewards', definition_id: unearnedRewardIds } } )
          .ok( function( data ) {

            // Loop through the Progresses and add the new data into the relevant card
            $.each( data.progresses, function( i, progress ) {

              // Use the data-bvviz-reward_id attribute as the selector
              render.progress( cards.find( '[data-bvviz-reward_id="' + progress.definition_id + '"]' ), progress );

            });
          });
      }
          
      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Load the provided page of rewards in the mission
   BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions/rewards', { missions: missionId }, {
        fields: [ 'hint', 'progress_possible' ],
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( missionRewardsDefData ) {

        var earnedRewardsMap = {};

        // If the player has progress, load the earned rewards for the player
        if ( playerMissionProgress && playerMissionProgress.percent > 0 ) {
        
          // Load the player's earned rewards in the mission that match the definition_ids in this page
         BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions/rewards', { players: playerId, missions: missionId }, {
              fields: 'hint',
              
              // Use $.map to extract an array of reward definition ids
              query: { definition_id: $.map( missionRewardsDefData.rewards, function( reward ) {
                  return reward.id;
                })
              }

            }).ok( function( playerRewardsData ) {

              // Draw the rows with player reward data
              drawRows( missionRewardsDefData, playerRewardsData );

            }).fail( function() {

              // Remove the loading display
              loading.remove();
            });

        } else {

          // Draw the rows without player reward data
          drawRows( missionRewardsDefData );

        }

        // If we've loaded all the missions, unbind the infinite scroll to prevent extra requests
        if ( missionRewardsDefData.rewards.length < pageSize ) {
          // We've loaded all the rewards, unbind the infinite scroll to prevent extra requests
          cards.unbind( 'scroll.bvviz' );
        } else {
          // Request all data without infinite Scroll
          BVVIZ.helper.loadNextPage( cards, pub );
        }

      }).fail( function() {
        
        // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
        cards.unbind( 'scroll.bvviz' );

        // Remove the loading display
        loading.remove();
      });
  }

  // Expose the named arguments passed to current visualization
  function namedParam( argName ) {
    var args = {
      target: target, 
      playerId: playerId,
      missionId: missionId,
      options: options
    };

    return args[ argName ] ? args[ argName ] : null ;
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;
  pub.namedParam = namedParam;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// The BVVIZ object will need a queue container for this visualization
BVVIZ.queue = BVVIZ.queue || {};
BVVIZ.queue.notify = BVVIZ.queue.notify || [];

// Notification can either be a Reward, Activity, or MissionHistory object.
BVVIZ.notify = function( notification, size, playerId, completeCB ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

    // Create a target element
    target = $('<div class="bvviz bvviz-notify bvviz-' + size + '" id="bvviz-notify-' + size + '"></div>'),

    // The functions in the "render" object control the DOM structure created for each area
    render = {
      
      // Small notification
      small: function( resource ) {
        var imageSrc = BVVIZ.utility.validateNestedObj( resource, 'image' ) && resource.image ? resource.image : BVVIZ.helper.imageHolderSrc();
        target.addClass( 'bvviz-background' );
        if ( imageSrc.match( /^[\w\s]+$/ ) ) {
          return $( '<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>' +
            '<div class="bvviz-details">' + ( resource.message ? resource.message : resource.name ) + '</div>' )
            .add(
              this.units( resource.units )
            );          
        } else if ( imageSrc.indexOf( 'http' ) > -1 ) {
          return $( '<img class="bvviz-picture" src="' + imageSrc + '" />' +
            '<div class="bvviz-details">' + ( resource.message ? resource.message : resource.name ) + '</div>' )
            .add(
              this.units( resource.units )
            );
        }
        return $( '<div class="bvviz-details">' + ( resource.message ? resource.message : resource.name ) + '</div>' ).add(
          this.units( resource.units )
        );
      },

      // Medium notification
      medium: function( resource ) {
        var card = $( '<div class="bvviz-card bvviz-background">' +
            '<div class="bvviz-details">' +
              '<div class="bvviz-name">' + resource.name + '</div>' +
              '<div class="bvviz-desc">' + resource.message + '</div>' +
            '</div>' +
          '</div>' ).prepend(
            this.units( resource.units )
          );

        // If the playerId was provided and playerProfile function is defined, add a button
        if ( playerId && $.isFunction( BVVIZ.playerProfile ) ) {
          card.prepend(
            $( '<div class="bvviz-view-player-profile bvviz-inverted">View Profile</div>' )
              .bind( 'click', function() {
                BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId ] );
              })
          );
        }

        return card;
      },
      // Container for the medium notification
      mediumContainer: function( resource ) {
        var imageSrc = BVVIZ.utility.validateNestedObj( resource, 'image' ) && resource.image ? resource.image : BVVIZ.helper.imageHolderSrc();
        return $( '<div class="bvviz-container">' +
          '<img class="bvviz-rays" src="' + BVVIZ.helper.imageHolderSrc() + '" />' +
          '<img class="bvviz-picture" src="' + imageSrc + '" />' +
          '<div class="bvviz-body bvviz-col">' +
            '<div class="bvviz-cards bvviz-col"></div>' +
          '</div>' +
        '</div>');
      },

      // Large notification
      large: function( resource ) {
        var imageSrc = BVVIZ.utility.validateNestedObj( resource, 'image' ) && resource.image ? resource.image : BVVIZ.helper.imageHolderSrc();
        var card = $( '<div class="bvviz-container"></div>' ).append(
          // Add a "close" button that triggers largeOut when clicked
          $( '<div class="bvviz-close">x</div>' ).bind( 'click', largeOut ),
          '<img class="bvviz-picture" src="' + imageSrc + '" />' +
          '<div class="bvviz-details">' +
            '<div class="bvviz-name">' + resource.name + '</div>' +
            '<div class="bvviz-desc">' + resource.message + '</div>' +
          '</div>',
          this.units( resource.units )
        );

        // If the playerId was provided and playerProfile function is defined, add a button
        if ( playerId && $.isFunction( BVVIZ.playerProfile ) ) {
          card.append(
            $( '<div class="bvviz-view-player-profile bvviz-inverted">View Profile</div>' )
              .bind( 'click', function() {
                BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId ] );
              })
          );
        }

        return card;
      },

      // Units in the notification
      units: function( units ) {
        var unitsContainer = $( '<div class="bvviz-units"></div>' );

        if ( !units ) {
          return unitsContainer;
        }
        
        // Add each unit type that has been earned and is not 0 into the container
        $.each( units, function( type, unit ) {
          // MissionHistories don't return unit.earned, so if there's a possible value, use that.
          if ( !unit.earned && unit.possible ) {
            unit.earned = unit.possible;
          }
          // If a non-zero value was earned, show it.
          if ( unit.earned && unit.earned !== 0 ) {
            unitsContainer.append(
              '<div class="bvviz-unit">' + ( unit.earned > 0 ? '+' : '' ) + unit.earned + ' ' + unit.display_name + '</div>'
            );
          }
        });

        return unitsContainer;
      }

    },

    // Store a reference to the delay timer used
    timer;

  function init() {
    // Handle error conditions due to invalid inputs by not doing anything:
    // notification must be an object
    if ( typeof( notification ) != 'object' ) {
      return;
    }

    // Start the animation based on the size passed in
    switch ( size ) {
      case 'small':
        smallIn();
        break;
      case 'large':
        largeIn();
        break;
      default: // Assume 'medium'
        mediumIn();
    }
  }

  // General purpose normalization function
  function normalize() {
    return {
      // notifications may come from two resources
      // if from activities, behaviors sub resources should be included
      // if from notifications, data sub resources should be included
      name: notification.name || ( notification.data && notification.data.name ) || ( notification.behaviors && notification.behaviors.length > 0 ? notification.behaviors[0].name : null ),
      message: notification.message || '',
      image: notification.image || ( notification.data && notification.data.image ) || ( notification.behaviors && notification.behaviors.length > 0 ? notification.behaviors[0].image : null ),
      units: notification.units
    };
  }

  // Timer object to allow pausing and resuming of delays
  function Timer( callback, delay ) {
    var remaining = delay,
        timerId,
        start;

    // Pause the timer
    function pause() {
        window.clearTimeout( timerId );
        remaining -= new Date() - start;
    };

    // Resume the timer
    function resume() {
        start = new Date();
        timerId = window.setTimeout( callback, remaining );
    };

    // Start the timer immediately
    resume();

    // Return the timer so that we can trigger methods on it
    return {
      pause: pause,
      resume: resume
    };
  }

  // General purpose delay function
  function delay( then, seconds ) {
    // timer is declared higher up in order to access it later
    timer = new Timer( then, seconds * 1000 );
  }

  // General purpose pause function
  function pause() {
    // Pause the timer if it exists
    if ( timer ) {
      timer.pause();
    }
  }

  // General purpose resume function
  function resume() {
    // Resume the timer if it exists
    if ( timer ) {
      timer.resume();
    }
  }

  // General purpose function to remove the notification and move the queue forward
  function done() {

    // After the element is removed from view, remove it from the DOM
    target.remove();

    // Pause the timer (which acts as a clearTimeout)
    pause();

    // If a callback was defined, trigger it now
    try {
      completeCB( notification, size, playerId );
    } catch(e) {}

    // If there is another element in the queue of the same size, show it
    if ( BVVIZ.queue.notify.length > 0 ) {
      $.each( BVVIZ.queue.notify, function( i, q ) {
        if ( q[ 1 ] === size ) {
          BVVIZ.notify.apply( BVVIZ, BVVIZ.queue.notify.splice( i, 1 )[0] );
          return false;
        }
      });
    }
  }

  // Animation to show small notification
  function smallIn() {
    // Normalize the data
    var normalized = normalize(),

        width;

    // If we don't have a name, nothing to display
    if ( !normalized.name ) {
      return;
    }

    // Normalize the object passed in and render it with the correct rendering function
    target.append(
      render.small( normalized )
    );
    
    // Add the target into the body element of the page
    target.appendTo( 'body' );
    
    // Capture the width of the target
    width = target.width();
    
    // Move the target out of view
    target
      .css({
        right: width * -1
      })
      // Animate the target into view from the left
      .animate({
        right: '+=' + ( width + 20 )
      },
      null,
      // Attach a callback to delay the removal
      function() {
        delay( smallOut, 3 );
      })
      // Clicking the notification should remove it
      .bind( 'click', smallOut )
      // Allow the notification to be paused/resumed when it is hovered over/out
      .bind( 'mouseenter', pause )
      .bind( 'mouseleave', resume );
  }
  // Animation to remove small notification
  function smallOut() {
    // Slide the target out of view to the right
    target.stop().animate({
      right: '-=' + ( target.width() + 20 )
    },
    done );
  }

  // Animation to show medium notification
  function mediumIn () {
    
    // Normalize the data
    var normalized = normalize(),

    // Render the container based on the normalized object
        container = render.mediumContainer( normalized );

    // If we don't have a name, nothing to display
    if ( !normalized.name ) {
      return;
    }

    // Render a medium card and add it to the container
    container.find( '.bvviz-cards' ).append(
      render.medium( normalized )
    );

    // Add the container into the target and add it to the body
    target
      .append( container )
      .appendTo( 'body' )
    // Use the slideToggle animation from JQuery
      .slideToggle( function () {

        // Add a close button after the animation is complete so that it's not clicked on during animation
        container.prepend(
          $( '<div class="bvviz-close">x</div>' )
            .bind( 'click', mediumOut )
        );

        // Delay the closure by 5 seconds
        delay( mediumOut, 5);
      })
      // Allow the notification to be paused/resumed when it is hovered over/out
      .bind( 'mouseenter', pause )
      .bind( 'mouseleave', resume );
  }
  // Animation to remove medium notification
  function mediumOut() {
    
    // Unbind and remove the close button instantly so that there are no double-clicks
    target.find( '.bvviz-close' ).unbind( 'click' ).remove();

    // Slide the container in the target out of view
    target.stop().slideToggle({
      complete: done
    });

  }

  // Animation to show large notification
  function largeIn() {
    // Normalize the data
    var normalized = normalize();

    // If we don't have a name, nothing to display
    if ( !normalized.name ) {
      return;
    }
    
    // Render the notification using the normalized version of the object
    var container = render.large( normalized )
          // Allow the notification to be paused/resumed when it is hovered over/out
          .bind( 'mouseenter', pause )
          .bind( 'mouseleave', resume ),

        // Need to store the height of the target
        height = 0;

    // Add the container into the target and add it to the body
    target
      .append( container )
      .appendTo( 'body' );

    // Capture the height of the target now that it's in the DOM
    height = target.height();

    target
      // Shift the target to be just out of view on the top of the window
      .css({
        top: -height
      })
      // Animate the target into view from the top
      .animate(
        { top: '+=' + ( height + 100 ) },
        null,
        function () {
          // Delay the closure by 5 seconds
          delay( largeOut, 5 );
        });
  }
  // Animation to remove large notification
  function largeOut() {
    
    // Unbind the close button instantly so that there are no double-clicks
    target.find( '.bvviz-close' ).unbind( 'click' );

    // Slide the target out of view to the top
    target.stop().animate(
      { top: '-' + target.height() },
      // When complete, trigger done to remove the element, etc.
      done
    );
  }

  // Ensure size is provided (or assume "medium") and lower-cased
  size = size && size.length > 0 ? size.toLowerCase() : 'medium';

  // Check for existing notification
  if ( $( '#bvviz-notify-' + size ).length > 0 ) {
    
    // If there's an existing notification, add this one to the queue
    //  The queue is populated with a clone of "arguments"
    BVVIZ.queue.notify.push( Array.prototype.slice.call( arguments ) );

  } else {

    // Initialize the visualization automatically upon passing site check
    BVVIZ.waitForSiteCheck( function( sitePass ){
      if ( sitePass ) {
        init();
      } else {
        return false;
      }
    });

    // If notification is an activity object with more than one behavior...
    if ( notification && notification.verb && notification.behaviors && notification.behaviors.length > 1 ) {
      // ...create a notification for each behavior after the first
        $.each( notification.behaviors, function( i, behavior ) {
          // Clone the activity notification
          var clonedNotification = $.extend( {}, notification );

          // Skip the first behavior as that has already been displayed via the "init" call
          if ( i === 0 ) {
            return;
          }

          // Set the "behaviors" array to the current behavior
          clonedNotification.behaviors = [ behavior ];

          // Trigger a new notification for the cloned notification
          BVVIZ.notify( clonedNotification, size, playerId );
        });

      // Remove all but the first behavior from the passed-in notification to avoid duplicates
      notification.behaviors = notification.behaviors.slice( 0, 1 );
    }

  }

  // Expose some of the methods publicly and return the pub object
  switch ( size ) {
    case 'small':
      pub.hide = smallOut;
      break;
    case 'large':
      pub.hide = largeOut;
      break;
    default: // Assume 'medium'
      pub.hide = mediumOut;
  }

  return pub;
};
})(jQuery);


;(function($) {
// Add playerCard method to the BVVIZ scope
BVVIZ.playerCard = function( target, player, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function() {
      return $( '<div class="bvviz-header-band"></div>' );
    },

    // Individual player identity info
    headerContent: function( player ) {
      return $( '<div>' )
            .append( 
              $( '<img class="bvviz-avatar" src="' + player.image + '" />' ),
              $( '<div class="bvviz-name">' + player.display_name + '</div>' )
            );  
    },

    // More individual player identity info
    subHeaderContent: function( player ) {
      var list = [],
          content = $( '<div class="bvviz-desc">' );

      // If the player holds one or more levels, show the current levels
      if ( $.isArray( player[ 'rewards:currentlevels' ] ) && player[ 'rewards:currentlevels' ].length > 0 ) {
        // Build a comma-separated list of level names
        list = Array.prototype.concat( 
          list, 
          $.map( player[ 'rewards:currentlevels' ], function( level ) {
            return level.name;
          })
        );
      }

      // If the player is on one or more teams, show the team names
      if ( $.isArray( player.teams ) && player.teams.length > 0 ) {
        // Build a comma-separated list of team names
        list = Array.prototype.concat( 
          list, 
          $.map( player.teams, function( team ) {
            return team.display_name;
          })
        );
      }      

      if ( list.length > 0 ) {
        // Render the list as a comma-separated list
        content.append( list.join( ' &#8226; ' ) );
      }

      return content;  
    }

  },

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerProfile settings
  settings = $.extend( {}, BVVIZ.options.playerCard, options ),

  // Store the unitBar settings for playerCard
  unitBarSettings = $.extend( { visualization : 'playerCard', siteId: settings.siteId }, settings.unitBar ),

  // Default all modules for inclusion, note: units is not part of the inclusion
  modules = [ 'level', 'expertise', 'teams', 'activities' ],

  // Default all inclusion in the same order of modules passing to the player promise
  inclusions = [ 'rewards:currentlevels', 'progresses:all_tracks', 'teams', 'activities' ];

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "player" must be provided as an object or a string representing the player Id
    if ( !( $.isPlainObject( player ) || typeof( player ) === 'string' ) || player.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"player" argument must be an object or a string.' );
    }

    // Prepare the modules being included in the player API request from the settings object
    if ( BVVIZ.utility.validateNestedObj( settings, 'unitBar', 'modules' ) ) {
      $.each( modules, function( index, value ){
        // Replace the item from includes option with '' if it doesn't exist in the options
        if ( $.inArray( value, settings.unitBar.modules ) < 0 ) {
          Array.prototype.splice.call( inclusions, index, 1, '' );
        }
      });

      // Clean the includes option by removing the empty elements ('', null, undefined and 0)
      inclusions = Array.prototype.filter.call( inclusions, 
        function( el ) {
          return el;
        });
    }

    // Empty the target and add the base classes and rendered card
    target
      .empty()
      .addClass( 'bvviz bvviz-playerCard' )
      .append(
        render.header(),
        $( '<div class="bvviz-body"></div>' ).append(
          $( '<div class="bvviz-header-subband"></div>' ),
          $( '<div class="bvviz-card"></div>' ).append(
            $( '<div class="bvviz-units"></div>' )
          )
        )
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Trigger a show of the default data
    show();
  }


  function show() {
    // Get the reference of the sub header
    var subHeader = $( '.bvviz-body-header', target ),

    // Create a loading display
    loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    var showPlayer = function( playerObj ){

      // Get a reference 
      var header = $( '.bvviz-header-band', target ),

          subHeader = $( '.bvviz-header-subband', target );
      
      // Render player header
      header.append(
        render.headerContent( playerObj )
      );

      // Render player sub header
      subHeader.append(
        render.subHeaderContent( playerObj )
      );

      // Render player's unitBar
      BVVIZ.helper.unitBar( $( '.bvviz-units', target ), playerObj, unitBarSettings );

      // If the playerProfile function is defined, add event handler
      if ( $.isFunction( BVVIZ.playerProfile ) ) {
        header.add( subHeader ).bind( 'click', function() {
          BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerObj.id, { siteId: settings.siteId } ] );
        });
      }

      // Remove the loading indicator
      loading.remove();
    };

    if ( $.isPlainObject( player ) ) {
      // "player" is an object. Show the player object directly.
      showPlayer( player );
    } else {
      // "player" is a string. Retrieve the player object to display; include modules.
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK(
        'players',
        { players: player },
        { includes: inclusions }
      ).ok( function( data ) {

        // Populate the "player" variable at the higher scope
        //var player = data.players[0];
        // Show the player at the higher scope
        showPlayer( data.players[0] );

      }).fail( function( data ) {
        // Show an error on failure
        BVVIZ.helper.showError( target, data );
      });
    }
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.show = show;

  // Mark this as an update-able display that requires a player object
  pub.playerId = $.isPlainObject( player ) ? player.id : player;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );

  return pub;
};
})(jQuery);


;(function($) {
// Add playerHeader method to the BVVIZ scope
BVVIZ.playerHeader = function( target, player, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // BVVIZ Visualization object instance 
      bvvizVisual,

  // Store the playerHeader settings
      settings = $.extend( {}, BVVIZ.options.playerHeader, options ),

  // Store the unitBar settings for playerProfile
      unitBarSettings = $.extend( { visualization : 'playerHeader', siteId: settings.siteId }, settings.unitBar ),

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // playerHeader card
    card: function( cardPlayerObj ) {
      var card = $( '<div class="bvviz-card">' +
        '<img class="bvviz-picture" src="' + cardPlayerObj.image + '" />' +
        '<div class="bvviz-name">' + cardPlayerObj.display_name + '</div>' +
        '<div class="bvviz-units"></div>' +
      '</div>' );

      // Add the unitBar in a timeout since the card must exist in the DOM for proper rendering
      window.setTimeout( function() {
        BVVIZ.helper.unitBar( $( '.bvviz-units', card ), cardPlayerObj, unitBarSettings );
        card.append( '<div class="bvviz-clear"></div>' );
      }, 1 );

      return card;
    }

  };

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init( playerObj ) {
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "player" must be provided as an object
    if ( !$.isPlainObject( playerObj ) ) {
      return BVVIZ.helper.showError( target, '"player" argument must be an object.' );
    }

    // Empty the target and add the base classes and rendered card
    target
      .empty()
      .addClass( 'bvviz bvviz-playerHeader' )
      .append(
        $( '<div class="bvviz-body"></div>' ).append(
          render.card( playerObj )
        )
      );

    // If BVVIZ.playerProfile is defined, bind to a click of the target to show it
    if ( $.isFunction( BVVIZ.playerProfile ) ) {
      target.bind( 'click', function() {
        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerObj.id, { siteId: settings.siteId } ] );
      });
    }
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init( player );
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display that requires a player object
  pub.playerId = player.id;
  BVVIZ.needsPlayer = true;
  pub.needsPlayer = true;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// Add playerCollection method to the BVVIZ scope
BVVIZ.playerCollection = function( target, dataAttr, visualization, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // BVVIZ Visualization object instance 
      bvvizVisual,

  // Store the visualization settings
      settings = $.extend( {}, BVVIZ.options[ visualization ], options ),

  // Store the player API request bundle limit. We have a limit of 30 players in Cairo API
      pageSize = $.isNumeric( settings.pageSize ) &&  settings.pageSize < 30 && settings.pageSize > 0 ? settings.pageSize : 30,

  // Default all modules for player API inclusion, note: units is not part of the inclusion
      modules = [ 'level', 'expertise', 'teams', 'activities' ],

  // Default all inclusion in the same order of modules passing to the player promise
      inclusions = [ 'rewards:currentlevels', 'progresses:all_tracks', 'teams', 'activities' ],

  // Store all the player Ids
      playerIds = [],

  // Hash object to prevent duplicate player Ids being stored
      uniqueIds = {};

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {

    var loading;

    // Allow for target to be provided as a string or JQuery object
    target = $( target );
    attrib = String.prototype.replace.call( dataAttr, /^data\-/, '' ); 

    // Handle error conditions due to invalid inputs:
    // Allow a collection of DOM elements per instance
    if ( target.length == 0 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a collection of DOM nodes.' );
    }
    // "dataAttr" must be a valide DOM attribute embeded in each matched target element
    if ( $( '[' + dataAttr + ']' ).length < 1 ) {
      return BVVIZ.helper.showError( target, '"dataAttr" argument must be a valid DOM attribute.' );
    }

    // Extract a list of unique player ids
    target.map( function() {
      var thisId = $( this ).data( attrib );

      // We have a limit of 30 players in this demo
      if ( playerIds.length >= pageSize ) {
        return false;
      }

      if ( $.type( thisId ) === 'string' && String.prototype.match.call( thisId, /^[A-Fa-f\d]{24}$/ ) && !uniqueIds[ thisId ] ) {
        playerIds.push( thisId );
        // Add this id to the uniqueIds hash to prevent duplicates
        uniqueIds[ thisId ] = true;
      }
    });

    // Prepare the modules being included in the player API request from the settings object
    if ( BVVIZ.utility.validateNestedObj( settings, 'unitBar', 'modules' ) ) {
      $.each( modules, function( index, value ){
        // Replace the item from includes option with '' if it doesn't exist in the options
        if ( $.inArray( value, settings.unitBar.modules ) < 0 ) {
          Array.prototype.splice.call( inclusions, index, 1, '' );
        }
      });

      // Clean the includes option by removing the empty elements ('', null, undefined and 0)
      inclusions = Array.prototype.filter.call( inclusions, 
        function( el ) {
          return el;
        });
    }


    // Create a loading display
    loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Show an indicator in the target to indicate that something is happening
    target.first().append( loading );

    // Retrieve the player objects to display; using the configured inclusion object
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK(
      'players',
      null,
      {
        query: { id: playerIds },
        includes: inclusions
      }
    ).ok( function( data ) {

      if ( $.isFunction( BVVIZ[ visualization ] ) ) {

        // Loop through each player found
        $.each( data.players, function( i, player ) {
          // Find the DOM element(s) for the player and render a visualization inside of each DOM element found
          // Note: Content in the DOM will be replaced 
          // To augment it, add a new DOM element to the target and pass the new element into the individual visualization call
          $( '[' + dataAttr + '=' + player.id + ']' )
            .each( function() {

              // Empty the target and add the base classes and rendered card
              $( this ).empty().addClass( 'bvviz-invisible' );

              // Render the invidual visualization for current player
              BVVIZ[ visualization ] (
                $( this ),
                player,
                settings
              );

            });
        });

        // Remove the loading indicator
        loading.remove();

        // Use the helper to show the individual visualization with an animation
        BVVIZ.helper.showCollection( target );

      } else {
        // Remove the loading indicator
        loading.remove();
      }
    }).fail( function( data ) {

      // Show an error on failure
      BVVIZ.helper.showError( target, data );      
    });

  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
 
  return pub;
};
})(jQuery);


;(function($) {
// Add playerRow method to the BVVIZ scope
BVVIZ.playerRow = function( target, playerIdOrObject, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
      playerId = false,
      player = false,

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // playerRow card
    card: function( playerObj, maxIcons ) {
      var card = $( ),
          totalIcons = 0;

      // Pass in options setting of maxIcons, by default show only 3
      // maxIcons = BVVIZ.options.playerRow.maxIcons;

      // Current Levels
      if ( $.isArray( playerObj[ 'rewards:currentlevels' ] ) ) {
        $.each( playerObj[ 'rewards:currentlevels' ], function( i, level ) {
          var clickTarget;
          
          // If we've reach the max number of icons, exit out of the loop
          if ( totalIcons >= maxIcons ) {
            return false;
          }
          // Create the display for this track. Use the last earned reward as a reflection of the player's level in the mission
          clickTarget = $(
            '<div class="bvviz-data bvviz-level">' + 
              '<img src="' + level.image + '" />' +
            '</div>'
          );

          // If BVVIZ.missionProgress has been included...
          if ( $.isFunction( BVVIZ.missionProgress ) ) {
            // ...allow the track icon to be clicked on to open the trackProgress visualization
            clickTarget.click( function( event ) {
              BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerObj.id, level.mission_id, { siteId: settings.siteId } ] );

              event.preventDefault();
              return false;
            });
          }

          // Insert the mission icon into the container
          card = card.add( clickTarget );

          // Increment the total number of icons displayed
          totalIcons++;
        });
      }

      // Level Track Progresses
      if ( $.isArray( playerObj[ 'progresses:all_tracks' ] ) && totalIcons < maxIcons ) {

        // Sort the tracks by percent complete, descending
        playerObj[ 'progresses:all_tracks' ].sort( function( track1, track2 ){
          return track2.percent - track1.percent;
        });

        // Loop through all the track progresses found and display them
        $.each( playerObj[ 'progresses:all_tracks' ], function( i, track ) {
          var clickTarget;

          // If we've reach the max number of icons, exit out of the loop
          if ( totalIcons >= maxIcons ) {
            return false;
          }
          
          // Add this check in case the percent is at 0 (which can happen if tracks are modified)
          //  OR the track is NOT a level type (in which case the display shouldn't be shown in this context)
          if ( track.percent > 0 && track.type === 'level_track' && track.last_earned ) {
            // Create the display for this track. Use the last earned mission as a reflection of the player's level in the track
            clickTarget = $( '<div class="bvviz-data bvviz-track">' + 
                '<img src="' + track.last_earned.image + '" />' +
              '</div>' );

            // If BVVIZ.trackProgress has been included...
            if ( $.isFunction( BVVIZ.trackProgress ) ) {
              // ...allow the track icon to be clicked on to open the trackProgress visualization
              clickTarget.click( function( event ) {
                BVVIZ.helper.showModal( BVVIZ.trackProgress, [ playerObj.id, track.definition_id, { siteId: settings.siteId } ] );

                event.preventDefault();
                return false;
              });
            }

            // Insert the track icon into the container
            card = card.add( clickTarget );
            
            // Increment the total number of icons displayed
            totalIcons++;
          }
        });
      }

      card = card.add( [ '<div class="bvviz-data bvviz-unit">',
                    '<div class="bvviz-value">', playerObj.units.points.all, '</div>',
                    '<div class="bvviz-label">', playerObj.units.points.abbreviation, '</div>',
                  '</div>' ].join('') );

      card = card.add( '<div class="bvviz-clear"></div>' );

      return card;
    }

  },

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerRow settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { maxIcons: parseInt( options, 10 ) };
  if ( !$.isNumeric( options.maxIcons ) || options.maxIcons < 0 ) {
    delete options.maxIcons;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.playerRow, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerIdOrObject" must be provided as a string or object
    if ( typeof( playerIdOrObject ) !== 'string' ) {
      if ( typeof( playerIdOrObject ) !== 'object' || !playerIdOrObject.id ) {
        return BVVIZ.helper.showError( target, '"playerIdOrObject" argument must be a string or object.' );
      }
    } else if ( playerIdOrObject.length === 0 ) {
      return BVVIZ.helper.showError( target, '"playerIdOrObject" argument must be a string or object.' );
    }

    if ( typeof( playerIdOrObject ) === 'object' ) {
      player = playerIdOrObject;
      playerId = playerIdOrObject.id;
    } else {
      playerId = playerIdOrObject;
    }

    // Empty the target and add the base classes
    target
      .empty()
      .addClass( 'bvviz bvviz-playerRow' )
      .append(
        $( '<div class="bvviz-row"></div>' )
      );

    // If BVVIZ.playerProfile is defined, bind to a click of the target to show it
    if ( $.isFunction( BVVIZ.playerProfile ) ) {
      target.bind( 'click', function() {
        BVVIZ.helper.showModal( BVVIZ.playerProfile, [ playerId, { siteId: settings.siteId } ] );
      });
    }

    if ( !player ) {
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players', { players: playerId }, { fields: 'all', includes: 'rewards:currentlevels,progresses:all_tracks' } )
        .ok( function( data ) {
          player = data.players[0];
          target.find( '.bvviz-row' ).append( render.card( player, settings.maxIcons ) );
        });
    } else {
      target.find( '.bvviz-row' ).append( render.card( player, settings.maxIcons ) );
    }
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init( playerIdOrObject );
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display
  if ( typeof( playerIdOrObject ) === 'string' ) {
    pub.playerId = playerIdOrObject;
  } else {
    pub.playerId = playerIdOrObject.id;
  }
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// Add playerMissions method to the BVVIZ scope
BVVIZ.playerMissions = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
    },

    // Individual mission card
    card: function( mission ) {
      // Check is the track image is in place
      var imageFound = !!( BVVIZ.utility.validateNestedObj( mission, 'image' ) && mission.image ),

      // Check if the last earned image is in place, prepare for swapping the level track image on level tracks
          lastEarnedImageFound = !!( BVVIZ.utility.validateNestedObj( mission, 'progress', 'last_earned', 'image' ) && mission.progress.last_earned.image ),

      // Store the display image src
          imageSrc,

      // Whether the image is broken
          imageBroken = false,

      // Store the rendering card
          card;

      if ( mission.type === 'level' && lastEarnedImageFound ) {
        // For level mission, if the last earned image is found in player progress, use the last earned reward image instead
        imageSrc = mission.progress.last_earned.image;
      } else if ( imageFound ) {
        // Use the mission image as src
        imageSrc = mission.image;
      } else {
        // Use the place holder image as src 
        imageSrc = BVVIZ.helper.imageHolderSrc();
        imageBroken = true;
      }

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      card = $( '<div class="bvviz-card bvviz-invisible"></div>' ).append(
        // Replace the background image if the image is not found
        $( '<img class="bvviz-picture' + ( imageBroken ? ' bvviz-broken' : '' ) + '" src="' + imageSrc + '" />' ),
        ( settings.badges.showName ? $( '<div class="bvviz-name" title="' + mission.name +'">' + mission.name + '</div>' ) : '' ),
        ( settings.badges.showCategory ? $('<div class="bvviz-category">' + mission.category + '</div>' ) : '' ),
        ( settings.badges.showProgress ? render.progress( mission ) : '' )
      );

      // If the non-level mission is incomplete, grey out the entire card
      if ( mission.type !== 'level' && !( $.isPlainObject( mission.progress ) && mission.progress.percent >= 100 ) ) {
        card.addClass( 'bvviz-grey' );
      }

      // If this is mini badge or has custom background color, clear the badge border
      if ( settings.badges.miniBadge || !settings.badges.showBadgeBorder ) {
        card.addClass( 'bvviz-borderless' );
      }

      // If the badgeBackgroundColor option set to a valid value, add inline style
      if ( settings.badges.badgeBackgroundColor ) {
        card.css( 'background-color', settings.badges.badgeBackgroundColor );
      }

      // If the badgeFontColor option set to a valid value, add inline style
      if ( settings.badges.badgeFontColor ) {
        card.css( 'color', settings.badges.badgeFontColor );
      }

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini');
      }

      // Store the mission id for later use
      card.data( 'bvviz-mission', mission.id );
      return card;
    },

    // Progress indicator inside a mission card
    progress: function( mission ) {
      var progress = mission.progress,
          container = $( '<div class="bvviz-progress"></div>' );
                
      // Only show progress for missions that have been started
      if ( $.isPlainObject( progress ) ) {
        if ( progress.percent < 100 ) {
          container.html( progress.earned + '/' + progress.possible );
        } else if ( progress.percent == 100 ) {
          // Level mission doesn’t support complete state, display ratio fraction instead
          if ( mission.type === 'level' ) {
            container.html( progress.earned + '/' + progress.possible );
          } else {
            if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
              container.html( '&#10003;' );
            } else if ( settings.badges.miniBadge ) {
              container.html( BVVIZ.helper.svgCheckmarkMini() );
            } else if ( BVVIZ.utility.isIe8OrLess() ) {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
            } else {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
            }
          }
        }
      }
      return container;
    }
  },

  // BVVIZ Visualization object instance 
  bvvizVisual,
  
  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.playerMissions.maxPageSize ) {
    delete options.pageSize;
  }
  if ( !options.category ) {
    delete options.category;
  } else if ( $.type( options.category ) === 'string' ) {
    options.category = String.prototype.split.call( options.category, ',' );
  } else if ( $.type( options.category ) !== 'array' || options.category.length == 0 ) {
    delete options.category;
  }
  BVVIZ.utility.trimArray( options.category );
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.playerMissions, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }

  function init() {
    // Define the card container so that we can bind events to it
    var cards = $( '<div class="bvviz-cards bvviz-row"></div>' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the missionCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerMissions' )
      .append(
        ( settings.inline ? '' : render.header() ),
        ( settings.childContentCards ? cards : $( '<div class="bvviz-body"></div>' ).append(
          cards
        ) )
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Unless we want request all data and disable infinite Scroll
    if ( settings.pageSize !== 0 ) {
      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
    }

    // Trigger a load of the initial page of data
    load( 0 );

    // If BVVIZ.missionProgress has been included...
    if ( $.isFunction( BVVIZ.missionProgress ) ) {
      // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
      cards.bind( 'click', function( event ) {
        var eventTarget = $( event.target ),
            card = eventTarget.closest( '.bvviz-card' ),
            missionId;

        // If we can find a mission card from the click, show the missionProgress for that card
        if ( card.length > 0 ) {
          // Get the missionId value from the data on the card
          missionId = card.data( 'bvviz-mission' );

          BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

          event.preventDefault();
          return false;
        }
      });
    }
  }

  function load( page ) {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        cards = $( '.bvviz-cards', target ),
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
        sdkOptions = {
          fields: 'parent_id,category',
          offset: page * pageSize,
          limit: pageSize
        };

    if ( settings.category ) {
      sdkOptions = $.extend( true, sdkOptions, { query: { category: settings.category } } );
    }

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of mission definitions
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'missions', null, sdkOptions
    ).ok( function( missionDefsData ) {

      // We only want to display missions that aren't in tracks, plus only display active missions
      var nonTrackActiveMissions = $.map( missionDefsData.missions, function( mission ) {
            if ( !mission.parent_id && mission.active ) {
              return mission;
            }
          });

      // Make sure that we have at least one mission
      if ( nonTrackActiveMissions.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }
        
        // Request the player progress in the missions found
        BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, {
          query: {
            type: 'all_missions',
            // Use $.map to extract an array of mission ids
            definition_id: $.map( nonTrackActiveMissions, function( mission ) {
              return mission.id;
            })
          }
        }).ok( function( playerMissionsData ) {
          var missionProgressMap = {},
              cardWidth;

          // Convert the playerMissionsData into an object, using the mission Id as the key
          $.each( playerMissionsData.progresses, function( i, progress ) {
            missionProgressMap[ progress.definition_id ] = progress;
          });
          
          // Render each mission definition
          $.each( nonTrackActiveMissions, function( i, missionDef ) {
            // If the player has made progress in the mission, use the progresses object. Otherwise use the definition
            missionDef.progress = missionProgressMap[ missionDef.id ] || missionDef.progress;
            
            // Add the mission card into the display
            cards.append(
              render.card( missionDef )
            );
          });

          // If this is the child content of custom container, then slient loading, otherwise show the cards
          if ( !settings.childContentCards ) {
            // Calculate the card width after card being appended
            if ( !cardWidth ) {
              cardWidth = BVVIZ.helper.fitRowCardWidth( cards.children(":first"), cards );
            }
            // Apply the calculated width to each cards
            cards.children().width( cardWidth );

            // Remove the loading display
            loading.remove();

            // Use the helper to show the cards with an animation
            BVVIZ.helper.showCards( cards );
          }

        }).always( function() {
          if ( $.isFunction( settings.callback ) ) {
            settings.callback();
          }      
        });
      } else {
        // Remove the loading display
        loading.remove();
      }

      // If we want request all data and disable infinite Scroll
      if ( settings.pageSize === 0 ) {
        if ( missionDefsData.missions.length == pageSize ) {
          // Continue load next page
          BVVIZ.helper.loadNextPage( cards, pub );
        }
      } else if ( missionDefsData.missions.length < pageSize ) {
        // We've loaded all the missions, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else if ( nonTrackActiveMissions.length <= pageSize/2 ) {
        // If we didn't get many non-track active missions with this request, request the next page
        BVVIZ.helper.loadNextPage( cards, pub );
      }

    }).fail( function() {
      // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
      cards.unbind( 'scroll.bvviz' );

      // Remove the loading display
      loading.remove();
    });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );

  return pub;
};
})(jQuery);


;(function($) {
// Add playerProfile method to the BVVIZ scope
BVVIZ.playerProfile = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"></div>' );
    },

    // Header content
    headerContent: function() {
      return $('<img class="bvviz-avatar" src="' + player.image + '" />' +
        '<div class="bvviz-name">' + player.display_name + '</div>'
      );
    },

    // Navigation buttons
    nav: function () {
      // The load method to trigger is stored in the data-bvviz-target attribute
      return $(
        '<div class="bvviz-nav" data-bvviz-target="rewards">Rewards</div>' +
        '<div class="bvviz-nav" data-bvviz-target="missions">Missions</div>'+
        '<div class="bvviz-nav bvviz-last" data-bvviz-target="tracks">Tracks</div>'
      );
    }
  },

  // Store the player resource once it's found
  player,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerProfile settings
  settings,

  // Store the unitBar settings for playerProfile
  unitBarSettings,

  // Default all modules for inclusion, note: units is not part of the inclusion
  modules = [ 'level', 'expertise', 'teams', 'activities' ],

  // Default all inclusion in the same order of modules passing to the player promise
  inclusions = [ 'rewards:currentlevels', 'progresses:all_tracks', 'teams', 'activities' ];


  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.playerProfile, options );

  // Override the default settings from unitBar
  unitBarSettings = $.extend( { visualization : 'playerProfile', siteId: settings.siteId }, settings.unitBar );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    var nav,

        navChildrenWidth = 0;

    // Define the navigation elements so that we can bind events to it
    nav = $( '<div class="bvviz-body-header"></div>' ).append(
                render.nav()
              );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Prepare the modules being included in the player API request from the settings object
    if ( BVVIZ.utility.validateNestedObj( settings, 'unitBar', 'modules' ) ) {
      $.each( modules, function( index, value ){
        // Replace the item from includes option with '' if it doesn't exist in the options
        if ( $.inArray( value, settings.unitBar.modules ) < 0 ) {
          Array.prototype.splice.call( inclusions, index, 1, '' );
        }
      });

      // Clean the includes option by removing the empty elements ('', null, undefined and 0)
      inclusions = Array.prototype.filter.call( inclusions, 
        function( el ) {
          return el;
        });
    }

    // Empty the target, add the base classes, the payerProfile header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerProfile' )
      .append(
        render.header(),
        '<div class="bvviz-units"></div>',
        $( '<div class="bvviz-body"></div>' ).append(
          nav,
          '<div class="bvviz-cards bvviz-row"></div>'
        )
      );

    // Need to know the height of all the children elements for the navigation tab
    nav.children( ':visible' ).each(function( i, child ) {
      navChildrenWidth += $( child ).outerWidth( true );
    });

    // Adjust the width of the body header (nav tabs) and each tab width
    if ( navChildrenWidth < nav.width() ) {
      // Adjust the width of the tabs (pad some to allow for decimals)
      nav.width( navChildrenWidth + nav.outerWidth() - nav.width() + .5 );
    } else {
      nav.children( ':visible' ).each(function( i, child ) {
        $( child ).outerWidth( nav.width() / nav.children().length - .5 );
      });
    }

    // Trigger a show of the default data
    show( 'player' );

    // Bind to the nav object and catch bleed-up events so that we can bind to fewer objects
    nav.bind( 'click', function( event ) {
      var eventTarget = $( event.target ),

      // Determine which nav button was clicked on based on the data attribute
          showTarget = eventTarget.data( 'bvviz-target' );

      // If we have a showTarget, trigger that method
      if ( showTarget ) {
        show( showTarget );
      }

      event.preventDefault();
      return false;
    });
  }

  function show( method ) {
    // Show the navigation container
    var nav = $( '.bvviz-body-header', target ),

    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),

    // Use the passed in method value as a selector to find the target button
        newNav = $( '.bvviz-nav[data-bvviz-target=' + method + ']', nav ),

    // Get a reference to the current "cards" element, which is where the content exists
        currentCards = target.find( '.bvviz-cards:first' ),
    // Create a new cards element, giving it the same height as the current one
        newCards =$( '<div class="bvviz-cards bvviz-row"></div>' ).height( currentCards.height() );

    // Remove the "active" class from all the buttons and then add it to the current one
    newNav.siblings().removeClass( 'bvviz-active' );
    newNav.addClass( 'bvviz-active' );

    switch ( method ) {

      // Load player data and render the header and units (slideshow)
      case 'player':
        
        // Show an indicator in the target to indicate that something is happening
        target.append( loading );
        
        // Load the player data
        BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players',
               { players: playerId },
               { includes: inclusions }
        ).ok( function( data ) {
          // Get a reference 
          var header = $( '.bvviz-header', target );

          // Populate the "player" variable at the higher scope
          player = data.players[0];
          
          // Render player header
          header.append(
            render.headerContent()
          );

          // Render player's unitBar
          BVVIZ.helper.unitBar( $( '.bvviz-units', target ), player, unitBarSettings );

          // Remove the loading indicator
          loading.remove();

          // Correct the height of the body
          BVVIZ.helper.fitHeight( target );

          // Show the first nav section by default
          show( $( '.bvviz-nav:first', nav ).data( 'bvviz-target' ) );

        }).fail( function( data ) {
          // Show an error on failure
          BVVIZ.helper.showError( target, data );
        });
        break;
      
      // Load the playerRewards visualization
      case 'rewards':
        // replaceWith will remove all data, events and classes
        currentCards.replaceWith(
          newCards
        );
        BVVIZ.playerRewards( newCards, playerId, { siteId: settings.siteId, inline: true } );
        break;

      // Load the playerMissions visualization
      case 'missions':
        // replaceWith will remove all data, events and classes
        currentCards.replaceWith(
          newCards
        );
        BVVIZ.playerMissions( newCards, playerId, { siteId: settings.siteId, inline: true } );
        break;

      // Load the playerTracks visualization
      case 'tracks':
        // replaceWith will remove all data, events and classes
        currentCards.replaceWith(
          newCards
        );
        BVVIZ.playerTracks( newCards, playerId, { siteId: settings.siteId, inline: true } );
        break;
    };
  }

  // Check site pass before init()
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.show = show;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(jQuery);


;(function($) {
// Add playerRewards method to the BVVIZ scope
BVVIZ.playerRewards = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
    },

    // Individual reward card
    card: function( reward ) {
      // Replace the background image if the image is not found
      var imageFound = !!( BVVIZ.utility.validateNestedObj( reward, 'image' ) && reward.image ),
      // Use the place holder image as src if the image is not found
          imageSrc = imageFound ? reward.image : BVVIZ.helper.imageHolderSrc();

      // Hide the badge if unearned badge should be covered
      imageSrc = !reward.earned_by && settings.badges.lockUnearned ? BVVIZ.helper.imageHolderSrc() : imageSrc;

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      var card = $( '<div class="bvviz-card bvviz-invisible"></div>' );

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini').append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showCategory ? $('<div class="bvviz-category">' + reward.category + '</div>' ) : '' ),
          ( settings.badges.showProgress ? render.progress( reward ) : '' ),
          render.count( reward )
        );
      } else {
        card.append(
          $('<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />'),
          ( settings.badges.showName ? $('<div class="bvviz-name" title="' + reward.name +'">' + reward.name + '</div>' ) : '' ),
          ( settings.badges.showCategory ? $('<div class="bvviz-category">' + reward.category + '</div>' ) : '' ),
          ( settings.badges.showProgress ? render.progress( reward ) : '' )
        );
      }

      // If the reward has not been earned, grey it out
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
        if ( settings.badges.lockUnearned ) {
          card.addClass('bvviz-locked');
        }
      }

      // If this is mini badge or has custom background color, clear the badge border
      if ( settings.badges.miniBadge || !settings.badges.showBadgeBorder ) {
        card.addClass( 'bvviz-borderless' );
      }

      // If the badgeBackgroundColor option set to a valid value, add inline style
      if ( settings.badges.badgeBackgroundColor ) {
        card.css( 'background-color', settings.badges.badgeBackgroundColor );
      }

      // If the badgeFontColor option set to a valid value, add inline style
      if ( settings.badges.badgeFontColor ) {
        card.css( 'color', settings.badges.badgeFontColor );
      }

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini' );
      }

      // Store the reward object for later use
      card.data( 'bvviz-reward', reward.definition_id );
      return card;
    },

    // Progress indicator inside a reward card
    progress: function( reward ) {
      var progress = reward.progress,
          container = $( '<div class="bvviz-progress"></div>' );
      
      if ( $.isNumeric( reward.earned_total_count ) ) {
        // Show rewards that have been completed
          if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
            container.html( '&#10003;' );
          } else if ( settings.badges.miniBadge ) {
            container.html( BVVIZ.helper.svgCheckmarkMini() );
          } else if ( BVVIZ.utility.isIe8OrLess() ) {
            container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
          } else {
            container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
          }
      } else if ( $.isPlainObject( progress ) ) {
        // Show progress for rewards that has progress object returned, otherwise the rewards are not progressable
        container.html( progress.earned + '/' + progress.possible );
      } 

      return container;
    },

    // Reward count indicator for repeatable rewards
    count: function( reward ) {
      return reward.earned_total_count ? $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>') : '';
    },

    // Tooltip
    dialog: function( reward ) {
      return $( '<div class="bvviz bvviz-playerRewards bvviz-dialog">' + 
        '<div class="bvviz-name">' + reward.name + '</div>' +
        '<div class="bvviz-desc">' + reward.hint + '</div>' +
      '</div>' );
    }
  },

  // BVVIZ Visualization object instance 
  bvvizVisual,
  
  // Store the playerRewards settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.playerRewards.maxPageSize ) {
    delete options.pageSize;
  }
  if ( !options.category ) {
    delete options.category;
  } else if ( $.type( options.category ) === 'string' ) {
    options.category = String.prototype.split.call( options.category, ',' );
  } else if ( $.type( options.category ) !== 'array' || options.category.length == 0 ) {
    delete options.category;
  }
  BVVIZ.utility.trimArray( options.category );
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.playerRewards, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Define the card container so that we can bind events to it
    var cards = $( '<div class="bvviz-cards bvviz-row"></div>' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the rewardCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerRewards' )
      .append(
        ( settings.inline ? '' : render.header() ),
        ( settings.childContentCards ? cards : $( '<div class="bvviz-body"></div>' ).append( cards ) )
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Unless we want request all data and disable infinite Scroll
    if ( settings.pageSize !== 0 ) {
      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
    }

    // Trigger a load of the initial page of data
    load( 0 );

    // If BVVIZ.rewardProgress has been included...
    if ( $.isFunction( BVVIZ.rewardProgress ) ) {
      // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
      cards.bind( 'click', function( event ) {
        var eventTarget = $( event.target ),
            card = eventTarget.closest( '.bvviz-card' ),
            rewardId;

        // If we can find a reward card from the click, show the reward details for that card
        if ( card.length > 0 ) {
          // Get the rewardId value from the data on the card
          rewardId = card.data( 'bvviz-reward' );

          BVVIZ.helper.showModal( BVVIZ.rewardProgress, [ playerId, rewardId, { siteId: settings.siteId } ] );

          event.preventDefault();
          return false;
        }
      });
    }

  }

  function load( page ) {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        cards = $( '.bvviz-cards', target ),
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize;

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of reward definitions
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'rewards', null, {
      fields: ['earnable_by','category','earned_total_count'],
      offset: page * pageSize,
      limit: pageSize,
      // Ensure that we only show rewards that are not included in missions or tracks
      query: ( settings.category ? { type: 'Reward', active: true, category: settings.category } : { type: 'Reward', active: true } )
    } ).ok( function( rewardDefsData ) {
      var rewardDefIdArray = $.map( rewardDefsData.rewards, function( reward ) {
            return reward.earnable_by == 'players' ? reward.id : null;
          } );

      // Make sure that we have at least one reward
      if ( rewardDefsData.rewards.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }

        BVSDK.all(

          // Load the player progress toward the reward and store into reward definition data 
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, {
             // There should only be 1 RewardProgression per player-RewardDefinition ID pair, refer PLAT-715
            query: { type: 'all_rewards', definition_id: rewardDefIdArray }

          } ),
          // Request the player earned reward progress in the rewards found
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/rewards', { players: playerId }, {
            fields: ['category','earned_total_count'],

            // Use distinct=definition_id to ensure that we only get one instance of each definition
            distinct: 'definition_id',
            
            // Use $.map to extract an array of reward definition ids
            query: { definition_id: rewardDefIdArray }
          } )
        ).ok( function( rewardsProgressData, playerRewardsData ) {

          var rewardProgressMap = {},
              cardWidth;

          $.each( playerRewardsData.rewards, function( i, reward ) {
            // Convert the playerRewardsData into an object, using the reward Id as the key
            rewardProgressMap[ reward.definition_id ] = reward;

            // Merge the player reward progress into playerRewardsData object, using the reward definition Id as the key
            try {
              $.each( rewardsProgressData.progresses, function( j, progress ) {
                // If the reward definition object found match the progress, merge into progress object
                if ( reward.definition_id == progress.definition_id ) {
                  rewardProgressMap[ reward.definition_id ].progress = progress;
                }
              });
            } catch (e) {}
          });


          $.each( rewardDefsData.rewards, function( i, rewardDef ) {
            // Merge the player reward progress into rewardDefsData object, using the reward definition Id as the key
            try {
              $.each( rewardsProgressData.progresses, function( j, progress ) {
                // If the reward definition object found match the progress, merge into progress object
                if ( rewardDef.id == progress.definition_id ) {
                  rewardDef.progress = progress;
                }
              });
            } catch (e) {}

            // If the reward is earnable by players, display the rewards, team rewards will not be displayed
            if ( rewardDef.earnable_by === 'players' ) {
              if ( settings.badges.showUnearned ) {
                // Render both earned and unearned rewards
                // If the player has earned the reward, use the progress map. Otherwise use the definition
                cards.append( 
                  render.card( rewardProgressMap[ rewardDef.id ] ? rewardProgressMap[ rewardDef.id ] : rewardDef )
                );
              } else {
                // Display card only if the player has earned the reward, use the progress map
                if ( rewardProgressMap[ rewardDef.id ] ) {
                  cards.append( 
                    render.card( rewardProgressMap[ rewardDef.id ] )
                  );
                }
              }
            }
          });

          // If this is the child content of custom container, then slient loading, otherwise show the cards
          if ( !settings.childContentCards ) {
            // Calculate the card width after card being appended
            if ( !cardWidth ) {
              cardWidth = BVVIZ.helper.fitRowCardWidth( cards.children(":first"), cards );
            }
            // Apply the calculated width to each cards
            cards.children().width( cardWidth );

            // Remove the loading display
            loading.remove();

            // Use the helper to show the cards with an animation
            BVVIZ.helper.showCards( cards );
          }

        }).always( function() {
          if ( $.isFunction( settings.callback ) ) {
            settings.callback();
          }      
        });
      } else {
        // Remove the loading display
        loading.remove();
      }

      // If we want request all data and disable infinite Scroll
      if ( settings.pageSize === 0 ) {
        if ( rewardDefsData.rewards.length == pageSize ) {
          // Continue load next page
          BVVIZ.helper.loadNextPage( cards, pub );
        }
      } else {
        if ( rewardDefsData.rewards.length < pageSize ) {
          // We've loaded all the rewards, unbind the infinite scroll to prevent extra requests
          cards.unbind( 'scroll.bvviz' ); 
        }
      }

    }).fail( function() {
      // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
      cards.unbind( 'scroll.bvviz' );

      // Remove the loading display
      loading.remove();
    });
  }

  function showDialog( card ) {
    // Pull the reward object out of the data store
    var reward = card.data( 'bvviz-reward' ),
    // Create an overlay object for the dialog
        overlay = $('<div class="bvviz-overlay"></div>'),
        body = card.closest( '.bvviz-body' ),
        dialogContent;

    // If no reward object was found or JQuery.dialog is not defined, there is nothing to do
    if ( reward && $.isFunction( overlay.dialog ) ) {
      // Render the inner content
      dialogContent = render.dialog( reward );

      // Bind to a click on the overlay so that clicking it will close the dialog
      overlay.bind( 'click', function () {
        $( '.ui-dialog-titlebar-close', dialogContent.closest( '.ui-dialog' ) ).trigger( 'click' );
      });

      // Remove any existing overlays
      $( '.bvviz-overlay', card.parents( '.bvviz-body' ).last() ).click();

      // Put the overlay into the topmost "body" element
      card.parents( '.bvviz-body' ).last().append( overlay );

      // Shift the card above the overlay
      card.css( 'z-index', 2 );

      // Show the dialogContent in a JQuery.dialog box
      dialogContent.dialog({
        position: { my: 'center top', at: 'center bottom+5', of: card },
        resizable: false,
        draggable: false,
        width: ( body.width() - ( body.width() / 3 ) ),
        dialogClass: 'bvviz',
        open: function( event, ui ) {
          var dialog = $( '.ui-dialog:last' ),
              cardMarginWidth = card.outerWidth( true ) - card.width();
          
          // Move the dialog box to fit within the body
          dialog.css({
            left: target.offset().left + ( body.width() / 6 )
          });

          // Remove the min-height value that the JQuery.dialog method adds
          $( '.ui-dialog-content', dialog ).css( 'min-height', '0' );
          
          // Unfocus the button to remove highlight
          $( '.ui-dialog-titlebar-close', dialog ).blur();
        },
        close: function( event, ui ) {
          // Remove the z-index on the card
          card.css( 'z-index', '' );

          // Remove the overlay
          overlay.remove();

          // Destroy the dialog to remove it from the DOM
          dialogContent.dialog( 'destroy' );
        }
      });
    }
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(jQuery);


;(function($) {
// Add playerTracks method to the BVVIZ scope
BVVIZ.playerTracks = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
    },

    // Individual track card
    card: function( track ) {
      // Check is the track image is in place
      var imageFound = !!( BVVIZ.utility.validateNestedObj( track, 'image' ) && track.image ),

      // Check if the last earned image is in place, prepare for swapping the level track image on level tracks
          lastEarnedImageFound = !!( BVVIZ.utility.validateNestedObj( track, 'progress', 'last_earned', 'image' ) && track.progress.last_earned.image ),

      // Store the display image src
          imageSrc,

      // Whether the image is broken
          imageBroken = false,

      // Store the rendering card
          card;

      if ( track.type === 'level' && lastEarnedImageFound ) {
        // For level track, if the last earned image is found in player progress, use the last earned mission image instead
        imageSrc = track.progress.last_earned.image;
      } else if ( imageFound ) {
        // Use the track image as src
        imageSrc = track.image;
      } else {
        // Use the place holder image as src 
        imageSrc = BVVIZ.helper.imageHolderSrc();
        imageBroken = true;
      }

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      card = $( '<div class="bvviz-card bvviz-invisible"></div>' ).append(
        // Replace the background image if the image is not found
        $( '<img class="bvviz-picture' + ( imageBroken ? ' bvviz-broken' : '' ) + '" src="' + imageSrc + '" />' ),
        ( settings.badges.showName ? $( '<div class="bvviz-name" title="' + track.name +'">' + track.name + '</div>' ) : '' ),
        ( settings.badges.showCategory ? $('<div class="bvviz-category">' + track.category + '</div>' ) : '' ),
        ( settings.badges.showProgress ? render.progress( track ) : '' )
      );

      // If the non-level track is incomplete, grey out the entire card
      if ( track.type !== 'level' && !( $.isPlainObject( track.progress ) && track.progress.percent >= 100 ) ) {
        card.addClass( 'bvviz-grey' );
      }

      // If this is mini badge or has custom background color, clear the badge border
      if ( settings.badges.miniBadge || !settings.badges.showBadgeBorder ) {
        card.addClass( 'bvviz-borderless' );
      }

      // If the badgeBackgroundColor option set to a valid value, add inline style
      if ( settings.badges.badgeBackgroundColor ) {
        card.css( 'background-color', settings.badges.badgeBackgroundColor );
      }

      // If the badgeFontColor option set to a valid value, add inline style
      if ( settings.badges.badgeFontColor ) {
        card.css( 'color', settings.badges.badgeFontColor );
      }

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini');
      }

      // Store the track id for later use
      card.data( 'bvviz-track', track.id );
      return card;
    },

    // Progress indicator inside a track card
    progress: function( track ) {
      var progress = track.progress,
          container = $( '<div class="bvviz-progress"></div>' );
      
      // Only show progress for tracks that have been started
      if ( $.isPlainObject( progress ) ) {
        if ( progress.percent < 100 ) {
          container.html( progress.earned + '/' + progress.possible );
        } else if ( progress.percent == 100 ) {
          // Level track doesn’t support complete state, display ratio fraction instead
          if ( track.type === 'level' ) {
            container.html( progress.earned + '/' + progress.possible );
          } else {
            if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
              container.html( '&#10003;' );
            } else if ( settings.badges.miniBadge ) {
              container.html( BVVIZ.helper.svgCheckmarkMini() );
            } else if ( BVVIZ.utility.isIe8OrLess() ) {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
            } else {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
            }
          }
        }
      }
      return container;
    }
  },

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerTracks settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.playerTracks.maxPageSize ) {
    delete options.pageSize;
  }
  if ( !options.category ) {
    delete options.category;
  } else if ( $.type( options.category ) === 'string' ) {
    options.category = String.prototype.split.call( options.category, ',' );
  } else if ( $.type( options.category ) !== 'array' || options.category.length == 0 ) {
    delete options.category;
  }
  BVVIZ.utility.trimArray( options.category );
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.playerTracks, options );  

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Define the card container so that we can bind events to it
    var cards = $( '<div class="bvviz-cards bvviz-row"></div>' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the trackCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerTracks' )
      .append(
        ( settings.inline ? '' : render.header() ),
        ( settings.childContentCards ? cards : $( '<div class="bvviz-body"></div>' ).append( cards ) )
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Unless we want request all data and disable infinite Scroll
    if ( settings.pageSize !== 0 ) {
      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
    }

    // Trigger a load of the initial page of data
    load( 0 );

    // If BVVIZ.trackProgress has been included...
    if ( $.isFunction( BVVIZ.trackProgress ) ) {
      // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
      cards.bind( 'click', function( event ) {
        var eventTarget = $( event.target ),
            card = eventTarget.closest( '.bvviz-card' ),
            trackId;

        // If we can find a track card from the click, show the trackProgress for that card
        if ( card.length > 0 ) {
          // Get the trackId value from the data on the card
          trackId = card.data( 'bvviz-track' );

          BVVIZ.helper.showModal( BVVIZ.trackProgress, [ playerId, trackId, { siteId: settings.siteId } ] );

          event.preventDefault();
          return false;
        }
      });
    }
  }

  function load( page ) {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        cards = $( '.bvviz-cards', target ),
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
        sdkOptions = {
          fields: 'category',
          offset: page * pageSize,
          limit: pageSize
        };

    if ( settings.category ) {
      sdkOptions = $.extend( true, sdkOptions, { query: { category: settings.category } } );
    }

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of track definitions
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks', null, sdkOptions
    ).ok( function( trackDefsData ) {

      // We only want to display active tracks
      var activeTracks = $.map( trackDefsData.tracks, function( track ) {
            if ( track.active ) {
              return track;
            }
          });

      // Make sure that we have at least one track
      if ( activeTracks.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }
        
        // Request the player progresses in the tracks found
        BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, {
          query: {
            type: 'all_tracks',
            // Use $.map to extract an array of track ids
            definition_id: $.map( activeTracks, function( track ) {
              return track.id;
            })
          }
        }).ok( function( playerTracksData ) {
          var trackProgressMap = {},
              cardWidth;

          // Convert the playerTracksData into an object, using the track Id as the key
          $.each( playerTracksData.progresses, function( i, progress ) {
            trackProgressMap[ progress.definition_id ] = progress;
          });
          
          // Render each track definition
          $.each( activeTracks, function( i, trackDef ) {
            // If the player has made progress in the track, use the progresses object. Otherwise use the definition
            trackDef.progress = trackProgressMap[ trackDef.id ] || trackDef.progress;
            
            // Add the track card into the display
            cards.append(
              render.card( trackDef )
            );
          });

          // If this is the child content of custom container, then slient loading, otherwise show the cards
          if ( !settings.childContentCards ) {
            // Calculate the card width after card being appended
            if ( !cardWidth ) {
              cardWidth = BVVIZ.helper.fitRowCardWidth( cards.children(":first"), cards );
            }
            // Apply the calculated width to each cards
            cards.children().width( cardWidth );

            // Remove the loading display
            loading.remove();

            // Use the helper to show the cards with an animation
            BVVIZ.helper.showCards( cards );
          }

        }).always( function() {
          if ( $.isFunction( settings.callback ) ) {
            settings.callback();
          }      
        });
      } else {
        // Remove the loading display
        loading.remove();
      }

      // If we want request all data and disable infinite Scroll
      if ( settings.pageSize === 0 ) {
        if ( trackDefsData.tracks.length == pageSize ) {
          // Continue load next page
          BVVIZ.helper.loadNextPage( cards, pub );
        }
      } else if ( trackDefsData.tracks.length < pageSize ) {
        // We've loaded all the tracks, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else if ( activeTracks.length <= pageSize/2 ) {
        // If we didn't get many active track with this request, request the next page
        BVVIZ.helper.loadNextPage( cards, pub );
      }

    }).fail( function() {
      // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
      cards.unbind( 'scroll.bvviz' );

      // Remove the loading display
      loading.remove();
    });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(jQuery);


;(function($) {
// Add playerStream method to the BVVIZ scope
BVVIZ.playerStream = function( target, streamId, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
  
  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    activitiesCard: function( notification ) {
      // Both activities and contents stream events generate notification with the same type of 'activity'  
      var timestamp = BVVIZ.utility.validateNestedObj( notification, 'data', 'content', 'created_at' ) ? 
                      notification.data.content.created_at : 
                      BVVIZ.utility.validateNestedObj( notification, 'data', 'created_at' ) ? notification.data.created_at : new Date();
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        imageSrc.match( /^[\w\s]*$/ ) ? 
          $('<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>') : 
          $( '<img class="bvviz-picture" src="' + imageSrc + '" />' ),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( timestamp )
        )
      );
    },

    rewardsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    },

    missionsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // These variables will hold a reference to the container where the notification cards will exist and it's height
  cards,
  cardsHeight,

  // Stores whether or not the feed has been initialized with notifications and a timeout for reinitialization
  initial = true,
  reinitializeTO,

  // These variables will store a queue of notifications waiting to be displayed
  queue = [],
  queueRunning = false,
  queueInterval,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the stream settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.siteStream, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }

  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-playerStream' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Set the "cards" variable to the proper container
    cards = $( '.bvviz-cards', target );

    // Request the stream definition
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams', { streams: streamId } ).ok( function( streamData ) {

      // Remove the loading display
      loading.remove();

      // Show an error if the stream definition was not found
      if ( streamData.streams.length !== 1 ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" can not be found.' );
      }

      // Show an error if the stream definition is not the correct type
      if ( streamData.streams[0].consumer !== 'activity' ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" is not an "activity" stream.' );
      }

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( settings.inline ) {
        $( '.bvviz-body', target ).addClass( 'bvviz-noheader' );
      } else {
        render.header( streamData.streams[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Seed the initial display and subscribe to future notifications for this stream
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams/notifications', { streams: streamId }, {
        fields: 'all',
        source: {
          ids: [ playerId ]
        }
      }).ok( showNotifications ).subscribe( showNotifications );

    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
   
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  function showNotifications( data ) {

    var childrenHeight = 0;

    // Cancel the reinitialization timeout
    window.clearTimeout( reinitializeTO );

    // Add the new notifications into the queue
    queue.push.apply( queue, data.notifications );

    // Sort the queue to put the most recent item on top
    queue.sort( function( a, b ) {
      return new Date( a.created_at ) - new Date( b.created_at );
    });

    if ( initial ) {
      // Display enough notification cards to fill the container
      cardsHeight = target.find( '.bvviz-body' ).height();
      while ( queue.length > 0 && childrenHeight <= cardsHeight ) {
        childrenHeight += drawCard( queue.shift(), true ).outerHeight();
      }
      initial = false;
    }

    startQueue();
  }

  function startQueue() {
    // Don't need to start the queue if it's already running
    if ( queueRunning ) {
      return false;
    }
    queueRunning = true;

    // Use setInterval to pull an element out of the queue
    queueInterval = window.setInterval( function() {

      // If there is nothing in the queue, clear the interval and reset the state of the queue
      if ( queue.length === 0 ) {
        window.clearInterval( queueInterval );
        queueRunning = false;

        // Set the reinitilization timeout in case new data is not found
        reinitializeTO = window.setTimeout( function() {
          
          // If we've waited the full reinitialize time, re-display the most recent data
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams/notifications', { streams: streamId }, {
            fields: 'all',
            source: {
              ids: [ playerId ]
            }
          }).ok( showNotifications );

        }, 60000 );

        // Exit out of the interval since there is nothing to do
        return false;
      }

      // Draw the most recent item
      drawCard( queue.shift() );
    }, 2500 );
  }

  function drawCard( notification, initial ) {
    var card;

    // Render the card based on it's type
    if ( render[ notification.type + 'Card' ] ) {
      card = render[ notification.type + 'Card' ]( notification );

      // Execute callback handler if it's defined
      if ( typeof settings.itemCompleteCallback === 'function' ) {
        settings.itemCompleteCallback( card );
      }

      // Switch the current row style
      currentRowStyle = ( currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd' );

    // If a renderer can't be found, don't show the notification
    } else {
      return;
    }

    // If this is not the inital rendering, hide the card so that it can be animated into view
    if ( !initial ) {
      card.hide();
    }

    // Add the card into the stream
    card.prependTo( cards );

    // Animate the card into view
    if ( !initial ) {
      card.slideDown( 1000, function() {
        var childrenHeight = 0;
        // Remove any DOM elements that are out of view
        cards.children().each( function() {
          if ( childrenHeight > cardsHeight ) {
            $( this ).remove();
          } else {
            childrenHeight += $( this ).outerHeight();
          }
        });
      });
    }

    return card;
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  return pub;
};
})(jQuery);


;(function($) {
// Add customContainer method to the BVVIZ scope
BVVIZ.customContainer = function( target, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {
    
    // Main header
    header: function() {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + settings.headerTitle + '</div></div>' );
    },

    // Main body
    body: function() {
      var body = $( '<div class="bvviz-body"></div>' ).append( render.description() );
      if ( !settings.showContainerFrame ) {
        body.addClass( 'bvviz-noframe');
      }
      if ( settings.inline ) {
        body.addClass( 'bvviz-noheader');
      }

      return body;
    },

    // Body header
    description: function() {
      var desc = settings.description ? $( '<div class="bvviz-body-title">' + settings.description + '</div>' ) : '';
      // If descriptionFontColor option set to a valid value, add inline style
      if ( settings.description && settings.descriptionFontColor ) {
        desc.css( 'color', settings.descriptionFontColor );
      }

      return desc;
    }

  },

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the customContainer settings
  settings,

  // Store the content container settngs
  contentSettings;

  // Normalize the options object, verify the options parameter, remove options attribute due to invalid inputs
  options = $.isPlainObject( options ) ? options : {};  
  if ( !options.showContainerFrame ) {
    options.inline = true;
  }
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !options.showDescription || $.type( options.description ) !== 'string' || options.description == '' ) {
    delete options.description;
  }
  if ( $.type( options.descriptionFontColor ) !== 'string' || !options.descriptionFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
    delete options.descriptionFontColor;
  }
  if ( !options.category ) {
    delete options.category;
  } else if ( $.type( options.category ) === 'string' ) {
    options.category = String.prototype.split.call( options.category, ',' );
  } else if ( $.type( options.category ) !== 'array' || options.category.length == 0 ) {
    delete options.category;
  }
  BVVIZ.utility.trimArray( options.category );
  if ( $.type( options.contentsTypes ) === 'string' ) {
    options.contentsTypes = String.prototype.split.call( options.contentsTypes, ',' );
  } else if ( $.type( options.contentsTypes ) !== 'array' ) {
    delete options.contentsTypes;
  }
  BVVIZ.utility.trimArray( options.contentsTypes );
  if ( BVVIZ.utility.validateNestedObj( options, 'contents', 'badges' ) ) {
    if ( $.type( options.contents.badges.badgeBackgroundColor ) !== 'string' || !options.contents.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.contents.badges.badgeBackgroundColor;
    }
    if ( $.type( options.contents.badges.badgeFontColor ) !== 'string' || !options.contents.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.contents.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( {}, BVVIZ.options.customContainer, options );  

  // Set the content container settings based on the same options
  // Force default parameters being used on the sub contents
  contentSettings = $.extend ( {}, options.contents, {
      siteId: settings.siteId,
      inline: true,
      headerTitle: '',
      pageSize: 0,
      childContentCards: true,
      category: settings.category
  } );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the customContainer header, banner and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-customContainer' )
      .append(
        ( settings.inline ? '' : render.header() ),
        render.body()
      );

    // Correct the height of the body
    BVVIZ.helper.fitHeight( target );

    // Trigger load of all types of data
    load();
  }

  function load() {
    var body = target.find('.bvviz-body'),

        // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        
        // Store the calculated width based on results
        cardWidth,

        // Store the count of requests being sent out
        requestCounter = 0,

        // Store the count of promise's always methods being called
        completeCounter = 0;

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Empty the body cards before reload
    body.find('.bvviz-cards').remove();

    function showResult() {
      // Re-calculate the card width after all cards being appended
      $.each( target.find('.bvviz-cards'), function(i, cards){
        cards = $( cards );
        if ( !cardWidth ) {
          cardWidth = BVVIZ.helper.fitContainerCardWidth( body.find('.bvviz-card:first'), body );
        }
        // Apply the calculated width to each cards
        cards.children().width( cardWidth );

        // Use the helper to show the cards with an animation
        BVVIZ.helper.showCards( cards );
      });

      // Remove the loading display
      loading.remove();
    };

    function beforeRequestCallback() {
      // Increase the counter before sending each request
      requestCounter ++;
    };

    function callback() {
      // Increase the counter each this method is called
      completeCounter ++;

      // This visualization component needs to render in a timeout in order to ensure all sub contents have finished loading
      window.setTimeout( function(){
        if ( completeCounter == requestCounter ) {
          showResult();
        }
      }, 10 );
    };

    // Adding content types
    $.each( settings.contentsTypes, function( i, content ){
      var contentsOptions,
          emptyElement,
          callbackObj;

      callbackObj = {
        beforeRequestCallback: beforeRequestCallback,
        callback: callback
      }


      switch ( content ) {
        case 'rewards':
          // extend options by adding callback
          contentsOptions = $.extend( true, {}, BVVIZ.options.playerRewards, contentSettings, callbackObj );
          emptyElement = $( '<div></div>' ).appendTo ( body );
          BVVIZ.playerRewards(
                emptyElement,
                playerId,
                contentsOptions
              );
          break;
        case 'missions':
          contentsOptions = $.extend( true, {}, BVVIZ.options.playerMissions, contentSettings, callbackObj );
          emptyElement = $( '<div></div>' ).appendTo ( body );
          BVVIZ.playerMissions(
                emptyElement,
                playerId,
                contentsOptions
              );
          break;
        case 'tracks':
          contentsOptions = $.extend( true, {}, BVVIZ.options.playerTracks, contentSettings, callbackObj );
          emptyElement = $( '<div></div>' ).appendTo ( body );
          BVVIZ.playerTracks(
                emptyElement,
                playerId,
                contentsOptions
              );
          break;
      }
    });

    // Stop loading after timeout, this could happen when there is no data matchs the specified category
    window.setTimeout ( function(){
      // Remove the loading display
      loading.remove();
    }, 3000 );
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;
};
})(jQuery);


;(function($) {
// Add rewardProgress method to the BVVIZ scope
BVVIZ.rewardProgress = function( target, playerId, rewardId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( title ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + title + '</div></div>' );
    },

    // Header for the reward itself
    bodyHeader: function( reward ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( reward.progress && reward.progress.percent ? reward.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + reward.hint + '</div>' +
      '</div>' );
    },

    // Player reward card
    defCard: function( reward ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-icon-container"></div>').append(
          $('<img class="bvviz-icon" src="' + reward.image + '"/>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-hint">' + ( reward.hint ? reward.hint : '' ) + '</div>'),
          reward.additionalAward ? $('<div class="bvviz-awards bvviz-clearfix">Additional award: ' + reward.additionalAward + '</div>') : null,
          render.progress( reward.playerProgress )
        )
      );
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
      }
      return card;
    },

    // Player reward card
    card: function( reward ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-icon-container"></div>').append(
          $('<img class="bvviz-icon" src="' + reward.image + '"/>'),
          $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>')
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-message">' + ( reward.message ? reward.message : '' ) + '</div>'),
          reward.additionalAward ? $('<div class="bvviz-awards bvviz-clearfix">Additional award: ' + reward.additionalAward + '</div>') : null,
          $('<div class="bvviz-timestamp"><span>Completed: ' + BVVIZ.helper.timeToFormatted(reward.created_at) + '</span></div>')
        )
      );
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
      }
      return card;
    },

    // Player time-reset reward card
    resetCard: function( reward ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-icon-container"></div>').append(
          $('<img class="bvviz-icon" src="' + reward.image + '"/>'),
          reward.earned_total_count ? $('<div class="bvviz-count">' + reward.earned_total_count + 'x</div>') : ''
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-hint">' + ( reward.hint ? reward.hint : '' ) + '</div>'),
          reward.additionalAward ? $('<div class="bvviz-awards bvviz-clearfix">Additional award: ' + reward.additionalAward + '</div>') : null,
          render.progress( reward.playerProgress ),
          reward.earned_total_count ? $('<div class="bvviz-timestamp"><span>Completed: ' + BVVIZ.helper.timeToFormatted(reward.created_at) + '</span></div>') : ''
        )
      );
      if ( !reward.earned_by ) {
        card.addClass( 'bvviz-grey' );
      }
      return card;
    },

    // Player reward progress
    progress: function( progress ) {
      var progress = $('<progress class="bvviz-progress-bar" max="' + progress.possible + '" value="' + progress.earned + '"></progress>').add(
            $('<div class="bvviz-ratio">' + progress.earned + '/' + progress.possible + '</div>')
          );
      return progress;
    },

    // Reward earned history
    history: function( earnedRewards ) {
      var expand = $('<div class="bvviz-expand bvviz-arrowdown">&#9662;</div>'),
          stamps = '',
          history = '';

      // Loop through the earned reward instances, append additional timestamp data
      $.each( earnedRewards, function( id, timestamp ) {
        stamps += '<div>' + BVVIZ.helper.timeToFormatted( timestamp ) + '</div>';
      })

      history = expand.add( $('<div class="bvviz-more-timestamps"></div>').append( stamps ) );

      // Add event handler for openning more completed timestamps
      expand.on('click', function(event){
        var expand = $( this ),
            target = expand.next();
        if ( !target.hasClass('bvviz-open') ) {
          expand.html('&#9663');
          target.addClass('bvviz-open');
        } else {
          expand.html('&#9662');
          target.removeClass('bvviz-open');
        }
      });

      return history;
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // This boolean will track whether the player has progress in the reward or not
  hasProgress = false,

  // This boolean will track whether the reward images should be connected by a visual "bridge" or not
  useBridge = false,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.rewardProgress.maxPageSize ) {
    delete options.pageSize;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.rewardProgress, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  // General purpose normalization function
  function normalize( reward ) {

    var normalized = {},
        crieteria = '',
        award = '';

    // reward progress may come from two resources
    // if from rewards definition, should include image, hint, eligibility conditions, additional awards and progress
    // if from player rewards, should include message, timestamp earned, display all instances if earned multiple times

    // Set default hint, message
    normalized.hint = reward.hint ? reward.hint : ( reward.name + ' to earn this reward' );
    normalized.message = reward.message ? reward.message : ( 'Congratulations on earning reward ' + reward.name + '!' );

    // Set default earned total count to 1
    normalized.earned_total_count = $.isNumeric( reward.earned_total_count ) ? reward.earned_total_count : 0 ;

    // Set eligibility display from player criteria and behavior crieteria
    $.each( reward.player_criteria, function( key, value ){
      if ( key > 0 ) {
        crieteria += '</br>' + reward.criteria_union + ' ';
      }

      crieteria += value.field + ' ' + value.operator + ' ' + value.value;
    });

    normalized.eligibility = crieteria ? crieteria : 'N/A';

    // Set the additional award for the reward, this has to be from rewards definition
    $.each( reward.units, function( key, value ){
      if ( value.possible == 0 ) {
        return;
      }

      // Adding delimiters
      award = award ? award + ', ' : award;

      // Appdending additional Units
      award += value.possible + ' ' + value.name;
    });

    normalized.additionalAward = award;

    // Merge the normalized properties into reward object
    return $.extend( reward, normalized, true );
  }

  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        title = '',
        cards;

    // Allow for target to be provided as a string or JQuery object
    target = $( target );


    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }
    // "rewardId" must be provided as a string
    if ( typeof( rewardId ) !== 'string' || rewardId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"rewardId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-rewardProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    cards = $( '.bvviz-cards', target );

    BVSDK.all(
      // Load the reward definitions
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'rewards', null, {
        fields: 'all',
        query: { definition_id: rewardId }
      } ),      
      // Load the reward information and player's overall reward progress
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/rewards', { players: playerId }, {
        fields: 'all',

        // Use distinct-definition_id to ensure that we only get one instance of each definition
        distinct: 'definition_id',

        query: { definition_id: rewardId }

      } ) 
    ).ok( function( rewardsDefData, playerRewardsData ) {

      title = rewardsDefData.rewards && rewardsDefData.rewards[0] && rewardsDefData.rewards[0].name || 'Unnamed Reward';

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( title ).prependTo( target );
      }
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Load the reward card details
      load( rewardsDefData, playerRewardsData );

    // Attach a "fail" listener in case the reward id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  function load( rewardsDefData, playerRewardsData ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),

    // This object will store earned reward instances of the reward definition_id
        earnedRewards = {},
    
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' ),

    // earned_total_count need to be adjusted based on data from earnedRewards
        earnedCount = 0,

    // The number of Rewards that will be requested in a single API call
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize;


    // Whether there are earned rewards or not, this function will draw the result
    function drawDetails( rewardsDefData, playerRewardsData, rewardProgressData ) {
      // Set the storage for normalized rewardData
      var normalizedReward = {};

      // Normalize the reward defintion 
      if ( rewardsDefData && rewardsDefData.rewards && rewardsDefData.rewards.length > 0 ) {
        normalizedReward = $.extend( true, normalizedReward,  normalize( rewardsDefData.rewards[0] ) );
      }

      // Normalize the player rewards
      if ( playerRewardsData && playerRewardsData.rewards && playerRewardsData.rewards.length > 0 ) {
        normalizedReward = $.extend( true, normalizedReward,  normalize( playerRewardsData.rewards[0] ) );
      }

      // Normalize the reward progress
      if ( rewardProgressData ) {
        // If player has started the progress, normalize using the progress data, otherwise set default values
        if ( rewardProgressData.progresses && rewardProgressData.progresses.length > 0 ) {
          normalizedReward.playerProgress = rewardProgressData.progresses[0];
        } else {
          normalizedReward.playerProgress = {
            earned: 0,
            possible: ( $.isNumeric( normalizedReward.progress_possible ) ? normalizedReward.progress_possible : 1 ),
            percent: 0
          };
        }
      }

      if ( normalizedReward && $.isPlainObject( normalizedReward.interval ) ) {
        // Render time-reset reward details with all rewards data
        cards.append( render.resetCard( normalizedReward ) );

      } else if ( playerRewardsData && playerRewardsData.rewards && playerRewardsData.rewards.length > 0 ) {
        // Render reward details with player rewards data
        cards.append( render.card( normalizedReward ) );

      } else {
        // Render reward details with the reward definition data
        cards.append( render.defCard( normalizedReward ) );

      }

      if ( cards.children().length ) {

        // Remove the loading display
        loading.remove();

        // Use the helper to show the cards with an animation
        BVVIZ.helper.showCards( cards );

      } else {

        // Remove the loading display
        loading.remove();

        // remove the target if no reward data
        target.remove();
      }
    }

    function loadEarnedRewards( page ) {

      function showCountHistory () {
        var count = $( '.bvviz-count', cards ),
            completed = $( '.bvviz-timestamp', cards ),
            completedTimeSpan;

        if ( !$.isEmptyObject(earnedRewards) ) {
          // Should the earned_total_count data field be re-adjusted
          // count.text( parseInt( earnedCount, 10 ) + 'x' );

          // Add the expand button and container element
          completed.append( render.history(earnedRewards) );

          // Re-position the timestamp expand button
          completedTimeSpan = completed.children().first();
          $('.bvviz-expand').css( { 'left': completed.width() - ( completed.width() - completedTimeSpan.outerWidth() ) / 2  + 5 } );

        }
      };

      // Load the additional data of all earned reward instances in the reward 
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/rewards', { players: playerId }, {
          fields: 'created_at',
          offset: page * pageSize,
          limit: pageSize,

          query: { definition_id: rewardId }

        }).ok( function( earnedRewardsData ) {

          // Create an object map of the earned rewards, using the reward's definition_id as the key
          if ( earnedRewardsData ) {
            $.each( earnedRewardsData.rewards, function( i, earnedReward ) {
              // exclude the existing reward instance from player rewards
              if ( playerRewardsData && playerRewardsData.rewards.length > 0 && playerRewardsData.rewards[0].id !== earnedReward.id ) {
                earnedRewards[ earnedReward.id ] = earnedReward.created_at;
              }
              // increment the earned count
              earnedCount++;
            });
          }

          // If the player earned more rewards, load all of the earned rewards for the player
          if ( earnedRewardsData.rewards && earnedRewardsData.rewards.length === pageSize ) {
            // Recursive loading
            page++;
            loadEarnedRewards( page );
          
          } else {
            // Show count and history element if earnedRewards is not empty
            showCountHistory();
          }

        }).fail( function( earnedRewardsData ) {

          // No more earnedRewardsData, show count and history element if earnedRewards is not empty
          showCountHistory();
        });
    }

    function loadRewardProgress( rewardsDefData, playerRewardsData ) {

      // Load the player progress toward the reward and store into reward definition data 
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, {
          fields: 'all',

          query: { type: 'all_rewards', definition_id: rewardId }

        }).ok( function( rewardProgressData ) {
          var details = $( '.bvviz-details', cards );

          if ( BVVIZ.utility.validateNestedObj( rewardProgressData, 'progresses' ) ) {

            // Store the progress data into reward definition data
            if ( rewardsDefData && rewardsDefData.rewards && rewardsDefData.rewards[0] ) {
              rewardsDefData.rewards[0].playerProgress = rewardProgressData.progresses[0];
            } 

            // If the reward progress data is valid, draw the progress bar
            if ( rewardProgressData.progresses.length ) {

              if ( details.length > 0 ) {
                details.append( render.progress( rewardProgressData.progresses[0] ) );
              }
            }
          }

        }).always( function( rewardProgressData ) {

          // Draw the reward details with reward progress
          drawDetails( rewardsDefData, playerRewardsData, rewardProgressData );

          if ( BVVIZ.utility.validateNestedObj( playerRewardsData, 'rewards' ) ) {
            // Append reward earning history if it is time-reset enabled
            if ( playerRewardsData.rewards[0] && playerRewardsData.rewards[0].interval ) {
              loadEarnedRewards( 0 );
            }
          }
        });
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    if ( playerRewardsData.rewards && playerRewardsData.rewards.length > 0 ) {

      // This reward is time-reset enabled, get both player progress and earned history
      if ( playerRewardsData.rewards[0] && playerRewardsData.rewards[0].interval ) {

        // load player reward progress, in callback draw the details with combined reward progress and eaned history
        loadRewardProgress( rewardsDefData, playerRewardsData );

      // This reward has been earned
      } else {

        // Draw the details with player rewards data
        drawDetails( rewardsDefData, playerRewardsData );

        // If this reward is re-earnable, get all reward instances for this player        
        if ( playerRewardsData.rewards[0].allow_duplicates ) {

          loadEarnedRewards( 0 );

        }

      }

    // This reward has not been earned, get player progress
    } else {

      // load player reward progress, in callback draw the details without player rewards data
      loadRewardProgress( rewardsDefData );

    }

  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// Add trackProgress method to the BVVIZ scope
BVVIZ.trackProgress = function( target, playerId, trackId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    // Header for the track itself
    bodyHeader: function( track ) {
      return $( '<div class="bvviz-body-header">' +
        '<div class="bvviz-percent">' + ( track.progress.percent ? track.progress.percent : 0 ) + '%</div>' +
        '<div class="bvviz-hint">' + track.hint + '</div>' +
      '</div>' );
    },

    // Individual mission card
    card: function( mission ) {
      var card = $('<div class="bvviz-card bvviz-invisible"></div>').append(
        $('<div class="bvviz-picture-container"></div>').append(
          '<img class="bvviz-picture" src="' + mission.image + '"/>' +
          '<div class="bvviz-bridge"></div>'
        ),
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + mission.name + '</div>'),
          $('<div class="bvviz-desc">' + mission.hint + '</div>')
        ),
        '<div class="bvviz-percent">' + ( mission.progress.percent ? mission.progress.percent : 0 ) + '%</div>'
      );
      if ( !mission.progress.percent || mission.progress.percent < 100 ) {
        card.addClass( 'bvviz-grey' );
      }
      // Store the mission id on the card's data so we can use it to open a missionProgress
      card.data( 'bvviz-mission', mission.id );
      return card;
    }
  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // This boolean will track whether the player has progress in the track or not
  hasProgress = false,

  // This boolean will track whether the mission images should be connected by a visual "bridge" or not
  useBridge = true,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.trackProgress.maxPageSize ) {
    delete options.pageSize;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.trackProgress, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }
    // "trackId" must be provided as a string
    if ( typeof( trackId ) !== 'string' || trackId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"trackId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-trackProgress' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the track information and player's overall track progress
    BVSDK.all(
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks', { tracks: trackId }, { fields: 'hint' } ),
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: {
        type: 'all_tracks',
        definition_id: trackId
      }} )
    ).ok( function( trackDefData, playerProgressData ) {

      var cards = $( '.bvviz-cards', target );

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( trackDefData.tracks[0].name ).prependTo( target );
      }

      // Render the header for the track and add it to the body
      // If the player has made progress, add that to the track
      if ( playerProgressData && $.isArray( playerProgressData.progresses ) && playerProgressData.progresses.length > 0 ) {
        trackDefData.tracks[0].progress = playerProgressData.progresses[0];

        hasProgress = playerProgressData.progresses[0].percent > 0;
      }
      
      // Render the body
      render.bodyHeader( trackDefData.tracks[0] ).prependTo( $( '.bvviz-body', target ) );
  
      // Remove the loading display (load() will add one for itself)
      loading.remove();

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Set up infinte scrolling on the new container
      BVVIZ.helper.infiniteScroll( cards, pub );
      
      // Random and Unordered tracks don't need the bridge on any elements
      if ( trackDefData.tracks[0].type == 'random' || trackDefData.tracks[0].type == 'unordered' ) {
        useBridge = false;
      }

      // Trigger a load of the first page of data
      load( 0 );

      // If BVVIZ.missionProgress has been included...
      if ( $.isFunction( BVVIZ.missionProgress ) ) {
        // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
        cards.bind( 'click', function( event ) {
          var eventTarget = $( event.target ),
              card = eventTarget.closest( '.bvviz-card' ),
              missionId;

          // If we can find a mission card from the click, show the missionProgress for that card
          if ( card.length > 0 ) {
            // Get the missionId value from the data on the card
            missionId = card.data( 'bvviz-mission' );

            BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

            event.preventDefault();
            return false;
          }
        });
      }

    // Attach a "fail" listener in case the track id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  function load( page ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),
    // Calculate the page size
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Whether there are earned missions or not, this function will draw the result
    function drawRows( trackMissionsDefData, playerMissionsData ) {
      // This object will store which id's have been started
      var startedMissions = {};

      // Create an object map of the earned missions, using the missions's id as the key
      if ( playerMissionsData ) {
        $.each( playerMissionsData.missions, function( i, mission ) {
          startedMissions[ mission.id ] = mission;
        });
      }

      // Loop through all the missions defined on the track
      $.each( trackMissionsDefData.missions, function( i, mission ) {
        cards.append(
          // Render the card for each mission, using the startedMissions map, and add it to the container
          render.card( startedMissions[ mission.id ] || mission )
            // Add the current row style to the card
            .addClass( currentRowStyle )
        );

        // Change the next row style
        currentRowStyle = currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd';
      });

      // Random and Unordered tracks don't need the bridge on any elements
      if ( useBridge === false ) {
        $( '.bvviz-bridge', cards ).remove();
      }

      // The first page has some special clean-up
      if ( page === 0 ) {
        if ( useBridge ) {
          
          // The first card dosn't need the bridge
          $( '.bvviz-bridge:first', cards ).remove();
        }

        // Add the "first" class to the first card to remove it's top margin
        $( '.bvviz-card:first', cards ).addClass( 'bvviz-first' );
      }
          
      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Show an indicator in the target to indicate that something is happening
    target.append( loading );

    // Load the provided page of missions in the track
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks/missions', { tracks: trackId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( trackMissionsDefData ) {

        // load the earned missions for the player regardless if the player has progress or not
        
        // Load the player's earned missions in the track that match the definition_ids in this page
        BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions', { players: playerId }, {
            fields: 'hint',
            
            // Use $.map to extract an array of mission definition ids
            query: { id: $.map( trackMissionsDefData.missions, function( mission ) {
                return mission.id;
              })
            }

          }).ok( function( playerMissionsData ) {
          
            // Draw the rows with player mission data
            drawRows( trackMissionsDefData, playerMissionsData );

          });

      if ( trackMissionsDefData.missions.length < pageSize ) {
        // We've loaded all the missions, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else {
        // Request all data without infinite Scroll
        BVVIZ.helper.loadNextPage( cards, pub );
      }

      }).fail( function() {
        
        // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
        cards.unbind( 'scroll.bvviz' );

        // Remove the loading display
        loading.remove();
      });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// Add trackMissions method to the BVVIZ scope
BVVIZ.trackMissions = function( target, playerId, trackId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + ( settings.headerTitle ? settings.headerTitle : name ) + '</div></div>' );
    },

    // Main body
    body: function() {
      var body = $( '<div class="bvviz-body"></div>' ).append( render.description() );
      if ( !settings.showContainerFrame ) {
        body.addClass( 'bvviz-noframe');
      }
      if ( settings.inline ) {
        body.addClass( 'bvviz-noheader');
      }

      return body;
    },

    // Body header
    description: function() {
      var desc = settings.description ? $( '<div class="bvviz-body-title">' + settings.description + '</div>' ) : '';
      // If descriptionFontColor option set to a valid value, add inline style
      if ( settings.description && settings.descriptionFontColor ) {
        desc.css( 'color', settings.descriptionFontColor );
      }

      return desc;
    },

    // Individual mission card
    card: function( mission ) {
      // Replace the background image if the image is not found
      var imageFound = !!( BVVIZ.utility.validateNestedObj( mission, 'image' ) && mission.image ),
      // Use the place holder image as src if the image is not found
          imageSrc = imageFound ? mission.image : BVVIZ.helper.imageHolderSrc();

      // Add the "bvviz-invisible" class to the card object so that it can be animated
      var card = $( '<div class="bvviz-card bvviz-invisible"></div>' ).append(
        $( '<img class="bvviz-picture' + ( imageFound ? '' : ' bvviz-broken' ) + '" src="' + imageSrc + '" />' ),
        ( settings.badges.showName ? $( '<div class="bvviz-name" title="' + mission.name +'">' + mission.name + '</div>' ) : '' ),
        ( settings.badges.showProgress ? render.progress( mission ) : '' )
      );

      // If the mission is incomplete, grey out the entire card
      if ( !( $.isPlainObject( mission.progress ) && mission.progress.percent >= 100 ) ) {
        card.addClass( 'bvviz-grey' );
      }

      // If this is mini badge or has custom background color, clear the badge border
      if ( settings.badges.miniBadge || !settings.badges.showBadgeBorder ) {
        card.addClass( 'bvviz-borderless' );
      }

      // If the badgeBackgroundColor option set to a valid value, add inline style
      if ( settings.badges.badgeBackgroundColor ) {
        card.css( 'background-color', settings.badges.badgeBackgroundColor );
      }

      // If the badgeFontColor option set to a valid value, add inline style
      if ( settings.badges.badgeFontColor ) {
        card.css( 'color', settings.badges.badgeFontColor );
      }

      // If the miniBadge option set to true, reduce the card size
      if ( settings.badges.miniBadge ) {
        card.addClass( 'bvviz-mini');
      }

      // Store the mission id for later use
      card.data( 'bvviz-mission', mission.id );
      return card;
    },

    // Progress indicator inside a mission card
    progress: function( mission ) {
      var progress = mission.progress,
          container = $( '<div class="bvviz-progress"></div>' );
                
      // Only show progress for missions that have been started
      if ( $.isPlainObject( progress ) ) {
        if ( progress.percent < 100 ) {
          container.html( progress.earned + '/' + progress.possible );
        } else if ( progress.percent == 100 ) {
          // Level mission doesn’t support complete state, display ratio fraction instead
          if ( mission.type === 'level' ) {
            container.html( progress.earned + '/' + progress.possible );
          } else {
            if ( settings.badges.miniBadge && BVVIZ.utility.isIe8OrLess() ) {
              container.html( '&#10003;' );
            } else if ( settings.badges.miniBadge ) {
              container.html( BVVIZ.helper.svgCheckmarkMini() );
            } else if ( BVVIZ.utility.isIe8OrLess() ) {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner bvviz-nosvg"></div>' ) );
            } else {
              container.html( 'Completed' ).append( $( '<div class="bvviz-checkmark-corner">' + BVVIZ.helper.svgCheckmarkCorner() + '</div>' ) );
            }
          }
        }
      }
      return container;
    }
  },

  // BVVIZ Visualization object instance 
  bvvizVisual,
  
  // Store the trackMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( !options.showContainerFrame || options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( $.type( options.headerTitle ) !== 'string' || options.headerTitle == '' ) {
    delete options.headerTitle;
  }
  if ( !options.showDescription || $.type( options.description ) !== 'string' || options.description == '' ) {
    delete options.description;
  }
  if ( $.type( options.descriptionFontColor ) !== 'string' || !options.descriptionFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
    delete options.descriptionFontColor;
  }
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.trackMissions.maxPageSize ) {
    delete options.pageSize;
  }
  if ( BVVIZ.utility.validateNestedObj( options, 'badges' ) ) {
    if ( $.type( options.badges.badgeBackgroundColor ) !== 'string' || !options.badges.badgeBackgroundColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeBackgroundColor;
    }
    if ( $.type( options.badges.badgeFontColor ) !== 'string' || !options.badges.badgeFontColor.match( /^(#[0-9A-Fa-f]{3,6})|(\w)$/) ){
      delete options.badges.badgeFontColor;
    }
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.trackMissions, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Define the card container so that we can bind events to it
    var cards = $( '<div class="bvviz-cards bvviz-row"></div>' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }

    // Empty the target, add the base classes, the missionCard header and the card container into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-trackMissions' )
      .append(
        ( settings.childContentCards ? cards : render.body().append( cards ) )
      );

    // Load the mission information and player's overall mission progress
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks', { tracks: trackId }
    ).ok( function( trackDefData ) {

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( !settings.inline ) {
        render.header( trackDefData.tracks[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Unless we want request all data and disable infinite Scroll
      if ( settings.pageSize !== 0 ) {
        // Set up infinte scrolling on the new container
        BVVIZ.helper.infiniteScroll( cards, pub );
      }

      // Trigger a load of the initial page of data
      load( 0 );

    // Attach a "fail" listener in case the track id is invalid
    }).fail( function( data ) {

      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

    // If BVVIZ.missionProgress has been included...
    if ( $.isFunction( BVVIZ.missionProgress ) ) {
      // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
      cards.bind( 'click', function( event ) {
        var eventTarget = $( event.target ),
            card = eventTarget.closest( '.bvviz-card' ),
            missionId;

        // If we can find a mission card from the click, show the missionProgress for that card
        if ( card.length > 0 ) {
          // Get the missionId value from the data on the card
          missionId = card.data( 'bvviz-mission' );

          BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

          event.preventDefault();
          return false;
        }
      });
    }
  }

  function load( page ) {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' ),
        cards = $( '.bvviz-cards', target ),
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
        sdkOptions = {
          offset: page * pageSize,
          limit: pageSize
        };

    // If this is the child content of custom container, then slient loading
    if ( !settings.childContentCards ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of mission definitions
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks/missions', { tracks: trackId }, sdkOptions
    ).ok( function( missionDefsData ) {

      // We only want to display missions that aren't in tracks, plus only display active missions
      var activeMissions = $.map( missionDefsData.missions, function( mission ) {
            if ( mission.active ) {
              return mission;
            }
          });

      // Make sure that we have at least one mission
      if ( activeMissions.length > 0 ) {
        
        // Execute the before request callback if it is defined
        if ( $.isFunction( settings.beforeRequestCallback ) ) {
          settings.beforeRequestCallback();
        }
        
        // Request the player progress in the missions found
        BVSDK.all(
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions', { players: playerId }, {
            query: {
              // Use $.map to extract an array of mission ids
              id: $.map( activeMissions, function( mission ) {
                return mission.id;
              })
            }
          }),
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: {
            type: 'all_missions',
            definition_id: $.map( activeMissions, function( mission ) {
                return mission.id;
              })
            }
          })
        ).ok( function( playerMissionsData, missionProgressData ) {
          var missionProgressMap = {},
              cardWidth;

          if ( playerMissionsData && playerMissionsData.missions ) {
            // Convert the player mission into an object and merge into progress map, using the mission Id as the key
            $.each( playerMissionsData.missions, function( i, mission ) {
              missionProgressMap[ mission.id ] = mission;
            });
          }
          
          // Render each mission definition
          $.each( activeMissions, function( i, missionDef ) {

            // Merge the player mission progress into progress map, using the mission definition Id as the key
            try {
              $.each( missionProgressData.progresses, function( j, progress ) {
                // If the mission definition id found match in the progress, generate a progress object which hasn't been started
                if ( missionDef.id == progress.definition_id ) {
                  missionProgressMap[ missionDef.id ] = missionDef;
                  missionProgressMap[ missionDef.id ].progress = progress;
                }
              });
            } catch (e) {}

            // If the player has made progress in the mission, use the progress. Otherwise use the definition
            cards.append( 
              render.card( missionProgressMap[ missionDef.id ] ? missionProgressMap[ missionDef.id ] : missionDef )
            );
          });

          // If this is the child content of custom container, then slient loading, otherwise show the cards
          if ( !settings.childContentCards ) {
            // Calculate the card width after card being appended
            if ( !cardWidth ) {
              cardWidth = BVVIZ.helper.fitRowCardWidth( cards.children(":first"), cards );
            }
            // Apply the calculated width to each cards
            cards.children().width( cardWidth );

            // Remove the loading display
            loading.remove();

            // Use the helper to show the cards with an animation
            BVVIZ.helper.showCards( cards );
          }

        }).always( function() {
          if ( $.isFunction( settings.callback ) ) {
            settings.callback();
          }      
        });
      } else {
        // Remove the loading display
        loading.remove();
      }

      if ( missionDefsData.missions.length < pageSize ) {
        // We've loaded all the missions, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else {
        // Request all data without infinite Scroll
        BVVIZ.helper.loadNextPage( cards, pub );
      }

    }).fail( function() {
      // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
      cards.unbind( 'scroll.bvviz' );

      // Remove the loading display
      loading.remove();
    });
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );

  return pub;
};
})(jQuery);


;(function($) {
// Add trackTutorial method to the BVVIZ scope
BVVIZ.trackTutorial = function( target, playerId, trackId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},

  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    // Header for the track itself
    bodyHeader: function( track ) {
      var percent = track.progress.percent ? track.progress.percent : 0 ,
          container = $( '<div class="bvviz-body-header"></div>' ),
          summaryProgress;

      container.append(
        $( '<div class="bvviz-info">' + ( percent == 100 ? track.message : track.hint ) + '</div>').append(
          '<div class="bvviz-countdown">Days Left: n/a</div>'
        )
      );

      summaryProgress = BVVIZ.helper.showRadialProgress( percent ).prependTo( container );

      BVVIZ.helper.animateRadialProgress( summaryProgress );

      return container;
    },

    // Individual mission card
    card: function( mission, earned ) {
      var card = $('<div class="bvviz-card bvviz-invisible ' + ( earned ? 'bvviz-complete' : 'bvviz-not-started' ) + '"></div>');

      card.append(
        $('<div class="bvviz-details"></div>').append(
          $('<div class="bvviz-name">' + mission.name + '</div>'),
          $('<div class="bvviz-desc">' + ( settings.list.showItemProgress ? this.progress( mission.progress ) : ( mission.hint ? mission.hint : '' ) ) + '</div>')
        ),
        render.checkmark()
      );

      // If badge icons should display, add class name to reserve space for the icons
      if ( settings.list.showBadgeIcon ) {
        card.addClass('bvviz-list-icon')
            .prepend( $('<div class="bvviz-picture-container"></div>').append(
              $('<img class="bvviz-picture" src="' + mission.image + '"/>')
            )
        );
      }

      if ( !earned ) {
        card.addClass( 'bvviz-grey' );
      }

      // Store the mission object for later use
      card.data( 'bvviz-mission', mission.id );
      return card;
    },

    // Checkmark
    checkmark: function() {
      if ( BVVIZ.utility.isIe8OrLess() ) {
        return $( '<div class="bvviz-checkmark-circle bvviz-nosvg"></div>');
      } else {
        return $( '<div class="bvviz-checkmark-circle">' + BVVIZ.helper.svgCheckmarkCircle() + '</div>' );
      }
    },

    // Known progress text
    progress: function( progress ) {
      if ( typeof( progress.percent ) == 'undefined' || progress.percent === null || progress.percent == 0 ) {
        return 'Not Started' ;
      } else if ( progress.percent < 100 ) {
        return 'In Progress (' + progress.earned + '/' + progress.possible + ')' ;
      } else {
        return 'Completed (' + progress.earned + '/' + progress.possible + ')' ;
      }
    }    
  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // Store the type of track for later use
  // If this is unordered track, display the track summary and the mission items
  // If this is ordered track or level track, display the current mission in progress within the track
  trackType = null,

  // Store the player's track progress object
  playerTrackProgress = {},

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the playerMissions settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Verify the options parameter, remove options attribute due to invalid inputs:
  if ( !$.isNumeric( options.pageSize ) || options.pageSize < 0 || options.pageSize > BVVIZ.options.missionTutorial.maxPageSize ) {
    delete options.pageSize;
  }
  if ( BVVIZ.utility.validateNestedObj( options, 'alternateVisual' ) ) {
    if ( $.type( options.alternateVisual.visualName ) !== 'string' ){
      delete options.alternateVisual.visualName;
    }
    if ( $.type( options.alternateVisual.streamId ) !== 'string' ){
      delete options.alternateVisual.streamId;
    }
    if ( $.type( options.alternateVisual.leaderboardId ) !== 'array' ){
      delete options.alternateVisual.leaderboardId;
    }
  }

  // Override the default settings from options parameter, track tutorial and mission tutorial share the same default settings
  settings = $.extend( true, {}, BVVIZ.options.missionTutorial, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }
    // "playerId" must be provided as a string
    if ( typeof( playerId ) !== 'string' || playerId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"playerId" argument must be a string.' );
    }
    // "trackId" must be provided as a string
    if ( typeof( trackId ) !== 'string' || trackId.length <= 0 ) {
      return BVVIZ.helper.showError( target, '"trackId" argument must be a string.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-trackTutorial' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Load the track information and player's overall track progress
    BVSDK.all(
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks', { tracks: trackId }, { fields: 'hint' } ),
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/progresses', { players: playerId }, { query: {
        type: 'all_tracks',
        definition_id: trackId
      }} )
    ).ok( function( trackDefData, playerProgressData ) {

      var body = $( '.bvviz-body', target ),

          cards = $( '.bvviz-cards', target ),

          // Store the return value from the callback function
          callbackSwitch;


      // Store the track type for routing to different display
      trackType = trackDefData.tracks[0].type;

      // Store the player track progress object
      playerTrackProgress = BVVIZ.utility.validateNestedObj( playerProgressData, 'progresses', [0] ) ? playerProgressData.progresses[0] : {};

      // Level tracks can not be completed, though they are allowed to have alternate visualization upon "completion"

      // If player has completed a non-level track, it's possible to switch to alternate visualization on the settings
      if ( playerTrackProgress.percent == 100 && typeof settings.progressCompleteCallback === 'function' && settings.alternateVisual ) {

        // Convert to alternate visualization if this track is completed
        callbackSwitch = settings.progressCompleteCallback( pub, settings.alternateVisual );

        // If the callback continue flag returns true, stop current visualization and switch to new visualization
        if ( callbackSwitch ) {
          return false;
        }
      }

      // If current track is Unordered type, display the track summary and mission items
      if ( trackType === 'unordered' ) {

        // If this isn't an inline display, render the main header and add it to the top of the target
        if ( settings.inline ) {
          body.addClass( 'bvviz-noheader');
        } else {
          render.header( trackDefData.tracks[0].name ).prependTo( target );
        }

        // Render the summary for the track and add it to the body
        if ( playerTrackProgress ) {
          // If the player has made progress, add that to the track
          trackDefData.tracks[0].progress = playerTrackProgress;
        }

        // Render the body
        render.bodyHeader( trackDefData.tracks[0] ).prependTo( body );
    
        // Remove the loading display (load() will add one for itself)
        loading.remove();

        // Correct the height of the body
        BVVIZ.helper.fitHeight( target );

        // Set up infinte scrolling on the new container
        BVVIZ.helper.infiniteScroll( cards, pub );
      }

      // No matter what track type it is, we need trigger the load function
      // If it is Unordered type, it triggers a load of the first page of data
      // If it is Level or Ordered type, it triggers loading tracks/missions data and display mission tutorial
      load( 0 );

      // If BVVIZ.missionProgress has been included...
      if ( $.isFunction( BVVIZ.missionProgress ) ) {
        // ...bind to the container object and catch bleed-up events so that we can bind to fewer objects
        cards.bind( 'click', function( event ) {
          var eventTarget = $( event.target ),
              card = eventTarget.closest( '.bvviz-card' ),
              missionId;

          // If we can find a mission card from the click, show the missionProgress for that card
          if ( card.length > 0 ) {
            // Get the missionId value from the data on the card
            missionId = card.data( 'bvviz-mission' );

            BVVIZ.helper.showModal( BVVIZ.missionProgress, [ playerId, missionId, { siteId: settings.siteId } ] );

            event.preventDefault();
            return false;
          }
        });
      }

    // Attach a "fail" listener in case the track id is invalid
    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
      
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });

  }

  function load( page ) {
    // Store a reference to the container
    var cards = $( '.bvviz-cards', target ),
    // Calculate the page size
        pageSize = settings.pageSize === 0 ? settings.maxPageSize : settings.pageSize,
    // Create a loading display
        loading = BVVIZ.helper.loading( 'bvviz-tr' );

    // Whether there are earned missions or not, this function will draw the result
    function drawRows( trackMissionsDefData, playerMissionsData ) {
      // This object will store which id's have been started
      var startedMissions = {},

      // This object will store which id's have been earned
          earnedMissions = {}; 

      // Create an object map of the earned missions, using the missions's id as the key
      if ( playerMissionsData ) {
        $.each( playerMissionsData.missions, function( i, mission ) {
          startedMissions[ mission.id ] = mission;
          if ( mission.progress && mission.progress.percent == 100 ) {
            earnedMissions[ mission.id ] = true;
          }
        });
      }

      // Loop through all the missions defined on the track
      $.each( trackMissionsDefData.missions, function( i, mission ) {

        // This track should only be Unordered type. If it's an earned mission...
        if ( earnedMissions[ mission.id ] ) {

          // Determine the current RowStyle
          currentRowStyle = cards.children().filter(":last").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';

          // Render the card for each mission, using the startedMissions map, and add it to the container
          render.card( startedMissions[ mission.id ] || mission, earnedMissions[ mission.id ] ).appendTo( cards )
            // Add the current row style to the card
            .addClass( currentRowStyle );
        } else {

          // Determine the current RowStyle
          currentRowStyle = cards.children().filter(":first").hasClass('bvviz-odd') ? 'bvviz-even' : 'bvviz-odd';

          // Render the card for each mission, using the startedMissions map, and add it to the container
          render.card( startedMissions[ mission.id ] || mission, earnedMissions[ mission.id ] ).prependTo( cards )
            // Add the current row style to the card
            .addClass( currentRowStyle );
        }
      });

      // Remove the loading display
      loading.remove();

      // Use the helper to show the cards with an animation
      BVVIZ.helper.showCards( cards );
    }

    // Check if a loading indicator has not been included in the target. It remains loading with Ordered and Level track
    if ( $(loading, target).length < 0 ) {
      // Show an indicator in the target to indicate that something is happening
      target.append( loading );
    }

    // Load the provided page of missions in the track
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'tracks/missions', { tracks: trackId }, {
        fields: 'hint',
        offset: page * pageSize,
        limit: pageSize
      }).ok( function( trackMissionsDefData ) {

        // Store the earned mission map for sorting purposes
        var earnedMissionsMap = {},

        // Store current mission object in progress
            currentMission = null;

        // load the all the missions for the player regardless if the player has progress or not
        
        // Load the player's missions in the track that match the ids in this page
        BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'players/missions', { players: playerId }, {
            fields: 'hint',
            
            // Use $.map to extract an array of mission ids
            query: { id: $.map( trackMissionsDefData.missions, function( mission ) {
                return mission.id;
              })
            }

          }).ok( function( playerMissionsData ) {

            // If the track is Unordered type...
            if ( trackType === 'unordered' ) {

              // Draw the rows with player mission data
              drawRows( trackMissionsDefData, playerMissionsData );

            // else the track should be Ordered or Level type...
            } else {

              // Loop through the player missions data, try to locate the current mission
              $.each( playerMissionsData.missions, function( i, mission ){
                if ( mission.progress.percent < 100 ) {
                  // Assigning the first incomplete mission as the current mission
                  currentMission = currentMission ? currentMission : mission;
                  return false;
                }
              })

              // If the player has not started any mission or has completed all the mission in the track...
              if ( !currentMission ) {
                // The player has completed all the mission in the track
                if ( playerTrackProgress.percent == 100 ) { 
                  // Assigning the last mission from track definition
                  currentMission = trackMissionsDefData.missions[ trackMissionsDefData.missions.length - 1 ];
                } else {
                  // Assigning the first mission from track definition
                  currentMission = trackMissionsDefData.missions[0];                
                }
              }

              pub = BVVIZ.missionTutorial.call( this, target, playerId, currentMission.id, settings );
              return false;
            }

          });

      if ( trackMissionsDefData.missions.length < pageSize ) {
        // We've loaded all the missions, unbind the infinite scroll to prevent extra requests
        cards.unbind( 'scroll.bvviz' );
      } else {
        // Request all data without infinite Scroll
        BVVIZ.helper.loadNextPage( cards, pub );
      }

      }).fail( function() {
        
        // In the case of a failure (which can happen if offset is greater than exists), unbind infinite scroll
        cards.unbind( 'scroll.bvviz' );

        // Remove the loading display
        loading.remove();
      });
  }

  // Expose the named arguments passed to current visualization
  function namedParam( argName ) {
    var args = {
      target: target, 
      playerId: playerId,
      trackId: trackId,
      options: options
    };

    return args[ argName ] ? args[ argName ] : null ;
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  pub.load = load;
  pub.namedParam = namedParam;

  // Mark this as an update-able display
  pub.playerId = playerId;
  BVVIZ.instances = BVVIZ.instances || [];
  BVVIZ.instances.push( pub );
  
  return pub;

};
})(jQuery);


;(function($) {
// Add siteStream method to the BVVIZ scope
BVVIZ.siteStream = function( target, streamId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
  
  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    activitiesCard: function( notification ) {
      // Both activities and contents stream events generate notification with the same type of 'activity'  
      var timestamp = BVVIZ.utility.validateNestedObj( notification, 'data', 'content', 'created_at' ) ? 
                      notification.data.content.created_at : 
                      BVVIZ.utility.validateNestedObj( notification, 'data', 'created_at' ) ? notification.data.created_at : new Date();
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        imageSrc.match( /^[\w\s]*$/ ) ? 
          $( '<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>' ) : 
          $( '<img class="bvviz-picture" src="' + imageSrc + '" />' ),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( timestamp )
        )
      );
    },

    rewardsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    },

    missionsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // These variables will hold a reference to the container where the notification cards will exist and it's height
  cards,
  cardsHeight,

  // Stores whether or not the feed has been initialized with notifications and a timeout for reinitialization
  initial = true,
  reinitializeTO,

  // These variables will store a queue of notifications waiting to be displayed
  queue = [],
  queueRunning = false,
  queueInterval,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the stream settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.siteStream, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-siteStream' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Set the "cards" variable to the proper container
    cards = $( '.bvviz-cards', target );

    // Request the stream definition
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams', { streams: streamId } ).ok( function( streamData ) {

      // Remove the loading display
      loading.remove();

      // Show an error if the stream definition was not found
      if ( streamData.streams.length !== 1 ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" can not be found.' );
      }

      // Show an error if the stream definition is not the correct type
      if ( streamData.streams[0].consumer !== 'site' ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" is not a "site" stream.' );
      }

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( settings.inline ) {
        $( '.bvviz-body', target ).addClass( 'bvviz-noheader' );
      } else {
        render.header( streamData.streams[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Seed the initial display and subscribe to future notifications for this stream
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams/notifications', { streams: streamId }, {
        fields: 'all'
      }).ok( showNotifications ).subscribe( showNotifications );

    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
   
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  function showNotifications( data ) {

    var childrenHeight = 0;

    // Cancel the reinitialization timeout
    window.clearTimeout( reinitializeTO );

    // Add the new notifications into the queue
    queue.push.apply( queue, data.notifications );

    // Sort the queue to put the most recent item on top
    queue.sort( function( a, b ) {
      return new Date( a.created_at ) - new Date( b.created_at );
    });

    if ( initial ) {
      // Display enough notification cards to fill the container
      cardsHeight = target.find( '.bvviz-body' ).height();
      while ( queue.length > 0 && childrenHeight <= cardsHeight ) {
        childrenHeight += drawCard( queue.shift(), true ).outerHeight();
      }
      initial = false;
    }

    startQueue();
  }

  function startQueue() {
    // Don't need to start the queue if it's already running
    if ( queueRunning ) {
      return false;
    }
    queueRunning = true;

    // Use setInterval to pull an element out of the queue
    queueInterval = window.setInterval( function() {

      // If there is nothing in the queue, clear the interval and reset the state of the queue
      if ( queue.length === 0 ) {
        window.clearInterval( queueInterval );
        queueRunning = false;

        // Set the reinitilization timeout in case new data is not found
        reinitializeTO = window.setTimeout( function() {
          
          // If we've waited the full reinitialize time, re-display the most recent data
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams/notifications', { streams: streamId }, {
            fields: 'all'
          }).ok( showNotifications );

        }, 60000 );

        // Exit out of the interval since there is nothing to do
        return false;
      }

      // Draw the most recent item
      drawCard( queue.shift() );
    }, 2500 );
  }

  function drawCard( notification, initial ) {
    var card;

    // Render the card based on it's type
    if ( render[ notification.type + 'Card' ] ) {
      card = render[ notification.type + 'Card' ]( notification );

      // Execute callback handler if it's defined
      if ( typeof settings.itemCompleteCallback === 'function' ) {
        settings.itemCompleteCallback( card );
      }

      // Switch the current row style
      currentRowStyle = ( currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd' );

    // If a renderer can't be found, don't show the notification
    } else {
      return;
    }

    // If this is not the inital rendering, hide the card so that it can be animated into view
    if ( !initial ) {
      card.hide();
    }

    // Add the card into the stream
    card.prependTo( cards );

    // Animate the card into view
    if ( !initial ) {
      card.slideDown( 1000, function() {
        var childrenHeight = 0;
        // Remove any DOM elements that are out of view
        cards.children().each( function() {
          if ( childrenHeight > cardsHeight ) {
            $( this ).remove();
          } else {
            childrenHeight += $( this ).outerHeight();
          }
        });
      });
    }

    return card;
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  return pub;
};
})(jQuery);


;(function($) {
// Add followingStream method to the BVVIZ scope
BVVIZ.followingStream = function( target, streamId, playerId, options ) {

  // Variables and methods are defined in a private scope and then exposed publicly as needed later
  var pub = {},
  
  // The functions in the "render" object control the DOM structure created for each area
  render = {

    // Main header
    header: function( name ) {
      return $( '<div class="bvviz-header"><div class="bvviz-header-text">' + name + '</div></div>' );
    },

    activitiesCard: function( notification ) {
      // Both activities and contents stream events generate notification with the same type of 'activity'  
      var timestamp = BVVIZ.utility.validateNestedObj( notification, 'data', 'content', 'created_at' ) ? 
                      notification.data.content.created_at : 
                      BVVIZ.utility.validateNestedObj( notification, 'data', 'created_at' ) ? notification.data.created_at : new Date();
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        imageSrc.match( /^[\w\s]*$/ ) ? 
          $('<span class="bvviz-picture"><span class="bvviz-sprite-icon ' + imageSrc + '"></span></span>') : 
          $( '<img class="bvviz-picture" src="' + imageSrc + '" />' ),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( timestamp )
        )
      );
    },

    rewardsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    },

    missionsCard: function( notification ) {
      var imageSrc = BVVIZ.utility.validateNestedObj( notification, 'data', 'image' ) && notification.data.image ? notification.data.image : BVVIZ.helper.imageHolderSrc();
      return $( '<div class="bvviz-card ' + currentRowStyle + '"></div>' ).append(
        $('<img class="bvviz-picture" src="' + imageSrc + '" />'),
        $('<div class="bvviz-message">' + notification.message + '</div>' ).append(
          BVVIZ.helper.timeToString( notification.data.created_at )
        )
      );
    }

  },

  // Use this variable to track what the next card style should be
  currentRowStyle = 'bvviz-odd',

  // These variables will hold a reference to the container where the notification cards will exist and it's height
  cards,
  cardsHeight,

  // Stores whether or not the feed has been initialized with notifications and a timeout for reinitialization
  initial = true,
  reinitializeTO,

  // These variables will store a queue of notifications waiting to be displayed
  queue = [],
  queueRunning = false,
  queueInterval,

  // BVVIZ Visualization object instance 
  bvvizVisual,

  // Store the stream settings
  settings;

  // Normalize the options object for backward compatible support
  // The previous options parameter is a boolean, which indicates inline or not
  options = $.isPlainObject( options ) ? options : { inline: !!options };  
  if ( options.childContentCards ) {
    options.inline = true;
  }

  // Override the default settings from options parameter
  settings = $.extend( true, {}, BVVIZ.options.siteStream, options );

  // Create a new Visualization object instance
  bvvizVisual = new BVVIZ.Visualization( settings.siteId );

  if ( !BVVIZ.Visualization.getInstanceBySiteId( bvvizVisual.siteId ) ) {
    BVVIZ.Visualization.instances.push( bvvizVisual );
  }


  function init() {
    // Create a loading display
    var loading = BVVIZ.helper.loading( 'bvviz-tr' );
    
    // Allow for target to be provided as a string or JQuery object
    target = $( target );

    // Handle error conditions due to invalid inputs:
    // Only a single DOM element is allowed per instance
    if ( target.length > 1 ) {
      return BVVIZ.helper.showError( target, '"target" argument must reference a single DOM node.' );
    }

    // Empty the target, add the base classes, and the body into the target
    target
      .empty()
      .addClass( 'bvviz bvviz-followingStream' )
      .append(
        $( '<div class="bvviz-body bvviz-col">' +
          '<div class="bvviz-cards bvviz-col"></div>' +
        '</div>' ),
        // Show an indicator in the target to indicate that something is happening
        loading
      );

    // Set the "cards" variable to the proper container
    cards = $( '.bvviz-cards', target );

    // Request the stream definition
    BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams', { streams: streamId } ).ok( function( streamData ) {

      // Remove the loading display
      loading.remove();

      // Show an error if the stream definition was not found
      if ( streamData.streams.length !== 1 ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" can not be found.' );
      }

      // Show an error if the stream definition is not the correct type
      if ( streamData.streams[0].consumer !== 'activity' ) {
        return BVVIZ.helper.showError( target, 'Stream with id of "' + streamId + '" is not an "activity" stream.' );
      }

      // If this isn't an inline display, render the main header and add it to the top of the target
      if ( settings.inline ) {
        $( '.bvviz-body', target ).addClass( 'bvviz-noheader' );
      } else {
        render.header( streamData.streams[0].name ).prependTo( target );
      }

      // Correct the height of the body
      BVVIZ.helper.fitHeight( target );

      // Seed the initial display and subscribe to future notifications for this stream
      BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams/notifications', { streams: streamId }, {
        fields: 'all',
        source: {
          map: {
            name: 'following',
            target: playerId
          }
        },
        requester: playerId
      }).ok( showNotifications ).subscribe( showNotifications );

    }).fail( function( data ) {
      // Remove the loading display
      loading.remove();
   
      // Show an error on failure
      BVVIZ.helper.showError( target, data );
    });
  }

  function showNotifications( data ) {

    var childrenHeight = 0;

    // Cancel the reinitialization timeout
    window.clearTimeout( reinitializeTO );

    // Add the new notifications into the queue
    queue.push.apply( queue, data.notifications );

    // Sort the queue to put the most recent item on top
    queue.sort( function( a, b ) {
      return new Date( a.created_at ) - new Date( b.created_at );
    });

    if ( initial ) {
      // Display enough notification cards to fill the container
      cardsHeight = target.find( '.bvviz-body' ).height();
      while ( queue.length > 0 && childrenHeight <= cardsHeight ) {
        childrenHeight += drawCard( queue.shift(), true ).outerHeight();
      }
      initial = false;
    }

    startQueue();
  }

  function startQueue() {
    // Don't need to start the queue if it's already running
    if ( queueRunning ) {
      return false;
    }
    queueRunning = true;

    // Use setInterval to pull an element out of the queue
    queueInterval = window.setInterval( function() {

      // If there is nothing in the queue, clear the interval and reset the state of the queue
      if ( queue.length === 0 ) {
        window.clearInterval( queueInterval );
        queueRunning = false;

        // Set the reinitilization timeout in case new data is not found
        reinitializeTO = window.setTimeout( function() {
          
          // If we've waited the full reinitialize time, re-display the most recent data
          BVVIZ.Visualization.getInstanceBySiteId( settings.siteId ).BVSDK( 'streams/notifications', { streams: streamId }, {
            fields: 'all',
            source: {
              map: {
                name: 'following',
                target: playerId
              }
            },
            requester: playerId
          }).ok( showNotifications );

        }, 60000 );

        // Exit out of the interval since there is nothing to do
        return false;
      }

      // Draw the most recent item
      drawCard( queue.shift() );
    }, 2500 );
  }

  function drawCard( notification, initial ) {
    var card;

    // Render the card based on it's type
    if ( render[ notification.type + 'Card' ] ) {
      card = render[ notification.type + 'Card' ]( notification );

      // Execute callback handler if it's defined
      if ( typeof settings.itemCompleteCallback === 'function' ) {
        settings.itemCompleteCallback( card );
      }

      // Switch the current row style
      currentRowStyle = ( currentRowStyle === 'bvviz-odd' ? 'bvviz-even' : 'bvviz-odd' );

    // If a renderer can't be found, don't show the notification
    } else {
      return;
    }

    // If this is not the inital rendering, hide the card so that it can be animated into view
    if ( !initial ) {
      card.hide();
    }

    // Add the card into the stream
    card.prependTo( cards );

    // Animate the card into view
    if ( !initial ) {
      card.slideDown( 1000, function() {
        var childrenHeight = 0;
        // Remove any DOM elements that are out of view
        cards.children().each( function() {
          if ( childrenHeight > cardsHeight ) {
            $( this ).remove();
          } else {
            childrenHeight += $( this ).outerHeight();
          }
        });
      });
    }

    return card;
  }

  // Initialize the visualization automatically upon passing site check
  BVVIZ.waitForSiteCheck( function( sitePass ){
    if ( sitePass ) {
      init();
    } else {
      return false;
    }
  });

  // Expose some of the methods publicly and return the pub object
  pub.init = init;
  return pub;
};
})(jQuery);
