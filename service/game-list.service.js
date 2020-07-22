const Http = new XMLHttpRequest();
const url = 'https://discorduwubot.firebaseio.com/playerList.json';

function postPlayer(id, game) {
    Http.open("POST", url);
    Http.send(JSON.stringify({
        id: id,
        game: game
    }));
}
