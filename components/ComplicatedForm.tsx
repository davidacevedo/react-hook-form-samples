import * as React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormRow,
  Form,
  FormGroup,
  Row,
  Col,
  HasManyFieldsAdd
} from '@appfolio/react-gears';
import { FormProvider, useForm, useFormContext, UseFormRegisterReturn } from 'react-hook-form';

interface SampleInputs {
  first: string;
  last: string;
}

export const refToInnerRef = ({ ref, ...rest }: UseFormRegisterReturn) => {
  return { ...rest, innerRef: ref };
};

function FirstLast({ index }: { index: number }) {
  const { register, formState: { errors } } = useFormContext();
  console.log(errors);
  return (
    <Row>
      <Col>
        <FormRow
          feedback={errors?.tenant?.[index]?.first?.message}
          stacked
          label="First name"
          {...refToInnerRef(register(`tenant.${index}.first`, { required: 'first name needed' }))} />
      </Col>
      <Col>
        <FormRow
          feedback={errors?.tenant?.[index]?.last?.message}
          stacked
          label="Last name"
          {...refToInnerRef(register(`tenant.${index}.last`, { required: 'last name needed' }))} />
      </Col>
    </Row>
  )
}

export default function ComplicatedForm() {
  const formMethods = useForm<any>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const { register, handleSubmit } = formMethods;
  const [inputCount, setInputCount] = React.useState(1);
  
  const onSubmit = (data: SampleInputs) => {
    console.log(data)
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <Card className="mb-3">
          <CardHeader className="bg-danger">
            <CardTitle className="bg-blue">Complicated Form</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {new Array(inputCount).fill(0).map((_, index) => <FirstLast key={index} index={index} />)}

              <HasManyFieldsAdd
                type="button"
                onClick={() => setInputCount(inputCount + 1)}
              >
                Add Tenant
              </HasManyFieldsAdd>
              <Button color="primary" type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </FormProvider>
    </div>
  );
}