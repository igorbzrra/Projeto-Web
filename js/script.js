const sections = document.querySelectorAll('.content');
const buttons = document.querySelectorAll('.menu-btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    sections.forEach(section => {
      section.classList.remove('active');
    });

    const target = document.getElementById(
      button.dataset.section
    );

    target.classList.add('active');
  });
});

const formDisciplina =
  document.getElementById('form-disciplina');

const listaDisciplinas =
  document.getElementById('lista-disciplinas');

const formAnotacao =
  document.getElementById('form-anotacao');

const listaAnotacoes =
  document.getElementById('lista-anotacoes');

let disciplinas =
  JSON.parse(localStorage.getItem('disciplinas')) || [];

let anotacoes =
  JSON.parse(localStorage.getItem('anotacoes')) || [];

function atualizarLista() {
  listaDisciplinas.innerHTML = '';

  disciplinas.forEach((disciplina, indice) => {
    const li = document.createElement('li');

    li.innerHTML = `
      ${disciplina}
      <button onclick="removerDisciplina(${indice})">
        Excluir
      </button>
    `;

    listaDisciplinas.appendChild(li);
  });

  document.getElementById(
    'total-disciplinas'
  ).textContent = disciplinas.length;

  localStorage.setItem(
    'disciplinas',
    JSON.stringify(disciplinas)
  );
}

function atualizarAnotacoes() {
  listaAnotacoes.innerHTML = '';

  anotacoes.forEach((anotacao, indice) => {

    const card =
      document.createElement('div');

    card.classList.add('anotacao-card');

    card.innerHTML = `
      <h3>${anotacao.titulo}</h3>

      <p>
        <strong>Disciplina:</strong>
        ${anotacao.disciplina}
      </p>

      <p>${anotacao.conteudo}</p>

      <button onclick="removerAnotacao(${indice})">
        Excluir
      </button>
    `;

    listaAnotacoes.appendChild(card);
  });

  document.getElementById(
    'total-anotacoes'
  ).textContent = anotacoes.length;

  localStorage.setItem(
    'anotacoes',
    JSON.stringify(anotacoes)
  );
}

formDisciplina.addEventListener('submit', e => {
  e.preventDefault();

  const nome =
    document.getElementById('nome-disciplina');

  disciplinas.push(nome.value);

  nome.value = '';

  atualizarLista();
});

formAnotacao.addEventListener(
  'submit',
  function (e) {
    e.preventDefault();

    const titulo =
      document.getElementById(
        'titulo-anotacao'
      ).value;

    const disciplina =
      document.getElementById(
        'disciplina-anotacao'
      ).value;

    const conteudo =
      document.getElementById(
        'conteudo-anotacao'
      ).value;

    anotacoes.push({
      titulo,
      disciplina,
      conteudo
    });

    formAnotacao.reset();

    atualizarAnotacoes();
  }
);

function removerDisciplina(indice) {
  disciplinas.splice(indice, 1);
  atualizarLista();
}

function removerAnotacao(indice) {
  anotacoes.splice(indice, 1);
  atualizarAnotacoes();
}

atualizarLista();
atualizarAnotacoes();