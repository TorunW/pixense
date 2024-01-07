import React, { ReactElement } from 'react';
import { colors } from '../colors';
import { SegmentedButtons } from 'react-native-paper';
import styled from 'styled-components/native';

const ButtonView = styled.View`
  margin: 30px;
`;

interface ButtonProps {
  value: string;
  setValue: (value: string) => void;
  buttons: {
    accessibilityLabel?: string | undefined;
    checkedColor?: string | undefined;
    uncheckedColor?: string | undefined;
    testID?: string | undefined;
  }[];
}

const ToggleButton = ({ value, setValue }: ButtonProps): ReactElement => {
  return (
    <ButtonView>
      <SegmentedButtons
        theme={{ colors: { secondary: 'red' } }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'ai',
            label: 'AI',
            uncheckedColor: colors.grayLight,
            checkedColor: colors.white,
            style: {
              borderColor: `${colors.outline}`,
              backgroundColor:
                value === 'ai' ? `${colors.outline}` : 'transparent',
            },
          },
          {
            value: 'upload',
            label: 'Upload',
            uncheckedColor: colors.grayLight,
            checkedColor: colors.white,
            style: {
              borderColor: `${colors.outline}`,
              backgroundColor:
                value === 'upload' ? `${colors.outline}` : 'transparent',
            },
          },
        ]}
      />
    </ButtonView>
  );
};

export default ToggleButton;
