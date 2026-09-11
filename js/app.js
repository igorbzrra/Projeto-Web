document.addEventListener("DOMContentLoaded", () => {

    iniciarMenu();

    carregarSistema();

    carregarDisciplinas();

    carregarTarefas();

    carregarProvas();

    carregarAnotacoes();

    carregarMetas();

    carregarHorario();

    atualizarDashboard();

    iniciarBackup();

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

    if (typeof carregarHorario === "function") {

        carregarHorario();

    }

    if (typeof atualizarDashboard === "function") {

        atualizarDashboard();

    }

}

function iniciarBackup() {

    const botaoExportar = document.getElementById("exportar-backup");
    const botaoImportar = document.getElementById("importar-backup");
    const arquivoBackup = document.getElementById("arquivo-backup");
    const status = document.getElementById("status-backup");

    botaoExportar.addEventListener("click", () => {
        exportarDados();
        status.textContent = "Backup exportado. Guarde o arquivo em um local seguro.";
    });

    botaoImportar.addEventListener("click", () => arquivoBackup.click());

    arquivoBackup.addEventListener("change", async () => {

        const arquivo = arquivoBackup.files[0];
        if (!arquivo) return;

        try {
            await importarDados(arquivo);
            status.textContent = "Backup importado. Os dados atuais e importados foram preservados.";
            carregarSistema();
            carregarDisciplinas();
            carregarTarefas();
            carregarProvas();
            carregarAnotacoes();
            carregarMetas();
            carregarHorario();
            atualizarDashboard();
        } catch (erro) {
            status.textContent = "Não foi possível importar esse arquivo de backup.";
            console.error("Erro ao importar backup:", erro);
        }

        arquivoBackup.value = "";

    });

}