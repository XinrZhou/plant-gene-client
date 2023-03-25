<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-5">
        <SuitcaseLine />
      </el-icon>
      后台管理系统
    </span>
    <el-tooltip content="刷新" placement="bottom" effect="light">
      <el-icon class="icon-button" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <div class="right">
      <el-tooltip content="全屏" placement="bottom" effect="light">
        <el-icon class="icon-button" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link flex items-center text-white">
          <el-avatar class="mr-3" :size="25" :src="user.avatarUrl" />
          {{user.username}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]" label-width="80px">
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input v-model="form.oldPassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" placeholder="输入新密码" type="password" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="rePassword" label="新密码">
        <el-input v-model="form.rePassword" placeholder="请再次确认密码" type="password" show-password>
        </el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useFullscreen } from '@vueuse/core'
  import FormDrawer from "~/components/FormDrawer.vue";
  import { useLogOut, useRePassword } from "~/composables/useManager"
  import {useCookies} from "@vueuse/integrations/useCookies";
  const cookie = useCookies()
  const user = cookie.get("userInfo")
  const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle
  } = useFullscreen()
  const {
    formRef, form, formDrawerRef, rules, onSubmit, openRePasswordForm
  } = useRePassword()
  const {
    handleLogout
  } = useLogOut()

  const router = useRouter()
  const handleCommand = (c) => {
    switch (c) {
      case "rePassword":
        openRePasswordForm()
        break;
      case "logout":
        handleLogout()
        break;
    }
  }
  const handleRefresh = () => location.reload()

</script>

<style scoped>
  .f-header {
    @apply flex bg-blue-400 text-white fixed top-0 left-0 right-0 items-center;
    height: 64px;
    /*z-index层级高一点，设为1000，不会被其他元素覆盖*/
    z-index: 1000;

  }

  .logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin
  }

  .icon-button {
    @apply flex justify-center items-center;
    width: 42px;
    height: 62px;
  }

  .right {
    @apply ml-auto flex items-center
  }

  .icon-button:hover {
    @apply bg-blue-300
  }

  .f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex items-center justify-center mx-5;
  }
</style>