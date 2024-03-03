type Field = '_' | 'o' | ' ';
type Board = Field[][];
export type Position = {rowIndex: number, colIndex: number};

export class State {
    constructor(private board: Board) {
        this.board = board.map(row => [...row]);
    }

    get rows() {
        return this.board.map(row => row.join(''));
    }

    get desk() {
        return this.rows.join('\n');
    }

    toString() {
        return this.desk + '\n';
    }

    getField({rowIndex, colIndex}: Position): Field | null {
        if (rowIndex<0 || rowIndex>=this.board.length) return null;
        const selectedRow = this.board[rowIndex];
        if (colIndex<0 || colIndex>=selectedRow.length) return null;
        return selectedRow[colIndex];
    }

    isEqual(state: State) {
        return this.desk === state.desk;
    }

    mutate({rowIndex, colIndex}: Position, f: Field) {
        const newState = new State(this.board);
        newState.board[rowIndex][colIndex] = f;
        return newState;
    }
}

export const initState = new State([
    ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', 'o', 'o', 'o', '_', '_', '_'],
    ['_', '_', '_', 'o', 'o', 'o', '_', '_', '_'],
    ['_', 'o', 'o', 'o', 'o', 'o', 'o', 'o', '_'],
    ['_', 'o', 'o', 'o', ' ', 'o', 'o', 'o', '_'],
    ['_', 'o', 'o', 'o', 'o', 'o', 'o', 'o', '_'],
    ['_', '_', '_', 'o', 'o', 'o', '_', '_', '_'],
    ['_', '_', '_', 'o', 'o', 'o', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
]);

export const winState = new State([
    ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', ' ', ' ', ' ', '_', '_', '_'],
    ['_', '_', '_', ' ', ' ', ' ', '_', '_', '_'],
    ['_', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '_'],
    ['_', ' ', ' ', ' ', 'o', ' ', ' ', ' ', '_'],
    ['_', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '_'],
    ['_', '_', '_', ' ', ' ', ' ', '_', '_', '_'],
    ['_', '_', '_', ' ', ' ', ' ', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
]);
