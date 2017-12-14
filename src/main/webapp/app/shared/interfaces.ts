
/**
 * Grade record:
 * @name 企业名称
 * @ggbl 杠杆比率
 * @llys 利率因素
 * @xjldx 现金流动性
 * @csnl 创收能力
 * @ylnl 盈利能力
 * @khpj 客户评级
 */
export class Grade {
    constructor(
        public name: string,
        public ggbl: number,
        public llys: number,
        public xjldx: number,
        public csnl: number,
        public ylnl: number,
        public khpj: number,
    ) { }
}
