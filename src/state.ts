type Field = '_' | 'o' | ' ';
type Board = Field[][];
type Position = {row: number, col: number};

export class State {
    constructor(private board: Board) {}

    get rows() {
        return this.board.map(row => row.join(''));
    }

    get desk() {
        return this.rows.join('\n');
    }

    toString() {
        return this.desk + '\n';
    }

    getField({row, col}: Position): Field {
        return this.board[row][col];
    }

    isEqual(state: State) {
        return this.desk === state.desk;
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
