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
                "name":"用户上传数据文件管理",
                "icon":"home-filled",
                "frontpath":"/admin/file"
            }]
        },{
            "name": "数据管理",
            "icon": "shopping-bag",
            "child":[{
                "name":"基因数据管理",
                "icon":"shopping-cart-full",
                "frontpath":"/admin/data"
            }]
        },{
            "name": "内容管理",
            "icon": "shopping-bag",
            "child":[
                {
                    "name":"Help页面管理",
                    "icon":"shopping-cart-full",
                    "frontpath":"/admin/help"
                },{
                    "name":"首页内容管理",
                    "icon":"shopping-cart-full",
                    "frontpath":"/admin/homeContent"
                }
            ]
        },
    ]
}
