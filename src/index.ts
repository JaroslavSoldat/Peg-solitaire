import {initState, State, winState} from "./state";
import {getPossibleMoves} from "./moves";

type StateWithPrevious = {prevStateIndex: number, nextState: State};

const statesToProcess: StateWithPrevious[] = [{prevStateIndex: 0, nextState: initState}];
const statesProcessed: StateWithPrevious[] = [];

function isWinning(state: State): boolean {
    return winState.isEqual(state);
}

function printWinningSequence(lastMove?: StateWithPrevious) {
    while (lastMove) {
        console.log(lastMove.nextState.toString());
        lastMove = lastMove.prevStateIndex ? statesProcessed[lastMove.prevStateIndex - 1] : undefined;
    }
}
function isHopeless(state: State): boolean {
    // TODO: implement
    if (isWinning(state)) return false;
    return false;
}

function processState(stateToProcess: StateWithPrevious) {
    statesProcessed.push(stateToProcess);

    if (isWinning(stateToProcess.nextState)) {
        console.log('WIN!!');
        printWinningSequence(stateToProcess);
        process.exit(0);
    }

    function processMove(nextState: State) {
        console.log(`Possible move:\n${nextState}`);

        if (isHopeless(nextState)) {
            console.log('... is hopeless');
            return;
        }

        if (statesProcessed.some(stp => nextState.isEqual(stp.nextState))) {
            console.log('... already processed');
            return;
        }

        if (statesToProcess.some(stp => nextState.isEqual(stp.nextState))) {
            console.log('... already enqueued');
            return;
        }

        statesToProcess.push({prevStateIndex: statesProcessed.length, nextState});
        console.log('... enqueued');
    }

    getPossibleMoves(stateToProcess.nextState).forEach(processMove);
}

;(async () => {
    const keypress = async (): Promise<void> => {
        process.stdin.setRawMode(true)
        return new Promise(resolve => process.stdin.once('data', () => {
            process.stdin.setRawMode(false)
            resolve();
        }))
    }

    while (statesToProcess.length) {
        const state = statesToProcess.pop();
        if (!state) continue;
        processState(state);
        console.log(`from\n${state.nextState}`);
        console.log(`${statesProcessed.length} < ${statesToProcess.length}`);
        // await keypress();
    }
})()
