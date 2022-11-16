import db from '../database/db.js'

async function CreateUser(){
    return db.query('',[])
}

async function Login(){
    return db.query('',[])
}

async function FindToken(){
    return db.query('',[])
}

export { CreateUser , Login, FindToken}