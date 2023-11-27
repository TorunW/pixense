import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import background from '../assets/backgounds/home_bg.png';
import AiForm from '../components/Forms/AiForm';
import TagForm from '../components/Forms/TagForm';
import BigImage from '../components/Images/BigImage';
import placeholder_img from '../assets/backgounds/image1_78.jpeg';
import { useStoreState } from '../store/module';
import FormNaigator from '../components/navigators/FormNavigator';
import IconButton from '../components/Buttons/IconButton';
import { colors } from '../components/colors';
import { downloadImage } from '../helpers/downloadImage';

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

const Ai = (): ReactElement => {
  const imageUrl = useStoreState((state) => state.aiImageUrl);
  console.log(imageUrl, 'eheheheh');

  return (
    <BackgroundImage source={background}>
      <StatusBar style='light' />
      <FormNaigator />
      <TopSection>
        {imageUrl !== '' ? (
          <IconButton
            name='download'
            color={colors.grayLight}
            size={30}
            onPress={() => downloadImage(imageUrl)}
            btnStyle={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}
          />
        ) : (
          ''
        )}
        <BigImage
          source={imageUrl !== '' ? { uri: imageUrl } : placeholder_img}
        />
      </TopSection>
      <BottomSection>
        {imageUrl !== '' ? <TagForm /> : ''}
        <AiForm />
      </BottomSection>
    </BackgroundImage>
  );
};

export default Ai;
