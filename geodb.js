// arcgis db 

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/widgets/Search",
    "esri/geometry/Point",
    "dojo/dom",
    "esri/geometry/SpatialReference",
    "dojo/on",
    "dojo/domReady!"
], function (
    Map,
    MapView,
    FeatureLayer,
    Graphic,
    Search,
    Point,
    dom,
    SpatialReference,
    on
) {
        var featureLayer = new FeatureLayer({
            url: "https://services9.arcgis.com/2882Ggz2LB0PQSyP/arcgis/rest/services/school/FeatureServer/0?token=0CndUfsN8SOjYxhnrNAI_NpC-MevleciJkiNAaP8TwUnSwl2qtLIYATWlaO6rNshcWYr42K7cJvrXvB6nkHNcf2uI4QASUF9pJAYbLcY9VMBIG9KV548GPKvqZhvo2uTFzH0wYoBSQBkKLP4xrJ0ZcElERI6D6m4FRDngfyZq40gkRY4MtlPTaeUQNLOi5X93zQNNcTg3Wo9iyw89pHAnbt1UiOGiaJBRdyEzEnlQmMR56vSuUppdO6FRNbmQqNu",
            outFields: ["*"],
        });

        on(document.getElementById('update'), 'click', function () {
            //create the feature
            var feature = new Graphic();
            var geometry = new Point({
                type: "point",
                x: document.getElementById('lat').value,
                y: document.getElementById('long').value,
                //    spatialReference: new SpatialReference({wkid: 32644})
            });

            feature.geometry = geometry;

            feature.attributes = {
                "NAME_OF_THE_SCHOOL": document.getElementById('sName').value,
                "EMAIL_ADDRESS_OF_THE_SCHOOL": document.getElementById('sEmail').value,
                "LATITUDE": document.getElementById('lat').value,
                "LONGITUDE": document.getElementById('long').value,
                "NAME_OF_THE_STATE": document.getElementById('state').value,
                "TOTAL_NUMBER_OF_STUDENTS": document.getElementById('ns').value,
                "NUMBER_OF_10_GRADE_STUDENTS": document.getElementById('tenclassstu').value,
                "NUMBER_OF_STUDENTS_JOINED_THROUGH_EDUCATING_BLIND": document.getElementById('ebs').value

            };

            //add to the featureLayer
            var promise = featureLayer.applyEdits({
                addFeatures: [feature]
            });

            promise.then(function (res) {
                console.log('new OBJECTID:', res.addFeatureResults[0].objectId);
            }, function (err) {
                console.error(err);
            });
        });
    });
