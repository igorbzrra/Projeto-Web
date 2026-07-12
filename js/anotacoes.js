let anotacaoEditando = null;

const formAnotacao =
document.getElementById("form-anotacao");

const listaAnotacoes =
document.getElementById("lista-anotacoes");

function carregarAnotacoes(){

    renderizarAnotacoes();

}

formAnotacao.addEventListener(

    "submit",

    salvarAnotacao

);

function salvarAnotacao(event){

    event.preventDefault();

    const anotacao={

        id:

            anotacaoEditando ?? gerarId(),

        titulo:

            limparTexto(

                document
                .getElementById("titulo-anotacao")
                .value

            ),

        disciplina:

            document
            .getElementById("disciplina-anotacao")
            .value,

        conteudo:

            limparTexto(

                document
                .getElementById("conteudo-anotacao")
                .value

            ),

        data:

            hoje()

    };

    if(!validarAnotacao(anotacao)){

        return;

    }

    if(anotacaoEditando){

        atualizarRegistro(

            "anotacoes",

            anotacao.id,

            anotacao

        );

    }

    else{

        adicionarRegistro(

            "anotacoes",

            anotacao

        );

    }

    anotacaoEditando=null;

    formAnotacao.reset();

    renderizarAnotacoes();

    atualizarDashboard();

}

function validarAnotacao(anotacao){

    if(anotacao.titulo===""){

        alert("Informe o título.");

        return false;

    }

    if(anotacao.disciplina===""){

        alert("Selecione uma disciplina.");

        return false;

    }

    if(anotacao.conteudo===""){

        alert("Digite a anotação.");

        return false;

    }

    return true;

}

function renderizarAnotacoes(){

    const anotacoes=

        obterColecao("anotacoes");

    listaAnotacoes.innerHTML="";

    if(anotacoes.length===0){

        listaAnotacoes.innerHTML=`

        <div class="empty-state">

            <i class="fa-solid fa-book-open"></i>

            <h2>

                Nenhuma anotação cadastrada

            </h2>

            <p>

                Cadastre sua primeira anotação.

            </p>

        </div>

        `;

        return;

    }

    anotacoes

    .sort(

        (a,b)=>b.id-a.id

    )

    .forEach(

        criarCardAnotacao

    );

}

function criarCardAnotacao(anotacao){

    const card=

    document.createElement("div");

    card.className="item-card";

    card.innerHTML=`

        <h3>

            ${anotacao.titulo}

        </h3>

        <div class="info">

            <i class="fa-solid fa-book"></i>

            ${nomeDisciplina(

                anotacao.disciplina

            )}

        </div>

        <div class="info">

            <i class="fa-solid fa-calendar"></i>

            ${formatarData(

                anotacao.data

            )}

        </div>

        <p class="texto-anotacao">

            ${anotacao.conteudo}

        </p>

        <div class="card-actions">

            <button

                class="btn-edit"

                onclick="editarAnotacao(${anotacao.id})">

                <i class="fa-solid fa-pen"></i>

                Editar

            </button>

            <button

                class="btn-delete"

                onclick="excluirAnotacao(${anotacao.id})">

                <i class="fa-solid fa-trash"></i>

                Excluir

            </button>

        </div>

    `;

    listaAnotacoes.appendChild(card);

}

function editarAnotacao(id){

    const anotacao=

        buscarRegistro(

            "anotacoes",

            id

        );

    if(!anotacao){

        return;

    }

    anotacaoEditando=id;

    document.getElementById("titulo-anotacao").value=

        anotacao.titulo;

    document.getElementById("disciplina-anotacao").value=

        anotacao.disciplina;

    document.getElementById("conteudo-anotacao").value=

        anotacao.conteudo;

    formAnotacao.scrollIntoView({

        behavior:"smooth"

    });

}

function excluirAnotacao(id){

    if(!confirm(

        "Deseja excluir esta anotação?"

    )){

        return;

    }

    removerRegistro(

        "anotacoes",

        id

    );

    renderizarAnotacoes();

    atualizarDashboard();

}

const pesquisaAnotacao=

document.getElementById(

    "pesquisa-anotacao"

);

pesquisaAnotacao.addEventListener(

    "input",

    pesquisarAnotacoes

);

function pesquisarAnotacoes(){

    const texto=

    pesquisaAnotacao.value.toLowerCase();

    listaAnotacoes.innerHTML="";

    obterColecao("anotacoes")

    .filter(anotacao=>{

        return(

            anotacao.titulo

            .toLowerCase()

            .includes(texto)

            ||

            nomeDisciplina(

                anotacao.disciplina

            )

            .toLowerCase()

            .includes(texto)

            ||

            anotacao.conteudo

            .toLowerCase()

            .includes(texto)

        );

    })

    .forEach(

        criarCardAnotacao

    );

}