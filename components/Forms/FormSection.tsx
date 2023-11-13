import React, { ReactElement, useState } from 'react';
import UploadForm from './UploadForm';
import AiForm from './AiForm';
import ToggleButton from '../Buttons/ToggleButton';
import { Container } from '../shared';

const FormSection = (): ReactElement => {
  const [formType, setFormType] = useState('upload');
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container>
      <ToggleButton
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        selectedIndex={selectedIndex}
        buttons={['Ai', 'Upload']}
      />

      {formType === 'ai' ? <AiForm /> : <UploadForm />}
    </Container>
  );
};

export default FormSection;
