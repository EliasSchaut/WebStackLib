<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <SunIcon
          v-if="settings.theme === 'light'"
          class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <MoonIcon
          v-else-if="settings.theme === 'dark'"
          class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <ComputerDesktopIcon
          v-else
          class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              @click="settings.setTheme('light')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <SunIcon
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Light
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="settings.setTheme('dark')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <MoonIcon
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Dark
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="settings.setTheme('system')"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex items-center px-4 py-2 text-sm',
              ]"
            >
              <ComputerDesktopIcon
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              System
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { settingsStore } from '~/store/settings';
export default defineComponent({
  name: 'theme',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
    ChevronDownIcon,
  },
  setup() {
    return {
      settings: settingsStore(),
    };
  },
});
</script>
