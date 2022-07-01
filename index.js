const urlQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
const urlQuizzUnico = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1";

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
    let respostas = [];

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
            <div class="respostas respostaEscondida respostaOnHold proximo">
                `;

        for (let j = 0; j < axios.questions[i].answers.length; j++) {
            if (dados.data.questions[i].answers[j].isCorrectAnswer === true) {
                renderQuizbody += `
            <div class="respostaCerta" onclick="selecionarResposta(this)">
                <img class="imgPerg" src="${dados.data.questions[i].answers[j].image}" alt="">
                <p>${dados.data.questions[i].answers[j].text}</p>
            </div>`;
            } else {
                renderQuizbody += `
            <div class="respostaErrada" onclick="selecionarResposta(this)">
                <img class="imgPerg" src="${dados.data.questions[i].answers[j].image}" alt="">
                <p>${dados.data.questions[i].answers[j].text}</p>
            </div>`;
            }
        }

        renderQuizbody += `
            </div>`
    }
    quizBody.innerHTML = renderQuizbody;
}

function selecionarResposta(elemento) {
    let respostas = elemento.parentNode;
    let conferirJaTemMarcada = respostas.querySelector(`.respostaEscolhida`);

    if (conferirJaTemMarcada === null) {

        elemento.classList.add(`respostaEscolhida`);
        respostas.classList.remove(`respostaOnHold`);
        respostas.classList.remove(`respostaEscondida`);
        respostas.classList.remove(`proximo`);

        setTimeout(scroll, 2000);
    }
}

function scroll() {
    document.querySelector(`.proximo`).scrollIntoView({ behavior: `smooth`, block: `end` });
}