<template>
    <PageLeftTitle page-title="Submit" />
    <p class="submit-tip">You can upload the data to our database, and once the review is completed, we will notify you of the results via email.</p>
    <div class="submit-form">
        <el-form :model="form" label-width="120px" label-position="left">
            <el-form-item label="Description">
                <el-input v-model="form.description" />
            </el-form-item>
            <el-form-item label="Emails">
                <el-input v-model="form.emails" />
            </el-form-item>
            <el-form-item label="File">
                <el-upload ref="uploadRef" :file-list="fileList" :auto-upload="false" :on-change="change"
                    class="upload-demo">
                    <el-button class="form-btn">Click to upload</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500KB.
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="Name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Organization">
                <el-input v-model="form.organization" />
            </el-form-item>
            <el-form-item>
                <el-button @click="onReset" class="form-btn">Reset</el-button>
                <el-button @click="onSubmit" class="form-btn">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import { reactive, toRaw, ref } from 'vue'
    import { useSubmitStore } from '~/store/useSubmitStore.js'
    import { ElMessageBox, ElMessage } from 'element-plus'

    const store = useSubmitStore()

    let form = ref({
        description: '',
        emails: '',
        name: '',
        rganization: ''
    })
    let formData = new FormData()

    let fileList = reactive([])
    let fileCount = ref(0)
    let uploadRef = ref()

    const change = (file, lists) => {
        let list = toRaw(lists)
        fileCount.value = list.length
        list.forEach(item => {
            formData.append('file', item.raw, item.name);
        });
    }

    const onSubmit = () => {
        if (fileCount.value == 0) {
            ElMessageBox.alert('The file cannot be empty!', 'Tip', {
                confirmButtonText: 'OK'
            })
        } else {
            store.uploadFile(form, formData)
            onReset()
        }
    }

    const onReset = () => {
        uploadRef.value.clearFiles()
        formData = new FormData()
        fileCount.value = 0
        form.value = {
            blast: '',
            streeStype: '',
            description: '',
            resource: ''
        }
    }

</script>

<style scoped>
    .submit-tip {
        @apply pl-9 mb-8;
    }

    .submit-form {
        @apply ml-9 px-7 py-10 bg-white rounded-md text-left;
    }

    .el-input {
        @apply w-1/2;
    }

    .form-btn {
        background-color: #CCD5AE;
    }
</style>