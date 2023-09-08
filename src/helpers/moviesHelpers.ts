import { Platform } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

import { MovieItem, MovieDetails } from "../types/moviesTypes";

const getMovieListItems = (data: any): MovieItem[] => {
  return (data as Array<any>).map<MovieItem>((dataItem) => {
    return {
      id: dataItem?.id,
      title: dataItem?.title,
      year: dataItem?.year,
      format: dataItem?.format,
    }
  });
};

const getMovieDetailsItem = (data: any): MovieDetails => {
  const actorsNames = (data?.actors as any[]).map(actorData => actorData.name);

  return {
    id: data?.id,
    title: data?.title,
    year: data?.year,
    format: data?.format,
    actors: actorsNames
  };
};

const pickMoviesFileForImport = async () => {
  const result = await DocumentPicker.getDocumentAsync({ type: 'text/plain', copyToCacheDirectory: false });
  if (result.canceled)
    return;

  const uri =
    Platform.OS === 'android'
      ? result.assets?.[0].uri
      : result.assets?.[0].uri.replace("file://", "");
  const fileName = uri.split('/').pop() ?? '';
  const formData = new FormData();
  formData.append('movies', {
    uri: uri,
    name: fileName,
    type: 'text/plain'
  } as any);
  return formData;
};

export { getMovieListItems, getMovieDetailsItem, pickMoviesFileForImport };