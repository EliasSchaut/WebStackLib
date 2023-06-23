<template>
  <FormInput
    :id="id"
    type="text"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :pattern="name_pattern"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NamePattern } from '@@/server/common/validation/patterns/name.pattern';

export default defineComponent({
  name: 'FormInputEmail',
  data() {
    return {
      name_pattern: String(NamePattern),
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Name',
    },
    placeholder: {
      type: String,
      default: 'John',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
