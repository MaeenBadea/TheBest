import { database } from "../../config/firebase";

//create
// remember opponent contains current user id also

export function addOpponent(opponent , callback){
    const { userId } = opponent; //current user Id
    const newOpponentRef = database.ref().child('players/'+ userId + '/opponents').push();
    const newOpponentKey = newOpponentRef.key;

    opponent.id = newOpponentKey;

    // Write the new opponent data  in the opponents list
    let updates = {};
    updates['players/'+ userId +'/opponents/' + newOpponentKey] = opponent;
    database.ref().update(updates)
        .then(() => callback(true, opponent, null))
        .catch((error) => callback(false, null, error));
}



//get current user opponents
export function getOpponents(userId, callback){
    const oppRef = database.ref('players/'+ userId + '/opponents');
    //start listening for new data
    oppRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}


//update opponent data
export function updateOpponent(opp, callback) {
    const { id,name , userId } = opp;

    let updates = {};
    updates['players/' + userId + '/opponents/' + id + '/' + name ] = name;

    database.ref().update(updates)
        .then(() => callback(true, opp, null))
        .catch((error) => callback(false, null, error));
}

//delete opponent
export function deleteOpponent(opp, callback) {
    const { id, userId } = opp;

    let updates = {};
    updates['players/' + userId + '/opponents/'+ id] = null;

    database.ref().update(updates)
        .then(() => callback(true, opp, null))
        .catch((error) => callback(false, null, error));
}
