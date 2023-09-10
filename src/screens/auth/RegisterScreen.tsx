import React from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { registerUser } from '../../services/query';
import FormSubmitButton from '../../components/auth/FormSubmitButton';
import BottomPressableText from '../../components/auth/BottomPressableText';

import { MainStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'AuthRegister'>;

interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const initialValues: RegisterFormValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email should be valid email address')
      .required('This field is required'),
    name: Yup.string()
      .min(2, 'Name shoud have at least 2 characters')
      .required('This field is required'),
    password: Yup.string()
      .min(5, 'Password shoud have at least 5 characters')
      .required('This field is required'),
    confirmPassword: Yup.string()
      .min(5, 'Password shoud have at least 5 characters')
      .required('This field is required'),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: registerUser,
    onError: (err) => console.log(err),
    onSuccess: () => {
      navigation.navigate('MoviesList');
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Spinner visible={isLoading} />
        <Text style={styles.title}>Mini Movies List</Text>
        <View style={styles.bodyContainer}>
          <Text style={styles.subtitle}>Create new account</Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={(values) => {
              Keyboard.dismiss();
              if (values.password !== values.confirmPassword) {
                Alert.alert(
                  'Validation error',
                  'Password and Confirm password must be equal'
                );
                return;
              }
              mutate({
                email: values.email,
                name: values.name,
                password: values.password,
                confirmPassword: values.confirmPassword,
              });
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
              const showNameError = errors.name && touched.name;
              const showPasswordError = errors.password && touched.password;
              const showConfirmPasswordError =
                errors.confirmPassword && touched.confirmPassword;

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
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder="User name"
                    style={[
                      styles.formTextInput,
                      {
                        borderColor: showNameError ? 'red' : 'lightslategrey',
                        marginTop: 30,
                      },
                    ]}
                  />
                  {showNameError && (
                    <Text style={styles.formErrorText}>{errors.name}</Text>
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
                  <TextInput
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Confirm password"
                    secureTextEntry
                    style={[
                      styles.formTextInput,
                      {
                        borderColor: showConfirmPasswordError
                          ? 'red'
                          : 'lightslategrey',
                        marginTop: 30,
                      },
                    ]}
                  />
                  {showConfirmPasswordError && (
                    <Text style={styles.formErrorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <FormSubmitButton
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    title="Sign Up"
                  />
                </View>
              );
            }}
          </Formik>
        </View>
        <BottomPressableText
          messageText="Already have an account? "
          actionText="Sign In"
          onPress={() => navigation.pop()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('window').height,
  },
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

export default RegisterScreen;
