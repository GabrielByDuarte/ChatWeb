const jwt = require('jsonwebtoken');

// const payload = {
//     userId: 123,
//     username: 'example_user',
// };

const key = 'suaChaveSecreta';

const setToken = (id, nick) => {
    const payload = { id, nick };
    const token = jwt.sign(payload, key);
    return token;
};

const checktoken = (id, nick, tokenCheck) => {
    try {
        // const decoded = jwt.verify(token, key);
        const payload = { id, nick };
        const token = jwt.sign(payload, key);
        if (tokenCheck == token) {
            return true;
        }

    } catch (error) {
        console.error('Erro', error);
    }
};
module.exports = {
    checktoken,
    setToken,
};

// const token = jwt.sign(payload, secretKey);

// const setToken = (iduser, nick) => {
//     const payload = { iduser, nick };
//     const token = jwt.sign(payload, secretKey);
//     return token;
// };

// jwt.checktoken(token, secretKey, (err, decoded) => {
//     if (err) {
//         console.error('Erro ao verificar o token:', err);
//     } else {
//         console.log('Token verificado com sucesso:', decoded);
//     }
// });

// const checktoken = async (token, idUser, nick) => jwt.verify(token, key(err, decoded) => {
//     if (err) {
//         console.error('Erro ao verificar o token:', err);
//     } else {
//         console.log('Token verificado com sucesso:', decoded);
//     }
// });

// const setToken = async (iduser, /*key*/nick) => {
//     console.log(iduser);
//     if (iduser) {
//         return jwt.sign({ iduser }, /*key*/nick, { expiresIn: 28800 });
//     }
//     return false;
// }



// module.exports = {
//     verificarToken,
//     gerarToken,
// };



// const key = 'suaChaveSecreta';

// const checktoken = async (token, id, /*key*/nick) => jwt.verify(token, key(err, decoded) => {
//     . . . .
// });

// const setToken = async (iduser, /*key*/nick) => {
//     console.log(iduser);
//     if (iduser) {
//         return jwt.sign({ iduser }, /*key*/nick, { expiresIn: 28800 });
//     }
//     return false;
// }

// const gerarToken = (iduser, nick) => {
//     const payload = { iduser, nick };
//     const token = jwt.sign(payload, key);
//     return token;
// };

// const verificarToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, key);
//         return decoded;
//     } catch (err) {
//         // Token inválido
//         return null;
//     }
// };