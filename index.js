const urlQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
const urlQuizzUnico = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1";
const urlPostQuizz = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";

buscarQuizz();

function buscarQuizz() {
    const promessa = axios.get(urlQuizzUnico);
    // console.log(promessa);
    promessa.then(renderizarMensagens);
}

function renderizarMensagens(dados) {
    // console.log(dados);
    let quizBody = document.querySelector(".quizBody");
    let renderQuizbody = ``;
    const axios = dados.data;

    renderQuizbody += `
    <div class="bannerQuizz" background: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${dados.data.image});>
        <h1 class="tituloQuizz">${dados.data.title}</h1>
        <img class="topoSegundaTela" src="${dados.data.image}" alt="">
    </div>
    `;

    for (let i = 0; i < axios.questions.length; i++) {
        renderQuizbody += `
        <div class="pergunta">
            <div style="background-color: ${dados.data.questions[i].color};" class="cxPergunta">
                <p>${dados.data.questions[i].title}</p >
            </div >
        </div >
            <div class="respostas">
                `;

        for (let j = 0; j < axios.questions[i].answers.length; j++) {
            renderQuizbody += `
            <div class="${dados.data.questions[i].answers[j].isCorrectAnswer}">
                <img class="imgPerg" src="${dados.data.questions[i].answers[j].image}" alt="">
                <p>${dados.data.questions[i].answers[j].text}</p>
            </div>`;
        }

        renderQuizbody += `
            </div>`
    }
    quizBody.innerHTML = renderQuizbody;
}