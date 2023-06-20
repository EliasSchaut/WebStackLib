<template>
  <div v-if="alert.visible">
    <AlertDanger v-if="alert.type === 'danger'" />
    <AlertSuccess v-if="alert.type === 'success'" />
    <AlertWarning v-if="alert.type === 'warning'" />
    <AlertInfo v-if="alert.type === 'info'" />
  </div>
</template>

<script setup lang="ts">
import { alertStore } from '~/store/alert';

const alert = alertStore();
</script>
