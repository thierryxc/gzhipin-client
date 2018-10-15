//包含n个工具函数的模块

//用户主界面路由（/dashen，/laoban）
//用户信息完善界面路由（/dasheninfo，/laobaninfo），判断是否已经完善信息，看user内head有没有值
//判断用户类型看user.type
//返回对应的路由路径
export function getRedirectTo(type, header) {
    let path = '';
    if (type === 'laoban') {
        path = '/laoban';
    } else {
        path = '/dashen';
    }
    if (!header) {
        path += 'info';
    } 
    return path;
}