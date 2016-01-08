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
    
	BVVIZ.sp2013.visualization = {
	    init: function () {
	        var missionInput = bvjQuery('[id*="_missionId_EDITOR"]')[0];
	        var streamInput = bvjQuery('[id*="_streamId_EDITOR"]')[0];
	        var leaderboardInput = bvjQuery('[id*="LeaderboardId_EDITOR"]');
	        var trackInput = bvjQuery('[id*="_trackId_EDITOR"]');

	        if (missionInput) {
	            BVVIZ.sp2013.visualization.populateMissionProgress(missionInput);
	        }
	        if (streamInput) {
	            BVVIZ.sp2013.visualization.populateStreamList(streamInput);
	        }
	        if (leaderboardInput.length > 0) {
	            BVVIZ.sp2013.visualization.populateLeaderboardList(leaderboardInput);
	        }
	        if (trackInput.length > 0) {
	            BVVIZ.sp2013.visualization.populateTrackList(trackInput);
	        }
	    },
	    populateMissionProgress: function (input) {
	        BVSDK('missions', null, { limit: 10 }).ok(function (data) {
	            if (data.missions.length == 10) {
	                BVSDK('missions', null, { limit: 10, offset: 10 }).ok(function (data2) {
	                    var mergedData = data.missions.concat( data2.missions);
	                    BVVIZ.sp2013.visualization.bindMissionList(mergedData, input);
	                });
	            }
	            else {
	                BVVIZ.sp2013.visualization.bindMissionList(data.missions, input);
	            }
	        }).fail(function (data) {
	            console.log(data);
	        });
	    },
	    bindMissionList: function (data, input) {
	        var parentContainer = bvjQuery(input).parent();
	        var currentMission = input.value;
	        var ddl = bvjQuery('<select></select>').attr('id', 'missionddl').attr('name', 'missionddl').attr('refId', input.id);
	        bvjQuery.each(data, function () {
	            ddl.append(bvjQuery("<option></option>").val(this.id).html(this.name));
	        });

	        bvjQuery(parentContainer).on('change', 'select', function (event) {
	            var ddl = bvjQuery(this);
	            bvjQuery('#' + ddl.attr('refId')).val(ddl.val());
	        });

	        if (currentMission && currentMission != "") {
	            ddl.val(currentMission);
	        }
	        else {
	            if (data.length > 0) {
	                bvjQuery(input).val(data[0].id);
	            }
	        }
	        bvjQuery(input).hide();
	        bvjQuery(parentContainer).append(ddl);
	    },
	    populateLeaderboardList: function (input) {
	        BVSDK('leaderboards', null, { limit: 10 }).ok(function (data) {
	            if (data.leaderboards.length == 10) {
	                BVSDK('leaderboards', null, { limit: 10, offset: 10 }).ok(function (data2) {
	                    var mergedData = data.leaderboards.concat(data2.leaderboards);
	                    BVVIZ.sp2013.visualization.bindLeaderboardList(mergedData, input);
	                });
	            }
	            else {
	                BVVIZ.sp2013.visualization.bindLeaderboardList(data.leaderboards, input);
	            }
	        }).fail(function (data) {
	            console.log(data);
	        });
	    },
	    bindLeaderboardList: function (data, input) {
	        var count = 1;
	        input.each(function () {
	            var parentContainer = bvjQuery(this).parent();
	            var currentLeaderboard = this.value;
	            var ddl = bvjQuery('<select></select>').attr('id', 'leaderboard' + count + 'ddl').attr('name', 'leaderboard' + count + 'ddl').attr('refId', this.id);
	            ddl.append(bvjQuery("<option></option>").val("").html(""));
	            bvjQuery.each(data, function () {
	                ddl.append(bvjQuery("<option></option>").val(this.id).html(this.name));
	            });

	            bvjQuery(parentContainer).on('change', 'select', function (event) {
	                var ddl = bvjQuery(this);
	                bvjQuery('#' + ddl.attr('refId')).val(ddl.val());
	            });

	            if (currentLeaderboard && currentLeaderboard != "") {
	                ddl.val(currentLeaderboard);
	            }
	            else {
	                if (data.length > 0) {
	                    bvjQuery(this).val(data[0].id);
	                }
	            }
	            bvjQuery(this).hide();
	            bvjQuery(parentContainer).append(ddl);
	            count++;
	        });
	    },
	    populateStreamList: function (input) {
	        BVSDK('streams', null, { limit: 10}).ok(function (data) {
	            if (data.streams.length == 10) {
	                BVSDK('streams', null, { limit: 10, offset: 10 }).ok(function (data2) {
	                    var mergedData = data.streams.concat(data2.streams);
	                    BVVIZ.sp2013.visualization.bindStreamList(mergedData, input);
	                });
	            }
	            else {
	                BVVIZ.sp2013.visualization.bindStreamList(data.streams, input);
	            }
	        }).fail(function (data) {
	            console.log(data);
	        });
	    },
	    bindStreamList: function (data, input) {
	        var parentContainer = bvjQuery(input).parent();
	        var currentStream = input.value;
	        var ddl = bvjQuery('<select></select>').attr('id', 'streamddl').attr('name', 'streamddl').attr('refId', input.id);
	        bvjQuery.each(data, function () {
	            //if (this.consumer == 'site') {
	            ddl.append(bvjQuery("<option></option>").val(this.id).html(this.name));
	            //}
	        });

	        bvjQuery(parentContainer).on('change', 'select', function (event) {
	            var ddl = bvjQuery(this);
	            bvjQuery('#' + ddl.attr('refId')).val(ddl.val());
	        });

	        if (currentStream && currentStream != "") {
	            ddl.val(currentStream);
	        }
	        else {
	            if (data.length > 0) {
	                bvjQuery(input).val(data[0].id);
	            }
	        }
	        bvjQuery(input).hide();
	        bvjQuery(parentContainer).append(ddl);
	    },
	    populateTrackList: function (input) {
	        BVSDK('tracks', null, { limit: 10}).ok(function (data) {
	            if (data.tracks.length == 10) {
	                BVSDK('tracks', null, { limit: 10, offset: 10 }).ok(function (data2) {
	                    var mergedData = data.tracks.concat(data2.tracks);
	                    BVVIZ.sp2013.visualization.bindTrackList(mergedData, input);
	                });
	            }
	            else {
	                BVVIZ.sp2013.visualization.bindTrackList(data.tracks, input);
	            }
	        }).fail(function (data) {
	            console.log(data);
	        });
	    },
	    bindTrackList: function (data, input) {
	        var parentContainer = bvjQuery(input).parent();
	        var currentTrack = input.value;
	        var ddl = bvjQuery('<select></select>').attr('id', 'trackddl').attr('name', 'trackddl').attr('refId', input.id);
	        bvjQuery.each(data, function () {
	            ddl.append(bvjQuery("<option></option>").val(this.id).html(this.name));
	        });

	        bvjQuery(parentContainer).on('change', 'select', function (event) {
	            var ddl = bvjQuery(this);
	            bvjQuery('#' + ddl.attr('refId')).val(ddl.val());
	        });

	        if (currentTrack && currentTrack != "") {
	            ddl.val(currentTrack);
	        }
	        else {
	            if (data.length > 0) {
	                bvjQuery(input).val(data[0].id);
	            }
	        }
	        bvjQuery(input).hide();
	        bvjQuery(parentContainer).append(ddl);
	    },
	    dropdownChanged: function (ddl) {
	        bvjQuery(ddl.attr('refId')).val(ddl.val());
	    }
	};
})(bvjQuery);
