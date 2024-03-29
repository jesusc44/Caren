sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/ui/core/syncStyleClass",
    "sap/m/MessageToast",
    "sap/ui/core/message/Message",
    "sap/ui/core/library",
],
    function (Fragment, syncStyleClass, MessageToast, Message, library) {
        "use strict";
        var MessageType = library.MessageType;
        var toolbarId = "zgcdepositos.zgcdepositos::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCDS_GC_DEPO_ODATA--template::ListReport::TableToolbar"
        return {

            onInit: function (params) {
                var oMessageManager, oView;

                oView = this.getView();
                // set message model
                oMessageManager = sap.ui.getCore().getMessageManager();
                oView.setModel(oMessageManager.getMessageModel(), "message");
                // or just do it for the whole view
                oMessageManager.registerObject(oView, true);
            },
            onAfterRendering: function () {
                var that = this;
                var customBtn = new sap.m.Button({
                    press: function (oEvent) {
                        var oSourceControl = oEvent.getSource();
                        that._getMessagePopover().then(function (oMessagePopover) {
                            oMessagePopover.openBy(oSourceControl);
                        });
                    },
                    icon: 'sap-icon://alert',
                    type: sap.m.ButtonType.Emphasized,
                    text: "{= ${message>/}.length }",
                    visible: "{= ${message>/}.length > 0 }",
                    tooltip:"Mostrar Mensaje"
                });
                var customClearBtn = new sap.m.Button({
                    press: function () {
                        sap.ui.getCore().getMessageManager().removeAllMessages();
                    },
                    icon: 'sap-icon://delete',
                    type: sap.m.ButtonType.Emphasized,
                    visible: "{= ${message>/}.length > 0 }",
                    tooltip:"Borrar Mensaje"
                });
                this.byId(toolbarId).insertContent(customBtn, 4);
                this.byId(toolbarId).insertContent(customClearBtn, 5);
            },
            onDepositos: function (oEvent) {
                Fragment.load({
                    name: "zgcdepositos.zgcdepositos.ext.fragment.popup",
                    controller: this,
                    type: "XML"
                }).then(function (oFragment) {
                    this.oPopup = oFragment;
                    this.getView().addDependent(this.oPopup);
                    this.oPopup.setEscapeHandler(function () { this.onCloseDialog(); }.bind(this));


                    //this.oMultiEditDialog.getContent()[0].setContexts(selectedContexts);
                    syncStyleClass("sapUiSizeCompact", this.getView(), this.oPopup);
                    this.oPopup.open();
                }.bind(this));
            },
            onAnular: function (oEvent) {
                var oTable = this.byId("zgcdepositos.zgcdepositos::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCDS_GC_DEPO_ODATA--GridTable");
                var sItems = []
                var sItems = oTable.getPlugins()[0].getSelectedIndices();
                var mostrarMensajeButton = this.byId("mostrarMensaje");
                console.log(sItems)
                var newThis = this;
                for (var i = 0; i < sItems.length; i++) {
                    var indice = sItems[i];
                    var oContext = oTable.getContextByIndex(indice);
                    oContext.getModel().setProperty(oContext.getPath() + '/accion', '2');
                    console.log(oContext.getPath());
                }
                oTable.getContextByIndex(0).getModel().submitChanges({
                    success: function (oData, oResponse) {
                        // Success
                        oTable.getModel().refresh(true);
                        //console.log(oResponse)
                        //console.log(oData)
                        var errorObj1 = JSON.parse(oResponse.data.__batchResponses[0].response.body);
                        console.log(errorObj1)
                        var log = errorObj1.error.innererror.errordetails;
                        for (var i = 0; i < log.length; i++) {
                            console.log(log[i].message)
                            if (log[i].code == "/IWBEP/CX_MGW_BUSI_EXCEPTION") {

                            }
                            /*  var oMessage = new Message({
                                  message: log[i].message,
                                  type: MessageType.Success,
                                  target: "",
                                  processor: this.getView().getModel()
                              });
                              sap.ui.getCore().getMessageManager().addMessages(oMessage); */

                            //
                            //
                            else {
                                switch (log[i].severity) {
                                    //case "error": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                    //case "success": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.SUCCESS, "Éxito"); break;
                                    //case "warning": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.WARNING, "Advertencia"); break;
                                    //case "info": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                    //default:sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.NONE, ""); break;
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

                        oTable.getModel().resetChanges();

                       // mostrarMensajeButton.firePress();

                        //sap.
                        //console.log(errorObj1);
                        //MessageToast.show("Documento Anulados");

                    },
                    error: function (oError) {
                        // Error
                        MessageToast.show("Error al anular los documentos");
                    }
                });
            },
            handleValueHelp: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue();

                this.inputId = oEvent.getSource().getId();
                // create value help dialog
                if (!this._valueHelpDialog) {
                    this._valueHelpDialog = sap.ui.xmlfragment(
                        "zgcdepositos.zgcdepositos.ext.fragment.ValueHelp",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialog);
                }

                // open value help dialog filtered by the input value
                this._valueHelpDialog.open(sInputValue);
            },

            _handleValueHelpSearch: function (evt) {
                var sValue = evt.getParameter("value");
                var oFilter = new Filter(
                    "cuenta",
                    sap.ui.model.FilterOperator.Contains, sValue
                );
                evt.getSource().getBinding("items").filter([oFilter]);
            },

            _handleValueHelpClose: function (evt) {
                var oSelectedItem = evt.getParameter("selectedItem");
                if (oSelectedItem) {
                    var cuentaInp = sap.ui.getCore().byId("cuentaInput");
                    cuentaInp.setValue(oSelectedItem.getTitle());
                }
                evt.getSource().getBinding("items").filter([]);
            },
            onCloseDialog: function () {
                this._cerrarDialogo();
            },

            _cerrarDialogo: function () {
                this.oPopup.close();
                this.oPopup.destroy();
                this.oPopup = null;
            },
            onDialogSaveButton: function (oEvent) 
            {
                var cuentaData = sap.ui.getCore().byId("cuentaInput").getValue();
                var fechaData = sap.ui.getCore().byId("fechaInput").getDateValue();
                var mostrarMensajeButton = this.byId("mostrarMensaje");

                //console.log(fechaData)
                var numData = sap.ui.getCore().byId("numInput").getValue();
                var oTable = this.byId("zgcdepositos.zgcdepositos::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCDS_GC_DEPO_ODATA--GridTable");
                //var oTable=oTableSmart.getTable();
                //console.log(oTable.getPlugins()[0].getSelectedIndices())
                var sItems = []
                var sItems = oTable.getPlugins()[0].getSelectedIndices();
                var newThis = this;
                //console.log(sItems) 
                for (var i = 0; i < sItems.length; i++) {
                    var indice = sItems[i];
                    var oContext = oTable.getContextByIndex(indice);
                    oContext.getModel().setProperty(oContext.getPath() + '/cuenta', cuentaData);
                    oContext.getModel().setProperty(oContext.getPath() + '/fecha', fechaData);
                    oContext.getModel().setProperty(oContext.getPath() + '/deposito', numData);
                    oContext.getModel().setProperty(oContext.getPath() + '/accion', '1');
                    console.log(oContext.getPath());
                }

                oTable.getContextByIndex(0).getModel().submitChanges({
                    success: function (oData, oResponse) {
                        // Success
                        oTable.getModel().refresh(true);
                        //console.log(oResponse)
                        var errorObj1 = JSON.parse(oResponse.data.__batchResponses[0].response.body);
                        //console.log(errorObj1)
                        var log = errorObj1.error.innererror.errordetails;
                        for (var i = 0; i < log.length; i++) {
                            console.log(log[i].message)
                            if (log[i].code == "/IWBEP/CX_MGW_BUSI_EXCEPTION") {

                            }
                            else {
                                switch (log[i].severity) {
                                    // case "error": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                    // case "success": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.SUCCESS, "Éxito"); break;
                                    // case "warning": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.WARNING, "Advertencia"); break;
                                    //  case "info": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                    //  default:sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.NONE, ""); break;
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
                            }
                            //sap.m.MessageBox.show(log[i].message, icono, log[i].message);

                        }
                        // MessageToast.show("Cambios guardados exitosamente");
                        oTable.getModel().resetChanges()
                      //  mostrarMensajeButton.firePress();
                    },
                    error: function (oError) {
                        // Error
                        MessageToast.show("Error al guardar los cambios");
                    }
                });



                this._cerrarDialogo();
            },
            _getMessagePopover: function () {
                var oView = this.getView();
                // create popover lazily (singleton)
                if (!this._pMessagePopover) {
                    this._pMessagePopover = Fragment.load({
                        id: oView.getId(),
                        name: "zgcdepositos.zgcdepositos.ext.fragment.MessagePopup",
                        type: "XML"
                    }).then(function (oMessagePopover) {
                        oView.addDependent(oMessagePopover);
                        return oMessagePopover;
                    });
                }
                return this._pMessagePopover;
            },
        onNavigation: function(oEvent) {
            sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then( function (oService) {

                var sHref = oService.hrefForExternal({
                    target : {
                        semanticObject : "zgestioncheques",
                        action : "manage" }
                    
                }) || "";
                oService.toExternal({
                    target: {
                        shellHash: sHref
                    }
                });         
           
                // do something with sHref
             });



           /* sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function (oService) {
                oService.hrefForExternalAsync({
                    target : {                        
                        semanticObject : "zgestioncheques",
                        action : "manage"
                    }
                }).then( function(sHref) {                      
                    oService.toExternal({
                        target: {
                            shellHash: sHref
                        }
                    });            
                });
            });*/
        },
        onDevolucion: function (oEvent) {
            Fragment.load({
                name: "zgcdepositos.zgcdepositos.ext.fragment.popupDev",
                controller: this,
                type: "XML"
            }).then(function (oFragment) {
                this.oPopupDev = oFragment;
                this.getView().addDependent(this.oPopupDev);
                this.oPopupDev.setEscapeHandler(function () { this.onCloseDevDialog(); }.bind(this));


                //this.oMultiEditDialog.getContent()[0].setContexts(selectedContexts);
                syncStyleClass("sapUiSizeCompact", this.getView(), this.oPopupDev);
                this.oPopupDev.open();
            }.bind(this));
        },
        onCloseDevDialog: function () {
            this._cerrarDialogoDev();
        },
        _cerrarDialogoDev: function () {
            this.oPopupDev.close();
            this.oPopupDev.destroy();
            this.oPopupDev = null;
        },
        handleValueHelpDev: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue();

            this.inputId = oEvent.getSource().getId();
            // create value help dialog
            if (!this._valueHelpDialogDev) {
                this._valueHelpDialogDev = sap.ui.xmlfragment(
                    "zgcdepositos.zgcdepositos.ext.fragment.ValueHelpDev",
                    this
                );
                this.getView().addDependent(this._valueHelpDialogDev);
            }

            // open value help dialog filtered by the input value
            this._valueHelpDialogDev.open(sInputValue);
        },
        _handleValueHelpSearchDev: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "zhkont",
                sap.ui.model.FilterOperator.Contains, sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        _handleValueHelpCloseDev: function (evt) {
            var oSelectedItem = evt.getParameter("selectedItem");
            if (oSelectedItem) {
                var cuentaInp = sap.ui.getCore().byId("cuentaDevInput");
                cuentaInp.setValue(oSelectedItem.getTitle());
            }
            evt.getSource().getBinding("items").filter([]);
        },
        onDialogDevSaveButton: function (oEvent) 
        {
            var cuentaData = sap.ui.getCore().byId("cuentaDevInput").getValue();
            var fechaData = sap.ui.getCore().byId("fechaDevInput").getDateValue();
            
            var mostrarMensajeButton = this.byId("mostrarMensaje");

            //console.log(fechaData)
            //var numData = sap.ui.getCore().byId("numInput").getValue();
            var oTable = this.byId("zgcdepositos.zgcdepositos::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCDS_GC_DEPO_ODATA--GridTable");
            //var oTable=oTableSmart.getTable();
            //console.log(oTable.getPlugins()[0].getSelectedIndices())
            var sItems = []
            var sItems = oTable.getPlugins()[0].getSelectedIndices();
            var newThis = this;
            //console.log(sItems) 
            for (var i = 0; i < sItems.length; i++) {
                var indice = sItems[i];
                var oContext = oTable.getContextByIndex(indice);
                oContext.getModel().setProperty(oContext.getPath() + '/cuenta_dev', cuentaData);
                oContext.getModel().setProperty(oContext.getPath() + '/fecha_dev', fechaData);

                oContext.getModel().setProperty(oContext.getPath() + '/accion', '3');
                console.log(oContext.getPath());
            }

            oTable.getContextByIndex(0).getModel().submitChanges({
                success: function (oData, oResponse) {
                    // Success
                    oTable.getModel().refresh(true);
                    //console.log(oResponse)
                    var errorObj1 = JSON.parse(oResponse.data.__batchResponses[0].response.body);
                    //console.log(errorObj1)
                    var log = errorObj1.error.innererror.errordetails;
                    for (var i = 0; i < log.length; i++) {
                        console.log(log[i].message)
                        if (log[i].code == "/IWBEP/CX_MGW_BUSI_EXCEPTION") {

                        }
                        else {
                            switch (log[i].severity) {
                                // case "error": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                // case "success": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.SUCCESS, "Éxito"); break;
                                // case "warning": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.WARNING, "Advertencia"); break;
                                //  case "info": sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.INFORMATION, "Información"); break;
                                //  default:sap.m.MessageBox.show(log[i].message, sap.m.MessageBox.Icon.NONE, ""); break;
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
                        }
                        //sap.m.MessageBox.show(log[i].message, icono, log[i].message);

                    }
                    // MessageToast.show("Cambios guardados exitosamente");
                    oTable.getModel().resetChanges()
                    //mostrarMensajeButton.firePress();
                },
                error: function (oError) {
                    // Error
                    MessageToast.show("Error al guardar los cambios");
                }
            });



            this._cerrarDialogoDev();
        },
    };
    });