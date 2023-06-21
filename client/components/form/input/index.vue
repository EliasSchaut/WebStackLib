<template>
  <div>
    <div class="flex items-center justify-between">
      <label
        :for="id"
        class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >{{ label }}</label
      >
      <div v-if="side_link !== null" class="text-sm">
        <NuxtLink
          :to="side_link.href"
          class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >{{ side_link.label }}</NuxtLink
        >
      </div>
    </div>
    <div class="relative mt-2 rounded-md shadow-sm">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <component
          :is="icon()"
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        :id="id"
        :name="id"
        :type="type"
        :autocomplete="type"
        :required="required"
        class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EnvelopeIcon } from '@heroicons/vue/20/solid';

export default defineComponent({
  name: 'FormInput',
  components: { EnvelopeIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => 'email' | 'password',
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    icon: {
      type: Function,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    side_link: {
      type: Object as PropType<{ label: string; href: string }>,
      default: null,
    },
  },
});
</script>
