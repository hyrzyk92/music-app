<script setup lang="ts">
defineProps<{
    type: string;
}>()
</script>

<template>
    <i :class="['iconfont', `icon-${type}`]"></i>
</template>