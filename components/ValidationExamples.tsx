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
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

interface User {
  first: string;
  last: string;
  dob: string;
  email: string;
}

export const refToInnerRef = ({ ref, ...rest }: UseFormRegisterReturn) => {
  return { ...rest, innerRef: ref };
};

export default function ValidationExamples() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });
  
  const onSubmit = (data: User) => {
    console.log(data)
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
              feedback={errors.first?.message}
              {...refToInnerRef(register('first', {
                required: 'first name needed',
                validate: {
                  custom1: (val) => val.length > 5 || 'not greater than 5',
                  custom2: (val) => val.length < 7 || 'not less than 7'
                }
              }))}
            />
            <FormRow
              label="Last name"
              feedback={errors.last?.message}
              {...refToInnerRef(register('last', { required: 'last name needed'}))}
            />
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export function OldFormValidationsExample() {
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

    console.log({ firstName, lastName });
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
