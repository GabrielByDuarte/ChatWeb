
async function conectarSalas() {
    banco = require("./db");
    db1 = await banco.conexao();
    return db1.collection("salas");

}
exports.registrarSala = async (sala, tipo) => {
    db = await conectarSalas();
    try {
        return await db.insertOne({ "nome": sala, "tipo": tipo });

    } catch (error) {
        console.error('Erro', error);
    }

}
exports.listarSalas = async () => {
    db = await conectarSalas();

    try {
        return await await db.find().toArray();

    } catch (error) {
        console.error('Erro', error);
    }
}

exports.apagarSala = async (sala) => {
    db = await conectarSalas();
    try {
        return await await db.deleteOne({ nome: sala });

    } catch (error) {
        console.error('Erro', error);
    }
};

exports.entrarNaSala = async (sala, token) => {
    db = await conectarSalas();
    try {
        return await await db.updateOne({ token: token }, { $set: { sala: sala } });

    } catch (error) {
        console.error('Erro', error);
    }
};
// function listarSalas() {
//     return [
//         {
//             "_id": {
//                 "$oid": "643ece43ea11e6e5b0421f16"
//             },
//             "nome": "Vingadores",
//             "tipo": "publica"
//         }, {
//             "_id": {
//                 "$oid": "643ece43ea11e6e5b0421f17"
//             },
//             "nome": "Renegados",
//             "tipo": "privada",
//             "chave": "at8q4haw"
//         }, {
//             "_id": {
//                 "$oid": "643ece43ea11e6e5b0421f18"
//             },
//             "nome": "Só quero reclamar",
//             "tipo": "publico"
//         }, {
//             "_id": {
//                 "$oid": "643ece43ea11e6e5b0421f19"
//             },
//             "nome": "Genios",
//             "tipo": "publico"
//         }, {
//             "_id": {
//                 "$oid": "643ece43ea11e6e5b0421f20"
//             },
//             "nome": "Defensores",
//             "tipo": "publico"
//         }
//     ];

// }

// exports.get = () => {
//     let salaModel = require('../models/salaModel');
//     return salaModel.listarSalas();
// }



// async function conectarColection() {
//     const db1 = banco.conexao();

//     try {
//         return db1.collection("salas");
//     } catch (error) {
//         console.error('Erro', error);
//     }
// } 
// let buscarSala = async (idsala) => {
//     return db.findOne("salas", idsala);
// }

// let atualizarMensagens = async (sala) => {
//     return await db.updateOne("salas", sala, { _id: sala._id });
// }
