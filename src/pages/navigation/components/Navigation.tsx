import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { IconType } from 'react-icons';
import {
  FiChevronDown,
  FiFileText,
  FiGithub,
  FiGitPullRequest,
  FiGlobe,
  FiHome,
  FiNavigation,
  FiPackage,
  FiTwitter,
  FiUser,
} from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

export type Navigation = {
  name: string;
  href: string;
  icon: IconType;
  /**
   * Use this when the route is also used as a nested route
   * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
   */
  exactMatch?: boolean;
  children?: Navigation[];
};

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

export const navigations: Navigation[] = [
  {
    name: 'Home',
    href: '/',
    icon: FiHome,
    exactMatch: true,
  },
  {
    name: 'Examples',
    href: '#',
    icon: FiPackage,
    children: [
      {
        name: 'Nested Form',
        href: '/nested-form',
        icon: FiFileText,
      },
      {
        name: 'Navigation',
        href: '/navigation',
        icon: FiNavigation,
      },
    ],
  },
  {
    name: 'About Me',
    href: '#',
    icon: FiUser,
    children: [
      {
        name: 'Twitter',
        href: 'https://twitter.com/th_clarence',
        icon: FiTwitter,
      },
      {
        name: 'GitHub',
        href: 'https://github.com/theodorusclarence',
        icon: FiGithub,
      },
      {
        name: 'Personal Website & Blog',
        href: 'https://theodorusclarence.com',
        icon: FiGlobe,
      },
      {
        name: 'Documentation',
        href: '#',
        icon: FiFileText,
        children: [
          {
            name: 'Introduction',
            href: 'https://docs.thcl.dev',
            icon: FiGlobe,
          },
          {
            name: 'Bash Workflow Shortcuts',
            href: 'https://docs.thcl.dev/mac/bash-shortcuts',
            icon: FiGitPullRequest,
          },
        ],
      },
    ],
  },
];

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav className={clsxm('', className)} {...rest}>
      <div className='space-y-1.5'>
        {navigations.map((nav) =>
          nav.children ? (
            <NestedNavigation key={nav.name} navigation={nav} />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} />
          )
        )}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: Navigation;
}) {
  const router = useRouter();
  // Recursively check if any children is active
  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? router.pathname === n.href
          : router.pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  return (
    <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'hover:bg-primary-50',
              'text-typo-secondary',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
            )}
          >
            <navChildren.icon
              className={clsx(
                'mr-1.5 flex-shrink-0',
                'text-lg text-typo-secondary',
                open && 'mt-[1px] self-start'
              )}
              aria-hidden='true'
            />
            <span className={clsx('text-left', !open && 'truncate')}>
              {navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                'flex-shrink-0',
                'ml-auto text-lg text-typo-icons',
                open && 'mt-[1px] rotate-180 self-start'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={clsx(['ml-5 mt-0.5'])}>
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation key={nav.name} navigation={nav} />
              ) : (
                <NavigationLink key={nav.name} navigation={nav} />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: Navigation;
  className?: string;
}) {
  const router = useRouter();
  const isActive = navigation.exactMatch
    ? router.pathname === navigation.href
    : router.pathname.startsWith(navigation.href);

  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        isActive ? 'bg-primary-200' : 'hover:bg-primary-50',
        'text-typo-secondary',
        'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500  focus-visible:ring-offset-secondary-500',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <navigation.icon
        className={clsx('mr-1.5 flex-shrink-0', 'text-lg text-typo-secondary')}
        aria-hidden='true'
      />
      <span className='truncate'>{navigation.name}</span>
    </UnstyledLink>
  );
}
