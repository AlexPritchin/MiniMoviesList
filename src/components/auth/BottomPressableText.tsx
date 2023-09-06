import React from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native';

interface Props extends PressableProps {
  messageText: string;
  actionText: string;
}

const BottomPressableText: React.FC<Props> = ({ messageText, actionText, ...rest }) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
      }}
    >
      <Pressable {...rest}>
        <Text>
          {messageText}
          <Text style={{ color: 'blue' }}>{actionText}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomPressableText;
