import request from '@/utils/request'

/**
 *  3. 餐饮详情页面接口
 */

/**
 *  3-1. 餐饮关键指标模块（评论数）以及 评论数变化趋势图 模块
 */
export function getSpider(param) {
    return request({
        url: '/api/spiderpage/spider',
        method: 'post',
        data:param
    })
}



