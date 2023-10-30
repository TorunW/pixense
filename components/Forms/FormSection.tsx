import { View, Text } from 'react-native';
import React, { ReactElement, useState } from 'react';
import UploadForm from './UploadForm';
import RegularButton from '../Buttons/RegularButton';
import AiForm from './AiForm';

const FormSection = (): ReactElement => {
  const [formType, setFormType] = useState('upload');

  return (
    <>
      <RegularButton
        onPress={() => {
          formType === 'upload' ? setFormType('ai') : setFormType('upload');
        }}
        textStyle={{}}
      >
        Toggle form
      </RegularButton>
      {formType === 'upload' ? <UploadForm /> : <AiForm />}
    </>
  );
};

export default FormSection;
