import { ElNotification,ElMessageBox } from 'element-plus'

//成功提示的方法
export function toast(message,type="success",dangerouslyUseHTMLString=false){
    ElNotification({
        message: message,
        type: type,
        dangerouslyUseHTMLString,
        duration:2000,

    })
}

export function showModal(content = "提示内容",type = "warning",title = ""){
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }
    )
}