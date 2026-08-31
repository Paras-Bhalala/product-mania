<template>
  <div>sample {{ id }}</div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})

onMounted(() => {
  console.log(props.id)
})
</script>
