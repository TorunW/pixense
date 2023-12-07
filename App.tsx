import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import RootStack from './components/navigators/RootStack';
import { StoreProvider } from 'easy-peasy';
import { store } from './store/module';

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);

        //TODO make a error page
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <RootStack onReady={onLayoutRootView} />
    </StoreProvider>
  );
}
