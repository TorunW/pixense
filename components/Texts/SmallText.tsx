import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TextProps } from './types';

const StyledText = styled.Text`
  font-family: Poppins-Regular;
  font-size: 13px;
  color: ${colors.grayLight};
  text-align: left;
`;

const SmallText = ({ textStyles, children }: TextProps): ReactElement => {
  return <StyledText style={textStyles}>{children} </StyledText>;
};

export default SmallText;
