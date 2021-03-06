/*
 * File: app/view/cliente/Window.js
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

Ext.define('App.view.cliente.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.clientewindow',

    width: 500,
    closeAction: 'hide',
    x: 36,
    y: 28,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    name: 'FindToolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            action: 'select',
                            text: 'Seleccionar'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    name: 'ClienteList',
                    autoHeight: true,
                    store: 'Cliente',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Nit',
                            text: 'Nit'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Nombre',
                            flex: 1,
                            text: 'Nombre'
                        }
                    ],
                    viewConfig: {

                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            afterPageText: 'de {0}',
                            beforePageText: 'Pag',
                            displayInfo: true,
                            displayMsg: 'Clientes del {0} al {1} de {2}',
                            emptyMsg: 'Sin Clientes para mostrar',
                            firstText: 'Primera',
                            lastText: 'Ultima',
                            nextText: 'Siguiente',
                            prevText: 'Anterior',
                            refreshText: 'Refrescar',
                            store: 'Cliente'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});