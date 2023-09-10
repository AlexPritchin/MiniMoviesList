import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ModalSelector from 'react-native-modal-selector';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  deleteMovie,
  getMoviesList,
  importMovies,
  moviesPerPage,
} from '../../services/query';
import {
  getAllMoviesArrayFromPages,
  pickMoviesFileForImport,
} from '../../helpers/moviesHelpers';
import HeaderButton from '../../components/HeaderButton';
import FullScreenSpinnerCentered from '../../components/FullScreenSpinnerCentered';
import BottomFloatingActionButton from '../../components/movies/BottomFloatingActionButton';
import ListDeleteItemView from '../../components/movies/ListDeleteItemView';
import ListTouchableItem from '../../components/movies/ListTouchableItem';

import { MainStackParamList } from '../../routes/types';
import { MovieItem, MovieListSortNameType } from '../../types/moviesTypes';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesList'>;

const MoviesListScreen: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <HeaderButton
            onPress={() => navigation.navigate('MoviesSearch')}
            iconName="search"
            iconSize={28}
          />
          <HeaderButton
            onPress={() => setSortPickerVisible(true)}
            iconName="sort"
            iconSize={30}
          />
          <HeaderButton
            onPress={async () => {
              const moviesFileFormData = await pickMoviesFileForImport();
              if (moviesFileFormData)
                mutateImport({ movieFormData: moviesFileFormData });
            }}
            iconName="file-upload"
            iconSize={28}
          />
        </View>
      ),
    });
  }, [navigation]);

  const queryClient = useQueryClient();

  const sortPickerData = [
    {
      key: 0,
      section: true,
      label: 'Sort list by',
    },
    {
      key: 1,
      label: 'Id',
    },
    {
      key: 2,
      label: 'Title',
    },
    {
      key: 3,
      label: 'Year',
    },
  ];

  const [sortByOption, setSortByOption] = useState<MovieListSortNameType>('id');
  const [sortPickerSelectedKey, setSortPickerSelectedKey] = useState(1);
  const [sortPickerVisible, setSortPickerVisible] = useState(false);

  const currentPage = useRef(0);

  const {
    data: moviesPages,
    isLoading: listQueryLoading,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [
      'moviesList',
      {
        sort: sortByOption,
        order: sortByOption === 'title' ? 'ASC' : 'DESC',
      },
    ],
    getMoviesList,
    {
      getNextPageParam: (lastPage, pages) => {
        const totalPages = Math.ceil(lastPage.total / moviesPerPage);
        if (currentPage.current === pages?.length - 1) {
          currentPage.current++;
        }
        if (currentPage.current >= totalPages) {
          return undefined;
        }
        return currentPage.current;
      },
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (isRefetching) {
      currentPage.current = 0;
    }
  }, [isRefetching]);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteMovie,
    onError: (err) => console.log(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['moviesList'] });
    },
  });

  const { mutate: mutateImport, isLoading: importMutationLoading } =
    useMutation({
      mutationFn: importMovies,
      onError: (err) => console.log(err),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['moviesList'] });
        Alert.alert('Success', 'Movies from chosen file imported');
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
  };

  const closePrevOpenedListRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== rows[index])
      prevOpenedRow.close();

    prevOpenedRow = rows[index];
  };

  const renderListItem = (item: MovieItem, index: number) => {
    return (
      <Swipeable
        renderRightActions={() => renderDeleteView(item.id)}
        onSwipeableOpen={() => closePrevOpenedListRow(index)}
        ref={(ref) => (rows[index] = ref)}>
        <ListTouchableItem
          onPress={() =>
            navigation.navigate('MoviesDetails', {
              id: item.id,
              title: item.title,
            })
          }
          movieItem={item}
        />
      </Swipeable>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {isFetchingNextPage && <ActivityIndicator />}
    </View>
  );

  return (
    <>
      {listQueryLoading && !isFetchingNextPage ? (
        <FullScreenSpinnerCentered />
      ) : (
        <>
          <Spinner visible={importMutationLoading} />
          <ModalSelector
            data={sortPickerData}
            supportedOrientations={['portrait']}
            cancelText="Cancel"
            selectedKey={sortPickerSelectedKey}
            visible={sortPickerVisible}
            customSelector={<></>}
            selectedItemTextStyle={styles.pickerSelectedItemText}
            sectionTextStyle={styles.pickerSectionText}
            onChange={(option) => {
              if (!option.label)
                return;
              
              setSortByOption(
                option.label.toLowerCase() as MovieListSortNameType
              );
              setSortPickerSelectedKey(option.key);
              setSortPickerVisible(false);
            }}
            onModalClose={() => setSortPickerVisible(false)}
          />
          <FlatList
            data={getAllMoviesArrayFromPages(moviesPages?.pages)}
            renderItem={({ item, index }) => renderListItem(item, index)}
            style={{
              backgroundColor: 'white',
            }}
            contentContainerStyle={styles.listContentContainer}
            ItemSeparatorComponent={() => renderSeparator()}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
          <BottomFloatingActionButton
            onPress={() => navigation.navigate('MoviesAddMovie')}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: -7,
  },
  separator: {
    height: 1,
    marginLeft: 45,
    marginRight: 30,
    backgroundColor: 'grey',
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  pickerSelectedItemText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  pickerSectionText: {
    fontWeight: '600',
    fontSize: 20,
  },
  listContentContainer: {
    paddingBottom: 40,
    backgroundColor: 'white',
  },
});

export default MoviesListScreen;
