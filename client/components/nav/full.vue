<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <NuxtLink
              v-for="link in navigation"
              :to="link.href"
              :class="[
                link.current
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
              ]"
              >{{ link.name }}</NuxtLink
            >
          </div>
        </div>
        <div
          v-if="auth.logged_in"
          class="hidden sm:ml-6 sm:flex sm:items-center"
        >
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/profile/settings"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</NuxtLink
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="profile/settings"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</NuxtLink
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/logout"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Sign out</NuxtLink
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div v-else class="flex flex-1 items-center justify-end gap-x-6">
          <NuxtLink
            to="/login"
            class="hidden sm:block sm:text-sm sm:font-semibold sm:leading-6 sm:text-gray-900"
            >Log in</NuxtLink
          >
          <NuxtLink
            to="/sign_up"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Sign up</NuxtLink
          >
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton
          v-for="link in navigation"
          as="NuxtLink"
          :to="link.href"
          :class="[
            link.current
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
          ]"
          >{{ link.name }}</DisclosureButton
        >
      </div>
      <div v-if="auth.logged_in" class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium text-gray-500">tom@example.com</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            as="NuxtLink"
            to="/profile"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Your Profile</DisclosureButton
          >
          <DisclosureButton
            as="NuxtLink"
            to="/settings"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Settings</DisclosureButton
          >
          <DisclosureButton
            as="NuxtLink"
            to="/logout"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
      <div v-else class="border-t border-gray-200 pb-3 pt-4">
        <DisclosureButton
          as="NuxtLink"
          to="/login"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >Log in</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { authStore } from '~/store/auth';

export default defineComponent({
  name: 'NavFull',
  setup() {
    return {
      auth: authStore(),
    };
  },
  data() {
    return {
      navigation: [
        {
          name: 'Home',
          href: '/',
          current: true,
        },
        {
          name: '???',
          href: '#',
          current: false,
        },
      ] as Array<{ name: string; href: string; current: boolean }>,
    };
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
