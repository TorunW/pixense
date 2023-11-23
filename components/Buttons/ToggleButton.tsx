import React, { ReactElement } from 'react';
import { colors } from '../colors';
import { ButtonGroup } from '@rneui/themed';
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
  components: {
    ButtonGroup: {
      containerStyle: {
        borderRadius: 25,
        borderColor: `${colors.secondary}`,
        backgroundColor: 'transparent',
        marginTop: 35,
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
