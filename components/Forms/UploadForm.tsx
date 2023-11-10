import { View } from 'react-native';
import React, { ReactElement, useEffect } from 'react';
import RegularText from '../Texts/RegularText';

import { useStoreDispatch, useStoreState } from '../../store/module';

const UploadForm = (): ReactElement => {
  const tags = useStoreState((state) => state.tags);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const imageUrl =
      'https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    dispatch.getTags(imageUrl);
  }, []);

  return (
    <View>
      <RegularText>Upload Form</RegularText>
    </View>
  );
};

export default UploadForm;
