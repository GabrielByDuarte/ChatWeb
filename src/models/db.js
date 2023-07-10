const { MogoClient, ObjectId, MongoClient } = require("mongodb");

let singleton;

async function conexao() {
    // if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    try {
        await client.connect();
        // console.log('Conexão estabelecida com sucesso ao banco de dados');
        // Realize as operações no banco de dados aqui
        singleton = client.db(process.env.DB_DATABASE);
        return singleton;
    } catch (error) {
        console.error('Erro', error);
    }
    // finally {
    //     await client.close();
    //     console.log('Conexão encerrada');
    // }

}

async function findAll() {
    const db = await conexao();
    const colecoes = await db.listCollections().toArray();

    // Exiba o nome de cada coleção
    colecoes.forEach((colecao) => {
        // console.log(colecao.name);
    });

}

// let findAll = async (collection) => {
//     const db = await connect();
//     return await db.collection(collection).find().toArray();
// }

async function findOneEx(colecao) {
    const db = await conexao();
    const colecoes = await db.listCollections().toArray();
    const collection = db.collection(colecao);

    // Obtenha os documentos da coleção
    const documentos = await collection.find().toArray();
    documentos.forEach((documento) => {
        // console.log(documento);
    });
}

let findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({ '_id': new ObjectId(_id) }).toArray();
    if (obj)
        return obj[0];
    return false;
}

let updateOne = async (collection, object, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: object });
    return result;
}
module.exports = { conexao, findAll, findOne, updateOne, findOneEx } 
