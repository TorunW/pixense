import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const StyledInputContainer = styled.View`
  width: 90%;
`;

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: `${colors.grayLight}`,
  cursorColor: `${colors.white}`,
  underlineColorAndroid: 'transparent',
})`
  font-family: Poppins-Regular;
  font-size: 15px;
  text-align: left;
  border: solid 1px ${colors.outline};
  border-radius: 5px;
  padding: 8px;
  color: ${colors.white};
  width: 100%;
`;

interface InputProps {
  onChange:
    | ((event: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  placeholder: string;
  value: string;
}

const RegularInput = ({
  onChange,
  placeholder,
  value,
}: InputProps): ReactElement => {
  return (
    <StyledInputContainer>
      <StyledInput
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </StyledInputContainer>
  );
};

export default RegularInput;
