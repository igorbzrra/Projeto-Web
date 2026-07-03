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

let disciplinas =
  JSON.parse(localStorage.getItem('disciplinas')) || [];

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

formDisciplina.addEventListener('submit', e => {
  e.preventDefault();

  const nome =
    document.getElementById('nome-disciplina');

  disciplinas.push(nome.value);

  nome.value = '';

  atualizarLista();
});

function removerDisciplina(indice) {
  disciplinas.splice(indice, 1);
  atualizarLista();
}

atualizarLista();