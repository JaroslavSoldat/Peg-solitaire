import {Position, State} from "./state";

export function getPossibleMoves(state: State): State[] {
    const moves: State[] = [];
    state.rows.forEach((row, rowIndex) => {
        row.split('').forEach((field, colIndex) => {
            if (field ==='o') {
                const jumpPositions: [Position, Position][] = [
                    [{rowIndex, colIndex: colIndex - 1}, {rowIndex, colIndex: colIndex - 2}],
                    [{rowIndex, colIndex: colIndex + 1}, {rowIndex, colIndex: colIndex + 2}],
                    [{rowIndex: rowIndex - 1, colIndex}, {rowIndex: rowIndex - 2, colIndex}],
                    [{rowIndex: rowIndex + 1, colIndex}, {rowIndex: rowIndex + 2, colIndex}],
                ];

                jumpPositions.forEach(([transition, target]: [Position, Position]) => {
                    const transtionField = state.getField(transition);
                    if (transtionField !== 'o') return;

                    const targetField = state.getField(target);
                    if (targetField !== ' ') return;

                    moves.push(state
                        .mutate({rowIndex, colIndex}, ' ')
                        .mutate(transition, ' ')
                        .mutate(target, 'o')
                    );
                })
            }
        })
    })
    return moves;
}
