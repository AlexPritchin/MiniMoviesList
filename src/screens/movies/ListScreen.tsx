import React from 'react';
import { FlatList, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { deleteMovie, getMoviesList } from '../../services/query';
import { getMovieListItems } from '../../helpers/moviesHelpers';
import FullScreenSpinnerCentered from '../../components/FullScreenSpinnerCentered';
import BottomFloatingActionButton from '../../components/movies/BottomFloatingActionButton';

import { MainStackParamList } from '../../routes/types';
import { MovieItem } from '../../types/moviesTypes';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesList'>;

const MoviesListScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const queryClient = useQueryClient();

  const {data: moviesList, isLoading} = useQuery(
    ['moviesList'],
    getMoviesList,
    {
      select: getMovieListItems,
    },
  );

  const {mutate} = useMutation({
    mutationFn: deleteMovie,
    //onError: (err) => console.log(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['moviesList']});
    },
  });

  let rows: (Swipeable | null)[] = [];
  let prevOpenedRow: Swipeable | null;

  const renderDeleteView = (movieIdToDelete: string) => {
    return (
      <Pressable
        style={{ width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'firebrick' }}
        onPress={() => {
          mutate({ movieId: movieIdToDelete });
        }}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>Delete</Text>
      </Pressable>
    );
  }

  const closePrevOpenedListRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== rows[index])
      prevOpenedRow.close();

    prevOpenedRow = rows[index];
  }

  const renderListItem = (item: MovieItem, index: number) => {
    return (
      <Swipeable
        renderRightActions={() => renderDeleteView(item.id)}
        onSwipeableOpen={() => closePrevOpenedListRow(index)}
        ref={(ref) => (rows[index] = ref)}
      >
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('MoviesDetails', {
              id: item.id,
              title: item.title
            })
          }
        >
          <View style={{ gap: 10, paddingLeft: 30, paddingVertical: 20, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 24 }}>{item.title}</Text>
            <Text style={{ fontSize: 18 }}>{item.year}</Text>
            <Text style={{ fontSize: 18 }}>{item.format}</Text>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }

  const renderSeparator = () => {
    return <View style={{ height: 1, marginLeft: 45, marginRight: 30, backgroundColor: 'grey' }}/>;
  }

  return (
    <>
      {isLoading
      ?
        <FullScreenSpinnerCentered />
      : 
        <>
          <FlatList
            data={moviesList}
            renderItem={({item, index}) => renderListItem(item, index)}
            style={{
              backgroundColor: 'white',
            }}
            contentContainerStyle={{
              paddingBottom: 40,
              backgroundColor: 'white',
            }}
            ItemSeparatorComponent={() => renderSeparator()}
          />
          <BottomFloatingActionButton onPress={() => navigation.navigate('MoviesAddMovie')} />
        </>
      }
    </>
  );
}

export default MoviesListScreen;
