import React from 'react';
import {
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
      style={{
        paddingVertical: 11,
        paddingHorizontal: 22,
        borderRadius: 8,
        backgroundColor: rest.disabled ? 'lightgrey' : 'lightskyblue',
        marginTop: 30,
      }}
      {...rest}
    >
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;
