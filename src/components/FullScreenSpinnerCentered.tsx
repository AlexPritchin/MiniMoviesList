import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const FullScreenSpinnerCentered: React.FC = () => {
  return (
    <View style={styles.containerView}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default FullScreenSpinnerCentered;
