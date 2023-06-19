<template>
  <Err501 />
  <button @click="auth.logged_in = !auth.logged_in">
    logged_in: {{ auth.logged_in }}
  </button>
</template>

<script setup lang="ts">
import { authStore } from '~/store/auth';
const auth = authStore();
</script>
