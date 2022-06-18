import React, {useEffect, useState} from 'react';
import axios from '../../axios';
import {FlatList, SafeAreaView} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {HeaderComponent} from '../../components/header/header.component';
import {deliveriesStyle} from './deliveries.style';

interface DeliveriesScreenProps {
  navigation: any;
}

const DeliveriesScreen = (props: DeliveriesScreenProps) => {
  useEffect(() => {
    axios
      .get('/deliveries')
      .then(res => {
        const deliveries = res.data;
        setDeliveries(deliveries);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const [deliveries, setDeliveries] = useState<any[]>([]);

  const goToDeliveyDetails = () => props.navigation.navigate('Delivery');

  return (
    <SafeAreaView>
      <HeaderComponent
        title="My Deliveries"
        hasBackButton={true}
        navigation={props.navigation}
      />
      <FlatList
        data={deliveries}
        keyExtractor={(item, index) => `deliveries${index}`}
        renderItem={({item, index}) => (
          <Card
            style={{...deliveriesStyle.card, ...deliveriesStyle.cardStatus}}
            onPress={goToDeliveyDetails}>
            <Card.Cover
              source={{
                uri: 'https://image.stirileprotv.ro/media/images/1408x882/May2015/61672101.jpg',
              }}
            />
            <Card.Title
              titleStyle={deliveriesStyle.cardTitle}
              title={deliveries[index].date}
              subtitle="Florin Nacu"
              right={() => (
                <Text style={deliveriesStyle.price}>
                  $ {deliveries[index].price}
                </Text>
              )}
            />
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default DeliveriesScreen;
