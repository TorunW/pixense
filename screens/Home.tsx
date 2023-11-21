import React, { ReactElement, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Container } from '../components/shared';
import background from '../assets/backgounds/home_bg.png';
import ToggleButton from '../components/Buttons/ToggleButton';
import AiForm from '../components/Forms/AiForm';
import UploadForm from '../components/Forms/UploadForm';

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Home = (): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BackgroundImage source={background}>
      <StatusBar style='light' />
      <ToggleButton
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        selectedIndex={selectedIndex}
        buttons={['Ai', 'Upload']}
      />

      {selectedIndex === 0 ? <AiForm /> : <UploadForm />}
    </BackgroundImage>
  );
};

export default Home;
