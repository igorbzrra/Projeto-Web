# 📚 Organizador de Estudos para Universitários

## 📖 Descrição do Projeto

Este projeto é uma aplicação web desenvolvida para auxiliar estudantes universitários na organização de suas atividades acadêmicas. A plataforma permite o gerenciamento de disciplinas, tarefas, provas e metas de estudo em um ambiente simples e intuitivo.

O objetivo principal é proporcionar uma melhor gestão do tempo e das responsabilidades acadêmicas, ajudando os estudantes a acompanharem seus compromissos e manterem uma rotina de estudos mais organizada.

---

## 👥 Integrantes

* José Igor de Andrade Bezerra

---

## 🚀 Funcionalidades

### 📚 Gerenciamento de Disciplinas

* Cadastro de disciplinas.
* Visualização das matérias cadastradas.
* Organização por semestre ou período.

### 📝 Controle de Tarefas

* Cadastro de atividades acadêmicas.
* Marcação de tarefas como concluídas.
* Visualização de tarefas pendentes.

### 📅 Agenda de Provas

* Registro de datas de provas e trabalhos.
* Consulta de eventos acadêmicos futuros.

### 🎯 Metas de Estudo

* Definição de metas de estudo.
* Acompanhamento das metas concluídas.

### 📊 Dashboard

* Resumo das disciplinas cadastradas.
* Quantidade de tarefas pendentes.
* Próximas avaliações.
* Progresso das metas de estudo.

### ☁️ Backup entre dispositivos

Os dados são salvos no navegador atual. Para usar o StudyHub em outro computador ou celular:

1. No Dashboard, clique em **Exportar dados**.
2. Salve o arquivo `studyhub-backup.json` em um local seguro, como Google Drive ou OneDrive.
3. Abra o projeto no outro dispositivo e clique em **Importar dados**.
4. Selecione o arquivo exportado.

A importação mescla os dados do arquivo com os dados que já existem no dispositivo. A sincronização automática em tempo real ainda exige um banco de dados online e autenticação.

---

## 💡 Motivação

Muitos estudantes enfrentam dificuldades para organizar suas atividades acadêmicas, especialmente quando precisam lidar simultaneamente com disciplinas, trabalhos, avaliações e metas de estudo.

O projeto foi idealizado para oferecer uma solução simples e acessível que centralize essas informações em um único ambiente, contribuindo para uma melhor organização e produtividade dos usuários.

---

## 🛠️ Tecnologias Utilizadas

* HTML
* CSS
* JavaScript

---

## 📂 Estrutura do Projeto

```text
studyhub/

│ index.html
│ README.md

├── css/
│   │   ├── animation.css
│   │   ├── base.css
│   │   ├── cards.css
│   │   ├── components.css
│   │   ├── dashboard.css
│   │   ├── forms.css
│   │   ├── layout.css
│   │   ├── responsive.css
│   │   └── style.css
|
├── js/
│   │   ├── app.js
│   │   ├── storage.js
│   │   ├── dashboard.js
│   │   ├── disciplinas.js
│   │   ├── tarefas.js
│   │   ├── provas.js
│   │   ├── anotacoes.js
│   │   ├── metas.js
│   │   └── utils.js
```