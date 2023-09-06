import React from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import BottomPressableText from '../../components/auth/BottomPressableText';

import { AuthStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<AuthStackParamList, 'LogIn'>;

interface LoginFormValues {
  email: string;
  password: string;
}

const LogInScreen: React.FC<ScreenProps> = ({ navigation }) => {

  const initialValues: LoginFormValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex:1 }}>
        <Text
          style={{
            width: '100%',
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '20%',
          }}
        >
          Mini Movies List
        </Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: '500' }}>
            Log in to proceed
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={values => {
              console.log(values);
              Alert.alert(
                'Values',
                `Email: ${values.email}\nPassword: ${values.password}`
              );
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => {
              const showEmailError = errors.email && touched.email;
              const showPasswordError = errors.password && touched.password;
              return (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '10%',
                    paddingHorizontal: '10%',
                  }}
                >
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder='email'
                    keyboardType='email-address'
                    style={{
                      borderWidth: 1,
                      borderColor: showEmailError ? 'red' : 'lightslategrey',
                      borderRadius: 6,
                      height: 37,
                      width: '100%',
                      paddingLeft: 10,
                    }}
                  />
                  {showEmailError && (
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: 10,
                        color: 'red',
                        marginTop: 5,
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder='Password'
                    secureTextEntry
                    style={{
                      borderWidth: 1,
                      borderColor: showPasswordError ? 'red' : 'lightslategrey',
                      borderRadius: 6,
                      height: 37,
                      width: '100%',
                      paddingLeft: 10,
                      marginTop: 30,
                    }}
                  />
                  {showPasswordError && (
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: 10,
                        color: 'red',
                        marginTop: 5,
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={{
                      paddingVertical: 11,
                      paddingHorizontal: 22,
                      borderRadius: 8,
                      backgroundColor: !isValid ? 'lightgrey' : 'lightskyblue',
                      marginTop: 30,
                    }}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                  >
                    <Text style={{ fontSize: 20 }}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </View>
        <BottomPressableText
          messageText="Don't have an account yet? "
          actionText='Sign Up'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LogInScreen;
