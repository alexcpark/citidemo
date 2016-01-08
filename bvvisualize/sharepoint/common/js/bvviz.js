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
  BVVIZ.helper.showModal = function( method, args, modalArgs ) {
    var target = $( '<div></div>' );
    var data = {};

    if ( BVVIZ.inIframe ) {
      data.message = 'badgeville.html5Message';
      data.BVVIZ_action = 'showModal';
      data.method = '(' + method.toString() + ')';
      data.args = args;
      data.modalArgs = modalArgs;
      window.parent.postMessage( JSON.stringify(data), '*' );
    } else {
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
    }

  }
})(bvjQuery);
