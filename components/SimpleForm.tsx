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
import { useForm, UseFormRegisterReturn, FormProvider } from 'react-hook-form';

interface SampleInputs {
  first: string;
  last: string;
}

export const refToInnerRef = ({ ref, ...rest }: UseFormRegisterReturn) => {
  return { ...rest, innerRef: ref };
};

export default function SimpleForm() {
  const { register, handleSubmit } = useForm<any>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  
  const onSubmit = (data: SampleInputs) => {
    console.log(data)
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader className="bg-success">
          <CardTitle>Simple Form Data</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="First name" {...refToInnerRef(register('first'))} />
            <FormRow label="Last name" {...refToInnerRef(register('last'))} />
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export function OldForm() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  
  const onSubmit = (e) => {
    e.preventDefault();

    console.log({
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
