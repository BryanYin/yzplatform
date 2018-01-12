export class GeneralEntity {
    public id: number = null;
    public dbTime: Date = new Date();
    constructor(readonly endpoint: string) {
    }
}
