import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LabelForm from './label';
import color from '../color/TextColor';

interface InputProps {
  name: string;
  value: string;
  style?: StyleProp<TextStyle>;
  sectionStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onChange: (text: string) => void;
  onSubmitEditing: (text: string) => void;
  error_messages: [];
  type?: string;
  autoCapitalize?: undefined;
  addOn?: {
    onClick: () => void;
    iconName: string;
    iconSize: number;
    iconColor: string;
    style?: StyleProp<ViewStyle>;
  };
  onFocus?: () => void;
  onBlur?: () => void;
  readOnly?: boolean;
  editable?: boolean;
}

export default function Input(props: InputProps) {
  const handleClickAddon = () => {
    props.addOn?.onClick();
  };

  return (
    <View style={props.sectionStyle}>
      {props?.label ? (
        <LabelForm
          label={props.label}
          error={props.error_messages ? true : false}
        />
      ) : null}
      <TextInput
        style={[
          props.style,
          styles.normalInput,
          styles.input,
          styles.errorInput,
          props.error_messages ? styles.errorInput : styles.normalInput,
        ]}
        secureTextEntry={props.type === 'password'}
        onChangeText={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : undefined}
        onSubmitEditing={
          props.onSubmitEditing
            ? (text: any) => props.onSubmitEditing(text)
            : undefined
        }
        onBlur={props?.onBlur}
        onFocus={props?.onFocus}
        readOnly={props?.readOnly ? true : false}
        editable={props?.editable ? true : false}
      />
      {props.addOn && (
        <TouchableOpacity onPress={handleClickAddon} style={props.addOn.style}>
          <Ionicons
            name={props.addOn.iconName}
            size={props.addOn.iconSize}
            color={props.addOn.iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    width: '100%',
    height: 41.33,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 13,
  },
  normalInput: {
    borderColor: '#e5e7eb',
  },
  errorInput: {
    borderColor: color.danger,
  },
});
