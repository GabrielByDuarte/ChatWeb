express = require("express");
usuarioController = require("./controllers/usuarioController");
salaController = require("./controllers/salaController");
mensagensController = require("./controllers/mensagensController");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// console.log(__dirname);

const router = express.Router();

app.use('/', router.get('/', (req, res) => {
    const alerta = null;
    res.status(200).render('usuario.ejs', { alerta })
    // res.status(200).send("<h1> API - CHAT </h1>")
}))

app.use("/", router.get("/sobre", (red, res, next) => {
    res.status(200).send({
        "nome": "API - CHAT",
        "versão": "0.1.0",
        "autor": "Gabriel Duarte"
    })
}));


app.get("/entrar", router.get("/entrar", async (req, res) => {
    var nick = await req.query.nick;
    console.log(nick);

    try {
        token = await usuarioController.adicionarUsuario(nick);

        if (token == false) {
            alerta = 'Usuario já existe!';
            // setTimeout(function () {
                return res.status(200).render('usuario.ejs', { alerta });
            // }, 100);

        } else {
            return res.redirect(302, '/salas?token=' + token + '&nick=' + nick);
        }

        // let resp = await usuarioModel.registrarUsuario(nick);
        // let id = resp.insertedId;
        // // console.log(nick);
        // // console.log(id);
        // tokenGerado = await token.setToken(id, nick);
        // // console.log(tokenGerado);
        // varInserirToken = await usuarioModel.inserirToken(id, tokenGerado);
        // // console.log(varInserirToken);
        // res.setHeader('id', id);
        // res.setHeader('nick', nick);
        // res.setHeader('token', tokenGerado);

        // await usuarioModel.inserirHeader(id, nick, tokenGerado);
        // return res.send('Usuario salvo!');


    } catch (error) {
        console.error('Erro', error);
    }

}))
//__dirname 

app.use("/salas", router.get("/salas", async (req, res, next) => {
    var id = await req.query.id;
    var nick = await req.query.nick;
    var token = await req.query.token;
    try {
        // if (token.checktoken(req.headers.token, req.headers.id, req.headers.nick)) {
        // let resp = await salaController.get();

        // salas = await salaModel.buscarSalas();
        // console.log(salas);
        // if (!salas) {
        //     salaModel.registrarSala("Teste", "publica");
        // } 
        salas = await salaController.pegarSalas();
        alerta = null;
        // setTimeout(function () {

            return res.render('salas.ejs', { nick, token, salas, alerta });
        // }, 100);
        // return res.render('salas.ejs');

    }
    catch (error) {
        console.error('Erro', error);
    }
}))

app.use("/sair", router.get("/sair", async (req, res, next) => {
    id = await req.query.id;
    // nick = req.query.nick;
    token = await req.query.token;

    // console.log(token);
    try {
        await usuarioController.excluirUsuario(token);
        // setTimeout(function () {
            // return res.redirect(302, process.env.API_SERVIDOR);
            return res.redirect(302, "/");
        // }, 100);

    }
    catch (error) {
        console.error('Erro', error);
    }
}))

app.use("/salas/criar", router.get("/salas/criar", async (req, res, next) => {

    try {
        var id = await req.query.id;
        var nick = await req.query.nick;
        var token = await req.query.token;
        var sala = await req.query.sala;
        var salas = await salaController.pegarSalas();
        console.log("Sala input: " + sala);
        // console.log(sala);
        if (sala) {
            if (!salas) {
                await salaController.registrarSala(sala, "publica");
            }
            else {
                add = false;
                for (var i = 0; i < salas.length; i++) {
                    // console.log(sala);
                    console.log("Sala " + i + ": " + salas[i].nome);
                    if (salas[i].nome == sala) {
                        add = true;
                    }
                }
                if (add != true) {
                    salaController.adicionarSala(sala, "publica");
                } else {
                    alerta = "Sala já existe! Tente novamente...";
                    // setTimeout(function () {
                        // return res.render('salas.ejs', { alerta, nick, token, salas });
                        return res.redirect(302, '/salas/?nick=' + nick + "&token=" + token);
                    // }, 100);
                }
            }
        }

        var salas = await salaController.pegarSalas();
        // setTimeout(function () {

            alerta = null;
            return res.render('salas.ejs', { nick, token, salas, alerta });
            // return res.redirect(302, 'https://gabrielbyduarte.github.io/ChatWeb/salas/?id=' + id + '&nick=' + nick + "&token=" + token);
        // }, 100);
    }
    catch (error) {
        console.error('Erro', error);
    }

}))

app.get("/salas/excluir", router.get("/salas/excluir", async (req, res, next) => {
    sala = await req.query.sala;
    nick = await req.query.nick;
    token = await req.query.token;
    try {
        if (sala) {
            await salaController.excluirSala(sala);
            // var salas = await salaController.pegarSalas();
            // setTimeout(function () {
                // return res.redirect(302, 'https://gabrielbyduarte.github.io/ChatWeb/salas/');

                return res.redirect(302, '/salas/?nick=' + nick + "&token=" + token);
            // }, 100);
        }

    }
    catch (error) {
        console.error('Erro', error);
    }
}))

app.get("/salas/entrar", router.get("/salas/entrar", async (req, res, next) => {
    // id = req.query.id;
    sala = req.query.sala;
    token = req.query.token;
    nick = req.query.nick;
    time = req.query.time;
    try {
        await salaController.entrarSala(sala, token);
        // setTimeout(function () {
            return res.redirect(302, "/mensagens/?sala=" + sala + "&nick=" + nick + "&token=" + token + "&time=" + time);
            // return res.render('mensagens.ejs', { nick, token, alerta });
        // }, 100);

    }
    catch (error) {
        console.error('Erro', error);
    }
}))


app.use("/mensagens", router.get("/mensagens", async (req, res, next) => {
    var sala = await req.query.sala;
    var nick = await req.query.nick;
    var token = await req.query.token;
    var time = await req.query.time;
    try {
        mensagens = await mensagensController.pegarMensagens(sala, time);
        corUsuario = await usuarioController.pegarCor();
        // setTimeout(function () {
            return res.render('mensagens.ejs', { sala, nick, token, corUsuario, mensagens });
        // }, 100);
    }
    catch (error) {
        console.error('Erro', error);
    }
}))

app.use("/mensagens/enviar", router.get("/mensagens/enviar", async (req, res, next) => {
    var sala = await req.query.sala;
    var nick = await req.query.nick;
    var token = await req.query.token;
    var time = await req.query.time;
    var mensagem = await req.query.mensagem;
    try {

        await mensagensController.enviarMensagem(sala, nick, token, mensagem);

        // setTimeout(function () {
            return res.redirect(302, "/mensagens/?sala=" + sala + "&nick=" + nick + "&token=" + token + "&time="+ time);
        // }, 100);
    }
    catch (error) {
        console.error('Erro', error);
    }
}))

app.use("/mensagens/sair", router.get("/sair", async (req, res, next) => {
    id = await req.query.id;
    // nick = req.query.nick;
    token = await req.query.token;

    // console.log(token);
    try {
        await mensagensController.excluirSala(token);
        // setTimeout(function () {
            return res.redirect(302, '/salas/?nick=' + nick + "&token=" + token);
        // }, 100);

    }
    catch (error) {
        console.error('Erro', error);
    }
}))

module.exports = app;