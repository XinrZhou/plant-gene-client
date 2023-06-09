<template>
  <PageLeftTitle page-title="Submit" class="page-title" />
  <el-card shadow="hover">
    <el-row class="flex">
      <el-col :lg="18" :md="18">
        <h3 class="submit-tip ml-4 text-gray-400 ">You can choose to share the data you collected, and we will inform you of the results of the data in time by email.
          If your data is true and valid, we will update your data on the next version of the data set. Thanks again for sharing.</h3>
      </el-col>
    </el-row>
    <el-row class="flex justify-center">
      <el-col :lg="24" :md="24">
        <div class="submit-form">
          <el-form :model="form" label-width="120px" label-position="left">

            <el-form-item>
              <template #label>
                <span class="font-bold">Name</span>
              </template>
              <el-input size="large" v-model="form.name" />
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="font-bold">Organization</span>
              </template>
              <el-input size="large" v-model="form.organization" />
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="font-bold">File</span>
              </template>

              <el-upload ref="uploadRef" :file-list="fileList" :auto-upload="false" :on-change="change"
                class="upload-demo">
                <el-button class="form-btn">Click to <uplo></uplo>ad</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    Hello, you can upload your data regardless of file type(20MB maximum).
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="font-bold">Description</span>
              </template>
              <el-input size="large" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <span class="font-bold">Emails</span>
              </template>
              <el-input size="large" v-model="form.emails" />
            </el-form-item>

            <el-form-item>
              <el-button @click="onReset" class="form-btn">Reset</el-button>
              <el-button @click="onSubmit" class="form-btn" v-loading="submitting">Submit</el-button>
            </el-form-item>
          </el-form>
        </div>

      </el-col>
    </el-row>
  </el-card>
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
    } else if (!form.value.organization) {
      ElMessageBox.alert('Hello!Please enter organization so we can contact you!', 'Tip', {
        confirmButtonText: 'OK'
      })
    } else {
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
  @media screen and (min-width: 992px) {
    .page-title {
      max-width: 70%;
      margin: 0 auto;
    }

    .el-card {
      max-width: 70%;
      margin: 0 auto;
    }
  }

  /* 手机端 */
  @media screen and (max-width: 993px) {
    .page-title {
      max-width: 100%;
    }

    .el-card {
      max-width: 70%;
      margin: 0 auto;
    }
  }

  .el-card {
    @apply mt-6;
  }

  .submit-tip {
    @apply mb-4 mt-4 text-lg;
  }

  .submit-form {
    @apply px-4 py-6 bg-white rounded-md text-left;
  }

  .el-input {
    @apply w-1/2;
  }

  .form-btn {
    background-color: #CCD5AE;
  }
  ::v-deep .el-card {
    --el-card-border-radius: 20px;
  }
</style>