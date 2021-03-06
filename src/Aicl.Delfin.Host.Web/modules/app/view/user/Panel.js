/*
 * File: app/view/user/Panel.js
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

Ext.define('App.view.user.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userpanel',

    border: '',
    frame: false,
    padding: '',
    style: '{\n  -moz-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px;\n  -o-border-top-left-radius: 5px;\n  -ms-border-top-left-radius: 5px;\n  -khtml-border-top-left-radius: 5px;\n  border-top-left-radius: 5px;\n  -moz-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -o-border-top-right-radius: 5px;\n  -ms-border-top-right-radius: 5px;\n  -khtml-border-top-right-radius: 5px;\n  border-top-right-radius: 5px;\n  //border: 1px solid #999;\n    border:0px ;\n}',
    ui: 'default-framed',
    width: 758,
    bodyBorder: true,
    frameHeader: false,
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    name: 'MainToolbar',
                    dock: 'top',
                    margin: 2,
                    style: 'border:0;padding:0;',
                    layout: {
                        padding: 4,
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            action: 'new',
                            iconCls: 'new_document',
                            tooltip: 'Crear nuevo usuario'
                        },
                        {
                            xtype: 'textfield',
                            width: 300,
                            name: 'FindUser',
                            fieldLabel: '',
                            hideLabel: true,
                            emptyText: 'Nombre Usuario'
                        },
                        {
                            xtype: 'button',
                            action: 'find',
                            iconCls: 'open_document',
                            tooltip: 'Buscar usuario por nombre'
                        },
                        {
                            xtype: 'button',
                            action: 'save',
                            iconCls: 'save_document',
                            tooltip: 'Guardar cambios'
                        },
                        {
                            xtype: 'button',
                            action: 'remove',
                            iconCls: 'remove',
                            tooltip: 'Borrar Usuario'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 120,
                        labelAlign: 'right'
                    },
                    name: 'UserForm',
                    cls: 'form-border',
                    frame: false,
                    margin: 10,
                    padding: 10,
                    ui: 'default-framed',
                    bodyBorder: false,
                    bodyPadding: '5 100 5 100',
                    frameHeader: false,
                    title: '',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            name: 'Id',
                            fieldLabel: 'Nit'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'UserName',
                            fieldLabel: 'Usuario',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 36,
                            maxLengthText: 'The maximum length for this field is 16'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            inputType: 'password',
                            name: 'Password',
                            fieldLabel: 'Clave',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 10,
                            minLength: 8,
                            minLengthText: 'Longitu Minima 8'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'FirstName',
                            fieldLabel: 'Nombres',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 36,
                            maxLengthText: 'The maximum length for this field is {128}'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'LastName',
                            fieldLabel: 'Apellidos',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 48
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'Cargo',
                            fieldLabel: 'Cargo',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 80,
                            maxLengthText: 'The maximum length for this field is 80'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'Email',
                            fieldLabel: 'Correo',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maxLength: 80,
                            vtype: 'email'
                        },
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            name: 'ExpiresAt',
                            fieldLabel: 'Vigente Hasta'
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            name: 'Activo',
                            fieldLabel: 'Activo',
                            hideLabel: false,
                            boxLabel: '',
                            checked: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'form-border',
                    frame: false,
                    margin: 10,
                    ui: 'default-framed',
                    autoScroll: true,
                    layout: {
                        align: 'stretch',
                        padding: '5 20 5 20',
                        type: 'hbox'
                    },
                    animCollapse: false,
                    collapsible: true,
                    title: 'Grupos',
                    items: [
                        {
                            xtype: 'gridpanel',
                            name: 'UserRoleList',
                            flex: 1,
                            height: 300,
                            margin: 5,
                            style: '{\n    border:0px;\n}',
                            ui: 'round',
                            autoScroll: true,
                            title: '',
                            sortableColumns: false,
                            store: 'UserRole',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    name: 'Name',
                                    draggable: false,
                                    resizable: false,
                                    sortable: false,
                                    dataIndex: 'Name',
                                    flex: 1,
                                    hideable: false,
                                    text: 'Nombre'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    name: 'UserRoleToolbar',
                                    dock: 'top',
                                    border: '',
                                    items: [
                                        {
                                            xtype: 'button',
                                            action: 'add',
                                            iconCls: 'add',
                                            tooltip: 'Agregar Usuario a un grupo'
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'delete',
                                            iconCls: 'remove',
                                            tooltip: 'Borrar usuario del grupo'
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
                                    store: 'UserRole'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});