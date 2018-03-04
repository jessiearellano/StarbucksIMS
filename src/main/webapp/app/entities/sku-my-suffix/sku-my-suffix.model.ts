import { BaseEntity } from './../../shared';

export class SKUMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public sku?: number,
        public name?: string,
        public uom?: string,
        public unitsPerUom?: number,
        public category?: string,
        public cost?: number,
        public tags?: string,
        public skus?: BaseEntity[],
    ) {
    }
}
