<template>
  <FormInput
    :id="id"
    type="password"
    :label="$t('common.form.password')"
    placeholder="•••"
    :required="required"
    :icon="KeyIcon"
    :side_link="{
      label: $t('common.form.forgot_password'),
      href: '/login/pw_reset',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { KeyIcon } from '@heroicons/vue/20/solid';

export default defineComponent({
  name: 'FormInputEmail',
  methods: { KeyIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
