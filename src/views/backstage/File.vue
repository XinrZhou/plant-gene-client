<template>
  <div>
    <el-row :gutter="20" class="flex">
      <el-col :span="6" v-for="(item, index) in filesCounts" :key="index">
        <data-count-cart :title="item.period" :upload-count="item.uploadCount" :download-count="item.downloadCount"/>
      </el-col>
    </el-row>
    <el-row class="flex pt-6">
      <el-table :data="filesLists" style="width: 100%"  stripe @row-click="handleClick">

        <el-table-column fixed prop="createTime" label="提交数据时间" fit class="underline"/>
        <el-table-column prop="originalFilename" label="文件名称" type="originalFilename" fit />
        <el-table-column label="文化类型" fit>
          <template #default="{row}">
            <el-tag v-if="row.fileType === 'pdf'" type="success">PDF</el-tag>
            <el-tag v-else-if="row.fileType === 'doc'" type="warning">DOC</el-tag>
            <el-tag v-else-if="row.fileType === 'xls'" type="info">XLS</el-tag>
            <el-tag v-else-if="row.fileType === 'ppt'" type="danger">PPT</el-tag>
            <el-tag v-else type="primary">{{ row.fileType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fileSize" label="文件大小" type="fileSize" fit />
        <el-table-column prop="description" label="文件描述" type="description" fit />
        <el-table-column prop="downloadCount" label="下载次数" type="downloadCount" fit></el-table-column>  description
        <el-table-column label="操作" fit>
          <template #default="{ row }">
            <el-button type="primary"  @click="handleDownload(row.id)" class="text-black">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="pt-4">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                       layout="prev, pager, next, jumper" :total="pageTotal" @current-change="handleCurrentChange" />
      </div>
    </el-row>
  </div>

</template>


<script setup>
import DataCountCart from "~/components/DataCountCart.vue";
import {ref, reactive, computed, onMounted} from 'vue'
import { useFileStore } from '~/store/useFileStore.js'
import { useRoute } from 'vue-router'
import {showModal, toast} from "~/composables/util.js";


const store = useFileStore()
const route = useRoute()


const filesLists = computed(() => store.filesList)
// pagination 数据
const pageTotal = computed(() => store.itemPageTotal)
const currentPage = ref(1)
const pageSize = ref(10)
const filesCounts = computed(() => store.filesCount)


//  获取基因列表
let filesList = () => store.getFilesList({
  pageNum: currentPage.value,
  pageSize: pageSize.value,
})
onMounted(() => {
  filesList()
  store.getFilesCount()
})
const handleCurrentChange = () => {
  filesList()

}
const handleDownload = (id) => {
  showModal("是否确认下载？").then(res=>{
    store.getDownFlies(id).then(response => {
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


</script>

<style scoped>

</style>