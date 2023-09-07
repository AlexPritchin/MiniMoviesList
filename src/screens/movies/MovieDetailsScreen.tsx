import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { getMovieDetails } from '../../services/query';
import { getMovieDetailsItem } from '../../helpers/moviesHelpers';
import FullScreenSpinnerCentered from '../../components/FullScreenSpinnerCentered';

import { MainStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesDetails'>;

const MovieDetailsScreen: React.FC<ScreenProps> = ({ route }) => {
  const { data: movie, isLoading } = useQuery(
    ['movieDetails', { movieId: route.params.id }],
    getMovieDetails,
    {
      select: getMovieDetailsItem,
    }
  );

  return (
    <>
      {isLoading ? (
        <FullScreenSpinnerCentered />
      ) : (
        <ScrollView
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ paddingTop: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', marginLeft: 50, gap: 60 }}>
            <View style={{ gap: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: '500' }}>Year:</Text>
              <Text style={{ fontSize: 22, fontWeight: '500' }}>Format:</Text>
            </View>
            <View style={{ gap: 20 }}>
              <Text style={{ fontSize: 22 }}>{movie?.year}</Text>
              <Text style={{ fontSize: 22 }}>{movie?.format}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 26, fontWeight: '500', marginBottom: 30 }}>
              Actors
            </Text>
            {movie?.actors.map((actorName, index) => (
              <Text key={index} style={{ fontSize: 22, marginBottom: 20 }}>
                {actorName}
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MovieDetailsScreen;
