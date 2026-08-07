function moeda(valor) {

    return Number(valor || 0).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function formatarData(data) {

    if (!data) {
        return "-";
    }

    return new Date(
        data + "T12:00:00"
    ).toLocaleDateString("pt-BR");

}


function escapeHTML(valor) {

    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function somenteNumeros(valor) {

    return String(valor || "")
        .replace(/\D/g, "");

}


function abrirWhatsApp(numero, mensagem = "") {

    numero = somenteNumeros(numero);

    if (!numero) {
        alert("Telefone não cadastrado.");
        return;
    }

    if (!numero.startsWith("55")) {
        numero = "55" + numero;
    }

    const texto = encodeURIComponent(mensagem);

    window.open(
        `https://wa.me/${numero}?text=${texto}`,
        "_blank"
    );

}


function primeiroNome(nome) {

    if (!nome) {
        return "Administrador";
    }

    return nome.trim().split(" ")[0];
}
