

async function conectarUsuarios() {
    banco = require("./db");
    db1 = await banco.conexao();
    return await db1.collection("usuario");
}

exports.registrarUsuario = async (nick) => {
    db = await conectarUsuarios();

    try {
        usuarioExistente = await db.find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            // db.close();
            return result;
        });
        boolean = true;
        // console.log(usuarioExistente);
        if (usuarioExistente.length) {
            for (i = 0; i < usuarioExistente.length; i++) {
                console.log(usuarioExistente[i].nick);
                console.log(nick);
                if (usuarioExistente[i].nick == nick) {
                    return boolean = false;
                }
            }
        }
        if (boolean == true) {
            cor = await gerarCor();
            console.log(cor);
            return await db.insertOne({ "nick": nick, "cor": cor });
        } else {
            return false;

        }
        // return {
        //     "idUser": result.insertedId,
        //     "token": await token.setToken(result.insertedId, nick),
        //     "nick": nick
        // }
        //  res.redirect(302, 'http://localhost:3000/salas/');

    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }

}

async function gerarCor() {
    db = await conectarUsuarios();

    function corAleatoria() {
        var cor = Math.floor(Math.random() * 16777215).toString(16);
        return '#' + cor;
    }

    async function compararCor() {
        usuarioExistente = await db.find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            // db.close();
            return result;
        });
        booleanCor = false;
        if (usuarioExistente.leght <= 1) {
            for (i = 0; i <= usuarioExistente.length; i++) {
                cor = corAleatoria();
                if (usuarioExistente.cor[i] == cor) {
                    booleanCor = true;
                }
            }
        }
        return booleanCor;
    }
    corComaparada = compararCor();
    if (corComaparada == true) {
        compararCor();
    } else {
        return corAleatoria();
    }
}
exports.inserirToken = async (id, colocarToken) => {
    db = await conectarUsuarios();
    try {
        return await db.updateOne({ _id: id }, { $set: { token: colocarToken } });
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}
exports.setaCor = async () => {
    db = await conectarUsuarios();
    try {
        return await db.find().toArray();
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}

exports.deletarUsuario = async (token) => {
    db = await conectarUsuarios();
    // console.log(token);
    try {
        return await db.deleteOne({ token: token });
    } catch (error) {
        console.error('Erro ao registrar usuario', error);
    }
}

// let buscarUsuario = async (nick) => {
//     db = await conectarUsuarios();
//     return await db.findOne("usuarios", nick);
// }
// let verUsuarios = async () => {
//     db = await conectarUsuarios();
//     return await db.find().pretty();
// }

// let alterarUsuario = async (nick) => {
//     db = await conectarUsuarios();
//     return await db.updateOne("usuarios", nick, { _id: nick._id });
// }

// como separar adicionar usuario, deletar usuario e editar valor do usuario em express pelo mongobd

// async function inserirHeader(id, nick, token) {
// const xhr = new XMLHttpRequest();
// xhr.open('GET', "http://localhost/:" + process.env.API_PORT);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.setRequestHeader('Authorization', 'Bearer seu-token-aqui');
// xhr.send();

//     fetch("http://localhost:3000/", {
//         method: 'GET',
//         headers: {
//             teste: "TESTE OK",
//             id: id,
//             nick: nick,
//             token: token
//         }
//     })
//         .then(response => {
//             // Manipular a resposta
//         })
//         .catch(error => {
//             // Manipular o erro
//         });
// url = "http://localhost/:" + process.env.API_PORT;
// const parametros = {
//     url: url,
//     headers,
// };

// request.get(parametros);

// return {
//     "idUser": resp.insertedId,
//     "token": await token.setToken(resp.insertedId, nick),
//     "nick": nick
// }
// }
