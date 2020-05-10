const pool = require('./dbConnection');

class GameModel { }

/*
    CURD ETC 순
    MySQL과 연동
    dbConnection 참조
*/

GameModel.insertGame = async (title, genre, developer, releaseDate, score, platform) => {
    console.log('Model - insertGame');
    const sql = 'INSERT INTO games SET ?';
    const release_date = releaseDate;
    const data = {title, genre, developer, release_date, score, platform};
    let conn;
    try {
        conn = await pool.getConnection();
        const ret = await conn.query(sql, data);
        const gameId = ret[0]['insertId'];
        return gameId;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}


GameModel.getGameList = async (sort, direction) => {
    console.log('Model - getGameList');
    console.log('sort  : ' + sort + ' , direction : '+direction);
    let sql = (direction)? 'SELECT * FROM games ORDER BY ? DESC' : 'SELECT * FROM games ORDER BY ?';
    sort = (sort)? parseInt(sort) : 1;
    let conn;
    try {
        conn = await pool.getConnection();
        const ret = await conn.query(sql, sort);
        conn.release();
        const result = ret[0];
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}    

GameModel.getGame = async (gameId) => {
    console.log('Model - getGame');
    const sql = 'SELECT * FROM games WHERE game_id = ?';
    let conn;
    try {        
        conn = await pool.getConnection();
        const [rows, metadata] = await conn.query(sql, gameId);
        conn.release();
        return rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        if ( conn ) conn.release();
    }
}

GameModel.updateGame = async (gameId, title, genre, developer, releaseDate, score, platform) => {
    console.log('Model - updateGame');
    const sql = 'UPDATE games SET ? WHERE game_id = ?';
    const game_id = parseInt(gameId);
    // 스프링이랑 다르게 자동 리네이밍?이 안됨..
    const release_date = releaseDate;
    const data = {game_id, title, genre, developer, release_date, score, platform};
    const condition = game_id;
    let conn;
    try {
        conn = await pool.getConnection();
        const ret = await conn.query(sql, [data, condition] );
        const info = ret[0];
        return ret[0]['changedRows'];
    } catch (error) {
        console.error(error);  
    } finally {
        if ( conn ) conn.release();
    }
}

GameModel.deleteGame = async (gameId) => {
    console.log('Model - deleteGame');
    const sql = 'DELETE FROM games WHERE game_id = ?';
    const game_id = parseInt(gameId);
    let conn;
    try {
        conn = await pool.getConnection();        
        const ret = await conn.query(sql, game_id);
        return rows[0]['affectedRows'];
    } catch (error) {
        console.error(error);  
    } finally {
        if ( conn ) conn.release();
    }
}

// 혹시모를 초기화 및 재생성
GameModel.initModel = async () => {
    console.log('Model - initModel');
    console.log('games 테이블 생성');
    const sql = 'create table if not exists games ( game_id int primary key auto_increment, title varchar(100), genre varchar(100), developer varchar(50), release_date int, score int, platform varchar(50));';
    await pool.query(sql);
}

GameModel.clearModel = async () => {
    const sql = 'drop table if exists games; create table games ( game_id int primary key auto_increment, title varchar(100), genre varchar(100), developer varchar(50), release_date int, score int, platform varchar(50));';
    await pool.query(sql);
}


module.exports = GameModel;