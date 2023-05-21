/* eslint-disable no-undef */
import { useState,useEffect } from "react"
import Select from 'react-select'
import { json_Cities_1 } from "./data/AllCities";
export default function Home(){
    let map 
    const options = [
        { value: '2003', label: '2003' },
        { value: '2004', label: '2004' },
        { value: '2005', label: '2005' },
        { value: '2006', label: '2006' },
        { value: '2007', label: '2007' },
        { value: '2008', label: '2008' },
        { value: '2009', label: '2009' },
        { value: '2010', label: '2010' },
        { value: '2011', label: '2011' },
        { value: '2012', label: '2012' },
        { value: '2013', label: '2013' },
        { value: '2014', label: '2014' },
      ]
    const [city, setCity] = useState('');
    const [year1, setYear1] = useState('');
    const [year2, setYear2] = useState('');
    var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
    var bounds_group = new L.featureGroup([]);
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

    const initMap = () => {
        if (map)return
        map = L.map('map', {
            zoomControl:true, maxZoom:28, minZoom:1
        }).fitBounds([[31.959026207858575,34.62856111308743],[32.10213011847807,34.98494484198204]]);
        var hash = new L.Hash(map);
        map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
        
        

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



        map.createPane('pane_Cities_1');
        map.getPane('pane_Cities_1').style.zIndex = 401;
        map.getPane('pane_Cities_1').style['mix-blend-mode'] = 'normal';
        return map
    }

    useEffect(()=>{
        initMap()
        console.log(map)
        var layer_Cities_1 = new L.geoJson(json_Cities_1, {
            attribution: '',
            interactive: true,
            dataVar: 'json_Cities_1',
            layerName: 'layer_Cities_1',
            pane: 'pane_Cities_1',
            onEachFeature: pop_Cities_1,
            style: style_Cities_1_0,
        });
        // bounds_group.addLayer(layer_Cities_1);
        // map.addLayer(layer_Cities_1);
 
    },[])
    // debugger

    const updateCityInfo =(parsedRes) => {
        let result = {}
        console.log(parsedRes)
        json_Cities_1.features.forEach(element => {
            if (element.properties.SETL_NAME === city) {
                element.properties['Year1'] = parsedRes[0].year
                element.properties['Year2'] = parsedRes[1].year
                element.properties['Year1POP'] = parsedRes[0].population
                element.properties['Year2POP'] = parsedRes[1].population
                console.log(element)
                result = {type: "FeatureCollection",
                name: "Cities_1",
                crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                features: [element]}
            }
        });
        return result
    }

    const handleSubmit = (event) => {
        let cityInfo = {}
        fetch('http://localhost:4000/api/getdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city_name: city,        
                year1:year1,
                year2:year2
            })
          })
            .then(response => {
              if (response.status === 200) {
                return response.json()
              } else if (response.status === 500 ) {
                throw new Error('Failed to authenticate');
              }
            }).then(data => {
                const cityInfo = updateCityInfo(data)
                    console.log(cityInfo)
                    // debugger
                    var layer_Cities_1 = new L.geoJson(cityInfo, {
                        attribution: '',
                        interactive: true,
                        dataVar: 'cityInfo',
                        layerName: 'layer_Cities_1',
                        pane: 'pane_Cities_1',
                        onEachFeature: pop_Cities_1,
                        style: style_Cities_1_0,
                    });
                    bounds_group.addLayer(layer_Cities_1);
                    // initMap()
                    map.addLayer(layer_Cities_1);
            })

            .catch(error => console.error(error))
            

        event.preventDefault()
        

      };
    
    return(
    <div style={{display:"flex"}}>
        <div style={{ width:"70%", height:"900px"}} id="map"></div>
        <div className='auth-form-container'>
            <h2>Please select city and time range</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="email">City:</label>
                <input
                value={city}
                placeholder="תל אביב"
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                />
                <label >Select years range:</label>
                <div style={{display:"flex"}}>
                    <div style={{width:"50%"}}><Select  options={options} onChange={(e) => setYear1(e.value)}/></div>
                    <div style={{width:"50%"}}><Select  options={options} onChange={(e) => setYear2(e.value)}/></div>
                </div>
                <button type="submit">Get Data</button >
            </form>
        </div>
    </div>
    )
}