sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/core/syncStyleClass",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Text",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, syncStyleClass, Dialog, DialogType, Button, ButtonType, Text) {
        "use strict";

        return Controller.extend("zboletos.zboletos.controller.View1", {
            onInit: function () {

            },
            onEdit: function () {
                this.byId("editButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.byId("cancelButton").setVisible(true);
                var oTableSmart = this.byId("LineItemsSmartTable");
                oTableSmart.setEditable(true);

            },
            onSave: function () {
                var saveBtn = this.byId("saveButton");
                var cancelBtn = this.byId("cancelButton");
                var editBtn = this.byId("editButton");
                var oTableSmart = this.byId("LineItemsSmartTable");
                var oTable = oTableSmart.getTable();
                oTable.getModel().submitChanges({
                    success: function (oData, oResponse) {
                        // Success
                        oTable.getModel().refresh(true);
                        oTableSmart.setEditable(false);
                        MessageToast.show("Cambios guardados exitosamente");

                        saveBtn.setVisible(false);
                        cancelBtn.setVisible(false);
                        //multiBtn.setVisible(false);
                        editBtn.setVisible(true);

                    },
                    error: function (oError) {
                        // Error
                        MessageToast.show("Error al guardar los cambios");
                    }
                });
            },
            onCancel: function () {
                if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Descartar",
                        content: new Text({ text: "¿Desea descartar los cambios?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                                this.byId("cancelButton").setVisible(false);
                                this.byId("saveButton").setVisible(false);
                                this.byId("editButton").setVisible(true);
                                var oTableSmart = this.byId("LineItemsSmartTable");
                                var oTable = oTableSmart.getTable();
                                oTable.getModel().resetChanges();
                                oTableSmart.setEditable(false);

                                this.oApproveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancelar",
                            press: function () {
                                this.oApproveDialog.close();
                            }.bind(this)
                        })
                    });
                }

                this.oApproveDialog.open();
            },
        });
    });
