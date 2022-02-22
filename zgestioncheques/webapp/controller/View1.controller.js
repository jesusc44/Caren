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
    function (Controller,MessageToast,Fragment,syncStyleClass,Dialog, DialogType, Button, ButtonType,Text) {
        "use strict";

        return Controller.extend("zgestioncheques.zgestioncheques.controller.View1", {
            onInit: function () {

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
            onSave: function(){
                var saveBtn=this.byId("saveButton");
                var cancelBtn=this.byId("cancelButton");
                var editBtn=this.byId("editButton");
                
                
                //oContext.getModel().setProperty(oContext.getPath() + sKey, sValores[j]);   

                var oTableSmart=this.byId("LineItemsSmartTable");
                var oTable=oTableSmart.getTable();	
                oTable.getModel().submitChanges({
                    success : function(oData, oResponse) {
                        // Success
                        oTable.getModel().refresh(true);                                                                                                           
                        oTableSmart.setEditable(false);	 
                        MessageToast.show("Cambios guardados exitosamente");  
                        
                        saveBtn.setVisible(false);
                        cancelBtn.setVisible(false);
                        //multiBtn.setVisible(false);
                        editBtn.setVisible(true);
                        this.byId("depositoButton").setVisible(true);
                        this.byId("anularButton").setVisible(true);
                    },
                    error : function(oError) {
                        // Error
                        MessageToast.show("Error al guardar los cambios");                        
                    }
                });			
            },
            onDeposito: function(){
                var oTableSmart=this.byId("LineItemsSmartTable");			
                var oTable=oTableSmart.getTable();
                var sItems=oTable.getSelectedIndices();                
                if(sItems.length==0){
                    MessageToast.show("Seleccione al menos un ítem"); 
                }
                else{
                    var selectedContexts=[];   
                    console.log(sItems)                                  
                    for (var i = 0; i < sItems.length; i++) {
                        var indice=sItems[i];                        
                        var oContext=oTable.getContextByIndex(indice);
                        oContext.getModel().setProperty(oContext.getPath() + '/accion', '1'); 
                        console.log(oContext.getPath());  
                    }
                    oTable.getModel().submitChanges({
                        success : function(oData, oResponse) {
                            // Success
                            oTable.getModel().refresh(true);                                                                                                           
                           
                            MessageToast.show("Cambios guardados exitosamente");  
                        },
                        error : function(oError) {
                            // Error
                            MessageToast.show("Error al guardar los cambios");                        
                        }
                    });			
                }
            },
            onAnular: function(){
                var oTableSmart=this.byId("LineItemsSmartTable");			
                var oTable=oTableSmart.getTable();
                var sItems=oTable.getSelectedIndices();                
                if(sItems.length==0){
                    MessageToast.show("Seleccione al menos un ítem"); 
                }
                else{
                    var selectedContexts=[];   
                    console.log(sItems)                                  
                    for (var i = 0; i < sItems.length; i++) {
                        var indice=sItems[i];                        
                        var oContext=oTable.getContextByIndex(indice);
                        oContext.getModel().setProperty(oContext.getPath() + '/accion', '2'); 
                        console.log(oContext.getPath());  
                    }
                    oTable.getModel().submitChanges({
                        success : function(oData, oResponse) {
                            // Success
                            oTable.getModel().refresh(true);                                                                                                           
                           
                            MessageToast.show("Cambios guardados exitosamente");  
                        },
                        error : function(oError) {
                            // Error
                            MessageToast.show("Error al guardar los cambios");                        
                        }
                    });			
                }
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

                                var oTableSmart=this.byId("LineItemsSmartTable");			
                                var oTable=oTableSmart.getTable();				
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
