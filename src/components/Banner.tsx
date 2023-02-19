import clsx from 'clsx';
import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BANNER_CONTENT } from '@/lib/content/banner';

import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/typography/Typography';

type BannerProps = React.ComponentPropsWithoutRef<'div'>;

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={FiChevronRight}
      variant='ghost'
      size='sm'
      className='absolute top-1/2 right-0 z-10 flex translate-x-full -translate-y-1/2 items-center rounded-full '
    />
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={FiChevronLeft}
      variant='ghost'
      size='sm'
      className='absolute top-1/2 left-0 z-10 flex -translate-x-full -translate-y-1/2 items-center rounded-full'
    />
  );
}

const settings: Settings = {
  autoplay: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function Banner({ className, ...rest }: BannerProps) {
  return (
    <div
      className={clsx('flex items-center bg-primary-100 py-3', className)}
      {...rest}
    >
      <div className='sm:layout max-w-full px-8 sm:px-0'>
        <Slider {...settings}>
          {BANNER_CONTENT.map((content, index) => (
            <div key={index} className='text-center'>
              <Typography variant='b3' font='averta'>
                {content()}
              </Typography>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
