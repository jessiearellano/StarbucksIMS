import { BaseEntity, User } from './../../shared';

export class StoreMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public address?: string,
        public city?: string,
        public state?: string,
        public zip?: string,
        public lat?: number,
        public lon?: number,
        public managerId?: number,
        public shiftSupervisors?: User[],
        public ids?: BaseEntity[],
    ) {
    }
}
