"use client";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUserStore } from "@/stores/user";
import { User } from "lucide-react";
import { logoutUser } from "@/actions/auth";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Flashcards",
    href: "/flashcards",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                  <Link href="/">
                    <h2 className="font-extralight text-2xl">
                      Next
                      <span className="text-primary font-normal">Flash</span>
                    </h2>
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {links.map(({ name, href }, key) => (
                    <Link
                      href={href}
                      key={key}
                      className={`${
                        pathname === href
                          ? "border-secondary text-text-black"
                          : "border-transparent text-text-black/60 hover:border-text-black/20 hover:text-text-black/70"
                      } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium duration-300`}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-text-black ring-1 ring-inset ring-text-black/10 placeholder:text-text-black/60 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 outline-0 border-0"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {user && (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="relative flex rounded-full cursor-pointer bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user.profilePicture ? (
                          <img
                            className="rounded-full"
                            src={user.profilePicture}
                            alt=""
                          />
                        ) : (
                          <User className="text-text-black/40 border-text-black/40 border rounded-full size-6" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 duration-300"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile/settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 duration-300"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left cursor-pointer duration-300"
                              )}
                              onClick={async () => await logoutUser()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {links.map(({ name, href }, key) => (
                <Disclosure.Button
                  as="a"
                  href={href}
                  key={key}
                  className={`${
                    pathname === href
                      ? "border-secondary bg-text-black/5 text-text-black"
                      : "border-transparent text-text-black/60 hover:border-custom-white/30 hover:bg-text-black/5 hover:text-text-black/80"
                  } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                >
                  {name}
                </Disclosure.Button>
              ))}
            </div>
            {user && (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {user.profilePicture ? (
                      <img
                        className="rounded-full"
                        src={user.profilePicture}
                        alt=""
                      />
                    ) : (
                      <User className="text-text-black/40 border-text-black/40 border rounded-full size-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.username}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/profile/settings"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
