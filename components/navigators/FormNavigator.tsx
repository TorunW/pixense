import React, { useEffect, useState } from 'react';
import ToggleButton from '../Buttons/ToggleButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/RootStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStoreActions, useStoreState } from '../../store/module';

type WelcomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Ai',
  'Upload'
>;

const FormNavigator = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();
  const buttonValue = useStoreState((state) => state.value);
  const setButtonValue = useStoreActions((actions) => actions.setValue);

  useEffect(() => {
    if (buttonValue === 'ai') {
      navigation.navigate('Ai');
    } else if (buttonValue === 'upload') {
      navigation.navigate('Upload');
    }
  }, [buttonValue]);

  const selectForm = (value: string) => {
    setButtonValue(value);
  };

  return (
    <ToggleButton
      value={buttonValue}
      setValue={(value) => selectForm(value)}
      buttons={[]}
    />
  );
};

export default FormNavigator;
