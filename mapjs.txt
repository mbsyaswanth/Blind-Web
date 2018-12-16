require([
    "esri/arcgis/utils",
    "esri/dijit/LayerList",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
], function (
    arcgisUtils,
    LayerList
) {
        //Create a map based on an ArcGIS Online web map id
        arcgisUtils.createMap("36105029bab3401a87ab525335b843c2", "map").then(function (response) {
            var myWidget = new LayerList({
                map: response.map,
                layers: arcgisUtils.getLayerList(response)
            }, "layerList");
            myWidget.startup();
        });
    });