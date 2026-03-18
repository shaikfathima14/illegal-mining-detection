// Illegal Mining Detection - GEE Script

var aoi = ee.Geometry.Point([92.37, 25.28]).buffer(20000);

// Load Sentinel-2 images
var before = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(aoi)
  .filterDate('2023-01-01', '2023-12-31')
  .median();

var after = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(aoi)
  .filterDate('2024-01-01', '2024-12-31')
  .median();

// NDVI
var ndviBefore = before.normalizedDifference(['B8','B4']);
var ndviAfter = after.normalizedDifference(['B8','B4']);

// Change Detection
var change = ndviAfter.subtract(ndviBefore);

// Display
Map.centerObject(aoi, 10);
Map.addLayer(change, {min:-0.5, max:0.5, palette:['red','white','green']}, "Change");
