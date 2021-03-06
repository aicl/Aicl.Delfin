/*
 * File: app/view/reportCP/Window.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('App.view.reportCP.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportcpwindow',

    height: 600,
    width: 950,
    overflowY: 'auto',
    closeAction: 'hide',
    title: 'Procedimientos Ofertados',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    id: 'report-cp'
                }
            ]
        });

        me.callParent(arguments);
    }

});