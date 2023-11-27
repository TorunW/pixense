import React, { ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Container } from '../components/shared';
import { colors } from '../components/colors';
import BigText from '../components/Texts/BigText';
import SmallText from '../components/Texts/SmallText';
import RegularButton from '../components/Buttons/RegularButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import background from '../assets/backgounds/welcome_bg5.png';
import { RootStackParamList } from '../components/navigators/RootStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const WelcomeContainer = styled(Container)`
  background-color: ${colors.secondary};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.View`
  width: 100%;
  flex: 2;
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

type WelcomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Ai'
>;

const Welcome = (): ReactElement => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();

  return (
    <>
      <StatusBar style='light' />
      <WelcomeContainer>
        <TopSection>
          <LinearGradient
            colors={[
              'transparent',
              'transparent',
              'transparent',
              `${colors.secondary}`,
            ]}
            end={{ x: 0.5, y: 0.99 }}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              zIndex: 10,
            }}
          ></LinearGradient>
          <TopImage source={background} />
        </TopSection>
        <BottomSection>
          <BigText textStyles={{ width: '90%', marginBottom: 16 }}>
            Make sense of your pictures
          </BigText>
          <SmallText textStyles={{ width: '80%', marginBottom: 48 }}>
            Ai generator, giving you tags to your pictures making social media
            posting easier.
          </SmallText>
          <RegularButton
            onPress={() => navigation.navigate('Ai')}
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
