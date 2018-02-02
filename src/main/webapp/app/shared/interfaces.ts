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

export const REPORT_ENTITY_NAMES = {
    'yz_schema_table': 'schema table',
    'yz_table_struct': 'table struct',
};
