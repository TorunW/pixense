import React, { ReactElement } from 'react';
import SmallText from '../Texts/SmallText';
import { colors } from '../colors';
import { View } from 'react-native';

interface ErrorProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorProps): ReactElement => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <SmallText
        textStyles={{
          fontSize: 16,
          textAlign: 'center',
          color: colors.outline,
        }}
      >
        {children}
      </SmallText>
    </View>
  );
};

export default ErrorMessage;
