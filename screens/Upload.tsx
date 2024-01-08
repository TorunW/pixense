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
import IconButton from '../components/Buttons/IconButton';
import { colors } from '../components/colors';

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const TopSection = styled.View`
  position: relative;
  flex: 1;
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
  const tagsArr = useStoreState((state) => state.uploadedImageTags);
  const error = useStoreState((state) => state.imageUploadError);

  return (
    <BackgroundImage source={background}>
      <StatusBar style='light' />
      <FormNaigator />

      <TopSection>
        {error !== true ? (
          <BigImage
            source={
              imageUrl !== ''
                ? {
                    uri: imageUrl,
                  }
                : placeholder_img
            }
          />
        ) : (
          <IconButton
            type={'material'}
            name={'broken-image'}
            size={100}
            color={colors.white}
            btnStyle={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
      </TopSection>
      <BottomSection>
        {imageUrl !== '' && tagsArr.length > 0 ? (
          <TagForm data={tagsArr} />
        ) : (
          ''
        )}
        <UploadForm />
      </BottomSection>
    </BackgroundImage>
  );
};

export default Upload;
