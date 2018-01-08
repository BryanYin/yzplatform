
export class GeneralEntity {
    constructor(
        public id?: number,
        public dbTime?: Date
    ) { }
}

/**
 * Grade record:
 * @name 企业名称
 * @scdw 市场地位
 * @ggbl 杠杆比率
 * @llys 利率因素
 * @xjldx 现金流动性
 * @csnl 创收能力
 * @ylnl 盈利能力
 * @khpj 客户评级
 * @country 所属国家
 * @eventTime 填报时间
 * @dbTime 入库时间
 */
export class Grade extends GeneralEntity {
    constructor(
        public name: string,
        public scdw: number,
        public ggbl: number,
        public llys: number,
        public xjldx: number,
        public csnl: number,
        public ylnl: number,
        public khpj: number,
        public country: string,
        public eventTime: string,
    ) { super(null, new Date()); }

    public static titleRow1 = [
        { name: '市场地位', index: 0 },
        { name: '杠杆比率', index: 1 },
        { name: '利率因素', index: 2 },
        { name: '现金流动性', index: 3 },
        { name: '创收能力', index: 4 },
        { name: '盈利能力', index: 5 },
        { name: '客户评级', index: 6 },
        { name: '所属国家', index: 7 },
        { name: '报告时间', index: 8 }
    ];
    public static titleRow2 = [
        { field: 'scdw', name: '销售收入', index: 0 },
        { field: 'ggbl', name: '净借款/EBITDA', index: 1 },
        { field: 'llys', name: '国际市场筹资成本', index: 2 },
        { field: 'xjldx', name: 'EBITDA MARGIN', index: 3 },
        { field: 'csnl', name: '销售收入', index: 4 },
        { field: 'ylnl', name: '净利润/收入', index: 5 },
        { field: 'khpj', name: '内部评级', index: 6 },
        { field: 'country', name: '国家', index: 7 },
        { field: 'eventTime', name: '填写时间', index: 8 }
    ];
}
