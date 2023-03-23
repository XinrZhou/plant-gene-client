export default {
    asideMenus :[
        {
            "name": "主页",
            "icon": "shopping-bag",
            "child":[{
                "name":"后台系统监控面板",
                "icon":"shopping-cart-full",
                "frontpath":"/admin/home"
            }]
        },
        {
            "name": "文件管理",
            "icon": "help",
            "child":[{
                "name":"文件管理",
                "icon":"home-filled",
                "frontpath":"/admin/files"
            }]
        },{
            "name": "数据管理",
            "icon": "shopping-bag",
            "child":[{
                "name":"数据管理",
                "icon":"shopping-cart-full",
                "frontpath":"/admin/data"
            }]
        }
    ]
}
