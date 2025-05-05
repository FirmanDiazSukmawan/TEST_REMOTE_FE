import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import BaseColor from '../../component/color/TextColor';
interface iconProps {
  name: string;
  size?: number;
  color?: string;
  focused?: boolean;
}

export default function Icon({name, size = 20, color, focused}: iconProps) {
  useEffect(() => {}, [focused]);
  return (
    <FontAwesome
      name={name}
      size={size}
      color={color ? color : focused ? BaseColor.primary : BaseColor.primary}
    />
  );
}
