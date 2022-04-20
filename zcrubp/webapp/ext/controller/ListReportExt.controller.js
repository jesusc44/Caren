sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"
],
    function (Controller) {
        "use strict";

        var oCrearGenericBtnId = "zcrubp.zcrubp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCBP_Datos_ODATA--addEntry";        

        return sap.ui.controller("zcrubp.zcrubp.ext.controller.ListReportExt",
            {
                /**
                 * Method called by the FilterBar that will start a new search
                 */
                onAfterRendering:function(){
                    //var oFilter = this.getView().getModel();
                    var oFilter = this.byId("zcrubp.zcrubp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZCBP_Datos_ODATA--listReportFilter-filterItemControl_BASIC-mc_name1");
                    console.log(oFilter);
                    /*oFilter.onChange(function(Oid){
                        console.log(Oid);
                    });*/
                    //var sPartnerName = oFilter.getProperty("/mc_name1");


                    //Para la creación de BP
                    var oCrearBtn = this.byId(oCrearGenericBtnId);                                      
                    var complete_url = window.location.href;                    
                    var pieces = complete_url.split("?");
                    var params = pieces[1].split("&");
                    $.each( params, function( key, value ) {  
                        var param_value = value.split("=");
                        console.log(value)
                        if(param_value[0] == "RUT"){
                            if(param_value[1].indexOf("#") !=- 1){                                
                                if (sap.ui.getCore().cargoObjectPage == undefined){
                                    var rutVal = param_value[1].substring(0,param_value[1].indexOf("#"))                                                                                                                  
                                    sap.ui.getCore().creacionNuevoRut = rutVal;                                    
                                    oCrearBtn.firePress();                                    
                                }                                
                                
                            }
                            else{                                                                  
                                if (sap.ui.getCore().cargoObjectPage == undefined){
                                    sap.ui.getCore().creacionNuevoRut = param_value[1];                                     
                                    oCrearBtn.firePress();                                    
                                }                        
                            }
                        }                                
                    });
                    

                },
                onSearch: function () {
                    //I'm getting search query like this because we're using a FilterBar and not a SearchField as I said in the blog post ;)
                    var oFilter = this.getView().getModel("filters");
                    var sPartnerName = oFilter.getProperty("/mc_name1");
                    console.log(sPartnerName);
                    var aFilters = [];
                    if (sPartnerName) {
                        aFilters.push(this.createFilter("CompanyName", FilterOperator.Contains, sPartnerName, true));
                    }

                    this.getView().byId("businessPartnerTable").getBinding("items").filter(aFilters);
                },

                createFilter: function (key, operator, value, useToLower) {
                    return new Filter(useToLower ? "tolower(" + key + ")" : key, operator, useToLower ? "'" + value.toLowerCase() + "'" : value);
                }

            });
    });

