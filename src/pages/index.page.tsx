import * as React from 'react';
import { TiArrowLoopOutline } from 'react-icons/ti';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { REPOSITORY_URL } from '@/constant/repo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <TiArrowLoopOutline className='text-6xl text-primary-600' />

            <Typography as='h1' variant='j1' className='mt-2'>
              Recursive Components
            </Typography>
            <Typography variant='b3' color='tertiary'>
              Useful recursive components pattern that I've built with React
            </Typography>
            <Typography variant='b3' className='mt-6' color='secondary'>
              <ArrowLink href={REPOSITORY_URL}>See the repository</ArrowLink>
            </Typography>

            <div className='mt-6'>
              <Typography as='h2' variant='h6'>
                Example:
              </Typography>
              <div className='mt-2 flex flex-wrap justify-center gap-2'>
                {examples.map(({ title, route }) => (
                  <ButtonLink key={route} href={route} variant='outline'>
                    {title}
                  </ButtonLink>
                ))}
              </div>
            </div>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://theodorusclarence.com?ref=aether-design-system'>
                Theodorus Clarence
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

//#region  //*=========== Example ===========
const examples = [
  {
    title: 'Nested Form',
    route: '/nested-form',
  },
  {
    title: 'Navigation',
    route: '/navigation',
  },
];
//#endregion  //*======== Example ===========
