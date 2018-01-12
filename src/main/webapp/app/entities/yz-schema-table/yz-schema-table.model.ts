import { BaseEntity } from './../../shared';

export class YzSchemaTable implements BaseEntity {
    constructor(
        public id?: number,
        public tableSchema?: string,
        public tableName?: string,
    ) {
    }
}
