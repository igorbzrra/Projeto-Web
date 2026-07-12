function atualizarDashboard() {

    atualizarBoasVindas();

    atualizarTotais();

    atualizarAvisos();

    atualizarProximasAtividades();

}

function atualizarTotais() {

    document.getElementById("total-disciplinas").textContent =
        obterColecao("disciplinas").length;

    document.getElementById("total-tarefas").textContent =
        obterColecao("tarefas").length;

    document.getElementById("total-provas").textContent =
        obterColecao("provas").length;

    document.getElementById("total-anotacoes").textContent =
        obterColecao("anotacoes").length;

    document.getElementById("total-metas").textContent =
        obterColecao("metas").length;

}

function atualizarAvisos() {

    const container =

        document.getElementById(

            "lista-avisos"

        );

    container.innerHTML = "";

    const avisos = [

        ...obterAvisosTarefas(),

        ...obterAvisosProvas()

    ];

    if (avisos.length === 0) {

        container.innerHTML = `

        <p>

            Nenhum aviso.

        </p>

        `;

        return;

    }

    avisos.forEach(aviso => {

        const div =

            document.createElement("div");

        div.className = "alert";

        div.textContent = aviso;

        container.appendChild(div);

    });

}

function atualizarProximasAtividades() {

    const container =

        document.getElementById(

            "proximas-atividades"

        );

    container.innerHTML = "";

    const atividades = [];

    obterColecao("tarefas")

        .forEach(tarefa => {

            atividades.push({

                titulo: tarefa.titulo,

                data: tarefa.dataEntrega,

                tipo: "Tarefa"

            });

        });

    obterColecao("provas")

        .forEach(prova => {

            atividades.push({

                titulo: prova.titulo,

                data: prova.data,

                tipo: prova.tipo

            });

        });

    atividades

        .sort(

            (a, b) =>

                new Date(a.data) - new Date(b.data)

        );

    if (atividades.length === 0) {

        container.innerHTML = `

        <p>

            Nenhuma atividade.

        </p>

        `;

        return;

    }

    atividades

        .slice(0, 5)

        .forEach(item => {

            const div =

                document.createElement("div");

            div.className = "atividade";

            div.innerHTML = `

            <strong>

                ${item.titulo}

            </strong>

            <br>

            ${item.tipo}

            <br>

            ${formatarData(item.data)}

        `;

            container.appendChild(div);

        });

}

function atualizarBoasVindas() {

    const nome = "Aluno";

    const agora = new Date();

    const dias = [

        "domingo",

        "segunda-feira",

        "terça-feira",

        "quarta-feira",

        "quinta-feira",

        "sexta-feira",

        "sábado"

    ];

    const meses = [

        "janeiro",

        "fevereiro",

        "março",

        "abril",

        "maio",

        "junho",

        "julho",

        "agosto",

        "setembro",

        "outubro",

        "novembro",

        "dezembro"

    ];

    document.getElementById(

        "mensagem-boas-vindas"

    ).textContent =

        `Bem-vindo, ${nome}!`;

    document.getElementById(

        "data-atual"

    ).textContent =

        `Hoje é ${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}.`;

}