import React, { ReactElement, useState } from 'react';
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
import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';
import ErrorMessage from '../components/Errors/ErrorMessage';

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
  const imageUrl: string | null = useStoreState((state) => state.aiImageUrl);
  const tagsArr = useStoreState((state) => state.aiImageTags);
  const [error, setError] = useState(false);

  console.log(imageUrl);
  const downloadFromUrl = async (imageUrl: string) => {
    try {
      const filename = `pixense${Date.now()}.png`;
      const localUri = FileSystem.documentDirectory + filename;

      // download the file
      const result = await FileSystem.downloadAsync(imageUrl, localUri);

      await save(result.uri, filename);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  const save = async (uri: string, filename: string) => {
    try {
      if (Platform.OS === 'android') {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              'image/png',
            );

          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        } else {
          // fallback: share if permission denied
          await shareAsync(uri);
        }
      } else {
        await shareAsync(uri);
      }
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  return (
    <BackgroundImage source={background}>
      <StatusBar style='light' />
      <FormNaigator />
      <TopSection>
        {imageUrl ? (
          <IconButton
            name='download'
            color={colors.grayLight}
            size={30}
            onPress={() => downloadFromUrl(imageUrl !== null ? imageUrl : '')}
            btnStyle={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}
          />
        ) : null}
        <BigImage
          source={imageUrl !== '' ? { uri: imageUrl } : placeholder_img}
        />
      </TopSection>
      <BottomSection>
        {error && <ErrorMessage>An error occured, try again.</ErrorMessage>}
        {imageUrl !== '' ? <TagForm data={tagsArr} /> : ''}
        <AiForm />
      </BottomSection>
    </BackgroundImage>
  );
};

export default Ai;
