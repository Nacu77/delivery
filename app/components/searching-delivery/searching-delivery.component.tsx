import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {searchingDeliveryStyle} from './searching-delivery.style';

export const SearchingDeliveryComponent = () => {
  return (
    <View style={searchingDeliveryStyle.flexCenterColumn}>
      <ActivityIndicator
        animating={true}
        color={searchingDeliveryStyle.icon.color}
      />
      <Title style={searchingDeliveryStyle.title}>
        Searching for a delivery person in your region
      </Title>
      <Button
        mode="contained"
        style={searchingDeliveryStyle.cancelDeliveryButton}>
        Cancel
      </Button>
    </View>
  );
};
