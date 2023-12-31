import React from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalSelector from 'react-native-modal-selector';

import { addMovie } from '../../services/query';
import FormSubmitButton from '../../components/auth/FormSubmitButton';

import { MainStackParamList } from '../../routes/types';
import { MovieFormatNameType } from '../../types/moviesTypes';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesAddMovie'>;

interface RegisterFormValues {
  title: string;
  year: string;
  format: MovieFormatNameType;
  actors: string[];
}

const AddMovieScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const queryClient = useQueryClient();

  const formatPickerData = [
    {
      key: 0,
      section: true,
      label: 'Movie format',
    },
    {
      key: 1,
      label: 'DVD',
    },
    {
      key: 2,
      label: 'VHS',
    },
    {
      key: 3,
      label: 'Blu-Ray',
    },
  ];

  const initialValues: RegisterFormValues = {
    title: '',
    year: '2021',
    format: 'DVD',
    actors: [],
  };
  const validationSchema = Yup.object({
    title: Yup.string().required('This field is required'),
    year: Yup.string()
      .required('This field is required')
      .test(
        'year-not-greater-than-2021',
        'Year must not be greater than 2021',
        (value) => {
          const yearNum = parseInt(value);
          return yearNum <= 2021;
        }
      ),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: addMovie,
    onError: (err) => console.log(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['moviesList'] });
      navigation.pop();
      Alert.alert('Success', 'New movie added');
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <Spinner visible={isLoading} />
      <View style={styles.mainContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            Keyboard.dismiss();
            mutate({
              title: values.title,
              year: parseInt(values.year),
              format: values.format,
              actors: values.actors.filter((actor) => actor),
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
            setFieldValue,
          }) => {
            const showTitleError = errors.title && touched.title;
            const showYearError = errors.year && touched.year;

            return (
              <View style={styles.formContainer}>
                <TextInput
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholder="Title"
                  style={[
                    styles.formTextInput,
                    {
                      borderColor: showTitleError ? 'red' : 'lightslategrey',
                    },
                  ]}
                />
                {showTitleError && (
                  <Text style={styles.formErrorText}>{errors.title}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('year')}
                  onBlur={handleBlur('year')}
                  value={values.year}
                  placeholder="Year"
                  keyboardType="number-pad"
                  style={[
                    styles.formTextInput,
                    {
                      borderColor: showYearError ? 'red' : 'lightslategrey',
                      marginTop: 30,
                    },
                  ]}
                />
                {showYearError && (
                  <Text style={styles.formErrorText}>{errors.year}</Text>
                )}

                <ModalSelector
                  data={formatPickerData}
                  supportedOrientations={['portrait']}
                  cancelText="Cancel"
                  onChange={(option) => {
                    setFieldValue('format', option.label);
                  }}
                  style={{ width: '100%' }}
                  selectedItemTextStyle={styles.pickerSelectedItemText}
                  sectionTextStyle={styles.pickerSectionText}
                  selectedKey={1}>
                  <TextInput
                    value={values.format}
                    editable={false}
                    style={[
                      styles.formTextInput,
                      {
                        paddingHorizontal: 10,
                        marginTop: 30,
                      },
                    ]}
                  />
                </ModalSelector>

                <Text style={styles.actorsTitle}>Actors</Text>
                <FieldArray
                  name="actors"
                  render={(arrayHelpers: any) => (
                    <>
                      {values.actors.map((actor, index) => (
                        <View key={index} style={styles.actorsContainer}>
                          <TextInput
                            onChangeText={handleChange(`actors[${index}]`)}
                            onBlur={handleBlur(`actors[${index}]`)}
                            value={actor}
                            placeholder="Actor full name"
                            style={[
                              styles.formTextInput,
                              {
                                borderColor: 'lightslategrey',
                                marginTop: 30,
                              },
                            ]}
                          />
                          <Pressable
                            style={styles.removeActorPressable}
                            onPress={() => arrayHelpers.remove(index)}>
                            <Text style={{ fontSize: 16 }}>Remove actor</Text>
                          </Pressable>
                        </View>
                      ))}
                      <Pressable
                        style={styles.addActorPressable}
                        onPress={() => arrayHelpers.push('')}>
                        <Text style={{ fontSize: 18 }}>Add actor</Text>
                      </Pressable>
                    </>
                  )}
                />

                <FormSubmitButton
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  title="Add movie"
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    paddingTop: 50,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
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
  pickerSelectedItemText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  pickerSectionText: {
    fontWeight: '600',
    fontSize: 20,
  },
  actorsTitle: {
    marginTop: 30,
    fontSize: 20,
  },
  actorsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  removeActorPressable: {
    marginTop: 10,
    backgroundColor: '#ffd6e1',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  addActorPressable: {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#9cf3d1',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default AddMovieScreen;
