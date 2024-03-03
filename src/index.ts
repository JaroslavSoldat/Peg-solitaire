import {initState, winState} from "./state";
import {getPossibleMoves} from "./moves";

console.log(initState + '\n' + winState);

const p = getPossibleMoves(initState);

console.log(p.length);
p.forEach(s => console.log(s.toString()));