<template>
  <form @submit.prevent="submitVal" novalidate>
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormComponent',
  props: {
    submit: {
      type: Function,
      required: true
    }
  },
  methods: {
    submitVal(e: Event) {
      const form_html = e.target as HTMLFormElement;
      if (!form_html.checkValidity()) {
        form_html.classList.add('was-validated');
      } else {
        this.submit(e, new FormData(form_html));
      }
    }
  }
})
</script>

<style scoped>
form {
  margin: 30px auto 0;
  width: min(400px, 80vw);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
