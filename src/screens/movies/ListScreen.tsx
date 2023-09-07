import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { getMoviesList } from '../../services/query';
import { getMovieListItems } from '../../helpers/moviesHelpers';
import FullScreenSpinnerCentered from '../../components/FullScreenSpinnerCentered';

import { MainStackParamList } from '../../routes/types';
import { MovieItem } from '../../types/moviesTypes';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesList'>;

const MoviesListScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const {data: moviesList, isLoading} = useQuery(
    ['getMoviesList'],
    getMoviesList,
    {
      select: getMovieListItems,
    },
  );

  const renderListItem = (item: MovieItem) => {
    return (
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 24 }}>{item.title}</Text>
        <Text style={{ fontSize: 18 }}>{item.year}</Text>
        <Text style={{ fontSize: 18 }}>{item.format}</Text>
      </View>
    );
  }

  const renderSeparator = () => {
    return <View style={{ height: 1, marginVertical: 25, marginLeft: 15, backgroundColor: 'grey' }}/>;
  }

  return (
    <>
      {isLoading
      ?
        <FullScreenSpinnerCentered />
      : 
        <FlatList
          data={moviesList}
          renderItem={(data) => renderListItem(data.item)}
          style={{
            backgroundColor: 'white',
          }}
          contentContainerStyle={{
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 40,
            backgroundColor: 'white',
          }}
          ItemSeparatorComponent={() => renderSeparator()}
        />
      }
    </>
  );
}

export default MoviesListScreen;
