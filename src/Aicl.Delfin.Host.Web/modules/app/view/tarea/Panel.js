/*
 * File: app/view/tarea/Panel.js
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

Ext.define('App.view.tarea.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tareapanel',

    width: 950,
    autoScroll: true,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    name: 'TareaList',
                    flex: 1.2,
                    height: 500,
                    autoScroll: true,
                    store: 'RemoteTarea',
                    columns: [
                        {
                            xtype: 'booleancolumn',
                            width: 75,
                            align: 'center',
                            dataIndex: 'Cumplida',
                            text: 'Estado',
                            falseText: 'Pendiente',
                            trueText: 'Cumplida'
                        },
                        {
                            xtype: 'datecolumn',
                            width: 80,
                            align: 'center',
                            dataIndex: 'Fecha',
                            text: 'Fecha',
                            format: 'd.m.Y'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'NombreCliente',
                            text: 'Cliente'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var bgColor;
                                var color;

                                if(record.get('Cumplida')){
                                    bgColor='#FFFFFF'; //white
                                    color='#006400';   // dark green
                                }
                                else{
                                    if(Aicl.Util.isToday(record.get('Fecha'))){
                                        bgColor='#FFA500';  //orange
                                        color='#000000'; //black
                                    }
                                    else{
                                        if(Aicl.Util.isDueDate(record.get('Fecha'))){
                                            bgColor='#FF0000'; //red
                                            color='#000000';
                                        }
                                        else{
                                            bgColor='#FFFFFF'; // white 
                                            color='#000000';   // black
                                        }
                                    }
                                }
                                return Ext.String.format('<div style="white-space:normal;color:{0}; background-color:{1};">{2}</div>',
                                color,
                                bgColor,
                                value);
                            },
                            draggable: false,
                            resizable: false,
                            sortable: false,
                            dataIndex: 'Tema',
                            flex: 1,
                            hideable: false,
                            text: 'Tarea'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            afterPageText: 'de  {0}',
                            beforePageText: 'Pag',
                            displayInfo: false,
                            emptyMsg: 'Sin datos para mostrar',
                            firstText: 'Primera',
                            lastText: 'Ultima',
                            nextText: 'Siguiente',
                            prevText: 'Anterior',
                            refreshText: 'Refrescar',
                            store: 'RemoteTarea'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    name: 'TareaForm',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 80,
                        labelAlign: 'right'
                    },
                    flex: 0.8,
                    bodyPadding: 10,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            name: 'TareaToolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'new',
                                    iconCls: 'new_document'
                                },
                                {
                                    xtype: 'button',
                                    action: 'save',
                                    iconCls: 'save_document'
                                },
                                {
                                    xtype: 'button',
                                    action: 'remove',
                                    iconCls: 'remove'
                                }
                            ]
                        }
                    ],
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
                            name: 'IdCliente',
                            fieldLabel: 'Label'
                        },
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            name: 'Fecha',
                            fieldLabel: 'Fecha',
                            format: 'd.m.Y'
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            name: 'Tema',
                            fieldLabel: 'Tarea',
                            enforceMaxLength: true,
                            maxLength: 128,
                            maxLengthText: 'The maximum length for this field is {128}'
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelWidth: 80,
                                labelAlign: 'right'
                            },
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 4,
                                    name: 'NombreCliente',
                                    fieldLabel: 'Cliente'
                                },
                                {
                                    xtype: 'button',
                                    action: 'find',
                                    flex: 0,
                                    iconCls: 'find'
                                },
                                {
                                    xtype: 'button',
                                    action: 'clear',
                                    flex: 0,
                                    iconCls: 'clear'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            name: 'Cumplida',
                            fieldLabel: 'Cumplida?'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});