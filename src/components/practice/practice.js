import React, { useState, useEffect } from "react"
import { Button, Stack, Card, InputGroup, Form } from "react-bootstrap"
import axios from "axios";
const  Home = () => {
    const [data, setData] = useState()
    const [cityname, setCityname] = useState()
    const [headername, setHeadername] = useState()
    const [coordinates, setCoordinates] = useState()
    // const options = {
    //   method: 'GET',
    //   url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    //   params: {lat: '35.5', lon: '-78.5'},
    //   headers: {
    //     'X-RapidAPI-Key': '77b396ddd1mshbf6576466372e82p17d616jsnc88186f649da',
    //     'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    //   }
    // };
    
    // axios.request(options).then(function (response) {
    //   console.log("response", response.data);
    // }).catch(function (error) {
    //   console.log("error" , error);
    // });




    
    
    async function check(){
  setHeadername(cityname)
 const response=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityname}?unitGroup=us&key=4K2U46HY7EZT9MEFJGT2MM423&contentType=json`,{
    method:"GET"
  })
//  const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=3a9125c77b48ff205d4d0ca44b71a15d`,{
//     method:"GET"
//   })
  const data=await response.json();
  setCoordinates(data)

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '77b396ddd1mshbf6576466372e82p17d616jsnc88186f649da',
  //     'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
  //   }
  // };
  
//  const weatherResponse = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${data.coord.lat}&lon=${data.coord.lon}`, options)
// const weatherData = await weatherResponse.json()

//  console.log('weatherData',weatherData)
 console.log('data',data)

}
    return(

        <>
        
        
    <Card style={{ width: '28rem' }}>

    <Card.Body>
        <Card.Title>{headername ? headername.toUpperCase() : ""} WEATHER</Card.Title>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Enter your city name:</InputGroup.Text>
        <Form.Control
          placeholder="city name here..."
          aria-label="cityName"
          aria-describedby="basic-addon1"
          value={cityname}
          onChange={(e)=>setCityname(e.target.value)}
        />
        <InputGroup.Text><Button onClick={check}>Search</Button></InputGroup.Text>
      </InputGroup>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
        </>
    )
}
export default Home