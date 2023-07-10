const token = require("../util/token");
const usuarioModel = require("../models/usuarioModel");

exports.adicionarUsuario = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if (resp == false) {
        return false;
    } else {
        if (resp.insertedId) {
            id = resp.insertedId;
            // nick=nick;
            tokenGerado = await token.setToken(resp.insertedId, nick);
            try {
                await usuarioModel.inserirToken(id, tokenGerado);
                return tokenGerado;
            } catch (error) {
                console.error('Erro ao registrar usuario', error);
            }
            // return {
            //     "idUser": resp.insertedId,
            //     "token": await token.setToken(resp.insertedId, nick),
            //     "nick": nick
            // }

        }
    }
}
exports.excluirUsuario = async (token) => {
    // console.log(token);
    try {
        return await usuarioModel.deletarUsuario(token);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}
exports.pegarCor = async () => {
    // console.log(token);
    try {
        return await usuarioModel.setaCor();
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}