const salaModel = require("../models/salaModel");

// exports.get = async () => {
//     return await salaModel.listarSalas();
// }


// exports.get = async (req, res) => {
//     return { "status": "OK", "controller": "Sala" };
// }

exports.pegarSalas = async () => {
    try {
        return await salaModel.listarSalas();
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}

exports.adicionarSala = async (sala, tipo) => {
    try {
        return await salaModel.registrarSala(sala, tipo);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}

exports.excluirSala = async (sala) => {
    try {
        return await salaModel.apagarSala(sala);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}

exports.entrarSala = async (sala, token) => {
    try {
        return await salaModel.entrarNaSala(sala, token);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}


entrar = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };
    if (await usuarioModel.alterarUsuario(user)) {
        return { msg: "OK", timestamp: timestamp = Date.now() };
    }
    return false;
}

enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    if (!sala.msgs) {
        sala.msgs = [];
    }
    timestamp = Date.now()
    sala.msgs.push(
        {
            timestamp: timestamp,
            msg: msg,
            nick: nick
        }
    )
    let resp = await salaModel.atualizarMensagens(sala);
    return { "msg": "OK", "timestamp": timestamp };
}



// app.use("/sobre", router.get("/sobre", (req, res, next) => {
//     res.status(200).send({
//         "nome": "API-CHAT",
//         "versão": "0.1.0",
//         "autor": "Gabriel Duarte"
//     })
// }));

// app.use("/salas/listar", router.get("/salas/listar", (req, res, next) => {
//     res.status(200).send({
//         "sala": "Nova Sala",
//         "versão": "0.1.0",
//         "autor": "Gabriel Duarte"
//     })
// }));

// app.use("/salas", router.get("/salas", (req, res, next) => {
//     const salaController = require("./controllers/salaController");
//     let resp = salaController.get();
//     res.status(200).send(resp);
// }))

// app.use("/entrar", router.post("/entrar", async (req, res, next) => {
//     const usuarioController = require("./controllers/usuarioController");
//     let resp = await usuarioController.entrar(req.body.nick);
//     res.status(200).send(resp);

// }));

get = async (req, res) => {
    return await salaModel.listarSalas();
}

