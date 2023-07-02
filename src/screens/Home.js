import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList, Button, Alert
} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight, deviceWidth} from '../components/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

import {API_KEY} from '../components/Constants';

export default function Home(props) {
  const [city, setCity] = useState('');
  const [data, setData] = useState();


  var localData =  {"base": "stations", "clouds": {"all": 100}, "cod": 200, "coord": {"lat": 25.6, "lon": 85.1167}, "dt": 1688325786, "id": 1260086, "main": {"feels_like": 308.81, "grnd_level": 994, "humidity": 79, "pressure": 1000, "sea_level": 1000, "temp": 302.56, "temp_max": 302.56, "temp_min": 302.56}, "name": "Patna", "rain": {"1h": 1.54}, "sys": {"country": "IN", "sunrise": 1688340747, "sunset": 1688390071}, "timezone": 19800, "visibility": 3563, "weather": [{"description": "moderate rain", "icon": "10n", "id": 501, "main": "Rain"}], "wind": {"deg": 295, "gust": 4.31, "speed": 1.35}}

 

  const searchweather = ()=>{
 
     if(city == ""){
        Alert.alert("Please enter City name");
        return
     }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  };

  const Data = ({title, value}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', fontSize: 22}}>{title}</Text>
      <Text style={{color: 'white', fontSize: 22}}>{value}</Text>
    </View>
  );

   console.log("DDDDD", data);

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image2.jpg')}
        style={{height: deviceHeight, width: deviceWidth}}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View
        style={{
          position: 'absolute',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: deviceWidth - 20,
          }}>
          <Icon name="menu" size={46} color="white" />
          <Image
            source={require('../assets/images/user.jpg')}
            style={{height: 46, width: 46, borderRadius: 50}}
          />
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <Text style={{fontSize: 40, color: 'white'}}>Hello Vikash </Text>
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
            Search the city by the name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 16,
              paddingHorizontal: 10,
            }}>
            <TextInput
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={{paddingHorizontal: 10, color: 'white', fontSize: 16}}
            />

              {/* props.navigation.navigate('Forcast', {name: city}) */}

            <TouchableOpacity onPress={() => searchweather() }>
              {/* <Icon name="search" size={22} color="white" /> */}
              <Text style={{color : "white", fontSize : 22}} >search</Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={{color: 'white', fontSize: 25, paddingHorizontal: 10, marginTop: 10, marginBottom: 20}}>
            My Locations
          </Text> */}

          {data ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: deviceHeight - 320,
            }}>
            <View>
              <Text style={{color: 'white', fontSize: 40}}>{city}</Text>
              <Text style={{fontSize: 22, color: 'white', textAlign:"center"}}>
                {data['weather'][0]['main']}
              </Text>
            </View>

            <Text style={{color: 'white', fontSize: 64}}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>

            <View>
            <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>Weather Details</Text>
            <View style={{width: deviceWidth - 60}}>
              <Data value={data['wind']['speed']} title="Wind" />
              <Data value={data['main']['pressure']} title="Pressure" />
              <Data value={`${data['main']['humidity']}%`} title="Humidity" />
              <Data value={data['visibility']} title="Visibility" />
            </View>
            </View>
          </View>
        ) : 
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: deviceHeight - 320,
        }}>
        <View>
          <Text style={{color: 'white', fontSize: 40}}>{localData.name}</Text>
          <Text style={{fontSize: 22, color: 'white', textAlign:"center"}}>
            {localData['weather'][0]['main']}
          </Text>
        </View>

        <Text style={{color: 'white', fontSize: 64}}>
          {(localData['main']['temp'] - 273).toFixed(2)}&deg; C
        </Text>

        <View>
        <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>Weather Details</Text>
        <View style={{width: deviceWidth - 60}}>
          <Data value={localData['wind']['speed']} title="Wind" />
          <Data value={localData['main']['pressure']} title="Pressure" />
          <Data value={`${localData['main']['humidity']}%`} title="Humidity" />
          <Data value={localData['visibility']} title="Visibility" />
        </View>
        </View>
      </View>}
 
          

        <Button
          onPress={()=> props.navigation.navigate('Forcast', {name: city ? city : localData.name}) }
          title="Get Forecast for five days"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        </View>
      </View>
    </View>
  );
}
