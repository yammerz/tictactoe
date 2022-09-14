/**
 * Clones an input
 * @param {*} input 
 * @returns { object } object clone
 */
const clone = input => JSON.parse(JSON.stringify(input));


/**
 * Returns whether the input is an object
 * @param {*} input 
 * @returns { boolean } true if input is object
 */
const isObject = input => input != null && typeof input === 'object' && Array.isArray(input) === false;

/**
 * Returns whether a is equal to b
 * @param {*} a 
 * @param {*} b 
 * @returns { boolean } true if a and b are equal.
 */
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Gets the nextPlayer from the state instance.
 * @param { object } state 
 * @returns { string } X or O
 */
const getPlayer = state => {

	//Get nextPlayer from state instance with getState method and nextPlayer key
	const nextPlayer = state.getStateKey('nextPlayer');

	//If new game, the nextPlayer is null so return X, else nextPlayer.
	const player = nextPlayer===null ? 'X': nextPlayer==='X'?'O':'X';

	return player;

};


/**
 * Calculates a winner if three squares in a row
 * @param {*} squares 
 * @returns a value if a winner exists else null
 */
const calculateWinner = squares => {

	const lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	let i;
	for( i=0; i < lines.length; i++){
		const [a,b,c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
			return squares[a];
		}
	}

	return null;

};



export {clone, isObject, isEqual, getPlayer, calculateWinner};