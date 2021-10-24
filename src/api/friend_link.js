import request from '@/utils/request'
import Qs from 'qs'

export function getAllFriend() {
    return request({
        url:'/friend/findAllFriend',
        method:'post'
    })
}

export function createFriend(data) {
    return request({
        url:'/friend/insertFriend',
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

export function deleteFriend(data) {
    return request({
        url:'/friend/deleteFriend',
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

