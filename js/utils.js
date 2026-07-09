function formatarData(data) {

    if (!data) return "-";

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function hoje() {

    return new Date().toISOString().split("T")[0];

}

function diasRestantes(data) {

    const hoje = new Date();

    hoje.setHours(0,0,0,0);

    const destino = new Date(data);

    destino.setHours(0,0,0,0);

    const diferenca = destino - hoje;

    return Math.ceil(

        diferenca / (1000 * 60 * 60 * 24)

    );

}

function estaAtrasado(data){

    return diasRestantes(data) < 0;

}

function obterStatus(data){

    const dias = diasRestantes(data);

    if(dias < 0){

        return "Atrasada";

    }

    if(dias === 0){

        return "Hoje";

    }

    if(dias <= 3){

        return "Urgente";

    }

    if(dias <= 7){

        return "Próxima";

    }

    return "Pendente";

}

function classeStatus(status){

    switch(status){

        case "Hoje":

            return "warning";

        case "Urgente":

            return "danger";

        case "Atrasada":

            return "danger";

        case "Próxima":

            return "warning";

        default:

            return "success";

    }

}

function buscarDisciplina(id){

    const disciplinas = obterColecao(

        "disciplinas"

    );

    return disciplinas.find(

        disciplina => disciplina.id == id

    );

}

function nomeDisciplina(id){

    const disciplina = buscarDisciplina(id);

    return disciplina ?

        disciplina.nome :

        "-";

}

function corDisciplina(id){

    const disciplina = buscarDisciplina(id);

    return disciplina ?

        disciplina.cor :

        "#2563EB";

}

function ordenar(lista,campo){

    return [...lista].sort(

        (a,b)=>{

            return a[campo]

            .localeCompare(

                b[campo],

                "pt-BR"

            );

        }

    );

}

function limparTexto(texto){

    return texto

        .trim()

        .replace(/\s+/g," ");

}

function capitalizar(texto){

    return texto

    .toLowerCase()

    .replace(

        /\b\w/g,

        letra=>letra.toUpperCase()

    );

}

function formatarDataHora(data,hora){

    return `${formatarData(data)} às ${hora}`;

}

function dataAtualExtenso(){

    return new Date()

    .toLocaleDateString(

        "pt-BR",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}

function saudacao(){

    const hora = new Date().getHours();

    if(hora < 12){

        return "Bom dia";

    }

    if(hora < 18){

        return "Boa tarde";

    }

    return "Boa noite";

}

function textoDias(dias){

    if(dias < 0){

        return `Venceu há ${Math.abs(dias)} dia(s)`;

    }

    if(dias === 0){

        return "Entrega hoje";

    }

    if(dias === 1){

        return "Entrega amanhã";

    }

    return `Faltam ${dias} dias`;

}