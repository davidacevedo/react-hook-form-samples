import * as React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormRow,
  Form,
  Row,
  Col,
  HasManyFieldsAdd
} from '@appfolio/react-gears';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { refToInnerRef } from '../utils';

interface Tenant {
  first: string;
  last: string;
}

interface FormFields {
  tenant: Tenant[];
}

function FirstLast({ index }: { index: number }) {
  const { register, formState: { errors } } = useFormContext<FormFields>();
  console.log(errors);
  return (
    <Row>
      <Col>
        <FormRow
          feedback={errors?.tenant?.[index]?.first?.message}
          stacked
          label="First name"
          {...refToInnerRef(register(
            `tenant.${index}.first`,
            { required: 'first name needed', shouldUnregister: true }
          ))}
        />
      </Col>
      <Col>
        <FormRow
          feedback={errors?.tenant?.[index]?.last?.message}
          stacked
          label="Last name"
          {...refToInnerRef(register(
            `tenant.${index}.last`,
            { required: 'last name needed', shouldUnregister: true }
          ))}
        />
      </Col>
    </Row>
  )
}

export default function ComplicatedForm({ submit }: any) {
  const formMethods = useForm<FormFields>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const { handleSubmit } = formMethods;
  const [inputCount, setInputCount] = React.useState(1);
  
  const onSubmit = (data: FormFields) => {
    submit(data)
  };

  const increment = () => setInputCount(inputCount + 1);
  const decrement = () => setInputCount(inputCount - 1 || 1);

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

              <HasManyFieldsAdd type="button" onClick={increment}>Add Tenant</HasManyFieldsAdd>
              <Button className="d-block w-100 my-3" color="danger" onClick={decrement}>Delete Row</Button>

              <Button color="primary" type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </FormProvider>
    </div>
  );
}