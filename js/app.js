document.addEventListener("DOMContentLoaded", () => {

    iniciarMenu();

    carregarSistema();

    carregarDisciplinas();

    carregarTarefas();

    carregarProvas();

    carregarAnotacoes();

    carregarMetas();

    atualizarDashboard();

});

function iniciarMenu() {

    const botoes = document.querySelectorAll(".nav-item");

    const paginas = document.querySelectorAll(".page");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            botoes.forEach(item => {

                item.classList.remove("active");

            });

            paginas.forEach(pagina => {

                pagina.classList.remove("active");

            });

            botao.classList.add("active");

            const pagina = document.getElementById(

                botao.dataset.page

            );

            pagina.classList.add("active");

        });

    });

}

function carregarSistema() {

    if (typeof carregarDisciplinas === "function") {

        carregarDisciplinas();

    }

    if (typeof carregarTarefas === "function") {

        carregarTarefas();

    }

    if (typeof carregarProvas === "function") {

        carregarProvas();

    }

    if (typeof carregarAnotacoes === "function") {

        carregarAnotacoes();

    }

    if (typeof carregarMetas === "function") {

        carregarMetas();

    }

    if (typeof atualizarDashboard === "function") {

        atualizarDashboard();

    }

}