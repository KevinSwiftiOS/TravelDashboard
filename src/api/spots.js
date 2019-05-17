import request from '@/utils/request';
/**
 * 4.景区 和 景点的接口
 */

/**
 * 4.1 关键指标
 */
export function getSpotKeyIndicator() {
    return request({
        url: '/api/spotspage/keyindicator',
        method: 'post',
    })
}
// 同比
export function getSpotKeyVariation(params) {
    return request({
        url: '/api/spotspage/keyindicator/variation',
        method: 'post',
        data:params
    })
}

/**
 * 4.2 浙江省不同景区的地图展示
 */
export function getSpotRegionalMap() {
    return request({
        url: '/api/spotspage/regionalmap',
        method: 'post',
    })
}
/**
 * 4.3 景区图标接口
 */
//4.3.1 评分饼图接口
export function getSpotPiechartsScore(params) {
    return request({
        url: '/api/spotspage/piecharts/score',
        method: 'post',
        data: params
    })
}
// 4.3.2 评论数柱状图接口
export function getSpotBarchartsNumber(params) {
    return request({
        url: '/api/spotspage/barcharts/number',
        method: 'post',
        data: params
    })
}
/**
 * 4.4 不同景区折线图饼图对比
 */
export function getSpotComparedLineChart(params) {
    return request({
        url: '/api/spotspage/comparedpiechart',
        method: 'post',
        data:params
    })
}
