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

        return Controller.extend("zgestioncheques.zgestioncheques.controller.View1", {
            onInit: function () {

            },
           /* onDeposito: function (oEvent) {
                console.log("Probando")
                // var supplier = oEvent.getSource().getBindingContext().getProperty("Product/SupplierID"); // read SupplierID from OData path Product/SupplierID
                var oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation");  // get a handle on the global XAppNav service
                var hrefForProductDisplay = oCrossAppNav.hrefForExternal({
                    target : { semanticObject : "zgcdepositos", action : "manage" },
                    //params : { ProductID : [ "102343333" ] }
                  }); 
                 
                
               
            },*/
            onAfterRendering: function () {
                //var oTable = this.byId("LineItemsSmartTable").getTable();
                //oTable.setFooter('Total: ')


            },
            /*         onCambiarStatus:function(){
                         var oTableSmart = this.byId("LineItemsSmartTable");
                         var Model = oTableSmart.getModel();
                         console.log(oTableSmart.getModel());
                         Model.callFunction("/Status", {
                             method: "PUT",
                             urlParameters:
                             {
                                 
                                 "bukrs":"1000",
                                 "belnr":"0100000850",
                                 "gjahr":"2021",
                                 "xref1":"1193262",
                                 "xref3":"G-987694437",
                                 "umskz":"H",
                                 "bschl":"19"
                             }
                         
                             ,
                             success: function(oData){
                                 MessageToast.show("Cambios guardados exitosamente");
                             },
                             error: function(oError) {
                                 MessageToast.show("Error");
                             }
                          });
         
                     },*/


            onEdit: function () {
                this.byId("editButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                //this.byId("depositoButton").setVisible(false);
                //this.byId("anularButton").setVisible(false);
                //this.byId("multiEditButton").setVisible(true);
                this.byId("cancelButton").setVisible(true);
                var oTableSmart = this.byId("LineItemsSmartTable");
                oTableSmart.setEditable(true);

            },
            onSave: function () {
                var saveBtn = this.byId("saveButton");
                var cancelBtn = this.byId("cancelButton");
                var editBtn = this.byId("editButton");


                //oContext.getModel().setProperty(oContext.getPath() + sKey, sValores[j]);   

                var oTableSmart = this.byId("LineItemsSmartTable");
                var oTable = oTableSmart.getTable();
                oTable.getModel().submitChanges({
                    success: function (oData, oResponse) {
                        // Success
                        oTable.getModel().refresh(true);
                        oTableSmart.setEditable(false);
                        //console.log(oResponse)
                        var errorObj1 = JSON.parse(oResponse.data.__batchResponses[0].response.body);
                        //console.log(errorObj1)
                        var log = errorObj1.error.innererror.errordetails;
                        for (var i = 0; i < log.length; i++) {
                            console.log(log[i].message)
                            /*  var oMessage = new Message({
                                  message: log[i].message,
                                  type: MessageType.Success,
                                  target: "",
                                  processor: this.getView().getModel()
                              });
                              sap.ui.getCore().getMessageManager().addMessages(oMessage); */

                            //
                            switch (log[i].severity) {
                                case "error": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                case "success": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.SUCCESS, "Éxito"); break;
                                case "warning": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.WARNING, "Advertencia"); break;
                                case "info": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                default:
                                    sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.NONE, ""); break;
                            }
                            //sap.m.MessageBox.show(log[i].message, icono, log[i].message);

                        }

                        oTable.getModel().resetChanges()
                        //MessageToast.show("Cambios guardados exitosamente");

                        saveBtn.setVisible(false);
                        cancelBtn.setVisible(false);
                        //multiBtn.setVisible(false);
                        editBtn.setVisible(true);
                        this.byId("depositoButton").setVisible(true);
                        this.byId("anularButton").setVisible(true);
                    },
                    error: function (oError) {
                        // Error
                        MessageToast.show("Error al guardar los cambios");
                    }
                });
            },
            /*onDeposito: function () {
                  var oTableSmart = this.byId("LineItemsSmartTable");
                  var oTable = oTableSmart.getTable();
                  var sItems = oTable.getSelectedIndices();
                  if (sItems.length == 0) {
                      MessageToast.show("Seleccione al menos un ítem");
                  }
                  else {
                      var selectedContexts = [];
                      console.log(sItems)
                      for (var i = 0; i < sItems.length; i++) {
                          var indice = sItems[i];
                          var oContext = oTable.getContextByIndex(indice);
                          oContext.getModel().setProperty(oContext.getPath() + '/accion', '1');
                          console.log(oContext.getPath());
                      }
                      oTable.getModel().submitChanges({
                          success: function (oData, oResponse) {
                              // Success
                              oTable.getModel().refresh(true);
  
                              MessageToast.show("Cambios guardados exitosamente");
                          },
                          error: function (oError) {
                              // Error
                              MessageToast.show("Error al guardar los cambios");
                          }
                      });
                  }
            },*/
            onAnular: function () {
                /*  var oTableSmart = this.byId("LineItemsSmartTable");
                  var oTable = oTableSmart.getTable();
                  var sItems = oTable.getSelectedIndices();
                  if (sItems.length == 0) {
                      MessageToast.show("Seleccione al menos un ítem");
                  }
                  else {
                      var selectedContexts = [];
                      console.log(sItems)
                      for (var i = 0; i < sItems.length; i++) {
                          var indice = sItems[i];
                          var oContext = oTable.getContextByIndex(indice);
                          oContext.getModel().setProperty(oContext.getPath() + '/accion', '2');
                          console.log(oContext.getPath());
                      }
                      oTable.getModel().submitChanges({
                          success: function (oData, oResponse) {
                              // Success
                              oTable.getModel().refresh(true);
  
                              MessageToast.show("Cambios guardados exitosamente");
                          },
                          error: function (oError) {
                              // Error
                              MessageToast.show("Error al guardar los cambios");
                          }
                      });
                  }*/
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
                                // this.byId("depositoButton").setVisible(true);
                                //this.byId("anularButton").setVisible(true);

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
