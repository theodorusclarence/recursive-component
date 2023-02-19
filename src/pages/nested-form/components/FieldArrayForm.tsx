import clsx from 'clsx';
import * as React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Input from '@/components/forms/Input';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

type FieldArrayFormProps = React.ComponentPropsWithoutRef<'div'>;

type UncircularForm = {
  field_id: { description: string }[];
};

export default function FieldArrayForm({
  className,
  ...rest
}: FieldArrayFormProps) {
  const fieldId = 'field_id';
  const { fields, remove, append } = useFieldArray<UncircularForm>({
    name: fieldId,
    shouldUnregister: true,
  });

  return (
    <div className={clsxm('space-y-3', className)} {...rest}>
      <div className={clsx('border-y-divider divide-y-divider divide-y')}>
        <div className={clsx(['p-3', 'flex items-center gap-3'])}>
          <Typography variant='b2' className='flex-grow'>
            Add sub item here
          </Typography>

          <Button
            className='shrink-0'
            type='button'
            variant='outline'
            onClick={() => append({ description: '' })}
            leftIcon={FiPlus}
          >
            Sub Item
          </Button>
        </div>
        {fields.length > 0 && (
          <>
            {fields.map((field, index) => {
              const tagNumber = `${index + 1}`;
              return (
                <div key={field.id}>
                  <div
                    className={clsx([
                      'flex items-center gap-3',
                      // py-3 for vertical padding
                      'py-3 pl-3 pr-3',
                    ])}
                  >
                    <Tag
                      size='lg'
                      color='secondary'
                      className='min-w-[calc(2ch+1rem)] flex-shrink-0 text-center'
                    >
                      {tagNumber}
                    </Tag>
                    <div className='flex-grow'>
                      <Input
                        containerClassName='w-full'
                        id={`${fieldId}.${index}.description`}
                        label={null}
                        placeholder='Fill in the description'
                        validation={{
                          required: 'Description must be filled',
                        }}
                        hideError
                      />
                    </div>
                    <IconButton
                      type='button'
                      onClick={() => remove(index)}
                      variant='danger'
                      icon={FiTrash2}
                      className='ml-auto min-h-[34px] min-w-[34px]'
                    />

                    {/* Only for placeholder */}
                    <Button
                      className='invisible shrink-0'
                      type='button'
                      variant='outline'
                      leftIcon={FiPlus}
                    >
                      Sub Item
                    </Button>
                  </div>

                  <ChildArrayForm
                    className='-mt-[3.25rem]'
                    depth={2}
                    prefix={tagNumber + '.'}
                    index={index}
                    fieldId={fieldId}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

type ChildArrayFormProps = {
  /** prefix for tag name, append dot (.) if you need to */
  prefix: string;
  /** field index */
  index: number;
  /** depth counter */
  depth: number;
  fieldId: string;
} & React.ComponentPropsWithoutRef<'div'>;

const MAX_DEPTH = 7;
const INDENTATION_SIZE = 0.75;
function ChildArrayForm({
  className,
  prefix,
  index: parentIndex,
  fieldId: parentFieldId,
  depth,
  ...rest
}: ChildArrayFormProps) {
  const fieldId = `${parentFieldId}.${parentIndex}.children`;
  const { append, fields, remove } = useFieldArray({
    name: fieldId,
    shouldUnregister: true,
  });

  const handleAppend = () => {
    append({ description: '' });
  };

  return (
    <div className={clsxm('', className)} {...rest}>
      <div className='flex justify-end pb-3.5 pr-3'>
        {/* This button will be the one that append sub item *before* this child */}
        <Button
          // disable after 3 level of depth
          disabled={depth > MAX_DEPTH + 1}
          type='button'
          onClick={handleAppend}
          variant='outline'
          leftIcon={FiPlus}
        >
          Sub Item
        </Button>
      </div>
      {fields.length > 0 && (
        <div
          className={clsx(
            'border-y-divider divide-y-divider divide-y border-t'
          )}
        >
          {fields.map((field, index) => {
            // dot separator is supplied from prefix
            const tagNumber = `${prefix}${index + 1}`;
            return (
              <div key={field.id}>
                <div
                  className={clsx([
                    'flex items-center gap-3',
                    // py-3 for vertical padding
                    'py-3 pr-3',
                  ])}
                  // pl-3 + pl-3 for each level of depth
                  style={{ paddingLeft: `${depth * INDENTATION_SIZE}rem` }}
                >
                  <Tag
                    size='lg'
                    color='secondary'
                    className='min-w-[calc(2ch+1rem)] flex-shrink-0 text-center'
                  >
                    {tagNumber}
                  </Tag>
                  <div className='flex-grow'>
                    <Input
                      containerClassName='w-full'
                      id={`${fieldId}.${index}.description`}
                      label={null}
                      placeholder='Fill in the description'
                      validation={{
                        required: 'Description must be filled',
                      }}
                      hideError
                    />
                  </div>
                  <IconButton
                    type='button'
                    onClick={() => remove(index)}
                    variant='danger'
                    icon={FiTrash2}
                    className='ml-auto min-h-[34px] min-w-[34px]'
                  />

                  {/* Only for placeholder */}
                  <Button
                    className='invisible shrink-0'
                    type='button'
                    variant='outline'
                    leftIcon={FiPlus}
                  >
                    Sub Item
                  </Button>
                </div>

                <ChildArrayForm
                  className='-mt-[3.25rem]'
                  depth={depth + 1}
                  prefix={tagNumber + '.'}
                  index={index}
                  fieldId={fieldId}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
