sap.ui.define([],
    function () {
        "use strict";

        var oRutId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--IDzcrubp::taxnum::Field";
        var oTratId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--IDzcrubp::title_medi::Field";
        var oTableId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--direcciones::gridTable";

        var oApellMatId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--IDzcrubp::name_org4::Field";
        var oSegNombreId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--IDzcrubp::name_org2::Field";
        var oRazonSocialId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--IDzcrubp::mc_name2::Field";

        var oPaisId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--IDzcrubp::country::Field";

        return sap.ui.controller("zcrubp.zcrubp.ext.controller.ObjectPageExt",{

            onAfterRendering:function(){
                
                var oTable = this.byId(oTableId);
                var oTrat = this.byId(oTratId);
                var oRutField = this.byId(oRutId);                
                var oNuevoRut = sap.ui.getCore().creacionNuevoRut;                


                console.log(oNuevoRut);
                if(oNuevoRut){
                    oRutField.setValue(oNuevoRut)                                                
                    sap.ui.getCore().creacionNuevoRut = "";                    
                }                
                sap.ui.getCore().cargoObjectPage = true;

                oTrat.attachChange(this.onTratChange,this);               
                
            },
            
            onTratChange: function(oEvent){
                var newValue = oEvent.getParameter("newValue");  
                console.log(newValue)

                if (newValue == "Company" || newValue == "Empresa"){
                    this.byId(oApellMatId).setEditable(false);
                    this.byId(oSegNombreId).setEditable(false);
                    this.byId(oRazonSocialId).setEditable(false);                                    
                }
                else{
                    this.byId(oApellMatId).setEditable(true);
                    this.byId(oSegNombreId).setEditable(true);
                    this.byId(oRazonSocialId).setEditable(true);
                }

            },

            OnGuardar: function () {
                /*  
                    var table = this.byId("zcrubp.zcrubp::sap.suite.ui.generic.template.ObjectPage.view.Details::ZCBP_Datos_ODATA--direcciones::Table").getTable()
                    // window.history.back()
                    // table.getModel().refresh()
                    console.log(table.getModel())
                    table.getModel().attachRequestCompleted(function (oEvent) {
                        console.log(oEvent)
                        var metodo = oEvent.getParameters("success")['method'];
                        var exito = oEvent.getParameters("success")['success'];
                        var respuesta = oEvent.getParameters("success")['response'];
                        console.log(respuesta)
                        var texto = String(respuesta['headers']['sap-message']);
                        var indicador = texto.search("Cliente Creado");
                        console.log(indicador)
                        if (indicador == -1) {

                        }
                        else {
                            window.history.back()
                            table.getModel().refresh()
                        }

                        //console.log(exito)
                    });*/

            }
        });
    });

