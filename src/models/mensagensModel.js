async function conectarMensagens() {
    banco = require("./db");
    db1 = await banco.conexao();
    return await db1.collection("mensagens");
}
async function conectarUsuario() {
    banco = require("./db");
    db1 = await banco.conexao();
    return await db1.collection("usuario");
}

exports.setaMensagens = async (sala, nick, token, mensagem) => {
    db = await conectarMensagens();
    try {
        const dataAtual = await new Date();

        const ano = await dataAtual.getFullYear().toString();
        const mes = await (dataAtual.getMonth() + 1).toString().padStart(2, '0');
        const dia = await dataAtual.getDate().toString().padStart(2, '0');
        const hora = await dataAtual.getHours().toString().padStart(2, '0');
        const minuto = await dataAtual.getMinutes().toString().padStart(2, '0');
        timeout = await ano + mes + dia + hora + minuto;
        timeout = timeout - 300;
        console.log(timeout);
        // const ano = variavelSemPontuacao.slice(0, 4);
        // const mes = variavelSemPontuacao.slice(4, 6);
        // const dia = variavelSemPontuacao.slice(6, 8);
        // const hora = variavelSemPontuacao.slice(8, 10);
        // const minuto = variavelSemPontuacao.slice(10, 12);

        // // Criar uma nova variável com pontuação
        // const variavelComPontuacao = `${dia}/${mes}/${ano} ${hora}:${minuto}`;

        // console.log(variavelComPontuacao);
        //COMO VIZUALIZAR TIMEOUT
        resultadoInsert = await db.insertOne({ "sala": sala, "nick": nick, "token": token, "mensagem": mensagem, "timeout": timeout });

        return await resultadoInsert;
    } catch (error) {
        console.error('Erro', error);
    }

}
exports.listarMensagens = async (sala, time) => {
    db = await conectarMensagens();
    // console.log(time);
    // console.log(time + " aqui!"); 

    await time--;
    // console.log(typeof time);
    const timeString = await time.toString();

    console.log(timeString);

    await limparMensagensExtra(db, sala);
    try {
        return await db.find({ sala: sala, timeout: { $gt: timeString } }).toArray();
    } catch (error) {
        console.error('Erro', error);
    }
}
exports.excluir = async (token) => {
    db = await conectarUsuario();
    try {
        return await await db.updateOne({ token: token }, { $unset: { campo: 1 } }, (err, result) => {
            if (err) {
                console.error(err);
            }
        });
    } catch (error) {
        console.error('Erro', error);
    }
}

async function limparMensagensExtra(db, sala) {
    db = await conectarMensagens();
    try {
        const dataAtual = new Date();

        const ano = dataAtual.getFullYear().toString();
        const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
        const dia = dataAtual.getDate().toString().padStart(2, '0');
        const hora = (dataAtual.getHours().toString().padStart(2, '0'));
        const minuto = dataAtual.getMinutes().toString().padStart(2, '0');
        timeout = ano + mes + dia + hora + minuto;
        // console.log(hora);
        timeoutDelete = timeout - 400;
        const timeString = timeoutDelete.toString();
        // console.log(timeoutDelete + " aqui time para deletar!");
        // console.log(sala + " aqui sala!");

        await db.deleteMany({ timeout: { $gt: "202306231900", $lt: timeString }, sala: sala });

    } catch (error) {
        console.error('Erro', error);
    }
}

