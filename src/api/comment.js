import request from '@/utils/request'
import Qs from 'qs'

export function getAllComment() {
    return request({
        url:'/comment/findAllComment',
        method:'post'
    })
}
export function createComment(data) {
    return request({
        url:'/comment/createComment',
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
export function deleteComment(data) {
    return request({
        url:'/comment/deleteComment',
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