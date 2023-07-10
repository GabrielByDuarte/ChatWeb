$(document).ready(function () {
    $("#salas").hide();
    $("#mensagens").hide();
});


function exist() {
    nick = localStorage.getItem('nick');
    if (nick != null) {
        login();
    }
}

function newUser() {
    nick = document.getElementById("input-name").value;
    registrarUsuario(nick);
    // localStorage.setItem("nick", document.getElementById("input-name").value);
    login();
}

function login() {
    // window.location.assign("./chat/index.html");
    $("#inicio").hide();
    $("#salas").show();
    imprimirSala();
    nameUser();
}

function sairSalas() {
    // window.location.assign("./chat/index.html");
    localStorage.removeItem("nick");
    $("#inicio").show();
    $("#salas").hide();
    $("#mensagens").hide();
}

function sairMensagens() {
    // window.location.assign("./chat/index.html");
    localStorage.removeItem("nick");
    $("#inicio").hide();
    $("#salas").show();
    $("#mensagens").hide();
}

function nameUser() {
    limparNick();
    // nick = localStorage.getItem('nick');
    const urlParams = new URLSearchParams(window.location.search);
    const nick = urlParams.get('nick');
    usuarioText = document.createElement("p");
    usuarioText.innerHTML = "<span class='nome-usuario-span'>User</span><span class='nome-usuario2'>" + nick + "</span>";
    divPai = document.getElementById('user-info');
    divPai.appendChild(usuarioText);
}

function nameSala() {
    sala = localStorage.getItem('sala');
    salaText = document.createElement("p");
    salaText.innerHTML = "<span class='nome-usuario-span'>User</span><span class='nome-usuario2'>" + nick + "</span>";
    divPai = document.getElementById('user-info');
    divPai.appendChild(salaText);
}

function attSalas() {
    salas = localStorage.getItem('salas');
    if (salas) {

    }
}

function newSala() {
    var sala = prompt("Digite o nome da nova sala:", "Sala1");
    if (sala == null || sala == "") {
        alert("Operação cancelada!");
    } else {
        salas = localStorage.getItem('salas');
        if (!salas) {
            salas = sala.split(",");
            localStorage.setItem('salas', JSON.stringify(salas));
            imprimirSala();
        } else {
            add = false;
            salas = JSON.parse(localStorage.getItem('salas'));
            for (var i = 0; i < salas.length; i++) {
                // console.log(sala);
                // console.log(salas[i]);
                if (salas[i] == sala) {
                    add = true;
                }
            }

            if (add != true) {
                salas.push(sala);
                localStorage.setItem('salas', JSON.stringify(salas));
                imprimirSala();
            } else {
                alert("Sala já existe! Tente novamente...")
            }


        }
    }
}


function limparSalas() {
    div = document.getElementById("mostrar-salas");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function limparTitleMensagens() {
    div = document.getElementById("title-mensagens");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function limparNick() {
    div = document.querySelector("#user-info");

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function excluirSala(sala) {
    salas_array = JSON.parse(localStorage.getItem('salas'));
    for (var i = 0; i < salas_array.length; i++) {
        if (salas_array[i] == sala) {
            a = i--;
            console.log(salas_array[i]);
            console.log(sala);
            salas_array.splice(a, 1);
            localStorage.setItem('salas', JSON.stringify(salas_array));
            imprimirSala();
            break;
        }
    }
}

function imprimirSala() {
    limparSalas();
    salas_array = JSON.parse(localStorage.getItem('salas'));
    for (var i = 0; i < salas_array.length; i++) {
        var salas = document.getElementById("mostrar-salas");
        // var option = document.createElement("option");
        // option.text = sala;
        // newsala.add(option, newsala[0]);
        // console.log(salas_array[i]);
        // salas.innerHTML = "<div class='sala'>Sala</span><span class='nome-sala'>" + salas_array[i] + "</span>";
        div = document.createElement('div');
        div.id = i;
        div.className = "sala cursor-pointer";
        div.innerHTML = "<div><span>Sala</span> <span>" + salas_array[i] + "</span></div><div><i class='fa-solid fa-right-to-bracket' onclick=" + '"' + "entrarSala(" + "'" + salas_array[i] + "'" + ")" + '"' + "></i><i class='fa-solid fa-trash' onclick=" + '"' + "excluirSala(" + "'" + salas_array[i] + "'" + ")" + '"' + "></i> </div>";
        salas.appendChild(div);
    }
}

function entrarSala(salaSelecionada) {
    limparTitleMensagens();
    var name_sala = document.getElementById("title-mensagens");
    h2 = document.createElement('h2');
    h2.id = salaSelecionada;
    h2.className = "title-mensagens";
    h2.innerHTML = salaSelecionada;
    name_sala.appendChild(h2);
    // window.location.assign("./sala/index.html");
    $("#inicio").hide();
    $("#salas").hide();
    $("#mensagens").show();

}