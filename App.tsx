import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from '@appfolio/react-gears';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import SimpleForm, { OldForm } from './components/SimpleForm';
import ValidationExamples, { OldFormValidationsExample } from './components/ValidationExamples';
import ComplicatedForm from './components/ComplicatedForm';

export const refToInnerRef = ({ ref, ...rest }: UseFormRegisterReturn) => {
  return { ...rest, innerRef: ref };
};

export default function NewUser() {
  const [page, setPage] = React.useState<'simple' | 'validation' | 'complicated'>('simple');
  const [dialogText, setDialogText] = React.useState('');

  const onSubmit = (data: any) => {
    setDialogText(JSON.stringify(data, null, 2));
  };

  let form;

  if (page ==='simple') {
    form = (
      <React.Fragment>
        <SimpleForm submit={onSubmit} />
        <OldForm submit={onSubmit} />
      </React.Fragment>
    )
  } else if (page ==='validation') {
    form = (
      <React.Fragment>
        <ValidationExamples submit={onSubmit} />
        <OldFormValidationsExample submit={onSubmit} />
      </React.Fragment>
    )
  } else {
    form = (
      <React.Fragment>
        <ComplicatedForm submit={onSubmit} />
      </React.Fragment>
    )
  }



  return (
    <React.Fragment>
      <Button onClick={() => setPage('simple')}>Simple</Button>
      <Button onClick={() => setPage('validation')}>Validation</Button>
      <Button onClick={() => setPage('complicated')}>Complicated</Button>

      {form}

      <Modal isOpen={!!dialogText} size="md" autoFocus={false}>
        <ModalHeader>New user data that could be sent to an endpoint</ModalHeader>
        <ModalBody>
          <pre>{dialogText}</pre>
          <Button onClick={() => setDialogText('')}>Close</Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
