sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

		_applyCombinedFilter() {
			const sQuery = this.byId("searchField").getValue();
			const sStatus = this.byId("statusComboBox").getSelectedKey();
			const aFilters = [];

			if (sQuery) {
				aFilters.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			if (sStatus && sStatus !== "All") {
				aFilters.push(new Filter("Status", FilterOperator.EQ, sStatus));
			}

			const oList = this.byId("invoiceList");
			oList.getBinding("items").filter(aFilters);
		},

		onFilterInvoices() {
			this._applyCombinedFilter();
		},

		onStatusFilterChange() {
			this._applyCombinedFilter();
		},
		onPress(oEvent) {
			const oItem = oEvent.getSource();

			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substring(1))
			});
		}
	});
});