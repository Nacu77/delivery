import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddressScreen from './screens/address/address.screen';
import DeliveriesScreen from './screens/deliveries/deliveries.screen';
import DeliveryScreen from './screens/delivery/delivery.screen';
import HomeScreen from './screens/home/home.screen';
import LoginScreen from './screens/login/login.screen';
import {RegisterScreen} from './screens/register/register.screen';

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Screen name="Login" component={LoginScreen}></Screen>
      <Screen name="Home" component={HomeScreen}></Screen>
      <Screen name="Register" component={RegisterScreen}></Screen>
      <Screen name="DeliveryRoute" component={AddressScreen}></Screen>
      <Screen name="Deliveries" component={DeliveriesScreen}></Screen>
      <Screen name="Delivery" component={DeliveryScreen}></Screen>
    </Navigator>
  </NavigationContainer>
);

export default AppNavigator;
