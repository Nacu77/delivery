import React from 'react';
import {SafeAreaView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {FAB} from 'react-native-paper';
import {ConfirmDeliveryCardComponent} from '../../components/confirm-delivery-card/confirm-delivery-card.component';
import {HeaderComponent} from '../../components/header/header.component';
import {SearchingDeliveryComponent} from '../../components/searching-delivery/searching-delivery.component';
import {homeStyle} from './home.style';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = (props: HomeScreenProps) => {
  const goToDeliveryRoute = () => props.navigation.navigate('DeliveryRoute');

  const state: number = 1;

  return (
    <SafeAreaView style={homeStyle.flex}>
      <HeaderComponent title="Delivery App" navigation={props.navigation} />
      <MapView
        style={homeStyle.flex}
        initialRegion={{
          latitude: 44.439663,
          longitude: 26.096306,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}>
        {state == 1 ? (
          <>
            <Marker
              description="Delivery person 1"
              coordinate={{latitude: 44.44, longitude: 26.096306}}
            />
            <Marker
              description="Delivery person 1"
              coordinate={{latitude: 44.45, longitude: 26.086}}
            />
            <Marker
              description="Delivery person 1"
              coordinate={{latitude: 44.45, longitude: 26.096306}}
            />
            <Marker
              description="Delivery person 1"
              coordinate={{latitude: 44.445, longitude: 26.096306}}
            />
          </>
        ) : null}
        {state == 2 ? (
          <>
            <Marker
              description="Origin"
              coordinate={{latitude: 44.44, longitude: 26.096306}}
            />
            <Marker
              description="Destination"
              coordinate={{latitude: 44.45, longitude: 26.086}}
            />
          </>
        ) : null}
      </MapView>
      {state == 1 ? (
        <FAB onPress={goToDeliveryRoute} icon="plus" style={homeStyle.fab} />
      ) : null}
      {state == 2 ? <ConfirmDeliveryCardComponent /> : null}
      {state == 3 ? <SearchingDeliveryComponent /> : null}
    </SafeAreaView>
  );
};

export default HomeScreen;
