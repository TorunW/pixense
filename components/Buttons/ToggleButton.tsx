import React, { ReactElement, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, StyleProp } from 'react-native';
import { colors } from '../colors';
import {
  ButtonGroup,
  ButtonGroupProps,
  withTheme,
  makeStyles,
} from '@rneui/themed';
import { ThemeProvider, Button, createTheme } from '@rneui/themed';
import { color } from '@rneui/base';

const theme = createTheme({
  components: {
    ButtonGroup: {
      containerStyle: {
        borderRadius: 25,
        borderColor: `${colors.secondary}`,
        backgroundColor: 'transparent',
      },
      selectedButtonStyle: {
        backgroundColor: `${colors.primary}`,
        borderRadius: 25,
      },
      buttonContainerStyle: {
        borderColor: 'transparent',
      },
      textStyle: { fontFamily: 'Poppins-Regular' },
      selectedTextStyle: { fontFamily: 'Poppins-Medium' },
      /*   
      activeOpacity,
      disabledSelectedStyle,
      selectedButtonStyle,
      selectedTextStyle,
      textStyle, */
    },
  },
});

interface ButtonProps {
  buttons: Array<string>;
  selectedIndex: number;
  onPress: (value: number) => number | void;
}

const ToggleButton = ({
  buttons,
  selectedIndex,
  onPress,
}: ButtonProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={onPress}
      />
    </ThemeProvider>
  );
};

export default ToggleButton;

/* <ButtonView onPress={onPress} style={btnStyles}>
        <RegularText textStyles={textStyle}>Upload</RegularText>
      </ButtonView>
     */
