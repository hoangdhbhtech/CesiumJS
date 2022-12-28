import React, { useEffect, useState } from "react";
import {
  Ion, Viewer, createWorldTerrain, createOsmBuildings,
  Cartesian3, Math, IonResource, GeoJsonDataSource,
  Rectangle, Color, PolygonHierarchy
} from "cesium";

function App() {
  // Your access token can be found at: https://cesium.com/ion/tokens.
  // This is the default access token
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

  // Initialize the Cesium Viewer in the HTML element with the cesiumContainer ID.
  const viewer = new Viewer('cesiumContainer', {
    terrainProvider: createWorldTerrain()
  });

  const entities = viewer.entities;

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  //viewer.scene.primitives.add(createOsmBuildings());

  //XML Fetch
  fetch("https://s3.amazonaws.com/CMSTest/squaw_creek_container_info.xml")
    .then(response => response.text())
    .then((data) => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "text/xml");

      let pointArr = [];
      let pointTag = xml.getElementsByTagName("POINT");
      for (let i = 0; i < pointTag.length; i++) {
        let pointAtt = pointTag[i].getAttribute("data");
        pointArr.push(pointAtt.split(", "));
      }

      let arr = pointArr.toString().split(',').map(parseFloat);

      let size = 3;
      let arrOfArrs = [];
      for (let i = 0; i < arr.length; i += size) {
        arrOfArrs.push(arr.slice(i, i + size));
      }
      console.log(arrOfArrs);

      let F0 = [...arrOfArrs[0], ...arrOfArrs[1], ...arrOfArrs[2], ...arrOfArrs[3], ...arrOfArrs[4], ...arrOfArrs[5], ...arrOfArrs[6]];
      let F1 = [...arrOfArrs[7], ...arrOfArrs[8], ...arrOfArrs[9], ...arrOfArrs[10], ...arrOfArrs[11], ...arrOfArrs[12], ...arrOfArrs[13]];
      let F2 = [...arrOfArrs[14], ...arrOfArrs[15], ...arrOfArrs[16], ...arrOfArrs[17]];
      let F3 = [...arrOfArrs[18], ...arrOfArrs[19], ...arrOfArrs[20], ...arrOfArrs[21]];
      let F4 = [...arrOfArrs[22], ...arrOfArrs[23], ...arrOfArrs[24]];
      let F5 = [...arrOfArrs[25], ...arrOfArrs[26], ...arrOfArrs[27]];
      let F6 = [...arrOfArrs[28], ...arrOfArrs[29], ...arrOfArrs[30]];
      let F7 = [...arrOfArrs[31], ...arrOfArrs[32], ...arrOfArrs[33]];

      let Polygon0 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F0),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon0.name = 'F0';

      let Polygon1 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F1),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon1.name = 'F1';

      let Polygon2 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F2),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon2.name = 'F2';

      let Polygon3 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F3),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon3.name = 'F3';

      let Polygon4 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F4),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon4.name = 'F4';

      let Polygon5 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F5),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon5.name = 'F5';

      let Polygon6 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F6),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon6.name = 'F6';

      let Polygon7 = viewer.entities.add({
        polygon: {
          hierarchy: Cartesian3.fromDegreesArrayHeights(F7),
          perPositionHeight: true,
          material: Color.AQUAMARINE.withAlpha(0.5),
          outline: true,
          outlineColor: Color.AQUAMARINE,
        },
      });
      Polygon7.name = 'F7';

      viewer.zoomTo(Polygon1);
    });

  return (
    <div>
    </div>

  );
}

export default App;