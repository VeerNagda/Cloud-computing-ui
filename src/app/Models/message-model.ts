export class MessageModel {
    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get Error(): string {
        return this._Error;
    }

    set Error(value: string) {
        this._Error = value;
    }

    protected _status: number = 0;
    protected _message: string='';
    public _Error: string='';
}
