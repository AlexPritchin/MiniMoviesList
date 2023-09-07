import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '../../routes/types';

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'MoviesList'>;

const MoviesListScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const testData = [
    {
      id: 1,
      title: 'Test 1',
      year: '2001',
      format: 'DVD', 
    },
    {
      id: 2,
      title: 'Test 2',
      year: '2002',
      format: 'DVD', 
    },
    {
      id: 3,
      title: 'Test 3',
      year: '2003',
      format: 'DVD', 
    },
    {
      id: 4,
      title: 'Test 4',
      year: '2004',
      format: 'DVD', 
    },
    {
      id: 5,
      title: 'Test 5',
      year: '2005',
      format: 'DVD', 
    },
    {
      id: 6,
      title: 'Test 6',
      year: '2006',
      format: 'DVD', 
    },
    {
      id: 7,
      title: 'Test 7',
      year: '2007',
      format: 'DVD', 
    },
    {
      id: 8,
      title: 'Test 8',
      year: '2008',
      format: 'DVD', 
    },
    {
      id: 9,
      title: 'Test 9',
      year: '2009',
      format: 'DVD', 
    },
    {
      id: 10,
      title: 'Test 10',
      year: '2010',
      format: 'DVD', 
    },
  ];

  const renderListItem = (item: any) => {
    return (
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 24 }}>{item.title}</Text>
        <Text style={{ fontSize: 18 }}>{item.year}</Text>
        <Text style={{ fontSize: 18 }}>{item.format}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={testData}
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
      ItemSeparatorComponent={() => (<View style={{ height: 1, marginVertical: 25, marginLeft: 15, backgroundColor: 'grey' }} />)}
    />
  );
}

export default MoviesListScreen;
