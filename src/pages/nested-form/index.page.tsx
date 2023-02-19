import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import FieldArrayForm from '@/pages/nested-form/components/FieldArrayForm';

export default function NestedFormPage() {
  const [submitData, setSubmitData] = React.useState({});
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      field_id: [
        {
          children: [
            {
              description: 'Second Level',
            },
          ],
          description: 'First Level',
        },
      ],
    },
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    logger({ data });
    setSubmitData(data);

    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <Layout>
      <Seo templateTitle='Nested Form' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <Typography as='h1' variant='h1'>
              Nested Form
            </Typography>

            <section className='mt-4'>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='flex max-w-2xl flex-col gap-4 rounded-lg border p-2'
                >
                  <FieldArrayForm />
                  <Button type='submit' className='ml-auto'>
                    Submit Form
                  </Button>
                </form>
              </FormProvider>
            </section>

            <div className='mt-8 overflow-x-auto'>
              <Typography as='h2' variant='h2'>
                Submit Data:
              </Typography>
              <pre className='mt-1 text-sm'>
                {JSON.stringify(submitData, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
