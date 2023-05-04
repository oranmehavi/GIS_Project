/* eslint-disable no-undef */
import { useRef,useEffect } from "react"
export default function Home(){
    let map
    useEffect(()=>{
        if (map)return
        const m = document.getElementById('map');
        console.log(m)
        map = L.map('map', {
            zoomControl:true, maxZoom:28, minZoom:1
        }).fitBounds([[31.959026207858575,34.62856111308743],[32.10213011847807,34.98494484198204]]);
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
        var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
        var bounds_group = new L.featureGroup([]);
        function setBounds() {
        }
        map.createPane('pane_OSMStandard_0');
        map.getPane('pane_OSMStandard_0').style.zIndex = 400;
        var layer_OSMStandard_0 = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            pane: 'pane_OSMStandard_0',
            opacity: 1.0,
            attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
            minZoom: 1,
            maxZoom: 28,
            minNativeZoom: 0,
            maxNativeZoom: 19
        });
        //layer_OSMStandard_0;
        map.addLayer(layer_OSMStandard_0);
        function pop_Cities_1(feature, layer) {
            var popupContent = '<table>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? autolinker.link(feature.properties['OBJECTID'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['UNIQ_ID'] !== null ? autolinker.link(feature.properties['UNIQ_ID'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['FCODE'] !== null ? autolinker.link(feature.properties['FCODE'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SETL_CODE'] !== null ? autolinker.link(feature.properties['SETL_CODE'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SETL_NAME'] !== null ? autolinker.link(feature.properties['SETL_NAME'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['SETL_NAME_'] !== null ? autolinker.link(feature.properties['SETL_NAME_'].toLocaleString()) : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + (feature.properties['ORIG_AREA'] !== null ? autolinker.link(feature.properties['ORIG_AREA'].toLocaleString()) : '') + '</td>\
                    </tr>\
                </table>';
            layer.bindPopup(popupContent, {maxHeight: 400});
        }

        function style_Cities_1_0() {
            return {
                pane: 'pane_Cities_1',
                opacity: 1,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 1,
                fillColor: 'rgba(164,113,88,1.0)',
                interactive: true,
            }
        }
        map.createPane('pane_Cities_1');
        map.getPane('pane_Cities_1').style.zIndex = 401;
        map.getPane('pane_Cities_1').style['mix-blend-mode'] = 'normal';
        var layer_Cities_1 = new L.geoJson(json_Cities_1, {
            attribution: '',
            interactive: true,
            dataVar: 'json_Cities_1',
            layerName: 'layer_Cities_1',
            pane: 'pane_Cities_1',
            onEachFeature: pop_Cities_1,
            style: style_Cities_1_0,
        });
        bounds_group.addLayer(layer_Cities_1);
        map.addLayer(layer_Cities_1);
        setBounds();
    },[])
    // debugger
    
    return(<div id="map">

    </div>)
}