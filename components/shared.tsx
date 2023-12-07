import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;
