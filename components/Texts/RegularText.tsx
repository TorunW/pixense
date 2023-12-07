import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TextProps } from './types';

const StyledText = styled.Text`
  font-family: Poppins-Bold;
  font-size: 15px;
  color: ${colors.white};
  text-align: left;
`;

const RegularText = ({ textStyles, children }: TextProps): ReactElement => {
  return <StyledText style={textStyles}>{children}</StyledText>;
};

export default RegularText;
