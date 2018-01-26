/**
 * Base entity of enties
 * id - UUID
 * endpoint - end point of api call
 */
export abstract class Entity {
    public static tableDecription: string;
    public static fieldsDescription: Map<string, string>;
    public id: number = null;
    constructor(public readonly endpoint: string) {
    }
}

/**
 * Base entity of timed entities.
 * dbTime - the time this record stored in DB
 */
export abstract class GeneralEntity extends Entity {
    public dbTime: Date = new Date();
    constructor(endpoint: string) { super(endpoint); }
}

export class YzSchemaTable extends Entity {
    constructor(
        public tableSchema?: string,
        public tableName?: string
    ) { super('api/yz-schema-tables'); }
}

export class YzTableStruct extends Entity {
    constructor(
        public tableSchema?: string,
        public tableName?: string,
        public ordinalPosition?: number,
        public columnName?: string,
        public dataType?: string,
        public characterMaxLength?: number,
        public numericPrecision?: number,
        public numericScale?: number,
        public nullable?: boolean,
        public columnDefault?: string,
        public description?: string,
    ) { super('api/yz-table-structs'); }
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
        public name?: string,
        public scdw?: number,
        public ggbl?: number,
        public llys?: number,
        public xjldx?: number,
        public csnl?: number,
        public ylnl?: number,
        public khpj?: number,
        public country?: string,
        public eventTime?: string,
    ) { super('api/grades'); }

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
export const REPORT_ENTITY = {
    'yz_schema_table': YzSchemaTable,
    'yz_table_struct': YzTableStruct,
};
