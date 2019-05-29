export const IdData = {
    SpotsScoreId: 'SpotsScoreId',
    SpotsNumId: 'SpotsNumId',
}
export const optionData = {
    color: ['#09b4eb', '#aac966', '#f2b3c9', '#a19be6', '#d95850', '#10d4c8', '#893448', '#f2d643', '#eb8146', '#ffb248',
        '#ebdba4', '#0ef533', '#1393f0', '#1259e3',
        '#74647a', '#f2094f', '#ac07fa', '#ff07e7', '#0c690a'
    ],
    textStyle: {
        fontWeight: "bold",
        fontFamily: "Microsoft YaHei",
        fontSize: 10,
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
    },
    yAxis: {
        min: "2",
        type: 'value',
    },
    series: []
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