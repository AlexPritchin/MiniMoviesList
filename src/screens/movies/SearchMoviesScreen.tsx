import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {NativeSyntheticEvent, Platform, SafeAreaView, TextInputFocusEventData, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { deleteMovie, getMoviesList } from '../../services/query';
import { getMovieListItems } from '../../helpers/moviesHelpers';
import FullScreenSpinnerCentered from '../../components/FullScreenSpinnerCentered';
import ListDeleteItemView from '../../components/movies/ListDeleteItemView';
import ListTouchableItem from '../../components/movies/ListTouchableItem';

import { MainStackParamList } from '../../routes/types';
import { MovieItem } from '../../types/moviesTypes';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesSearch'>;

const SearchMoviesScreen: React.FC<ScreenProps> = ({navigation}) => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');

  const {
    data: moviesList,
    isLoading: searchQueryLoading,
    isFetching: searchQueryFetching
  } = useQuery(
    ['searchMovies',
      {
        search: searchText
      }
    ],
    getMoviesList,
    {
      select: getMovieListItems,
      enabled: !!searchText,
    },
  );

  const handleSearchChange = (text: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const enteredText = text.nativeEvent.text;
    if ([1, 2].includes(enteredText.length)) {
      return;
    }
    if (searchQueryLoading) {
      queryClient.cancelQueries({ queryKey: ['searchMovies'] });
    }
    setSearchText(enteredText);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        autoCapitalize: 'none',
        hideNavigationBar: false,
        hideWhenScrolling: false,
        placeholder: Platform.select({
          ios: 'Search by Movie title or Actor name',
          android: 'Search by Title or Actor'
        }),
        onChangeText: (text) => {
          text.persist();
          debouncedResults(text);
        },
      },
    });
  }, [navigation]);

  const {mutate: mutateDelete} = useMutation({
    mutationFn: deleteMovie,
    //onError: (err) => console.log(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['searchMovies']});
      await queryClient.invalidateQueries({queryKey: ['moviesList']});
    },
  });

  let rows: (Swipeable | null)[] = [];
  let prevOpenedRow: Swipeable | null;

  const renderDeleteView = (movieIdToDelete: string) => {
    return (
      <ListDeleteItemView
        onPress={() => {
          mutateDelete({ movieId: movieIdToDelete });
        }}
      />
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
        <ListTouchableItem
          onPress={() =>
            navigation.navigate('MoviesDetails', {
              id: item.id,
              title: item.title
            })
          }
          movieItem={item}
        />
      </Swipeable>
    );
  }

  const renderSeparator = () => {
    return <View style={{ height: 1, marginLeft: 45, marginRight: 30, backgroundColor: 'grey' }}/>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {searchQueryLoading && searchQueryFetching
      ?
        <FullScreenSpinnerCentered />
      : 
        <>
          <KeyboardAwareFlatList
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
            showsVerticalScrollIndicator={false}
          />
        </>
      }
    </SafeAreaView>
  );
};

export default SearchMoviesScreen;
