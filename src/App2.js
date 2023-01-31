import React, { useEffect, useState } from "react";
import {
  Ion,
  Viewer,
  createWorldTerrain,
  createOsmBuildings,
  Cartesian3,
  Math,
  IonResource,
  GeoJsonDataSource,
  Rectangle,
  Color,
  PolygonHierarchy,
} from "cesium";
import parseXml from "./parseXml";
import xmlToJson from "./xmlToJson";
function App2() {
  // Your access token can be found at: https://cesium.com/ion/tokens.
  // This is the default access token
  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk";

  // Initialize the Cesium Viewer in the HTML element with the cesiumContainer ID.
  const viewer = new Viewer("cesiumContainer", {
    terrainProvider: createWorldTerrain(),
  });

  const entities = viewer.entities;

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  //viewer.scene.primitives.add(createOsmBuildings());

  async function getData() {
    const response = await fetch(
      "https://s3.amazonaws.com/CMSTest/squaw_creek_container_info.xml"
    );
    var data = await response.text();
    const dom = parseXml(data);
    const dataXML = xmlToJson(dom);
    return dataXML;
  }
  getData().then((data) => {
    console.log(data);
    data.STRUCTURES.ROOF.FACES.FACE.map((data) => {
      console.log(data.POLYGON.attributes.path.split(","));
      console.log(data.POLYGON.attributes.id);
    });
    // var objectPolygon = [
    //   {
    //     POLYGON: {
    //       id: "",
    //       pathPolygon: "",
    //     },
    //     LINE:{
    //         id: "",
    //         pathLine: "",
    //     },
    //     POINT: {
    //         id: "",
    //         pathPoint: "",
    //     },
    //   },
    // ];
  });
  const url = "https://s3.amazonaws.com/CMSTest/squaw_creek_container_info.xml";
  const api = async () => {
    try {
        fetch(url)
        .then ((reponse) => response.text())
        .then((datas) => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(datas, "text/xml");
            console.log ("xmlDoc", xmlDoc);
            // set Object
            var objectPolygon = {};
            var listPolygon = xmlDoc.getElementsByTagName("POLYGON");
            console.log(listPolygon);

            // take id from polygon
            let listId = [];
            for (let i = 0; i < listPolygon.length; i++) {
                let idPolygon = listPolygon[i].getAttribute("id");
                listId.push(idPolygon);
            }
            console.log("listId", listId);
            // take list line from polygon
            let listPathLine = [];
            for (let i = 0; i< listPolygon.length;i++) {
                let pathPolygon = listPolygon[i].getAttribute("path");
                let splitPathLine = pathPolygon.split(", ");
                listPathLine.push(splitPathLine);
            }
        })
    }catch (error) {
        console.log(error);
      }
  }
}
export default App2;
