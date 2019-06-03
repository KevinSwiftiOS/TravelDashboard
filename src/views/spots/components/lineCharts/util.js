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
        left: '5%',
        right: '4%',
        bottom: '3%',
        top: "20%",
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