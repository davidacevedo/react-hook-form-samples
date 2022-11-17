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

export default function SimpleForm({ submit }: any) {
  const { register, handleSubmit } = useForm<FormFields>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  
  const onSubmit = (data: FormFields) => {
    submit(data)
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader className="bg-success">
          <CardTitle>Simple Form Data</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="First name" {...refToInnerRef(register('firstName'))} />
            <FormRow label="Last name" {...refToInnerRef(register('lastName'))} />
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export function OldForm({ submit }: any) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  
  const onSubmit = (e) => {
    e.preventDefault();

    submit({
      firstName,
      lastName
    })
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader className="bg-success">
          <CardTitle>Old Form</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <FormRow label="First name" name="first" onChange={(e) => setFirstName(e.target.value)} />
            <FormRow label="Last name" name="last" onChange={(e) => setLastName(e.target.value)} />
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
