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

var bvjQuery =  bvjQuery || jQuery || {};

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

      // The title displayed in the header, default reward name is displayed
      headerTitle: '',

      // The number of rewards that will be requested in a single API call, default is 10
      pageSize: 10,

      // The max number of rewards that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 30
    },

    missionProgress: {
      // Whether the header should be rendered
      inline: false,

      // The number of items that will be requested in a single API call, default is 10
      pageSize: 10,

      // The max number of missions that can be requested in a single API restricted by the server. DO NOT CHANGE!!!
      maxPageSize: 10
    },

    missionTutorial: {
      // Whether the header should be rendered
      inline: false,

      // The title displayed in the header, default the mission/track name is displayed
      headerTitle: '',

      // The number of items that will be requested in a single API call, default is 10
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

      // The title displayed in the header, default the track name is displayed
      headerTitle: '',

      // The number of items that will be requested in a single API call, default is 10
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
})(bvjQuery);


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

