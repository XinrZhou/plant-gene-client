import {createStore} from "vuex";
import {getInfo, login} from "~/api/manage.js"
import {removeToken, setToken} from "~/composables/auth.js";
const store = createStore({
    state(){
        return{
            user:{},
            asideWidth:"250px",
            // menus:[],
            // ruleNames:[]
        }
    },
    mutations:{
        SET_USERINFO(state,user){
            state.user = user
        },
        //展开、缩起侧边
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth=="250px"?"64px":"250px"
        },
        // SET_MENUS(state,menus){
        //     state.menus = menus
        // },
        // SET_RULENAMES(state,ruleNames){
        //     state.ruleNames = ruleNames
        //
        // }
    },
    actions:{
        //登录
        login({commit},{username,passward}){
            return new Promise((resolve,reject)=>{
                login(username,passward).then(res=>{
                    setToken(res.data.token)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        },

        //获取当前登入用户信息
        getInfo({commit}){
            return new Promise((resolve,reject)=>{
                getInfo().then(res=>{
                    commit("SET_USERINFO",res.data)
                    // commit("SET_MENUS",res.data.menus)
                    // commit("SET_RULENAMES",res.data.ruleNames)
                    resolve(res.data)
                }).catch(err=>reject(err))
            })
        },
        // 退出登录
        logout({ commit }){
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit("SET_USERINFO",{})
        }
    }
})

export default store