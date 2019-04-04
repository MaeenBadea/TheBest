import { database } from "../../config/firebase";

//create
// remember match contains current user id also

export function addMatch(match , callback){
    const { userId , oppId } = match; //current user Id
    const newMatchRef = database.ref().child('players/'+ userId + '/opponents/'+ oppId+'/matches' ).push(); 
    const newMatchKey = newMatchRef.key;

    match.id = newMatchKey;
 
    // Write the new match data  in the matchs list
    let updates = {};
    updates['players/'+ userId +'/opponents/' + oppId +'/matches/' + newMatchKey] = match;
    database.ref().update(updates)
        .then(() => callback(true, match, null))
        .catch((error) => callback(false, null, error));
}


//get current opponent matchs
export function getMatches({userId , oppId}, callback){
    const oppRef = database.ref('players/'+ userId +'/opponents/' + oppId + '/matches');
    //start listening for new data
    oppRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}


//update match data
export function updateMatch(match, callback) {
    let { id , userId,   oppId} = match;

    let updates = {};
    updates['players/'+ userId +'/opponents/' + oppId +'/matches/' + id ] = match;

    database.ref().update(updates)
        .then(() => callback(true, match, null))
        .catch((error) => callback(false, null, error));
}


//delete match
export function deleteMatch(match, callback) {
    const { id, userId , oppId } = match;

    let updates = {};
    updates['players/'+ userId +'/opponents/' + oppId +'/matches/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, opp, null))
        .catch((error) => callback(false, null, error));
}



