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
                    <el-button class="form-btn">Click to <uplo></uplo>ad</el-button>
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
                <el-button @click="onSubmit" class="form-btn" v-loading="submitting">Submit</el-button>
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
      organization: ''
    })
    let formData = new FormData()

    let fileList = reactive([])
    let fileCount = ref(0)
    let uploadRef = ref()
    let submitting = ref(false)
    const change = (file, lists) => {
        let list = toRaw(lists)
        fileCount.value = list.length
        list.forEach(item => {
            formData.append('file', item.raw, item.name);
        });
    }

    const onSubmit = () => {
        if (fileCount.value == 0) {
            ElMessageBox.alert('Hello!The file cannot be empty!', 'Tip', {
                confirmButtonText: 'OK'
            })
        } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(form.value.emails)) {
            ElMessageBox.alert('Hello!Please input a valid email address so we can contact you!', 'Tip', {
              confirmButtonText: 'OK'
            })
        } else if (!form.value.description) {
          ElMessageBox.alert('Hello!Please enter file description', 'Tip', {
            confirmButtonText: 'OK'
          })
        } else if (!form.value.name) {
          ElMessageBox.alert('Hello!Please enter your name so we can contact you!', 'Tip', {
            confirmButtonText: 'OK'
          })
        }else if (!form.value.organization) {
          ElMessageBox.alert('Hello!Please enter organization so we can contact you!', 'Tip', {
            confirmButtonText: 'OK'
          })
        }else {
          submitting.value = true
          store.uploadFile(form.value, formData)
              .then(() => {
                submitting.value = false
                ElMessage({
                  message: 'Upload Successfully!',
                  type: 'success',
                })
              })
              .catch((err) => {
                submitting.value = false
                console.error(err)
                ElMessageBox.alert('Failed to upload file, please try again later.', 'Tip', {
                  confirmButtonText: 'OK'
                })
              })
          // onReset()
        }
    }

    const onReset = () => {
        uploadRef.value.clearFiles()
        formData = new FormData()
        fileCount.value = 0
        form.value = {
          description: '',
          emails: '',
          name: '',
          organization: ''
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