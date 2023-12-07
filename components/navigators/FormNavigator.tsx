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
  const selectedIndex = useStoreState((state) => state.selectedIndex);
  const setSelectedIndex = useStoreActions(
    (actions) => actions.setSelectedIndex
  );

  useEffect(() => {
    if (selectedIndex === 0) {
      navigation.navigate('Ai');
    } else if (selectedIndex === 1) {
      navigation.navigate('Upload');
    }
  }, [selectedIndex]);

  const selectForm = (value: number) => {
    setSelectedIndex(value);
  };

  return (
    <ToggleButton
      onPress={(value) => {
        selectForm(value);
      }}
      selectedIndex={selectedIndex}
      buttons={['Ai', 'Upload']}
    />
  );
};

export default FormNavigator;
