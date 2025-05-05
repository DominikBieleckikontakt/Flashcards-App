"use client";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUserStore } from "@/stores/user";
import { Plus, User } from "lucide-react";
import { logoutUser } from "@/actions/auth";
import Image from "next/image";
import Button from "./button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const links = [
  {
    name: "Home",
    href: "/",
    auth: false,
  },
  {
    name: "All flashcards",
    href: "/flashcards",
    auth: false,
  },
  {
    name: "Add new flashcard",
    href: "/flashcards/new",
    auth: true,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  return (
    <Disclosure as="nav" className="fixed left-0 top-0 z-10 w-full">
      {({ open }) => (
        <>
          <div className={`mx-auto px-2 sm:px-4 lg:px-8 shadow z-20 bg-white`}>
            <div className="flex h-16 justify-between z-20">
              <div className="flex px-2 lg:px-0">
                <div className="flex items-center mr-6">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <h1 className="font-extralight text-2xl">
                      Next
                      <span className="font-normal bg-gradient-to-br from-primary to-secondary inline-block text-transparent bg-clip-text">
                        Flash
                      </span>
                    </h1>
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6">
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
                      className="block w-full rounded-md py-1.5 pl-10 pr-3 text-dark ring-1 ring-inset ring-dark/10 placeholder:text-dark/60 focus:ring focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 outline-0 border-0"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              {user && (
                <div className="flex items-center">
                  <Link href="/flashcards/new">
                    <Plus className="size-10 bg-gradient-to-br from-primary to-secondary rounded-full p-1 text-light hover:scale-105 duration-300 cursor-pointer" />
                  </Link>
                </div>
              )}
              <div className="hidden lg:ml-1 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="relative flex rounded-full cursor-pointer bg-white text-sm focus:outline-none hover:scale-105 duration-300">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user.profilePicture ? (
                          <Image
                            className="rounded-full size-10 aspect-square object-cover hover:scale-105 duration-300"
                            width={48}
                            height={48}
                            src={user.profilePicture}
                            alt="profile picture"
                          />
                        ) : (
                          <User className="text-dark/40 border-dark/40 border rounded-full size-8 hover:scale-105 duration-300" />
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
                              href="/dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 duration-300"
                              )}
                            >
                              Dashboard
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
                ) : (
                  <Button
                    type="button"
                    styles="bg-gradient-to-br from-primary to-black/10 hover:to-primary hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/login">Get started</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 max-lg:-translate-y-10 lg:-translate-x-full"
            enterTo="opacity-100 max-lg:translate-y-0 lg:translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 max-lg:translate-y-0 lg:translate-x-0"
            leaveTo="opacity-0 max-lg:-translate-y-10 lg:-translate-x-full"
          >
            <Disclosure.Panel className="w-full pt-8 lg:max-w-72 h-[calc(100vh-64px)] transition-all duration-300 shadow-lg bg-white z-10 relative">
              <div className="space-y-1 pb-3 pt-2">
                {links.map(({ name, href, auth }, key) => (
                  <Disclosure.Button
                    as="a"
                    href={href}
                    key={key}
                    className={`${
                      pathname === href
                        ? "border-secondary bg-dark/5 text-dark"
                        : "border-transparent text-dark/60 hover:border-light/30 hover:bg-dark/5 hover:text-dark/80"
                    } ${
                      auth && !user && "hidden"
                    } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                  >
                    {name}
                  </Disclosure.Button>
                ))}
              </div>
              {user ? (
                <div className="border-t border-gray-200 pb-3 pt-4 lg:hidden">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {user.profilePicture ? (
                        <Image
                          className="rounded-full size-8  aspect-square object-cover hover:scale-105 duration-300"
                          width={32}
                          height={32}
                          src={user.profilePicture}
                          alt="profile picture"
                        />
                      ) : (
                        <User className="text-dark/40 border-dark/40 border rounded-full size-8 hover:scale-105 duration-300" />
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
                      href="/dashboard"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Dashboard
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
              ) : (
                <Button
                  type="button"
                  styles="block lg:hidden bg-gradient-to-br from-primary to-black/10 hover:to-primary hover:scale-105 transition-all duration-300 mx-5"
                >
                  <Link href="/login" className="w-full h-full">
                    Get started
                  </Link>
                </Button>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
