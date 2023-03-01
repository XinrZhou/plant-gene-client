export default {
    asideMenus :[
        {
            "name": "主页",
            "icon": "shopping-bag",
            "child":[{
                "name":"后台面板",
                "icon":"shopping-cart-full",
                "frontpath":"/admin"
            }]
        },{
            "name": "测试模块",
            "icon": "help",
            "child":[{
                "name":"测试页",
                "icon":"home-filled",
                "frontpath":"/admin/test"
            }]
        },{
            "name": "系统用户",
            "icon": "shopping-bag",
            "child":[{
                "name":"用户管理",
                "icon":"shopping-cart-full",
                "frontpath":"/admin/user"
            }]
        }
    ]
}
