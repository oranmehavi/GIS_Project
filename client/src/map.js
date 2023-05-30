/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react"
import Select from 'react-select'
import { json_Cities_1 } from "./data/AllCities";
import './map.css'
import { Chart } from "react-google-charts";
import { MapContainer, TileLayer, Popup, FeatureGroup, GeoJSON } from 'react-leaflet'




export default function Home() {



  const chartOptions = {
    chart: {
      title: "Population change",
      hAxis: {
        maxAlternation: 4,
        slantedTextAngle: 90
      },
      chartArea: {
        bottom: 80
      }
    },
    
  };


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
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
  ]
  const [city, setCity] = useState('');
  const [year1, setYear1] = useState('');
  const [year2, setYear2] = useState('');
  const [jsonKey, addJsonKey] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [cityInfo, setCityInfo] = useState({});
  const [cityOptions, setCityOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  // debugger

  useEffect(() => {

    fetch('http://localhost:4000/api/getcities', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      else if (response.status === 500){
        throw new Error(result.json().message);
      }
    })
    .then(data => setCityOptions(data.map(({name}) => ({value: name, label: name}))))
    .catch(error => console.error(message));

    fetch('http://localhost:4000/api/getyears', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      else if (response.status === 500){
        throw new Error(result.json().message);
      }
    })
    .then(data => setYearOptions(data.map(({year}) => ({value: year, label: year}))))
    .catch(error => console.error(message));

  }, []);

  const updateCityInfo = (parsedRes) => {

    let result = {}

    json_Cities_1.features.forEach(element => {
      if (element.properties.SETL_NAME === city) {
        element.properties['Year1'] = parsedRes[0].year
        element.properties['Year2'] = parsedRes[1].year
        element.properties['Year1POP'] = parsedRes[0].population
        element.properties['Year2POP'] = parsedRes[1].population
        result = {
          type: "FeatureCollection",
          name: "Cities_1",
          crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
          features: [element]
        }
      }
    });
    return result

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:4000/api/getdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        city_name: city,
        year1: year1,
        year2: year2
      })
    })
    .then(response => {

        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          throw new Error('Failed to authenticate');
        }
    }).then(data => {

        setCityInfo(updateCityInfo(data));
        let arrayOfArrays = data.reduce((accumulator, currentValue) => {
          accumulator.push([currentValue.year.toString(), currentValue.population.toString()]);
          return accumulator;
        }, []);
        setChartData([["Year", "Population"], ...arrayOfArrays]);
        addJsonKey(jsonKey + 1);
    })

    .catch(error => console.error(error))

  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70%", height: "900px" }} id="map">
        <MapContainer bounds={[[31.959026207858575, 34.62856111308743], [32.10213011847807, 34.98494484198204]]} minZoom={1} maxZoom={28} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {cityInfo.features && cityInfo.features.map((feature, index) => {
            return (

              <FeatureGroup key={jsonKey}>
                <GeoJSON data={feature} key={jsonKey} />

                <Popup maxHeight="auto" maxWidth="auto">
                  <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={chartData}
                    options={chartOptions}
                  />
                </Popup>
              </FeatureGroup>
            )
          })
          }

        </MapContainer>
      </div>
      <div className='auth-form-container'>
        <h2>Please select city and time range</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <label>City:</label>
          <Select options={cityOptions} onChange={(e) => setCity(e.value)}/>
          <label >Select years range:</label>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><Select options={yearOptions} onChange={(e) => setYear1(e.value)} /></div>
            <div style={{ width: "50%" }}><Select options={yearOptions} onChange={(e) => setYear2(e.value)} /></div>
          </div>
          <button type="submit">Get Data</button >
        </form>
      </div>
    </div>
  )
}