//使用axios封装的ajax函数,函数返回的是Promise对象
import axios from 'axios';

export default function ajax(url = '', data = {}, type = 'GET') {
    if (type === 'GET') {//发送GET请求
        //拼请求参数串
        let paramStr = '';
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&';
        });
        if (paramStr) {
            paramStr.substring(0, paramStr.length - 1);
        }
        return axios.get(url + '?' + paramStr);
    } else {//发送POST请求
        return axios.post(url, data);
    }
}