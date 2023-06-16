<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useState('logged_in', () => !!localStorage.getItem('access_token'));
</script>
