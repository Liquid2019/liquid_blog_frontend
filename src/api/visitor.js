import request from '@/utils/request'
import Qs from 'qs'

export function getAllVisitor() {
    return request({
        url:'/visitor/findAllVisitor',
        method:'post'
    })
}
export function deleteAllVisitor() {
    return request({
        url:'/visitor/deleteAllVisitor',
        method:'post'
    })
}
export function createVisitor(data) {
    return request({
        url:'/visitor/insertVisitor',
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