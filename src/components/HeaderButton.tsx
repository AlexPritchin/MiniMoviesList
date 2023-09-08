import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props extends TouchableOpacityProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
}

const HeaderButton: React.FC<Props> = ({iconName, iconSize = 26, ...rest}) => {
  return (
    <TouchableOpacity {...rest}>
      <MaterialIcons name={iconName} size={iconSize}/>
    </TouchableOpacity>
  );
};

export default HeaderButton;
