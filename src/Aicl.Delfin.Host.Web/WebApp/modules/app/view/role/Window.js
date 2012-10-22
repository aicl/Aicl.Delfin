/*
 * File: app/view/role/Window.js
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

Ext.define('App.view.role.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.rolewindow',

    frame: false,
    padding: '5 5 5 5',
    width: 664,
    autoScroll: true,
    closeAction: 'hide',
    title: 'Grupos',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        align: 'stretch',
                        padding: '5 0 5 10',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            name: 'RoleList',
                            flex: 1,
                            height: 300,
                            autoScroll: true,
                            title: '',
                            store: 'AuthRole',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    name: 'SelectRoleToolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            action: 'select',
                                            iconCls: 'select',
                                            text: 'Seleccionar'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    afterPageText: 'de {0}',
                                    beforePageText: 'Pag',
                                    displayInfo: false,
                                    displayMsg: 'Mostrando {0} - {1} de {2}',
                                    emptyMsg: 'Sin datos para mostrar',
                                    firstText: 'Primera',
                                    lastText: 'Ultima',
                                    nextText: 'Siguiente',
                                    prevText: 'Anterior',
                                    refreshText: 'Refrescar',
                                    store: 'AuthRole'
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'Name',
                                    flex: 1,
                                    text: 'Nombre'
                                }
                            ],
                            viewConfig: {

                            }
                        },
                        {
                            xtype: 'form',
                            name: 'RoleForm',
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelWidth: 80,
                                labelAlign: 'right'
                            },
                            flex: 1,
                            margins: '0 10 0 10',
                            cls: 'form-noborder',
                            ui: 'default-framed',
                            bodyPadding: 20,
                            title: '',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    name: 'RoleToolbar',
                                    dock: 'top',
                                    style: '{\n    border:0;padding:0;\n}',
                                    ui: 'default-framed',
                                    items: [
                                        {
                                            xtype: 'button',
                                            action: 'new',
                                            iconCls: 'new_document',
                                            text: '',
                                            tooltip: 'Nuevo grupo'
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'save',
                                            iconCls: 'save_document',
                                            text: '',
                                            tooltip: 'Guardar cambios'
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'remove',
                                            iconCls: 'remove',
                                            text: '',
                                            tooltip: 'borrar role'
                                        }
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    anchor: '',
                                    name: 'Id',
                                    fieldLabel: 'Label'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'Name',
                                    fieldLabel: 'Nombre'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'Directory',
                                    fieldLabel: 'Directorio'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'ShowOrder',
                                    fieldLabel: 'Orden'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name: 'Title',
                                    fieldLabel: 'Titulo'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    name: 'RolePermissionList',
                    height: 300,
                    padding: '5 8 5 10',
                    autoScroll: true,
                    title: '',
                    store: 'RolePermission',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            name: 'RolePermissionToolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'add',
                                    iconCls: 'add',
                                    text: ''
                                },
                                {
                                    xtype: 'button',
                                    action: 'delete',
                                    iconCls: 'remove',
                                    text: ''
                                }
                            ]
                        },
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            afterPageText: 'de {0}',
                            beforePageText: 'Pag',
                            displayInfo: false,
                            displayMsg: 'Mostrando {0} - {1} de {2}',
                            emptyMsg: 'Sin datos para mostrar',
                            firstText: 'Primera',
                            lastText: 'Ultima',
                            nextText: 'Siguiente',
                            prevText: 'Anterior',
                            refreshText: 'Refrescar',
                            store: 'RolePermission'
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Name',
                            flex: 1,
                            text: 'Nombre'
                        }
                    ],
                    viewConfig: {

                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});