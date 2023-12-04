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
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

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

  const downloadFromUrl = async (imageUrl: string) => {
    console.log('first');
    const filename = `pixense${Date.now()}.png`;
    const result = await FileSystem.downloadAsync(
      imageUrl,
      FileSystem.documentDirectory + filename
    );

    save(result.uri, filename, result.headers['Content-Type']);
  };

  const save = async (uri: string, filename: string, mimetype: string) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

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
            onPress={() => downloadFromUrl(imageUrl)}
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
