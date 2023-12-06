import React, { useEffect, useState } from 'react';
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
  console.log(selectedIndex);

  useEffect(() => {
    if (selectedIndex === 0) {
      console.log('navigate to ai');
      navigation.navigate('Ai');
    } else if (selectedIndex === 1) {
      console.log('navigate to upload');
      navigation.navigate('Upload');
    }
  }, [selectedIndex]);

  const selectForm = (value: number) => {
    console.log(value, 'value');
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
