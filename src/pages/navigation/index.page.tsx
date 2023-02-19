import * as React from 'react';
import { FiArrowLeft, FiCode } from 'react-icons/fi';

import Layout from '@/components/layout/Layout';
import IconLink from '@/components/links/IconLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { FILE_PATH } from '@/constant/repo';
import Navigation, {
  navigations,
} from '@/pages/navigation/components/Navigation';

export default function NavigationPage() {
  return (
    <Layout>
      <Seo templateTitle='Navigation' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <header className='flex items-center gap-2 lg:gap-3'>
              <IconLink
                variant='ghost'
                iconClassName='text-lg'
                className='bg-transparent'
                href='/'
                icon={FiArrowLeft}
              />
              <div>
                <Typography as='h1' variant='h1'>
                  Navigation
                </Typography>
                <PrimaryLink
                  href={FILE_PATH + '/src/pages/navigation/index.page.tsx'}
                  className='gap-2'
                >
                  <FiCode />
                  Source code
                </PrimaryLink>
              </div>
            </header>

            <div className='mt-8 overflow-x-auto'>
              <Typography as='h2' variant='h2'>
                Navigation Array:
              </Typography>
              <details>
                <Typography as='summary' variant='b2'>
                  Click to expand
                </Typography>
                <pre className='mt-1 text-xs'>
                  {JSON.stringify(navigations, null, 2)}
                </pre>
              </details>
            </div>

            <div className='mt-10 max-w-sm rounded-lg border border-typo-divider p-2'>
              <Navigation />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
