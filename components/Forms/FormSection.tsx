import { View, Text } from 'react-native';
import React, { ReactElement, useState } from 'react';
import UploadForm from './UploadForm';
import RegularButton from '../Buttons/RegularButton';
import AiForm from './AiForm';
import ToggleButton from '../Buttons/ToggleButton';

const FormSection = (): ReactElement => {
  const [formType, setFormType] = useState('upload');

  return (
    <>
      <ToggleButton
        onPress={() => {
          formType === 'upload' ? setFormType('ai') : setFormType('upload');
        }}
        textStyle={{}}
      >
        Toggle form
      </ToggleButton>
      {formType === 'ai' ? <AiForm /> : <UploadForm />}
    </>
  );
};

export default FormSection;
