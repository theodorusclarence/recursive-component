import * as React from 'react';

import clsxm from '@/lib/clsxm';

enum TagSize {
  'base',
  'lg',
}

export enum TagColor {
  'DEFAULT',
  'secondary',
  'orange',
}

type TagProps = {
  children: React.ReactNode;
  size?: keyof typeof TagSize;
  color?: keyof typeof TagColor;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Tag({
  children,
  className,
  color = 'DEFAULT',
  size = 'base',
  ...rest
}: TagProps) {
  return (
    <div
      className={clsxm(
        [
          size === 'base' && ['py-0.5 text-xs'],
          size === 'lg' && ['py-1 text-sm'],
        ],

        //#region  //*=========== Color ===========
        color === 'DEFAULT' && 'bg-typo-tag text-typo-secondary',
        color === 'secondary' && 'bg-secondary-600 text-secondary-100',
        color === 'orange' && 'bg-orange-100 text-orange-700',
        //#endregion  //*======== Color ===========
        'inline-block rounded-full px-3 font-medium',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
