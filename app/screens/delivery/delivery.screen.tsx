import React from 'react';
import {SafeAreaView, View} from 'react-native';
import MapView from 'react-native-maps';
import {Avatar, Card, List, Text} from 'react-native-paper';
import {HeaderComponent} from '../../components/header/header.component';
import {deliveryStyle} from './delivery.style';

interface DeliveryScreenProps {
  navigation: any;
}

const DeliveryScreen = (props: DeliveryScreenProps) => {
  return (
    <SafeAreaView style={deliveryStyle.flex}>
      <HeaderComponent
        title="Delivery details"
        hasBackButton={true}
        navigation={props.navigation}
      />
      <View style={deliveryStyle.flex}>
        <MapView
          style={deliveryStyle.flex}
          initialRegion={{
            latitude: 44.439663,
            longitude: 26.096306,
            latitudeDelta: 0.25,
            longitudeDelta: 0.25,
          }}></MapView>
      </View>
      <Card>
        <Card.Title
          title="18/06/2022"
          titleStyle={deliveryStyle.cardTitle}
          right={() => <Text style={deliveryStyle.price}>$ 7.77</Text>}
        />
        <Card.Content>
          <List.Item
            title={'Florin Nacu'}
            description="77 deliveries"
            left={() => (
              <Avatar.Image
                size={52}
                source={{
                  uri: 'https://png.pngtree.com/png-vector/20190710/ourmind/pngtree-user-vector-avatar-png-image_1541961.jpg',
                }}
              />
            )}
          />
          <List.Item
            title="Origin"
            description="Origin street, 60"
            left={() => <List.Icon icon="flag-outline" />}
          />
          <List.Item
            title="Destination"
            description="Destination street, 60"
            left={() => <List.Icon icon="flag-checkered" />}
          />
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
