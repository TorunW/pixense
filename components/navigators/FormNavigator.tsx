import React, { useState } from 'react';
import ToggleButton from '../Buttons/ToggleButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/RootStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type WelcomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Ai',
  'Upload'
>;

const FormNavigator = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectForm = (value: number) => {
    setSelectedIndex(value);

    if (selectedIndex === 0) {
      console.log('navigate to ai');
    } else if (selectedIndex === 1) {
      console.log('navigate to upload');
    }
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
