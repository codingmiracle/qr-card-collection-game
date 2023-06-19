export function maxPieces(rarity: number) {
    switch (rarity) {
        case 0:
            return 2;
        case 1:
            return 4;
        case 2:
            return 8;
        default:
            return 0;
    }
}