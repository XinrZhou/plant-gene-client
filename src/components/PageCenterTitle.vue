<!-- 中间标题组件 -->
<template>
    <div class="title"><span>{{pageTitle}}</span></div>
</template>

<script setup>
    import { defineProps } from 'vue'

    defineProps({
      pageTitle: String
    })

</script>

<style scoped>
  .title {
    @apply flex justify-center items-center font-bold pt-5 pb-5 text-4xl my-6
  }
</style>