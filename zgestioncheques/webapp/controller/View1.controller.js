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
    "sap/ui/core/message/Message",
    "sap/ui/core/library",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, syncStyleClass, Dialog, DialogType, Button, ButtonType, Text, Message, library) {
        "use strict";
        var MessageType = library.MessageType;
        return Controller.extend("zgestioncheques.zgestioncheques.controller.View1", {
            onInit: function () {
                var oMessageManager, oView;

                oView = this.getView();
                // set message model
                oMessageManager = sap.ui.getCore().getMessageManager();
                oView.setModel(oMessageManager.getMessageModel(), "message");
                // or just do it for the whole view
                oMessageManager.registerObject(oView, true);

            },
            onAfterRendering: function () {

                /*   var oTable = this.byId('LineItemsSmartTable');
                   //console.log(oTable)
                   //oTable.getTable().get .setVisible(false);
                   oTable.getTable().setEnableSelectAll(false);
                   oTable.getTable().setSelectionMode("None");
                   
                   console.log(oTable.getTable().getSelectionMode())*/
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
            //onAfterRendering: function () {
            //var oTable = this.byId("LineItemsSmartTable").getTable();
            //oTable.setFooter('Total: ')


            // },
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
                this.byId("multiEditButton").setVisible(true);
                this.byId("cancelButton").setVisible(true);
                var oTableSmart = this.byId("LineItemsSmartTable");
                oTableSmart.setEditable(true);

            },
            onSave: function (oEvent) {
                var saveBtn = this.byId("saveButton");
                var cancelBtn = this.byId("cancelButton");
                var editBtn = this.byId("editButton");
                var multiBtn = this.byId("multiEditButton")
                // var deposBtn = this.byId("depositoButton")
                // var anulBtn = this.byId("anularButton")
                //oContext.getModel().setProperty(oContext.getPath() + sKey, sValores[j]);   

                var oTableSmart = this.byId("LineItemsSmartTable");
                var oTable = oTableSmart.getTable();
                var newThis = this;

                oTable.getModel().submitChanges({
                    success: function (oData, oResponse) {
                        // Success
                        oTable.getModel().refresh(true);
                        oTableSmart.setEditable(false);
                        console.log(oResponse)
                        var errorObj1 = JSON.parse(oResponse.data.__batchResponses[0].response.body);
                        console.log(errorObj1)
                        var log = errorObj1.error.innererror.errordetails;
                        for (var i = 0; i < log.length; i++) {
                            console.log(log[i].message)
                            if (log[i].code == "/IWBEP/CX_MGW_BUSI_EXCEPTION") {

                            }
                            else {
                                switch (log[i].severity) {
                                    //case "error": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                    case "error":
                                        var oMessage = new Message({
                                            message: log[i].message,
                                            type: MessageType.Error,
                                            description: 'Error',
                                            processor: newThis.getView().getModel()

                                        });
                                        sap.ui.getCore().getMessageManager().addMessages(oMessage);
                                        break;
                                    //case "success": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.SUCCESS, "Éxito"); break;
                                    case "success":
                                        var oMessage = new Message({
                                            message: log[i].message,
                                            type: MessageType.Success,
                                            description: 'Éxito',
                                            processor: newThis.getView().getModel()

                                        });
                                        sap.ui.getCore().getMessageManager().addMessages(oMessage);
                                        break;
                                    //case "warning": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.WARNING, "Advertencia"); break;
                                    case "warning":
                                        var oMessage = new Message({
                                            message: log[i].message,
                                            type: MessageType.Warning,
                                            description: 'Advertencia',
                                            processor: newThis.getView().getModel()

                                        });
                                        sap.ui.getCore().getMessageManager().addMessages(oMessage);
                                        break;
                                    // case "info": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                    case "info":
                                        var oMessage = new Message({
                                            message: log[i].message,
                                            type: MessageType.Information,
                                            description: 'Información',
                                            processor: newThis.getView().getModel()

                                        });
                                        sap.ui.getCore().getMessageManager().addMessages(oMessage);
                                        break;
                                    default:
                                        //sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.NONE, ""); break;
                                        var oMessage = new Message({
                                            message: log[i].message,
                                            type: MessageType.Information,
                                            description: 'Información',
                                            processor: newThis.getView().getModel()

                                        });
                                        sap.ui.getCore().getMessageManager().addMessages(oMessage);
                                        break;
                                }
                                //sap.m.MessageBox.show(log[i].message, icono, log[i].message);

                            }

                        }
                        // newThis._getMessagePopover();


                        oTable.getModel().resetChanges()
                        //MessageToast.show("Cambios guardados exitosamente");

                        saveBtn.setVisible(false);
                        cancelBtn.setVisible(false);
                        multiBtn.setVisible(false);
                        editBtn.setVisible(true);
                        // deposBtn.setVisible(true);
                        // anulBtn.setVisible(true);
                    },
                    error: function (oError) {
                        // Error
                        MessageToast.show("Error al guardar los cambios");
                    }
                });

            },
            _getMessagePopover: function () {
                var oView = this.getView();
                // create popover lazily (singleton)
                if (!this._pMessagePopover) {
                    this._pMessagePopover = Fragment.load({
                        id: oView.getId(),
                        name: "zgestioncheques.zgestioncheques.view.MessagePopup",
                        type: "XML"
                    }).then(function (oMessagePopover) {
                        oView.addDependent(oMessagePopover);
                        return oMessagePopover;
                    });
                }
                return this._pMessagePopover;
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
                                this.byId("multiEditButton").setVisible(false);
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
            onOpenMultiEdit: function (oEvent) {
                var oTableSmart = this.byId("LineItemsSmartTable");
                var oTable = oTableSmart.getTable();
                var sItems = oTable.getSelectedIndices();
                console.log(sItems.length)
                if (sItems.length == 0) {
                    MessageToast.show("Seleccione al menos un ítem");
                }
                else {
                    var multiEditBtn = this.byId("multiEditButton");
                    multiEditBtn.setEnabled(false);
                    Fragment.load({
                        name: "zgestioncheques.zgestioncheques.view.MultiEditDialog",
                        controller: this,
                        type: "XML"
                    }).then(function (oFragment) {
                        this.oMultiEditDialog = oFragment;
                        this.getView().addDependent(this.oMultiEditDialog);
                        this.oMultiEditDialog.setEscapeHandler(function () { this.onCloseDialog(); }.bind(this));
                        var selectedContexts = [];

                        // this.oMultiEditDialog.getContent()[0].setContexts(selectedContexts);
                        //  console.log(selectedContexts.length)
                        syncStyleClass("sapUiSizeCompact", this.getView(), this.oMultiEditDialog);
                        this.oMultiEditDialog.open();
                    }.bind(this));
                }
            },
            onCloseDialog: function () {
                this._cerrarDialogo();
                this.byId("multiEditButton").setEnabled(true);
            },
            _cerrarDialogo: function () {
                this.oMultiEditDialog.close();
                this.oMultiEditDialog.destroy();
                this.oMultiEditDialog = null;
            },
            onDialogSaveButton: function () {
                var multiEditBtn = this.byId("multiEditButton");

                var oMultiEditContainer = this.oMultiEditDialog.getContent()[0],
                    that = this;


                if (oMultiEditContainer.getErroneousFields().length > 0) {
                    return;
                }
                var oTableSmart = this.byId("LineItemsSmartTable");
                var oTable = oTableSmart.getTable();
                var sItems = oTable.getSelectedIndices();
                oMultiEditContainer.getAllUpdatedContexts(true).then(function (result) {

                    MessageToast.show("Actualizando...", {
                        onClose: function () {
                            //  aUpdatedContexts = result;
                            this._getFields().filter(function (oField) {
                                return !oField.isKeepExistingSelected();
                            }).forEach(function (oField) {
                                var valor = oField.getValue();
                                var selectedContexts = [];

                                for (var i = 0; i < sItems.length; i++) {
                                    var indice = sItems[i];
                                    var oContent = oTable.getContextByIndex(indice);
                                    selectedContexts.push(oContent);
                                    oContent.getModel().setProperty(oContent.getPath() + '/cme_destino', valor);

                                }
                                MessageToast.show("Cambios realizados...")
                                // console.log(selectedContexts)

                            });


                            /*  if (Object.keys(oUpdatedDataCopy).length > 0) {
                                  MessageToast.show("Datos actualizados");
                                  multiEditBtn.setEnabled(true);
                              //}
                              //else {
                                  MessageToast.show("No se han hecho cambios");
                                  multiEditBtn.setEnabled(true);
                              //}*/
                            that.onCloseDialog();
                            multiEditBtn.setEnabled(true);

                        }.bind(this)
                    });
                }.bind(oMultiEditContainer));
                this.oMultiEditDialog.close();

            },
            onMessagePopoverPress: function (oEvent) {
                var oSourceControl = oEvent.getSource();
                this._getMessagePopover().then(function (oMessagePopover) {
                    oMessagePopover.openBy(oSourceControl);
                });

            },
            onClearMessagePress: function () {
                sap.ui.getCore().getMessageManager().removeAllMessages();
            },
            onNavigation: function(oEvent) {
                sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then( function (oService) {
    
                    var sHref = oService.hrefForExternal({
                        target : {
                            semanticObject : "zgcdepositos",
                            action : "manage" }
                        
                    }) || "";
                    oService.toExternal({
                        target: {
                            shellHash: sHref
                        }
                    });         
               
                    // do something with sHref
                 });
    
            }
        });
    });
