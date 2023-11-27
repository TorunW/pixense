import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import background from '../assets/backgounds/home_bg.png';
import TagForm from '../components/Forms/TagForm';
import BigImage from '../components/Images/BigImage';
import placeholder_img from '../assets/backgounds/instagram-model-outfit-in-a-greenhouse-full-body.png';
import { useStoreState } from '../store/module';
import FormNaigator from '../components/navigators/FormNavigator';
import UploadForm from '../components/Forms/UploadForm';

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  padding: 25px;
  padding-top: 0;
  gap: 16px;
  justify-content: flex-end;
`;

const Upload = (): ReactElement => {
  const imageUrl = useStoreState((state) => state.selectedImage);

  return (
    <BackgroundImage source={background}>
      <StatusBar style='light' />
      <FormNaigator />
      <BigImage
        source={imageUrl !== '' ? { uri: imageUrl } : placeholder_img}
      />
      <BottomSection>
        {imageUrl !== '' ? <TagForm /> : ''}
        <UploadForm />
      </BottomSection>
    </BackgroundImage>
  );
};

export default Upload;
