import {reactive, ref} from "vue"

import {showModal, toast} from "~/composables/util.js"
import {useRouter} from "vue-router"
import router from "~/router";
import {reqLogout, reqUpdatePassword} from "~/api/index.js";
import { useUserInfoStore } from '~/store/useUserInfoStore.js'

const store = useUserInfoStore()
export function useRePassword(){

    const formRef = ref(null)
    const form = reactive({
        oldPassword:'',
        password: '',
        rePassword: ''
    })
    const formDrawerRef = ref(null)
    const rules = {
        oldPassword:[
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password:[
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        rePassword:[
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }
    const onSubmit = () => {
        formRef.value.validate((valid)=>{
            if(!valid){
                return false
            }
            formDrawerRef.value.showLoading()
            reqUpdatePassword(form).then(res=>{
                toast("修改密码成功，请重新登入")
                router.push("/login").then(res => {})
            }).finally(()=>{
                formDrawerRef.value.hideLoading()
            })
        })
    }
    const openRePasswordForm = ()=>formDrawerRef.value.open()
    return{
        formRef,form,formDrawerRef,rules,onSubmit,openRePasswordForm
    }
}


export function  useLogOut(){
    function  handleLogout(){
        showModal("是否要退出登入？").then(res=>{
            reqLogout().finally(()=>{
                //移除token--清除当前用户状态--跳转回登录页--提示退出登入成功
                store.logout()
                router.push("/login")
                toast("退出登录成功")
            })
        })
    }
    return{
        handleLogout
    }
}