import {View, ImageBackground, Image, Text, FlatList, ScrollView, SafeAreaView } from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceHeight, deviceWidth} from '../components/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from '../components/Constants';

export default function Forcast(props) {
  const [data, setData] = useState();
  const {name} = props.route.params;

 // https://api.openweathermap.org/data/2.5/forecast?q=patna&appid=204d2a95db77976ec179070d47beca79

  
   console.log("name", name);
   console.log("data", data);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

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

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image1.jpg')}
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
 
    
            <View>
            <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>Weather Forcastfive Days </Text>
            <Data value={name} title="City Name" />

            <SafeAreaView>
            <ScrollView  >
           {
               data && data.list.map((e, i)=>(
                <View style={{width: deviceWidth - 50, marginTop : 30 }} key ={i} >
                <Data value={e['dt_txt']} title="Date & time" />   
                <Data value={e['weather'][0]['description']} title="Weather" />
                <Data value={e['wind']['speed']} title="Wind" />
                <Data value={e['main']['pressure']} title="Pressure" />
                <Data value={`${e['main']['humidity']}%`} title="Humidity" />
                <Data value={e['visibility']} title="Visibility" />
              </View>  
               ))
           }
            </ScrollView>
            </SafeAreaView>

            </View>


      </View>
    </View>
  );
}
