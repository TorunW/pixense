import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { colors } from '../components/colors';
import { Container } from '../components/shared';
import background from '../assets/backgounds/home_bg.png';
import FormSection from '../components/Forms/FormSection';

const HomeContainer = styled(Container)`
  width: 100%;
  flex: 1;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Home = (): ReactElement => {
  return (
    <HomeContainer>
      <StatusBar style='dark' />
      <BackgroundImage source={background}>
        <FormSection />
      </BackgroundImage>
    </HomeContainer>
  );
};

export default Home;
