export const IdData = {
    SpotsScoreId: 'SpotsScoreId',
    SpotsNumId: 'SpotsNumId',
}
export const optionData = {
    legend: {},
        tooltip: {
            trigger: "axis",
            showContent: false
        },
        dataset: {
            source: []
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            gridIndex: 0
        },
        grid: {
            top: "55%"
        },
        series: [{
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },
            {
                type: "line",
                smooth: true,
                seriesLayoutBy: "row"
            },

            {
                type: "pie",
                id: "pie",
                radius: "30%",
                center: ["50%", "25%"],
                label: {
                    formatter: "{b}: {@2012} ({d}%)"
                },
                encode: {
                    itemName: "xAxis",
                    value: "2012",
                }
            }
        ]
    // color: ['#7492E7', '#B7D962', '#7072D1', '#F8DE4A', '#F5D001'],
    // title: {
    //     text: '酒店评论数分布',
    //     x: '15',
    //     y: "bottom",
    //     textStyle: {
    //         color: "#4F5359",
    //         fontFamily: "SourceHanSansSC-Medium",
    //         fontWeight: "bold",
    //         fontSize: 16,
    //     }
    // },
    // tooltip: {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
    // },
    // legend: {
    //     orient: 'vertical',
    //     // formatter:'{{d}%}\n{b}',
    //     x: 'right',
    //     data: [{name:'少'}, {name:'较少'}, {name:'一般'},{ name:'多'}],
    //     y: "center"
    // },
    // series: [{
    //     name: '评论数',
    //     type: 'pie',
    //     radius: ['40%', '60%'],
    //     avoidLabelOverlap: true,
    //     center: ['30%', '50%'],
    //     label: {
    //         normal: {
    //             show: false,
    //             position: 'center'
    //         },
    //         emphasis: {
    //             show: true,
    //             textStyle: {
    //                 fontSize: '30',
    //                 fontWeight: 'bold'
    //             }
    //         }
    //     },
    //     labelLine: {
    //         normal: {
    //             show: false
    //         }
    //     },
    //     data: [],
    // }, ]

}
export const optionData1 = {
    color: ['#7492E7', '#F8DE4A', '#7072D1', '#B7D962', '#F5D001'],
    title: {
        text: '景点评分分布',
        textStyle: {
            color: "#4F5359",
            fontFamily: "SourceHanSansSC-Medium",
            fontWeight: "bold",
            fontSize: 16,
        },
        x: '25',
        y: "bottom"
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        // data: ['一般', '较好', '好', '很棒'],
        y: "center"
    },
    series: [{
        name: '评分',
        type: 'pie',
        radius: ['40%', '60%'],
        avoidLabelOverlap: true,
        center: ['30%', '50%'],
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [],
    }, ]
}