export const IdData = {
    SpotsScoreId: 'SpotsScoreId',
    SpotsNumId: 'SpotsNumId',
}
export const optionData = {
    // title: {
    //     text: '折线图堆叠'
    // },
    color: ['#09b4eb', '#aac966', '#a19be6', '#10d4c8', '#d95850', '#893448', '#f2d643', '#eb8146', '#ffb248',
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
        left: '5%',
        right: '4%',
        bottom: '3%',
        top: "20%",
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
}