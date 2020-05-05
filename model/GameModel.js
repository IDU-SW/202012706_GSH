const fs = require('fs');

class GameModel {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.games = JSON.parse(data)
    }

    // Promise 예제
    getGameList() {
        if (this.games) {
            return this.games;
        }
        else {
            return [];
        }
    }
    getGameListSearch(method, text) {
        if (this.games) {
            let searchData = JSON.parse(JSON.stringify(this.games));
            return searchData.filter((item) =>{
                switch(method){
                    case 'title':
                        return item.title.toLowerCase().search(text.toLowerCase()) >= 0; 
                    case 'dev':
                        return item.developer.toLowerCase().search(text.toLowerCase()) >= 0; 
                    case 'platform':
                        return item.platform.toLowerCase().search(text.toLowerCase()) >= 0; 
                    default : return 0;
                }
            });
            return searchData;
        }
        else {
            return [];
        }
    }

    getGameListSort(sort) {
        if (this.games) {
            let sortData = JSON.parse(JSON.stringify(this.games));
            return sortData.sort((a, b) => {
                switch(sort){
                    case 'id':
                        return a.id - b.id; // 오름 정렬
                    case 'title':
                        var first = a.title.toLowerCase();
                        var second = b.title.toLowerCase();
                        return first < second ? -1 : first > second ? 1 : 0; // 문자열 오름 정렬
                    case 'dev':
                        var first = a.developer.toLowerCase();
                        var second = b.developer.toLowerCase();
                        return first < second ? -1 : first > second ? 1 : 0; // 문자열 오름 정렬
                    case 'platform':
                        var first = a.platform.toLowerCase();
                        var second = b.platform.toLowerCase();
                        return first < second ? -1 : first > second ? 1 : 0; // 문자열 오름 정렬
                    case 'score':
                        return b.score - a.score; // 내림 정렬
                    case 'date':
                        return b.releaseDate - a.releaseDate; // 내림 정렬
                }
            });
            
        }
        else {
            return [];
        }
    }

    addGame(title, genre, developer, releaseDate, score, platform) {
        return new Promise((resolve, reject) => {
            let last = this.games[this.games.length - 1];
            let id = last.id + 1;

            let newGame = {id, title, genre, developer, releaseDate, score, platform};
            this.games.push(newGame);

            resolve(newGame);
        });
    }

    editGame(id, title, genre, developer, releaseDate, score, platform) {
        return new Promise((resolve, reject) => {
            for (var game of this.games ) {
                if ( game.id == id ) {
                    const fIndex = this.games.indexOf(game);
                    let newGame = {id, title, genre, developer, releaseDate, score, platform};
                    this.games.splice(fIndex, 1, newGame);
                    resolve(newGame);
                    return;
                }
            }
            reject({msg:'게임 없음 - 수정 실패', code:404});
        });
    }
    
    deleteGame(id) {
        return new Promise((resolve, reject) => {
            for (var game of this.games ) {
                console.log('비교' + game.id +',' + id);
                if ( game.id == id ) {
                    const fIndex = this.games.indexOf(game);
                    this.games.splice(fIndex, 1);
                    resolve(game);
                    return;
                }
            }
            reject({msg:'게임 없음 - 삭제 실패', code:404});
        });
    }

    // Promise - Reject
    getGameDetail(id) {
        return new Promise((resolve, reject) => {
            for (var game of this.games ) {
                if ( game.id == id ) {
                    resolve(game);
                    return;
                }
            }
            reject({msg:'게임 없음 - 탐색 실패', code:404});
        });
    }
}

module.exports = new GameModel();