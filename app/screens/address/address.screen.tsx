import React from 'react';
import axios from '../../axios';
import {SafeAreaView, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {HeaderComponent} from '../../components/header/header.component';
import {addressStyle} from './address.style';
import {Formik} from 'formik';

interface DeliveryRouteScreenProps {
  navigation: any;
}

const AddressScreen = (props: DeliveryRouteScreenProps) => {
  const loadDeliveryPricing = () => props.navigation.navigate('Deliveries');

  const addDelivery = (delivery: {origin: string; destination: string}) => {
    const deliveryToAdd = {
      origin: delivery.origin,
      destination: delivery.destination,
      price: '7.77',
      date: '18/06/2022',
    };

    axios
      .post('/deliveries', deliveryToAdd)
      .then(res => props.navigation.navigate('Deliveries'))
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <HeaderComponent
        title="Address"
        hasBackButton={true}
        navigation={props.navigation}
      />
      <Formik
        initialValues={{origin: '', destination: ''}}
        onSubmit={addDelivery}>
        {({handleSubmit, handleChange}) => (
          <>
            <View style={addressStyle.marginHorizontal}>
              <TextInput label="Origin" onChangeText={handleChange('origin')} />
              <TextInput
                label="Destination"
                onChangeText={handleChange('destination')}
              />
            </View>
            <Button
              mode="contained"
              uppercase={false}
              style={addressStyle.readyButton}
              labelStyle={addressStyle.readyButtonLabelStyle}
              onPress={handleSubmit}>
              Add delivery
            </Button>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddressScreen;
