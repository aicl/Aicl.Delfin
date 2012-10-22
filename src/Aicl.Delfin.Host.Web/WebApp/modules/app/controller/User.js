/*
 * File: app/controller/User.js
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

Ext.define('App.controller.User', {
    extend: 'Ext.app.Controller',

    stores: [
        'User',
        'UserRole',
        'AuthRole',
        'AuthPermission',
        'RolePermission'
    ],
    views: [
        'user.Panel',
        'user.Window',
        'role.Window',
        'permission.Window'
    ],

    refs: [
        {
            ref: 'findUserText',
            selector: 'toolbar[name=MainToolbar] textfield[name=FindUser]'
        },
        {
            ref: 'userForm',
            selector: 'form[name=UserForm]'
        },
        {
            ref: 'roleForm',
            selector: 'form[name=RoleForm]'
        },
        {
            ref: 'userList',
            selector: 'gridpanel[name=UserList]'
        },
        {
            ref: 'roleList',
            selector: 'gridpanel[name=RoleList]'
        },
        {
            ref: 'userSelectButton',
            selector: 'toolbar[name=SelectUserToolbar] button[action=select]'
        },
        {
            ref: 'userRoleList',
            selector: 'gridpanel[name=UserRoleList]'
        },
        {
            ref: 'userRoleDeleteButton',
            selector: 'toolbar[name=UserRoleToolbar] button[action=delete]'
        },
        {
            ref: 'roleSelectButton',
            selector: 'toolbar[name=SelectRoleToolbar] button[action=select]'
        },
        {
            ref: 'rolePermissionList',
            selector: 'gridpanel[name=RolePermissionList]'
        },
        {
            ref: 'rolePermissionDeleteButton',
            selector: 'toolbar[name=RolePermissionToolbar] button[action=delete]'
        },
        {
            ref: 'permissionList',
            selector: 'gridpanel[name=PermissionList]'
        },
        {
            ref: 'permissionForm',
            selector: 'form[name=PermissionForm]'
        },
        {
            ref: 'permissionSelectButton',
            selector: 'toolbar[name=SelectPermissionToolbar] button[action=select]'
        }
    ],

    onRoleListSelectionChange: function(tablepanel, selections, options) {
        if (selections.length){
            this.roleLoadRecord(selections[0]);
            this.roleLoadPermissions(selections[0]);
            this.getRoleSelectButton().setDisabled(false);
        }
        else{
            this.getRoleForm().getForm().reset();
            this.getRoleSelectButton().setDisabled(true);
            this.getRolePermissionStore().removeAll();
        }
    },

    onNewUserClick: function(button, e, options) {
        this.getUserForm().getForm().reset();
        this.getUserRoleStore().removeAll();
    },

    onUserListSelectionChange: function(tablepanel, selections, options) {
        this.getUserSelectButton().setDisabled(selections.length?false:true);
    },

    onRemoveUserClick: function(button, e, options) {
        var grid = this.getUserList();
        var record = grid.getSelectionModel().getSelection()[0];
        this.getUserStore().remove(record);
    },

    onFindUserClick: function(button, e, options) {
        var searchText= this.getFindUserText().getValue();

        var request={
            UserName:searchText,
            format:'json'
        };

        var store=this.getUserStore();
        store.getProxy().extraParams=request;
        store.loadPage(1);
    },

    onSaveUserClick: function(button, e, options) {
        var record = this.getUserForm().getForm().getFieldValues(false);
        this.getUserStore().getProxy().extraParams={format:'json'};
        this.getUserStore().save(record);
    },

    onNewRoleClick: function(button, e, options) {
        this.getRoleList().getSelectionModel().deselectAll();
    },

    onSaveRoleClick: function(button, e, options) {
        var record=this.getRoleForm().getForm().getFieldValues(false);
        this.getAuthRoleStore().getProxy().extraParams={format:'json'};
        this.getAuthRoleStore().save(record);
    },

    onSelectUserClick: function(button, e, options) {
        this.selectUserWindow.hide();
        var record= this.getUserList().getSelectionModel().getSelection()[0];
        this.userLoadRoles(record);
        this.userLoadRecord(record);
    },

    onRemoveRoleClick: function(button, e, options) {
        var grid = this.getRoleList();
        var record = grid.getSelectionModel().getSelection()[0];
        this.getAuthRoleStore().remove(record);
    },

    onAddUserRoleButtonClick: function(button, e, options) {
        this.roleWindow.show();
    },

    onDeleteUserRoleClick: function(button, e, options) {
        var grid = this.getUserRoleList();
        var record = grid.getSelectionModel().getSelection()[0];
        this.getUserRoleStore().remove(record);
    },

    onUserRoleSelectionChange: function(tablepanel, selections, options) {
        this.getUserRoleDeleteButton().setDisabled(selections.length?false:true);
    },

    onSelectRoleButtonClick: function(button, e, options) {
        var role= this.getRoleList().getSelectionModel().getSelection()[0];
        var userId = this.getUserForm().getForm().findField('Id').getValue();
        var store = this.getUserRoleStore();
        store.getProxy().extraParams={format:'json'};
        store.save({UserId:userId, AuthRoleId:role.getId() });
    },

    onRolePermissionDeleteButtonClick: function(button, e, options) {
        var grid = this.getRolePermissionList();
        var record = grid.getSelectionModel().getSelection()[0];
        this.getRolePermissionStore().remove(record);
    },

    onRolePermissionAddButtonClick: function(button, e, options) {
        this.permissionWindow.show();
    },

    onRolePermissionListSelectionChange: function(tablepanel, selections, options) {
        this.getRolePermissionDeleteButton().setDisabled(selections.length?false:true);
    },

    onSelectPermissionButtonClick: function(button, e, options) {
        var permission= this.getPermissionList().getSelectionModel().getSelection()[0];
        var roleId = this.getRoleForm().getForm().findField('Id').getValue();
        var store = this.getRolePermissionStore();
        store.getProxy().extraParams={format:'json'};
        store.save({AuthPermissionId:permission.getId(), AuthRoleId:roleId });
    },

    onNewPermissionButtonClick: function(button, e, options) {
        this.getPermissionList().getSelectionModel().deselectAll();
    },

    onSavePermissionButtonClick: function(button, e, options) {
        var record=this.getPermissionForm().getForm().getFieldValues(false);
        this.getAuthPermissionStore().getProxy().extraParams={format:'json'};
        this.getAuthPermissionStore().save(record);
    },

    onRemovePermissionButtonClick: function(button, e, options) {
        var grid = this.getPermissionList();
        var record = grid.getSelectionModel().getSelection()[0];
        this.getAuthPermissionStore().remove(record);
    },

    onPermissionListSelectionChange: function(tablepanel, selections, options) {
        if (selections.length){
            this.permissionLoadRecord(selections[0]);
            this.getPermissionSelectButton().setDisabled(false);
        }
        else{
            this.getPermissionForm().getForm().reset();
            this.getPermissionSelectButton().setDisabled(true);
        }
    },

    init: function(application) {
        this.selectUserWindow= new App.view.user.Window();
        this.roleWindow= new App.view.role.Window();
        this.permissionWindow= new App.view.permission.Window();


        this.control({
            "gridpanel[name=RoleList]": {
                selectionchange: this.onRoleListSelectionChange
            },
            "toolbar[name=MainToolbar] button[action=new]": {
                click: this.onNewUserClick
            },
            "gridpanel[name=UserList]": {
                selectionchange: this.onUserListSelectionChange
            },
            "toolbar[name=MainToolbar] button[action=remove]": {
                click: this.onRemoveUserClick
            },
            "toolbar[name=MainToolbar] button[action=find]": {
                click: this.onFindUserClick
            },
            "toolbar[name=MainToolbar] button[action=save]": {
                click: this.onSaveUserClick
            },
            "toolbar[name=RoleToolbar] button[action=new]": {
                click: this.onNewRoleClick
            },
            "toolbar[name=RoleToolbar] button[action=save]": {
                click: this.onSaveRoleClick
            },
            "toolbar[name=SelectUserToolbar] button[action=select]": {
                click: this.onSelectUserClick
            },
            "toolbar[name=RoleToolbar] button[action=remove]": {
                click: this.onRemoveRoleClick
            },
            "toolbar[name=UserRoleToolbar] button[action=add]": {
                click: this.onAddUserRoleButtonClick
            },
            "toolbar[name=UserRoleToolbar] button[action=delete]": {
                click: this.onDeleteUserRoleClick
            },
            "gridpanel[name=UserRoleList]": {
                selectionchange: this.onUserRoleSelectionChange
            },
            "toolbar[name=SelectRoleToolbar] button[action=select]": {
                click: this.onSelectRoleButtonClick
            },
            "toolbar[name=RolePermissionToolbar] button[action=delete]": {
                click: this.onRolePermissionDeleteButtonClick
            },
            "toolbar[name=RolePermissionToolbar] button[action=add]": {
                click: this.onRolePermissionAddButtonClick
            },
            "gridpanel[name=RolePermissionList]": {
                selectionchange: this.onRolePermissionListSelectionChange
            },
            "toolbar[name=SelectPermissionToolbar] button[action=select]": {
                click: this.onSelectPermissionButtonClick
            },
            "toolbar[name=PermissionToolbar] button[action=new]": {
                click: this.onNewPermissionButtonClick
            },
            "toolbar[name=PermissionToolbar] button[action=save]": {
                click: this.onSavePermissionButtonClick
            },
            "toolbar[name=PermissionToolbar] button[action=remove]": {
                click: this.onRemovePermissionButtonClick
            },
            "gridpanel[name=PermissionList]": {
                selectionchange: this.onPermissionListSelectionChange
            }
        });
    },

    onLaunch: function() {
        var me = this;

        Ext.create('Ext.LoadMask', me.getUserForm(), {
            msg: "Leyendo usuarios...",
            store: me.getUserStore()
        });

        Ext.create('Ext.LoadMask', me.getUserRoleList(), {
            msg: "Leyendo grupos del usuario...",
            store: me.getUserRoleStore()
        });


        Ext.create('Ext.LoadMask', me.getRolePermissionList(), {
            msg: "Leyendo permisos del grupo...",
            store: me.getRolePermissionStore()
        });


        this.getAuthRoleStore().getProxy().extraParams={format:'json'};
        this.getAuthRoleStore().loadPage(1);

        this.getAuthPermissionStore().getProxy().extraParams={format:'json'};
        this.getAuthPermissionStore().loadPage(1);

        this.getUserStore().on('load', function(store , records, success, eOpts){
            if(!success){
                Ext.Msg.alert('Error', 'Error al cargar Usuarios. Intente mas tarde');
                return;
            }
            if(records.length===0){
                Aicl.Util.msg('Aviso', 'Sin informacion');
                return;
            }
            if(records.length==1){
                var record = records[0];
                this.userLoadRoles(record);
                this.userLoadRecord(record);
                return;
            }
            this.selectUserWindow.show();
        }, this);

        this.getUserStore().on('write', function(store, operation, eOpts ){
            var record =  operation.getRecords()[0];
            if (operation.action != 'destroy'){
                this.getUserList().getSelectionModel().select(record,true,true);
                this.userLoadRecord(record);
            }
            else{
                this.getUserForm().getForm().reset();
            }
        }, this);


        this.getAuthRoleStore().on('write', function(store, operation, eOpts ){
            var record =  operation.getRecords()[0];
            if (operation.action != 'destroy'){
                this.getRoleList().getSelectionModel().select(record,true,true);
                this.roleLoadRecord(record);
                this.getRoleSelectButton().setDisabled(false);
            }
            else{
                this.getRoleForm().getForm().reset();
            }       
        }, this);

        this.getAuthPermissionStore().on('write', function(store, operation, eOpts ){
            var record =  operation.getRecords()[0];
            if (operation.action != 'destroy'){
                this.getPermissionList().getSelectionModel().select(record,true,true);
                this.permissionLoadRecord(record);
                this.getPermissionSelectButton().setDisabled(false);
            }
            else{
                this.getPermissionForm().getForm().reset();
            }       
        }, this);


        this.getUserRoleDeleteButton().setDisabled(true);
        this.getRolePermissionDeleteButton().setDisabled(true);
    },

    roleLoadRecord: function(record) {
        this.getRoleForm().getForm().loadRecord(record);
    },

    userLoadRecord: function(record) {
        this.getUserForm().getForm().loadRecord(record);
    },

    userLoadRoles: function(record) {
        this.getUserRoleStore().load({params:{UserId: record.getId()}});

    },

    roleLoadPermissions: function(record) {
        this.getRolePermissionStore().load({params:{AuthRoleId: record.getId()}});
    },

    permissionLoadRecord: function(record) {
        this.getPermissionForm().getForm().loadRecord(record);

    }

});