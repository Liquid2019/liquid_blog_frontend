import request from '@/utils/request'
import Qs from 'qs'

export function submitAdmin(data) {
    return request({
        url:'/admin/checkAdmin',
        method:'post',
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:data,
    })
}