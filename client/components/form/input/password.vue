<template>
  <FormInput
    :id="id"
    type="password"
    :label="label != null ? label : $t('common.form.password')"
    placeholder="•••"
    :required="required"
    :icon="KeyIcon"
    :pattern="password_pattern"
    :side_label="
      show_forgot_password
        ? {
            label: $t('common.form.forgot_password'),
            href: '/login/pw_reset',
          }
        : null
    "
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { KeyIcon } from '@heroicons/vue/20/solid';
import { PasswordPattern } from '@@/server/common/validation/patterns/password.pattern';

export default defineComponent({
  name: 'FormInputPassword',
  setup() {
    return {
      password_pattern: PasswordPattern,
    };
  },
  methods: { KeyIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    show_forgot_password: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
