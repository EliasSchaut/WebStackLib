<template>
  <Err501 />
  <button @click="auth = !auth">
    {{ auth }}
  </button>
</template>

<script setup lang="ts">
import { authStore } from '~/store/auth';
//const auth = authStore();
const auth = useState('auth', () => false);
</script>
