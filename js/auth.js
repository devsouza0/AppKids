function protegerPagina() {

    if (localStorage.getItem("adminLogado") !== "true") {
        window.location.href = "login.html";
    }

}


function usuarioLogado() {

    return localStorage.getItem("adminUsuario") || "Administrador";

}


function logout() {

    localStorage.removeItem("adminLogado");
    localStorage.removeItem("adminUsuario");

    window.location.href = "login.html";

}
