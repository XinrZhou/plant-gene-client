<template>
    <page-tip name="Helps" />
    <v-md-editor v-model="text" autofocus="true" height="80vh" @save="save"></v-md-editor>
</template>

<script setup>
    import PageTip from '~/components/PageTip.vue'
    import { ref } from 'vue'

    let text = ref('Please leave your thoughts here...')

    //保存业务逻辑
    let save = () => {
        alert('你好啊！！')
    }
</script>

<style scoped>

</style>