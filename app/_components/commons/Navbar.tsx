'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import LinkButton from './LinkButton'
import { Gem, LogOut } from 'lucide-react'
import { useAuthStore } from '@/app/store/auth'
import Image from "next/image"
import { useProfileStore } from '@/app/store/profileStore'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const menuItensNavigation = [
  { name: 'Configurações', href: '/profile', icon: 'Settings' },
  { name: 'Minha Carteira', href: '/carteira', icon: 'Wallet' },
  { name: 'Suporte', href: '/suporte', icon: 'Headset' }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  const default_avatar = process.env.NEXT_PUBLIC_DEFAULT_AVATAR
  const avatarUrl = typeof profile?.avatar === "string"
    ?
    (profile.avatar as string)
    :
    default_avatar

  const handleLogout = () => {
    logout()
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center
             rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none
              focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href={'/'} className='bg-gray-800 hover:bg-gray-800'>
                <Gem size={30} color="#1fa1b2" strokeWidth={2.5} absoluteStrokeWidth />
              </Link>

            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            {!isAuthenticated
              ? <div className='flex flex-row'>
                <LinkButton
                  href='/auth/login'
                  icon='CircleUserRound'
                  classNameLink='w-15 h-15 bg-gray-800 text-zinc-200 flex items-center justify-center rounded-full'
                  classNameIcon='w-11 h-11'
                  strokeWidth={1.5}
                />
              </div>
              : <Menu as="div" className="flex flex-row relative space-x-4 ml-3">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" />
                </button>
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm
                   focus:outline-none focus:ring-2 focus:ring-white
                    focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>

                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      width={40}
                      height={40}
                      priority
                      style={{ width: "auto", height: "auto" }}
                      className="rounded-full object-cover"
                    />

                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-10 z-10 mt-2 w-48 origin-top-right
                 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5
                  transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform
                   data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75
                    data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <span className="block px-4 py-2 text-sm text-gray-700
                     data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  > Olá <span className='font-bold'>
                      {user?.first_name}
                    </span>
                    <p className='text-gray-700'>{user?.email}</p>
                  </span>
                  <hr className="flex-grow border-t-2 border-gray-400 mb-2" />

                  {
                    menuItensNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <LinkButton href={item.href}
                          title={item.name}
                          classNameLink=''
                          classNameTitle='flex flex-row justify-between text-xs
                       items-center w-full font-semibold text-zinc-800 h-7 px-4'
                          size='16'
                          icon={item.icon}
                        />
                      </MenuItem>
                    ))
                  }

                  <hr className="flex-grow border-t-2 border-gray-400 mt-2" />

                  <MenuItem>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-left"
                    >
                      <div className='flex flex-row justify-between text-xs
                       items-center w-full font-semibold text-zinc-800'
                      >
                        <span>Sair</span>
                        <LogOut />
                      </div>

                    </Button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            }

          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}