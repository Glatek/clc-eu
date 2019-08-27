# clc-eu 🏞 🌅 🌄

This is a JavaScript module that gives you the Corine Land Cover information of a lat/long pair or an [Open Location Code](https://github.com/google/open-location-code).

Only terrain data within the EU is covered as this uses the [Corine Land Cover data from 2018](http://copernicus.discomap.eea.europa.eu/arcgis/rest/services/Corine/CLC2018_WM/MapServer) provided by the [European Environment Agency](https://www.eea.europa.eu/).

## Methods

```
async getTerrainDataFromPlotCode(plotCode): { [string]: []string }
```

```
async getTerrainDataFromLatLong({ latitude, longitude })
```

These both returns `{ [string]: []string }` where the key is the plot code and the array contains the available terrains within that Open Location Code-plot.

## Usage

```
import { getTerrainDataFromLatLong } from 'clc-eu';

export async function fetchTerrainDataForMonolittenInOslo () {
  const result = await getTerrainDataFromLatLong({
    latitude: 59.927666,
    longitude: 10.698893
  });

  return result; // ['Green urban areas']
}
```
