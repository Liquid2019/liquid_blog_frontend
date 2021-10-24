import request from '@/utils/request'
import Qs from 'qs'

export function getAllArticle() {
    return request({
        url:'/findAllArticle',
        method:'post'
    })
}
export function getArticleById(data) {
    return request({
        url:'/findArticleById',
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
export function updateArticle(data) {
    return request({
        url:'/updateArticle',
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

export function createArticle(data) {
    return request({
        url:'/insertArticle',
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
export function deleteArticle(data) {
    return request({
        url:'/deleteArticle',
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
