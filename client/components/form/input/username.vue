<template>
  <FormInput
    :id="id"
    type="text"
    label="Username"
    placeholder="max_mustermann"
    :required="required"
    :pattern="username_pattern"
    inside_label="/profile/"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UsernamePattern } from '@@/server/common/validation/patterns/username.pattern';

export default defineComponent({
  name: 'FormInputEmail',
  data() {
    return {
      username_pattern: String(UsernamePattern),
    };
  },
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
