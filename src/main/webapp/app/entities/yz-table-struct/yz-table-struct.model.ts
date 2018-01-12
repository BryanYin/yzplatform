import { BaseEntity } from './../../shared';

export class YzTableStruct implements BaseEntity {
    constructor(
        public id?: number,
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
    ) {
        this.nullable = false;
    }
}
