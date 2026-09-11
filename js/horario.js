const diasHorario = [
    { id: "segunda", nome: "Segunda-feira" },
    { id: "terca", nome: "Terça-feira" },
    { id: "quarta", nome: "Quarta-feira" },
    { id: "quinta", nome: "Quinta-feira" },
    { id: "sexta", nome: "Sexta-feira" },
    { id: "sabado", nome: "Sábado" }
];

const formHorario = document.getElementById("form-horario");
const gradeHorario = document.getElementById("grade-horario");
const horarioVazio = document.getElementById("horario-vazio");

function carregarHorario() {
    atualizarSelectDisciplinasHorario();
    renderizarHorario();
}

formHorario.addEventListener("submit", salvarHorario);
document.getElementById("exportar-pdf").addEventListener("click", exportarPdf);
document.getElementById("exportar-jpeg").addEventListener("click", exportarJpeg);

function atualizarSelectDisciplinasHorario() {
    const select = document.getElementById("disciplina-horario");
    const valorAtual = select.value;
    const disciplinas = ordenar(obterColecao("disciplinas"), "nome");

    select.innerHTML = '<option value="">Selecione uma disciplina</option>';
    disciplinas.forEach(disciplina => {
        const option = document.createElement("option");
        option.value = disciplina.id;
        option.textContent = disciplina.nome;
        select.appendChild(option);
    });
    select.value = valorAtual;
}

function salvarHorario(event) {
    event.preventDefault();

    const inicio = document.getElementById("inicio-horario").value;
    const fim = document.getElementById("fim-horario").value;

    if (fim <= inicio) {
        alert("O horário de término deve ser depois do início.");
        return;
    }

    adicionarRegistro("horarios", {
        id: gerarId(),
        dia: document.getElementById("dia-horario").value,
        disciplinaId: document.getElementById("disciplina-horario").value,
        inicio,
        fim,
        sala: document.getElementById("sala-horario").value.trim()
    });

    formHorario.reset();
    renderizarHorario();
}

function renderizarHorario() {
    const horarios = obterColecao("horarios").sort((a, b) => {
        return a.dia.localeCompare(b.dia) || a.inicio.localeCompare(b.inicio);
    });

    gradeHorario.innerHTML = diasHorario.map(dia => {
        const aulas = horarios.filter(horario => horario.dia === dia.id);
        return `
            <section class="dia-horario">
                <h3>${dia.nome}</h3>
                <div class="aulas-dia">
                    ${aulas.length ? aulas.map(criarAula).join("") : '<p class="sem-aula">Sem aulas</p>'}
                </div>
            </section>
        `;
    }).join("");

    horarioVazio.hidden = horarios.length > 0;
    document.getElementById("horario-exportavel").hidden = horarios.length === 0;
}

function criarAula(aula) {
    const disciplina = buscarDisciplina(aula.disciplinaId);
    const cor = disciplina?.cor || "#2563EB";
    const nome = disciplina?.nome || "Disciplina removida";

    return `
        <article class="aula" style="--aula-cor:${cor}">
            <div>
                <strong>${nome}</strong>
                <span>${aula.inicio} - ${aula.fim}${aula.sala ? ` · ${aula.sala}` : ""}</span>
            </div>
            <button type="button" class="remover-aula" title="Remover aula" onclick="removerAula(${aula.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </article>
    `;
}

function removerAula(id) {
    removerRegistro("horarios", id);
    renderizarHorario();
}

function exportarPdf() {
    if (!obterColecao("horarios").length) {
        alert("Adicione pelo menos uma aula antes de exportar.");
        return;
    }

    window.print();
}

function exportarJpeg() {
    const horarios = obterColecao("horarios");
    if (!horarios.length) {
        alert("Adicione pelo menos uma aula antes de exportar.");
        return;
    }

    const canvas = document.createElement("canvas");
    const largura = 1800;
    const altura = 850;
    const contexto = canvas.getContext("2d");
    canvas.width = largura;
    canvas.height = altura;
    contexto.fillStyle = "#F5F7FB";
    contexto.fillRect(0, 0, largura, altura);
    contexto.fillStyle = "#1F2937";
    contexto.font = "bold 42px Poppins, sans-serif";
    contexto.fillText("Meu horário semanal", 70, 80);
    contexto.font = "24px Poppins, sans-serif";
    contexto.fillStyle = "#64748B";
    contexto.fillText("StudyHub", 70, 125);

    const margem = 70;
    const topo = 170;
    const coluna = (largura - margem * 2) / diasHorario.length;
    const alturaColuna = 600;
    diasHorario.forEach((dia, indice) => {
        const x = margem + indice * coluna;
        contexto.fillStyle = "#2563EB";
        contexto.fillRect(x, topo, coluna - 10, 58);
        contexto.fillStyle = "#FFFFFF";
        contexto.font = "bold 20px Poppins, sans-serif";
        contexto.fillText(dia.nome, x + 18, topo + 37);
        contexto.fillStyle = "#FFFFFF";
        contexto.fillRect(x, topo + 58, coluna - 10, alturaColuna - 58);

        horarios.filter(horario => horario.dia === dia.id)
            .forEach((aula, aulaIndice) => {
                const y = topo + 82 + aulaIndice * 92;
                const disciplina = buscarDisciplina(aula.disciplinaId);
                contexto.fillStyle = disciplina?.cor || "#2563EB";
                contexto.fillRect(x + 16, y, coluna - 42, 72);
                contexto.fillStyle = "#FFFFFF";
                contexto.font = "bold 16px Poppins, sans-serif";
                contexto.fillText((disciplina?.nome || "Disciplina").slice(0, 20), x + 28, y + 29);
                contexto.font = "14px Poppins, sans-serif";
                contexto.fillText(`${aula.inicio} - ${aula.fim}`, x + 28, y + 53);
            });
    });

    const link = document.createElement("a");
    link.download = "horario-studyhub.jpeg";
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.click();
}