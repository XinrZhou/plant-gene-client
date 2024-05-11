<template>
  <PageLeftTitle page-title="Analysis" class="page-style"/>
  <el-row class="page-style">
    <el-col :span="24">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="ProCNNCL" name="five">
          <el-row>
            <el-col :span="24" class="blast-tip">
              A Web Tool for Predicting Amino Acid Sequences using Pre-trained Models
            </el-col>
          </el-row>
          <el-row class="flex justify-center">

            <el-col :lg="24" :md="24">
              <el-card label="Predict" shadow="hover" class="rounded-2xl">
                <div class="blast-form">
                  <p style="margin-bottom: 20px;">
                    Please enter the nucleotide or amino acid sequence and select the corresponding 'predict' model.
                  </p>
                  <el-form :model="predictForm" label-width="120px" label-position="left">
                    <el-form-item label="Sequence">
                      <el-input v-model="predictForm.predictSequence" :autosize="{ minRows: 14, maxRows: 16 }" type="textarea"
                                style="width: 90%;" placeholder=">NP_001288418.1 uncharacterized protein LOC103645754 [Zea mays]
MFSGDWTPPCGSCCTKKYASLVQIPWRVFCKKGCNADGDTWDECIGKCTEICYKDPVLEDRQWSAYIDRSPGQDSYSLECFNACVSGCGFRFDIPTEKVEEIKPNRPSKPSAPEPEVKQTRNADCNEDVPCTSA"/>
                    </el-form-item>
                    <el-form-item label="Model">
                      <el-radio-group v-model="predictForm.modelCategory">
                        <el-radio label="Drought"/>
                        <el-radio label="Salt and Alkali"/>
                        <el-radio label="Cold"/>
                        <el-radio label="UV"/>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="onReset" class="form-btn">Reset</el-button>
                      <el-button :disabled="submittingPredict" @click="onSubmitPredict" class="form-btn" v-loading="submittingPredict">Prediction</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-row class="blast-result flex justify-center ml-auto" v-if="predictSeqList != null">
            <el-col :lg="24" :md="24">
              <el-card shadow="hover">
                <el-table :data="predictSeqList" style="width: 100%">
                  <el-table-column prop="proteinId" label="Entry"/>
<!--                    <template v-slot="{ row }">-->
<!--                      <a v-if="isProteinIdClickable(row.proteinId)" href="" @click.prevent="handleGeneClick(row)"-->
<!--                         class="underline font-bold">{{ row.proteinId }}</a>-->
<!--                      <span v-else>{{ row.proteinId }}</span>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
                  <el-table-column prop="plantName" label="Species"/>
                  <el-table-column prop="prediction" label="Result"/>
                  <el-table-column prop="proteinSequence" label="Sequence" type="proteinSequence" fit>
                    <template v-slot="{ row }">
                      <div class="text-overflow">{{ row.proteinSequence.substring(0,100) }}...</div>
                    </template>
                  </el-table-column>
                </el-table>

                <p style="margin: 20px;">
                  The number of sequences for which an application can make effective predictions is: {{predictSeqNumber}}
                </p>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Blast" name="first">
          <el-row>
            <el-col :span="24" class="blast-tip">
              Blastx/Blastp can be excuted on data stored in our database.
            </el-col>
          </el-row>
          <el-row class="flex justify-center">
            <el-col :lg="24" :md="24">
              <el-card label="Blast" shadow="hover" class="rounded-2xl">
                <div class="blast-form">
                  <el-form :model="form" label-width="120px" label-position="left">
                    <el-form-item label="Sequence">
                      <el-input v-model="form.sequence" :autosize="{ minRows: 10, maxRows: 12 }"
                                :disabled="fileCount > 0 ? true : false" type="textarea" style="width: 70%;"
                                placeholder="Please enter the nucleotide or amino acid sequence and select the corresponding 'blast' type.&#13;>Gene1
MDPFYTSFSDSFLSIPDHRSPVSDSSECSPKLASSCPKKRAGRKKFRETRHPIYRGVRQRNSGKWVCEVREPNKKSRIWLGTFPTVEMAARAHDVAALALRGRSACLNFADSAWRLRIPESTCPKEIQKAAAEAAMAFQNETATTEMMTVVEGVKPAEETVGQTRGETAEENGVFYMDDLRFLEDMAEEMLLPPPELGWNHNDLTGDADVSLWSF"/>
                    </el-form-item>
                    <el-form-item label="Type">
                      <el-radio-group v-model="form.category">
                        <el-radio label="blastn"/>
                        <el-radio label="blastp"/>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Select File">
                      <el-upload ref="uploadRef" :file-list="fileList" :auto-upload="false" :on-change="fileChange"
                                 :on-remove="fileRemove" class="upload-demo" :limit="1" :on-exceed="handleExceed">
                        <el-button class="form-btn">Click to upload</el-button>
                        <template #tip>
                          <div class="el-upload__tip">
                            File types support "txt" and "fasta"
                          </div>
                        </template>
                      </el-upload>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="onReset" class="form-btn">Reset</el-button>
                      <el-button :disabled="submitting" @click="onSubmit" class="form-btn" v-loading="submitting">BLAST</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-row class="blast-result flex justify-center ml-auto" v-if="blastSeqInfo != null">
            <el-col :lg="24" :md="24">
              <el-card shadow="hover">
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="Blast Version"
                                        label-align="left">{{ blastSeqInfo.blastVersion }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Database"
                                        label-align="left">{{ blastSeqInfo.database }}
                  </el-descriptions-item>
                  <el-descriptions-item label="QuerySeq Length"
                                        label-align="left">{{ blastSeqInfo.length }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Query" label-align="left">{{ blastSeqInfo.query }}</el-descriptions-item>
                </el-descriptions>
                <el-tabs v-model="activeName1" type="border-card">
                  <el-tab-pane label="Descriptions" name="second">
                    <el-button @click="handleDownload('table')" class="mr-auto  font-bold text-blue-500">Down
                      Data
                    </el-button>

                    <el-table :data="blastSeqList" style="width: 100%">
                      <el-table-column prop="querySeqId" label="QuerySeqId"/>
                      <el-table-column prop="beginDbSeqNumber" label="StressType"/>
                      <el-table-column prop="endDbSeqNumber" label="ScientificName"/>
                      <el-table-column prop="score" label="Max score"/>
                      <el-table-column prop="similar" label="Similar"/>
                      <el-table-column prop="misMatchNumber" label="MisMatchNumber"/>
                      <el-table-column prop="spaceNumber" label="SpaceNumber"/>
                      <el-table-column prop="evalue" label="E value"/>
                      <el-table-column prop="length" label="length"/>
                      <el-table-column prop="endQuerySeqNumber" label="Gene">
                        <template v-slot="{ row }">
                          <a href="" @click.prevent="handleGeneClick1(row)"
                             class="underline font-bold">{{ row.endQuerySeqNumber }}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="dbSeqId" label="PlantASRGId">
                        <template v-slot="{ row }">
                          <a href="" @click.prevent="handleGeneClick(row)"
                             class="underline font-bold">{{ row.dbSeqId }}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="" label=""/>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="Alignments" name="third" v-if="form.category=='blastn'">
                    <el-button @click="handleDownload('result')" class="mr-auto  font-bold text-blue-500">Down
                      Data
                    </el-button>
                    <div class="blastSeq-alignments" v-for="(item, index) in blastSeqReslt" :key="index">
                      <p class="alignments-item">{{ item.name }}</p>
                      <p class="alignments-item"><span class="text-gray-400">Length:&nbsp;</span>{{ item.length }}</p>
                      <el-descriptions direction="vertical" :column="5" border>
                        <el-descriptions-item label="Score">{{ item.score }}</el-descriptions-item>
                        <el-descriptions-item label="Expect">{{ item.expect }}</el-descriptions-item>
                        <el-descriptions-item label="Identities">{{ item.identities }}</el-descriptions-item>
                        <el-descriptions-item label="Gaps">{{ item.gaps }}</el-descriptions-item>
                        <el-descriptions-item label="Strand">{{ item.strand }}</el-descriptions-item>
                      </el-descriptions>
                      <pre class="alignments-sequence font-bold ml-14">{{ item.sequence }}</pre>
                      <el-divider/>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Alignments" name="fourth" v-if="form.category=='blastp'">
                    <el-button @click="handleDownload('result')" class="ont-bold text-blue-500">Down Data</el-button>
                    <div class="blastSeq-alignments" v-for="(item, index) in blastSeqReslt" :key="index">
                      <p class="alignments-item">{{ item.name }}</p>
                      <p class="alignments-item"><span class="text-gray-400">Length:&nbsp;</span>{{ item.length }}</p>
                      <el-descriptions direction="vertical" :column="4" border>
                        <el-descriptions-item label="Score">{{ item.score }}</el-descriptions-item>
                        <el-descriptions-item label="Expect">{{ item.expect }}</el-descriptions-item>
                        <el-descriptions-item label="Method">{{ item.method }}</el-descriptions-item>
                        <el-descriptions-item label="Identities">{{ item.identities }}</el-descriptions-item>
                        <el-descriptions-item label="Gaps">{{ item.gaps }}</el-descriptions-item>
                        <el-descriptions-item label="Positives">{{ item.positives }}</el-descriptions-item>
                      </el-descriptions>
                      <pre class="alignments-sequence font-bold ml-14">{{ item.sequence }}</pre>
                      <el-divider/>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import PageLeftTitle from '~/components/PageLeftTitle.vue'
import {reactive, toRaw, ref, computed} from 'vue'
import {useSubmitStore} from '~/store/useSubmitStore.js'
import {ElMessageBox, ElMessage} from 'element-plus'
import {showModal} from "~/composables/util.js";
import {useFileStore} from "~/store/useFileStore.js";
import router from "~/router/index.js";

const store = useSubmitStore()
const storeFiles = useFileStore()
let form = ref({
  sequence: '',
  category: 'blastn',
})
let predictForm = ref({
  predictSequence: '',
  modelCategory: 'Drought',
  returnCategory: '1'
})
let formData = new FormData()

let fileList = reactive([])
let fileCount = ref(0)
let uploadRef = ref()
let submitting = ref(false)
let submittingPredict = ref(false)
let blastSeqList = computed(() => store.BlastSeqDataList.list)
let blastSeqInfo = computed(() => store.BlastSeqDataList.mainInfo)
let blastSeqReslt = computed(() => store.BlastSeqDataList.result)

let predictSeqList = computed(() => store.PredictSeqDataList.list)
let predictSeqNumber = computed(() => store.PredictSeqDataList.numSequences)
let blastSeqFilepath = computed(() => store.PredictSeqDataList.filepath)

const activeName = ref('five')
const activeName1 = ref('second')
const fileChange = (file, lists) => {
  let list = toRaw(lists)
  fileCount.value = list.length
  list.forEach(item => {
    formData.set('file', item.raw, item.name)
  })
}

const handleExceed = (files, lists) => {
  uploadRef.value.clearFiles()  //清空上传文件（限制一个，所以直接清空即可）
  const file = files[0]
  uploadRef.value.handleStart(file)  //重新上传
}

const fileRemove = () => {
  fileCount.value = fileCount.value - 1
  uploadRef.value.clearFiles()
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

const onSubmitPredict = () => {
  submittingPredict.value = true
  store.PostUploadPredictSeq(predictForm.value).then(() => {
    submittingPredict.value = false
    ElMessage({
      message: 'Predict Protein-Sequence Successfully!',
      type: 'success',
    })
  }).catch((err) => {
    submittingPredict.value = false
    console.error(err)
  })
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
const handleDownload = (category) => {
  showModal("Are you sure to download?？").then(res => {
    storeFiles.getFilesByIdAndName(blastSeqInfo.value.id, category).then(response => {
      console.log(blastSeqInfo.value.id)
      console.log(category)
      console.log(response)
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition
          .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
          .replace(/['"]/g, '');

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  })
}
const pattern = /[A-Za-z]{2}_[0-9]+\.[0-9]+/;

const isProteinIdClickable = (proteinId) => {
  return pattern.test(proteinId);
};
let handleGeneClick = (row) => {
  const link = document.createElement('a');
  // link.href = "https://www.ncbi.nlm.nih.gov/nucleotide/" + row.dbSeqId
  link.href = "https://www.ncbi.nlm.nih.gov/protein/" + row.dbSeqId

  link.click();
  link.preventDefault();
}
let handleGeneClick1 = (row) => {
  router.push({
    name: 'geneoverview',
    query: {
      geneName: row.beginQuerySeqNumber
    }
  })
}

</script>

<style scoped>
/* PC端 */
@media screen and (min-width: 992px) {
  .page-style {
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

.el-button {
  @apply float-right mr-2 mb-2;
}

.form-btn {
  background-color: #CCD5AE;
}

.SaGp-desciption {
  @apply flex font-bold mt-6 text-xl mb-6 justify-center;
}

.link-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
