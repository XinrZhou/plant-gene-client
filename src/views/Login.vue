<template>

</template>

<script setup>

</script>

<style scoped>

</style>
<!-- <template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>这是一个生物数据分享平台</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right ">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登入</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="adminname">
          <el-input v-model="form.username" placeholder="请输入管理员账号">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="adminpwd">
          <el-input v-model="form.password" placeholder="输入密码" type="password" show-password>
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" color="#60A5FA" round @click="onSubmit" :loading="loading" class="w-[250px] ">登录
          </el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<script setup>
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  // import { userInfoStore } from '~/store/userInfo'
  import { useRouter } from "vue-router";
  import { toast } from "~/composables/util.js";

  const store = userInfoStore()
  const router = useRouter()

  const loading = ref(false)
  const form = reactive({
    username: '',
    password: '',
  })
  const formRef = ref(null)
  const rules = {
    username: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
    ],
    passward: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
    ]
  }

  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false
      }
      loading.value = true
      store.login(form)
    })
  }

  // 监听回车事件
  function onKeyUp(e) {
    if (e.key == "Enter") onSubmit()
  }

  // 添加键盘监听
  onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
  })

  // 移除键盘监听
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
  })
</script>

<style scoped>
  .login-container {
    @apply min-h-screen bg-blue-400;
  }

  .login-container .left,
  .login-container .right {
    @apply flex items-center justify-center;
  }

  .login-container .right {
    @apply bg-gray-100 flex-col;
  }

  .left>div>div:first-child {
    @apply font-bold text-5xl text-white pb-8;
  }

  .left>div>div:last-child {
    @apply text-3xl text-white;
  }

  .right .title {
    @apply font-bold text-3xl pb-5 text-gray-800;
  }

  .right>div {
    @apply flex items-center text-gray-300 text-gray-300 pb-2 space-x-2;
  }

  .right .line {
    @apply h-[1px] w-16 bg-gray-200;
  }
</style> -->