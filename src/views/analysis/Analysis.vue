<template>
<!--    <PageLeftTitle page-title="Analysis" />-->
    <el-row class="flex justify-center">
      <el-col :lg="24" :md="24">
        <el-tabs style="height: 300px" class="demo-tabs">
          <el-tab-pane label="Blast">
            <p class="blast-tip">Blastx/Blastp can be excuted on data stored in our database.</p>
            <div class="blast-form">
              <el-form :model="form" label-width="120px" label-position="left">
<!--                <el-form-item label="BLAST type">-->
<!--                  <el-select v-model="form.blast" placeholder="select BLAST type" clearable>-->
<!--                    <el-option value="shanghai" />-->
<!--                    <el-option value="beijing" />-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Stress type">-->
<!--                  <el-select v-model="form.stresstype" placeholder="select Stress type" clearable>-->
<!--                    <el-option value="shanghai" />-->
<!--                    <el-option value="beijing" />-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
                <el-form-item label="E-value">
                  <el-input v-model="form.sequence"
                            :autosize="{ minRows: 6, maxRows: 10 }"
                            :disabled="fileCount>0?true:false"
                            type="textarea"
                            style="width: 70%;"/>
                </el-form-item>
                <el-form-item label="Input">
                  <el-radio-group v-model="form.category">
                    <el-radio label="blastn"  />
                    <el-radio label="blastp" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Select File">
                  <el-upload ref="uploadRef" :file-list="fileList" :auto-upload="false" :on-change="change"
                             class="upload-demo">
                    <el-button class="form-btn">Click to upload</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        The file content should conform to txt,fasta format (TXT and fasta are supported).
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button @click="onReset" class="form-btn">Reset</el-button>
                  <el-button @click="onSubmit" class="form-btn" v-loading="submitting">Run BLAST</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import { reactive, toRaw, ref } from 'vue'
    import { useSubmitStore } from '~/store/useSubmitStore.js'
    import { ElMessageBox, ElMessage } from 'element-plus'

    const store = useSubmitStore()

    let form = ref({
        sequence: '',
        category: 'blastn'
    })
    let formData = new FormData()

    let fileList = reactive([])
    let fileCount = ref(0)
    let uploadRef = ref()
    let submitting = ref(false)
    const change = (file, lists) => {
        let list = toRaw(lists)
        fileCount.value = list.length
        console.log(fileCount.value)
        list.forEach(item => {
            formData.append('file', item.raw, item.name);
        });
    }

    const onSubmit = () => {
      submitting.value = true

        // onReset()
        if (fileCount.value > 0) {
          store.reqPostUploadBlastFile(form.value, formData).then(() => {
            submitting.value = false
            ElMessage({
              message: 'blast Successfully!',
              type: 'success',
            })
          }).catch((err) => {
            submitting.value = false
            console.error(err)
          })
        } else {
          store.reqPostUploadBlastSeq(form.value).then(() => {
            submitting.value = false
            ElMessage({
              message: 'blast Successfully!',
              type: 'success',
            })
          }).catch((err) => {
            submitting.value = false
            console.error(err)
          })
        }
    }

    const onReset = () => {
        uploadRef.value.clearFiles()
        formData = new FormData()
        fileCount.value = 0
        form.value = {
          sequence: '',
          category: ''
        }
    }
</script>

<style scoped>
    /* PC端 */
    @media screen and (min-width: 992px) {
      .el-row {
        max-width: 70%;
        margin: 0 auto;
      }
    }
    /* 手机端 */
    @media screen and (max-width: 993px) {
      .el-row {
        max-width: 100%;
      }
    }

    ::v-deep .el-tabs__item {
        @apply text-xl font-semibold pb-4 pt-8;
    }

    .blast-tip {
        @apply mb-4 mt-8;
    }

    .blast-form {
        @apply px-7 py-10 bg-white rounded-md text-left;
    }

    .form-btn {
        background-color: #CCD5AE;
    }
</style>