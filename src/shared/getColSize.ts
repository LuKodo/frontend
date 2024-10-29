export const getColSize = (countCols: number, size: string = 'auto') => {
    if (size === 'sm') {
        switch (countCols) {
            case 1:
                return 12;
            case 2:
                return 6;
            case 3:
                return 12;
            case 4:
                return 6;
            case 6:
                return 6;
            default:
                return 12;

        }
    } else {
        switch (countCols) {
            case 1:
                return 12;
            case 2:
                return 6;
            case 3:
                return 4;
            case 4:
                return 3;
            case 6:
                return 2;
            default:
                return 0;

        }
    }

}