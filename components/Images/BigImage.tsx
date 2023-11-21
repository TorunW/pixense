import React, { ReactElement } from 'react';
import styled from 'styled-components/native';

interface ImageProps {
  source: { uri: string };
}

const ImageContainer = styled.Image`
  width: 100%;
  height: 55%;
  object-fit: contain;
`;

const BigImage = ({ source }: ImageProps): ReactElement => {
  return <ImageContainer source={source} />;
};

export default BigImage;
