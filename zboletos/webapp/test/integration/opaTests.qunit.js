/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["zboletos/zboletos/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
