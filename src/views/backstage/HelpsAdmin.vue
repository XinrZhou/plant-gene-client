<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="搜索标题" v-model.trim="searchKeyword" suffix-icon="el-icon-search"
                  @keyup.enter.native="handleSearch()" clearable @clear="handleClearSearch"/>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="primary" @click="handleSave" class="text-black">新增</el-button>
      </el-col>
    </el-row>
    <el-row class="pt-4">
      <el-table :data="backStageHelpsList" style="width: 100%" stripe @row-click="handleRowClick">
        <el-table-column prop="title" label="标题" />
        <el-table-column label="内容" ><span class="text-blue-500 text-sm font-bold">右侧按钮查看</span></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作" width="200px">
          <template #default="{row}" >
            <el-button type="primary"  @click="handleEditHelps(row.id)" class="text-black">编辑(查看)</el-button>
            <el-button type="primary"  @click="handleDeleteHelps(row.id)" class="text-black">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog v-model="dialogVisible" title="编辑帮助文档" width="50%" :append-to-body="true">
      <el-form ref="form" :model="form" label-position="top">
        <el-form-item label="标题">
          <el-input v-model="currentHelps.title" />
        </el-form-item>
        <el-form-item label="内容">
          <v-md-editor v-model="currentHelps.content" height="350px"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currentHelps.status">
            <el-option label="启用" value="启用" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false" class="text-black">取消</el-button>
        <el-button type="primary" @click="handleSubmit" class="text-black">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { useHelpsStore } from '~/store/useHelpsStore.js'
import { useRouter } from 'vue-router'
import { showModal, toast } from '~/composables/util.js'

const store = useHelpsStore()
const router = useRouter()
let dialogVisible = ref(false)
const currentHelps = ref({
  id : '',
  title: '',
  content: '',
  status: ''
})
// 获取帮助文档列表
const backStageHelpsList = computed(() => store.backStageHelpsList)
let funHelpList = () => store.fetchBackStageHelpsList()
onMounted(() => {
  funHelpList()
})

// 删除帮助文档
const handleDeleteHelps = (id) => {
    store.deleteHelpsById(id).then(res=>{
      funHelpList()
      toast('删除帮助文档成功')
    })

}

// 编辑帮助文档
const handleEditHelps = (id) => {
  dialogVisible.value = true
  store.fetchHelpsById(id).then(res=>{
    currentHelps.value = res.data
  })

}
const handleSubmit =() =>{
  if (currentHelps.value.id === '') {
    store.SaveHelps(currentHelps.value).then(res=>{
      dialogVisible.value = false
      toast('新增帮助文档成功')
      currentHelps.value.id = ""
      currentHelps.value.title = ""
      currentHelps.value.content = ""
      currentHelps.value.status = ""
      funHelpList()
    })
  } else {
    store.updateHelpsById(currentHelps.value).then(res=>{
      toast('修改帮助文档成功')
      dialogVisible.value = false
      currentHelps.value.id = ""
      currentHelps.value.title = ""
      currentHelps.value.content = ""
      currentHelps.value.status = ""
      funHelpList()
    })
  }

}
const handleSave=() =>{
  dialogVisible.value = true
}
</script>


<style scoped>

</style>