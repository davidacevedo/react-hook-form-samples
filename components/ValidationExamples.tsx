import * as React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormRow,
  Form,
} from '@appfolio/react-gears';
import { useForm } from 'react-hook-form';
import { refToInnerRef } from '../utils';

interface FormFields {
  firstName: string;
  lastName: string;
}

export default function ValidationExamples({ submit }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });
  
  const onSubmit = (data: FormFields) => {
    submit(data)
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader className="bg-info">
          <CardTitle>Hook Form With Validations</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
              label="First name"
              feedback={errors.firstName?.message}
              {...refToInnerRef(register('firstName', {
                required: 'first name needed',
                validate: {
                  custom1: (val) => val.length > 5 || 'not greater than 5'
                }
              }))}
            />
            <FormRow
              label="Last name"
              feedback={errors.lastName?.message}
              {...refToInnerRef(register('lastName', { required: 'last name needed'}))}
            />
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export function OldFormValidationsExample({ submit }: any) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('')
  const [lastNameError, setLastNameError] = React.useState('')
  
  const firstNameValid = () => {
    if (firstName.length > 0) {
      return true;
    }
    setFirstNameError('first name invalid');
  }

  const lastNameValid = () => {
    if (firstName.length > 0) {
      return true;
    }

    setLastNameError('last name invalid');
    return false;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const firstValid = firstNameValid();
    const lastValid = lastNameValid();
    if (!firstValid || !lastValid) {
      return;
    }

    submit({ firstName, lastName });
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader className="bg-info">
          <CardTitle>Old Form Validations Example</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <FormRow
              label="First name"
              name="first"
              onChange={(e) => setFirstName(e.target.value)}
              feedback={firstNameError}
              onBlur={firstNameValid}
            />
            <FormRow
              label="Last name"
              name="last"
              onChange={(e) => setLastName(e.target.value)}
              feedback={lastNameError}
              onBlur={lastNameValid}
            />
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
