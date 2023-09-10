import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
}

const FormSubmitButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity
      style={[
        styles.touchable,
        { backgroundColor: rest.disabled ? 'lightgrey' : 'lightskyblue' },
      ]}
      {...rest}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 11,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginTop: 30,
  },
});

export default FormSubmitButton;
