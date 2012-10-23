/*
 * File: app/view/formapago/Panel.js
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

Ext.define('App.view.formapago.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.formapagopanel',

    cls: 'form-noborder',
    height: 323,
    margin: 10,
    ui: 'default-framed',
    width: 696,
    layout: {
        align: 'stretch',
        padding: 10,
        type: 'hbox'
    },
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    name: 'FormaPagoList',
                    padding: 5,
                    width: 302,
                    autoScroll: true,
                    title: '',
                    sortableColumns: false,
                    store: 'FormaPago',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 260,
                            sortable: false,
                            dataIndex: 'Descripcion',
                            flex: 1,
                            text: 'Descripcion'
                        },
                        {
                            xtype: 'booleancolumn',
                            width: 59,
                            sortable: false,
                            dataIndex: 'Activo',
                            text: 'Activo',
                            falseText: 'No',
                            trueText: 'Si'
                        }
                    ],
                    viewConfig: {

                    }
                },
                {
                    xtype: 'form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 80,
                        labelAlign: 'right'
                    },
                    name: 'FormaPagoForm',
                    flex: 1,
                    cls: 'form-border',
                    height: 226,
                    margin: 5,
                    padding: 5,
                    ui: 'default-framed',
                    width: 298,
                    bodyPadding: 20,
                    frameHeader: false,
                    title: '',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            name: 'Id',
                            fieldLabel: 'Label'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            name: 'Modo',
                            fieldLabel: 'Label'
                        },
                        {
                            xtype: 'hiddenfield',
                            anchor: '100%',
                            name: 'DiasCredito',
                            fieldLabel: 'Label'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            name: 'Descripcion',
                            fieldLabel: 'Descripcion'
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            padding: '',
                            name: 'Activo',
                            fieldLabel: 'Activo',
                            labelPad: 10,
                            boxLabel: '',
                            checked: true
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            name: 'FormaPagoToolbar',
                            dock: 'top',
                            style: '{\n    border:0px;\n}',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'new',
                                    iconCls: 'new_document',
                                    text: ''
                                },
                                {
                                    xtype: 'button',
                                    action: 'save',
                                    iconCls: 'save_document',
                                    text: ''
                                },
                                {
                                    xtype: 'button',
                                    action: 'remove',
                                    iconCls: 'remove',
                                    text: ''
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