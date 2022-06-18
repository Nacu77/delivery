import {bindActionCreators} from '@reduxjs/toolkit';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Card, Snackbar, Text, TextInput} from 'react-native-paper';
import {hide, show} from '../../store/loading/loading.actions';
import {LoadingState} from '../../store/loading/loadingState';
import {loginForm} from './login.form';
import {loginStyle} from './login.style';
import {AppState} from '../../store/AppState';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordReset,
  recoverPasswordSuccess,
} from '../../store/login/login.actions';
import {LoginState} from '../../store/login/loginState';
import AuthService from '../../services/AuthService';

interface LoginScreenProps {
  loadingState: LoadingState;
  loginState: LoginState;

  navigation: any;

  login: Function;
  loginSuccess: Function;
  loginFail: Function;
  recoverPassword: Function;
  recoverPasswordSuccess: Function;
  recoverPasswordFail: Function;
  recoverPasswordReset: Function;
  hideLoading: Function;
  showLoading: Function;
}

const LoginScreen = (props: LoginScreenProps) => {
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [userLogin, setUserLogin] = useState({email: '', password: ''});

  useEffect(() => {
    if (props.loginState.isRecoveringPassword) {
      props.showLoading();

      AuthService.recoverPassword(recoveryEmail)
        .then(() => {
          props.recoverPasswordSuccess();
        })
        .catch(error => {
          props.recoverPasswordFail(error);
        });
    } else {
      props.hideLoading();
    }
  }, [props.loginState.isRecoveringPassword]);

  useEffect(() => {
    if (props.loginState.isLoggingIn) {
      props.showLoading();

      AuthService.login(userLogin.email, userLogin.password)
        .then(user => {
          props.loginSuccess(user);
        })
        .catch(error => {
          props.loginFail(error);
        });
    } else {
      props.hideLoading();
    }
  }, [props.loginState.isLoggingIn]);

  useEffect(() => {
    if (props.loginState.isLoggedIn) {
      props.hideLoading();
      props.navigation.navigate('Home');
    }
  }, [props.loginState.isLoggedIn]);

  const login = (userLogin: {email: string; password: string}) => {
    setUserLogin(userLogin);
    props.login();
  };
  const register = () => props.navigation.navigate('Register');
  const forgotEmailPassword = (email: string) => {
    setRecoveryEmail(email);
    props.recoverPassword();
  };

  return (
    <SafeAreaView style={loginStyle.content}>
      <View style={loginStyle.view}>
        <Card>
          <Card.Title
            title="Delivery App"
            titleStyle={loginStyle.cardTitle}></Card.Title>
          <Card.Content>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={login}
              validationSchema={loginForm}>
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                values,
              }) => (
                <>
                  <TextInput
                    label="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onFocus={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email ? (
                    <Text style={{color: 'red'}}>*{errors.email}</Text>
                  ) : null}
                  <TextInput
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onFocus={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password ? (
                    <Text style={{color: 'red'}}>*{errors.password}</Text>
                  ) : null}
                  <Button
                    onPress={() => forgotEmailPassword(values.email)}
                    uppercase={false}
                    style={loginStyle.cardButton}
                    disabled={
                      values.email == '' || errors.email ? true : false
                    }>
                    Forgot Email/Password
                  </Button>
                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    style={loginStyle.cardButton}>
                    Login
                  </Button>
                  <Button onPress={register} style={loginStyle.cardButton}>
                    Register
                  </Button>
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </View>
      {props.loginState.isRecoveredPassword ? (
        <Snackbar
          duration={5000}
          visible={true}
          onDismiss={() => props.recoverPasswordReset()}>
          Recovery Email Sent
        </Snackbar>
      ) : null}
      {props.loginState.error ? (
        <Snackbar
          duration={5000}
          visible={true}
          onDismiss={() => props.recoverPasswordReset()}>
          {props.loginState.error.message}
        </Snackbar>
      ) : null}
    </SafeAreaView>
  );
};

const mapStateToProps = (store: AppState) => ({
  loadingState: store.loading,
  loginState: store.login,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login: login,
      loginSuccess: loginSuccess,
      loginFail: loginFail,
      recoverPassword: recoverPassword,
      recoverPasswordSuccess: recoverPasswordSuccess,
      recoverPasswordFail: recoverPasswordFail,
      recoverPasswordReset: recoverPasswordReset,
      hideLoading: hide,
      showLoading: show,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
