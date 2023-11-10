import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import RegularText from '../Texts/RegularText';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${colors.primary};
  width: 100%;
  padding: 20px;
  border-radius: 20px;
`;

interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  textStyle: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const ToggleButton = ({
  btnStyles,
  onPress,
  textStyle,
  children,
}: ButtonProps): ReactElement => {
  return (
    <ButtonView onPress={onPress} style={btnStyles}>
      <RegularText textStyles={textStyle}>{children}</RegularText>
    </ButtonView>
  );
};

export default ToggleButton;
