const urlQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
const urlQuizzUnico = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1";

let pontos = 0;
let perguntasRespondidas = 0;
let respostas = [];

buscarQuizz();

function buscarQuizz() {
    const promessa = axios.get(urlQuizzUnico);
    // console.log(promessa);
    promessa.then(renderizarMensagens);
}

function mix() {
    return 0.5 - Math.random();
}

function renderizarMensagens(dados) {
    console.log(dados);
    let quizBody = document.querySelector(".quizBody");
    let renderQuizbody = ``;
    const axios = dados.data;

    // for (let k=0; k<axios.questions[i].answers.length; k++) {
    //     respostas = [questions[k]: [

    //     ]

    //     ]
    // }


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

        dados.data.questions[i].answers.sort(mix);

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
    let resp = elemento.parentNode;
    let conferirJaTemMarcada = resp.querySelector(`.respostaEscolhida`);

    if (conferirJaTemMarcada === null) {
        if (elemento.classList.contains(`respostaCerta`)) {
            pontos++
            console.log(pontos);
        }

        elemento.classList.add(`respostaEscolhida`);
        resp.classList.remove(`respostaOnHold`);
        resp.classList.remove(`respostaEscondida`);
        resp.classList.remove(`proximo`);
        perguntasRespondidas++

        // if (perguntasRespondidas === )
        setTimeout(scroll, 2000);
    }
}

function scroll() {
    document.querySelector(`.proximo`).scrollIntoView({ behavior: `smooth`, block: `end` });
}

