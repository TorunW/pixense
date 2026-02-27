import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import RegularText from '../Texts/RegularText';
import RegularButton from '../Buttons/RegularButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStoreState, useStoreActions } from '../../store/module';
import SmallText from '../Texts/SmallText';
import { colors } from '../colors';
import RegularInput from '../TextInputs/RegularInput';
import { API_KEY } from '@env';
import OpenAI from 'openai';
import styled from 'styled-components/native';
import { useStoreDispatch } from '../../store/module';
import ErrorMessage from '../Errors/ErrorMessage';

const openai = new OpenAI({
  apiKey: API_KEY,
});

const InputRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const AiForm = (): ReactElement => {
  const clickCounter = useStoreState((state) => state.clickCounter);
  const timestamp = useStoreState((state) => state.timestamp);
  const setClickCounter = useStoreActions((actions) => actions.setClickCounter);
  const setTimestamp = useStoreActions((actions) => actions.setTimestamp);
  const imageUrl = useStoreState((state) => state.aiImageUrl);
  const setImageUrl = useStoreActions((actions) => actions.setAiImageUrl);
  const [limitReached, setLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    getAmountOfClickOnRefresh();
  }, []);

  useEffect(() => {
    console.log(imageUrl, 'in use effect');
    if (imageUrl) dispatch.getAiImageTags(imageUrl);
  }, [imageUrl]);

  const getAmountOfClickOnRefresh = async () => {
    const amountOfClicks = await AsyncStorage.getItem('clicks');
    setClickCounter(Number(amountOfClicks));

    const timeOfFirstClick = await AsyncStorage.getItem('timestamp');
    setTimestamp(Number(timeOfFirstClick));
    if (clickCounter >= 1) checkTimelapsedSinceFirstImage();
  };

  const isLimitReached = async () => {
    if (userPrompt !== '') {
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
    } else {
      setError(true);
    }
  };

  const checkTimelapsedSinceFirstImage = async () => {
    const HOUR = 36000;

    if (timestamp !== null && timestamp + HOUR <= Date.now()) {
      const newTimestamp = Date.now();

      setLimitReached(false);
      setClickCounter(0);
      setTimestamp(newTimestamp);

      await AsyncStorage.setItem('timestamp', newTimestamp.toString());
      await AsyncStorage.setItem('clicks', '0');
    } else if (timestamp !== null && timestamp + HOUR > Date.now()) {
      setLimitReached(true);
      setError(false);
    }
  };

  const generateImage = async () => {
    const updateClickCounter = clickCounter + 1;
    setClickCounter(updateClickCounter);
    const updatedClickCounterToString = updateClickCounter.toString();
    await AsyncStorage.setItem('clicks', updatedClickCounterToString);

    try {
      const res = await openai.images.generate({
        model: 'dall-e-3',
        prompt: userPrompt,
        n: 1,
        size: '1024x1024',
        response_format: 'url',
      });

      if (res.data && res.data.length > 0 && res.data[0].url) {
        setImageUrl(res.data[0].url as string);
        console.log(res.data[0].url);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log('FULL ERROR:', (error as any)?.response?.data || error);
      const updateClickCounter = clickCounter === 0 ? 0 : -1;
      setClickCounter(updateClickCounter);
      const updatedClickCounterToString = updateClickCounter.toString();
      await AsyncStorage.setItem('clicks', updatedClickCounterToString);
    }

    setIsLoading(false);
  };

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    const value = e.nativeEvent.text;
    setUserPrompt(value);
  };

  return (
    <>
      {error && <ErrorMessage>An error occured, try again.</ErrorMessage>}
      {!limitReached && (
        <InputRow>
          <RegularInput
            value={userPrompt}
            onChange={onChange}
            placeholder='Enter your prompt'
          />
          <SmallText>{clickCounter}/4</SmallText>
        </InputRow>
      )}
      {limitReached === true ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <RegularText
            textStyles={{
              textAlign: 'center',
            }}
          >
            Limit reached try again in an hour
          </RegularText>
        </View>
      ) : (
        <RegularButton
          disable={isLoading !== true ? false : true}
          textStyle={{}}
          onPress={() => isLimitReached()}
        >
          {isLoading !== true ? (
            `Generate`
          ) : (
            <ActivityIndicator size='large' color={colors.white} />
          )}
        </RegularButton>
      )}
    </>
  );
};

export default AiForm;
