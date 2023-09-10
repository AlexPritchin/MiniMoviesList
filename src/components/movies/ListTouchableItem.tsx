import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  Text,
  View,
} from 'react-native';

import { MovieItem } from '../../types/moviesTypes';

interface Props extends TouchableHighlightProps {
  movieItem: MovieItem;
}

const ListTouchableItem: React.FC<Props> = ({ movieItem, ...rest }) => {
  return (
    <TouchableHighlight {...rest}>
      <View style={styles.containerView}>
        <Text style={{ fontSize: 24 }}>{movieItem.title}</Text>
        <Text style={{ fontSize: 18 }}>{movieItem.year}</Text>
        <Text style={{ fontSize: 18 }}>{movieItem.format}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  containerView: {
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
});

export default ListTouchableItem;
