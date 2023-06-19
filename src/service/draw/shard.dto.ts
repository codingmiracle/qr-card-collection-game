export default class ShardDto {
    constructor(cardId: string, userId: string, pieceId: number, count: number | undefined) {
        this._cardId = cardId;
        this._userId = userId;
        this._pieceId = pieceId;
        this._count = count;
    }

    private _cardId: string;

    get cardId(): string {
        return this._cardId;
    }

    set cardId(value: string) {
        this._cardId = value;
    }

    private _userId: string;

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    private _pieceId: number;

    get pieceId(): number {
        return this._pieceId;
    }

    set pieceId(value: number) {
        this._pieceId = value;
    }

    private _count: number | undefined;

    get count(): number | undefined {
        return this._count;
    }

    set count(value: number | undefined) {
        this._count = value;
    }
}