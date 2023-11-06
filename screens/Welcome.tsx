import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Container } from '../components/shared';
import { colors } from '../components/colors';
import BigText from '../components/Texts/BigText';
import SmallText from '../components/Texts/SmallText';
import RegularButton from '../components/Buttons/RegularButton';
import background from '../assets/backgounds/welcome_bg.jpeg';

const WelcomeContainer = styled(Container)`
  background-color: ${colors.secondary};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.View`
  width: 100%;
  flex: 1;
  max-height: 55%;
`;

const TopImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const BottomSection = styled.View`
  width: 100%;
  padding: 25px;
  flex: 1;
  justify-content: flex-end;
`;

const Welcome = (): ReactElement => {
  return (
    <>
      <StatusBar style='light' />
      <WelcomeContainer>
        <TopSection>
          <TopImage source={background} />
        </TopSection>
        <BottomSection>
          <BigText textStyles={{ width: '70%', marginBottom: 25 }}>
            Make sense of your pictures
          </BigText>
          <SmallText textStyles={{ width: '70%', marginBottom: 25 }}>
            Best ai generator, giving you captions to your pictures making
            social media posting easier.
          </SmallText>
          <RegularButton
            onPress={() => {
              console.log('pushbtn');
            }}
            textStyle={{}}
          >
            Get Started
          </RegularButton>
        </BottomSection>
      </WelcomeContainer>
    </>
  );
};
export default Welcome;
