import React, { ReactElement, useState } from 'react';
import UploadForm from './UploadForm';
import AiForm from './AiForm';
import ToggleButton from '../Buttons/ToggleButton';
import { Container } from '../shared';

const FormSection = (): ReactElement => {
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

      {selectedIndex === 0 ? <AiForm /> : <UploadForm />}
    </Container>
  );
};

export default FormSection;
