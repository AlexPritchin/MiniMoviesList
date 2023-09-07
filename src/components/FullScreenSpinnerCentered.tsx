import React from 'react';
import { ActivityIndicator, View } from "react-native";

const FullScreenSpinnerCentered: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <ActivityIndicator size='large'/>
    </View>
  );
}

export default FullScreenSpinnerCentered;