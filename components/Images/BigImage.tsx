import React, { ReactElement } from 'react';
import styled from 'styled-components/native';

interface ImageProps {
  source: { uri: string };
}

const ImageContainer = styled.View`
  height: 100%;
  flex: 1;
  padding: 10px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BigImage = ({ source }: ImageProps): ReactElement => {
  return (
    <ImageContainer>
      <Image source={source} />
    </ImageContainer>
  );
};

export default BigImage;
