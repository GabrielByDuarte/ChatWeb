const mensagensModel = require("../models/mensagensModel");

exports.pegarMensagens = async (sala, time) => {
    try {
        // console.log(mensagensModel.listarMensagens(sala, time));
        return await mensagensModel.listarMensagens(sala, time);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}

exports.enviarMensagem = async (sala, nick, token, mensagem) => {
    try {
        return await mensagensModel.setaMensagens(sala, nick, token, mensagem);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}
exports.excluirSala = async (token) => {
    try {
        return await mensagensModel.excluir(token);
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}
