import { BaseEntity } from './../../shared';

export class StoreSKUMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public storeIdId?: number,
        public skuIdId?: number,
    ) {
    }
}
