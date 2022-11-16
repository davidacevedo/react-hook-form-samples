import * as React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  DateInput,
  Modal,
  ModalHeader,
  ModalBody,
  FormRow,
  Form,
} from '@appfolio/react-gears';
import { Controller, useForm, UseFormRegisterReturn, useWatch, FormProvider } from 'react-hook-form';
import SimpleForm, { OldForm } from './components/SimpleForm';
import ValidationExamples, { OldFormValidationsExample } from './components/ValidationExamples';
import ComplicatedForm from './components/ComplicatedForm';

interface User {
  first: string;
  last: string;
  dob: string;
  email: string;
}

export const refToInnerRef = ({ ref, ...rest }: UseFormRegisterReturn) => {
  return { ...rest, innerRef: ref };
};

export default function NewUser() {
  const formStuff = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });
  const { register, handleSubmit, formState: { errors }, control, watch, reset, getValues, trigger } = formStuff;
  
  const [dialogText, setDialogText] = React.useState('');

  const onSubmit = (data: User) => {
    setDialogText(JSON.stringify(data, null, 2));
  };



  return (
    <React.Fragment>
      <SimpleForm />
      <OldForm />
      <br />
      <ValidationExamples />
      <OldFormValidationsExample />
      <br />

      <ComplicatedForm />


      <Card>
        <CardHeader>
          <CardTitle>New user form</CardTitle>
        </CardHeader>
        <CardBody>
          <FormProvider {...formStuff}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormRow
                label="First name"
                defaultValue="stub"
                feedback={errors.first?.message}
                // refToInnerRef is required due to the fact that react-gears/strap uses innerRef
                {...refToInnerRef(register('first', {
                  required: 'First name is required',
                  validate: {
                    custom1: (value) => value.includes('a') || 'does not include a'
                  }
                }))}
              />
              {/* <FormRow label="Last name" {...refToInnerRef(register('last', { required: 'stub' }))} feedback={errors.last?.message} /> */}
              {/* This controller is a bit complicated because the DateInput is internally a Controlled component, read more about Controller here https://react-hook-form.com/api/usecontroller/controller */}
              <Controller
                name="dob"
                rules={{ required: 'dob is required' }}
                render={({ field: { onChange, onBlur } }) => (
                  <FormRow
                    label="Date of birth"
                    type={DateInput}
                    feedback={errors.dob?.message}
                    onChange={(...vals) => {
                      console.log('onChange')
                      onChange(...vals)
                    }}
                    onBlur={() => {
                      console.log('onBlur')
                      onBlur()
                    }}
                  />
                )}
              />
              <FormRow label="Email" {...refToInnerRef(register('email'))} />
              <Button color="primary" type="submit">Submit</Button>
            </Form>
          </FormProvider>
        </CardBody>
      </Card>
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
