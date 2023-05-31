<template>
  <PageLeftTitle page-title="Analysis" />
  <el-row>
    <el-col :span="12" class="blast-tip">Blastx/Blastp can be excuted on data stored in our database.</el-col>
  </el-row>
  <el-row class="flex justify-center">
    <el-col :lg="24" :md="24">
      <el-card label="Blast">
        <div class="blast-form">
          <el-form :model="form" label-width="120px" label-position="left">
            <el-form-item label="E-value">
              <el-input v-model="form.sequence" :autosize="{ minRows: 6, maxRows: 10 }"
                :disabled="fileCount>0?true:false" type="textarea" style="width: 70%;" />
            </el-form-item>
            <el-form-item label="Input">
              <el-radio-group v-model="form.category">
                <el-radio label="blastn" />
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
      </el-card>
    </el-col>
  </el-row>

  <el-row class="blast-result flex justify-center" v-if="blastSeqInfo != null">
    <el-col :lg="24" :md="24">
      <el-card>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="blastVersion"
            label-align="left">{{blastSeqInfo.blastVersion}}</el-descriptions-item>
          <el-descriptions-item label="database" label-align="left">{{blastSeqInfo.database}}</el-descriptions-item>
          <el-descriptions-item label="length" label-align="left">{{blastSeqInfo.length}}</el-descriptions-item>
          <el-descriptions-item label="length" label-align="left">{{blastSeqInfo.query}}</el-descriptions-item>
        </el-descriptions>
        <el-tabs v-model="activeName"  type="border-card">
          <el-tab-pane label="Descriptions" name="first">
            <el-table :data="blastSeqList" height="250" style="width: 100%">
              <el-table-column prop="beginDbSeqNumber" label="beginDbSeqNumber" />
              <el-table-column prop="beginQuerySeqNumber" label="beginQuerySeqNumber" />
              <el-table-column prop="dbSeqId" label="dbSeqId" />
              <el-table-column prop="endDbSeqNumber" label="endDbSeqNumber" />
              <el-table-column prop="evalue" label="evalue" />
              <el-table-column prop="length" label="length" />
              <el-table-column prop="misMatchNumber" label="misMatchNumber" />
              <el-table-column prop="querySeqId" label="querySeqId" />
              <el-table-column prop="score" label="score" />
              <el-table-column prop="similar" label="similar" />
              <el-table-column prop="spaceNumber" label="spaceNumber" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Alignments" name="second">
            <div class="blastSeq-alignments" v-for="(item, index) in blastSeqReslt" :key="index">
              <p class="alignments-item">{{item.name}}</p>
              <p class="alignments-item"><span class="text-gray-400">Length:&nbsp;</span>{{item.length}}</p>
              <el-descriptions direction="vertical" :column="5" :size="size" border>
                <el-descriptions-item label="Score">{{item.score}}</el-descriptions-item>
                <el-descriptions-item label="Expect">{{item.expect}}</el-descriptions-item>
                <el-descriptions-item label="Identities">{{item.identities}}</el-descriptions-item>
                <el-descriptions-item label="Gaps">{{item.gaps}}</el-descriptions-item>
                <el-descriptions-item label="Strand">{{item.strand}}</el-descriptions-item>
              </el-descriptions>
              <p class="alignments-sequence">{{item.sequence}}</p>
              <el-divider />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>


</template>

<script setup>
  import PageLeftTitle from '~/components/PageLeftTitle.vue'
  import { reactive, toRaw, ref, computed } from 'vue'
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
  let blastSeqList = computed(() => store.BlastSeqDataList.list)
  let blastSeqInfo = computed(() => store.BlastSeqDataList.mainInfo)
  let blastSeqReslt = computed(() => store.BlastSeqDataList.result)
  const activeName = ref('first')

  const change = (file, lists) => {
    let list = toRaw(lists)
    fileCount.value = list.length
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

    .blast-result {
      margin-top: 40px;
    }
  }

  /* 手机端 */
  @media screen and (max-width: 993px) {
    .el-row {
      max-width: 100%;
    }

    .blast-result {
      margin-top: 40px;
    }
  }

  .blast-tip {
    @apply pt-6 pb-3;
  }

  .blast-form {
    @apply px-7 py-6 bg-white rounded-md text-left;
  }

  .alignments-item {
    @apply font-semibold mb-2;
  }

  .alignments-sequence {
    @apply text-sm my-5 leading-6;
  }

  .el-tabs {
    @apply mt-6;
  }

  .form-btn {
    background-color: #CCD5AE;
  }
</style>