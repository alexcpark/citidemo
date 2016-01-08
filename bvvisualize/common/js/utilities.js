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
  BVVIZ.SDKkit = function( siteId ) {
    this.siteId = siteId || BVVIZ.currentSite;

    if ( !BVVIZ.SDKkit.getInstanceBySiteId( this.siteId ) ) {
      BVVIZ.SDKkit.instances.push( this );
    }
  };

  // Create prototype functions for all visualizations
  BVVIZ.SDKkit.prototype.BVSDK = function( path, ids, options ){

    if ( this.siteId !== BVVIZ.currentSite ) {
      path = 'sites/' + path;
      ids = ids || {};
      ids.sites = this.siteId;
    }

    return BVSDK( path, ids, options );      
  }

  // Store the instances of Visualizations
  BVVIZ.SDKkit.instances = [];

  // Method to get Visualization instance
  BVVIZ.SDKkit.getInstanceBySiteId = function( siteId ) {
    siteId = siteId ? siteId : BVVIZ.currentSite;

    for ( var i = 0; i < BVVIZ.SDKkit.instances.length; i++ ) {
      if ( BVVIZ.SDKkit.instances[i].siteId = siteId ) {
        return BVVIZ.SDKkit.instances[i];
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

})(bvjQuery);

