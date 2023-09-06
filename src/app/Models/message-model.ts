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

    get error(): string {
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }

    protected _status: number = 0;
    protected _message: string='';
    public _error: string='';
}
