<template>
    <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
          </div>
        </template>
        <el-row>
          <el-col :span="10">
            <img src="/src/assets/gene.jpg"/>
          </el-col>
          <el-col :span="10" :offset="2">
                PQSROdb covers
          </el-col>
        </el-row>
      </el-card>
</template>

<script setup>

</script>

<style scoped>
    .box {
        @apply flex space-x-4 flex-1 w-1/2
    }
</style>