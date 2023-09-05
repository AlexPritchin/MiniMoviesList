import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import BottomPressableText from '../../components/auth/BottomPressableText';

import { AuthStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<AuthStackParamList, 'LogIn'>;

interface LoginFormValues {
  email: string;
  name: string;
}

const LogInScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const initialValues: LoginFormValues = { email: '', name: '' };
  const validationSchema = Yup.object({
    email: Yup.string().required('This field is required'),
    name: Yup.string().required('This field is required'),
  });

  return (
    <>
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
          onSubmit={values => {
            console.log(values);
            Alert.alert(
              'Values',
              `Email: ${values.email}\nName: ${values.name}`
            );
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            console.log(errors);
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
                  value={values.email}
                  placeholder='email'
                  keyboardType='email-address'
                  style={{
                    borderWidth: 1,
                    borderColor: errors.email ? 'red' : 'lightslategrey',
                    borderRadius: 6,
                    height: 37,
                    width: '100%',
                    paddingLeft: 10,
                  }}
                />
                {errors.email && (
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
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder='User name'
                  style={{
                    borderWidth: 1,
                    borderColor: errors.name ? 'red' : 'lightslategrey',
                    borderRadius: 6,
                    height: 37,
                    width: '100%',
                    paddingLeft: 10,
                    marginTop: 30,
                  }}
                />
                {errors.name && (
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      paddingLeft: 10,
                      color: 'red',
                      marginTop: 5,
                    }}
                  >
                    {errors.name}
                  </Text>
                )}
                <TouchableOpacity
                  style={{
                    paddingVertical: 11,
                    paddingHorizontal: 22,
                    borderRadius: 8,
                    backgroundColor: 'lightskyblue',
                    marginTop: 30,
                  }}
                  onPress={() => handleSubmit()}
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
    </>
  );
};

export default LogInScreen;
