import React, { useEffect, useRef } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import * as SecureStore from 'expo-secure-store';

import { logInUser } from '../../services/query';
import FormSubmitButton from '../../components/auth/FormSubmitButton';
import BottomPressableText from '../../components/auth/BottomPressableText';

import { MainStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'AuthLogIn'>;

interface LoginFormValues {
  email: string;
  password: string;
}

const LogInScreen: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token)
        navigation.navigate('MoviesList');
    };

    checkToken();
  }, []);

  const formRef = useRef<FormikProps<LoginFormValues>>(null);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: logInUser,
    onError: (err) => console.log(err),
    onSuccess: () => {
      navigation.navigate('MoviesList');
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Spinner visible={isLoading} />
        <Text style={styles.title}>Mini Movies List</Text>
        <View style={styles.bodyContainer}>
          <Text style={styles.subtitle}>Log in to proceed</Text>
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={(values, { resetForm, validateForm }) => {
              Keyboard.dismiss();
              setTimeout(() => {
                mutate({ email: values.email, password: values.password });
                resetForm();
                validateForm();
              }, 10);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => {
              const showEmailError = errors.email && touched.email;
              const showPasswordError = errors.password && touched.password;

              return (
                <View style={styles.formContainer}>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="email"
                    keyboardType="email-address"
                    style={[
                      styles.formTextInput,
                      {
                        borderColor: showEmailError ? 'red' : 'lightslategrey',
                      },
                    ]}
                  />
                  {showEmailError && (
                    <Text style={styles.formErrorText}>{errors.email}</Text>
                  )}
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Password"
                    secureTextEntry
                    style={[
                      styles.formTextInput,
                      {
                        borderColor: showPasswordError
                          ? 'red'
                          : 'lightslategrey',
                        marginTop: 30,
                      },
                    ]}
                  />
                  {showPasswordError && (
                    <Text style={styles.formErrorText}>{errors.password}</Text>
                  )}
                  <FormSubmitButton
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    title="Sign In"
                  />
                </View>
              );
            }}
          </Formik>
        </View>
        <BottomPressableText
          messageText="Don't have an account yet? "
          actionText="Sign Up"
          onPress={() => {
            formRef.current?.resetForm();
            setTimeout(() => {
              formRef.current?.validateForm();
            }, 10);
            navigation.navigate('AuthRegister');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20%',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal: '10%',
  },
  formTextInput: {
    borderWidth: 1,
    borderRadius: 6,
    height: 37,
    width: '100%',
    paddingLeft: 10,
  },
  formErrorText: {
    width: '100%',
    textAlign: 'left',
    paddingLeft: 10,
    color: 'red',
    marginTop: 5,
  },
});

export default LogInScreen;
