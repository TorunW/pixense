import {
  View,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
} from 'react-native';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import RegularText from '../Texts/RegularText';
import RegularButton from '../Buttons/RegularButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStoreState, useStoreActions } from '../../store/module';
import SmallText from '../Texts/SmallText';
import { colors } from '../colors';
import RegularInput from '../TextInputs/RegularInput';
import { API_KEY } from '@env';
import { Configuration, OpenAIApi } from 'openai';
import { Container } from '../shared';
import styled from 'styled-components/native';

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const FormContainer = styled(Container)`
  width: 100%;
  flex: 1;
`;

const AiForm = (): ReactElement => {
  const clickCounter = useStoreState((state) => state.clickCounter);
  const timestamp = useStoreState((state) => state.timestamp);
  const setClickCounter = useStoreActions((actions) => actions.setClickCounter);
  const setTimestamp = useStoreActions((actions) => actions.setTimestamp);
  const [limitReached, setLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getAmountOfClickOnRefresh();
  }, []);

  const getAmountOfClickOnRefresh = async () => {
    const amountOfClicks = await AsyncStorage.getItem('clicks');
    setClickCounter(Number(amountOfClicks));

    const timeOfFirstClick = await AsyncStorage.getItem('timestamp');
    setTimestamp(Number(timeOfFirstClick));
    if (clickCounter >= 1) checkTimelapsedSinceFirstImage();
  };

  const isLimitReached = async () => {
    setIsLoading(true);

    if (clickCounter === 0) {
      const timeOfFirstClick = Date.now();
      setTimestamp(timeOfFirstClick);
      await AsyncStorage.setItem('timestamp', timeOfFirstClick.toString());
      generateImage();
    } else if (clickCounter > 0 && clickCounter < 4) {
      generateImage();
    } else {
      checkTimelapsedSinceFirstImage();
      setIsLoading(false);
    }
  };

  const checkTimelapsedSinceFirstImage = async () => {
    const HOUR = 3600000;
    const TWOMINUTES = 60000 * 2;

    if (timestamp !== null && timestamp + TWOMINUTES <= Date.now()) {
      const newTimestamp = Date.now();

      setLimitReached(false);
      setClickCounter(0);
      setTimestamp(newTimestamp);

      await AsyncStorage.setItem('timestamp', newTimestamp.toString());
      await AsyncStorage.setItem('clicks', '0');
    } else if (timestamp !== null && timestamp + TWOMINUTES > Date.now()) {
      setLimitReached(true);
    }
  };

  const generateImage = async () => {
    const updateClickCounter = clickCounter + 1;
    setClickCounter(updateClickCounter);
    const updatedClickCounterToString = updateClickCounter.toString();
    await AsyncStorage.setItem('clicks', updatedClickCounterToString);

    try {
      const res = await openai.createImage({
        prompt: userPrompt,
        n: 1,
        size: '512x512',
      });
      console.log(res.data.data[0].url);
      if (res.data.data[0]) {
        setImageUrl(res.data.data[0].url as string);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  console.log(clickCounter);

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setUserPrompt(value);
  };

  return (
    <FormContainer>
      <RegularText>AiForm</RegularText>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          width={250}
          height={250}
          style={{ borderRadius: 5, marginVertical: 16 }}
        />
      )}
      <RegularInput
        value={userPrompt}
        onChange={onChange}
        placeholder='what do you want to see'
      />
      {limitReached === true ? (
        <SmallText>Limit reached try again in an hour</SmallText>
      ) : (
        <RegularButton textStyle={{}} onPress={() => isLimitReached()}>
          {isLoading !== true ? (
            `Click here to genertate image ${clickCounter}`
          ) : (
            <ActivityIndicator size='large' color={colors.white} />
          )}
        </RegularButton>
      )}
    </FormContainer>
  );
};

export default AiForm;

// amount of generated images, start at 0 √
// amount of images saved in async storage to prevent close and open app to reset √
// when the first image is generated set current date plus time, save time in async storage
// if 60 minutes has passed, the amount of images will be set back to 0
// if the amount of images is 4, an api request wont be possible (text to explain the user has to wait)
