import React, { ReactElement } from 'react';
import { GestureResponderEvent, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const IconContainer = styled.Pressable`
  height: 50px;
  width: 50px;
`;

interface IconProps {
  name: string;
  size: number;
  color: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  btnStyle: ViewStyle;
}

const IconButton = ({
  name,
  size,
  color,
  onPress,
  btnStyle,
}: IconProps): ReactElement => {
  return (
    <IconContainer style={btnStyle} onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </IconContainer>
  );
};

export default IconButton;
