const urlQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
const urlQuizzUnico = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1";

// Tela 1------------------------------------------------------------------------------------------------------------------
function criarQuizz() {
    let quizBody = document.querySelector(".quizBody");
    quizBody.innerHTML = "";
    quizBody.innerHTML = `
    <div>
        <h1 class="titulo">Comece pelo começo</h1>
        <div class="listaCriacao">
            <div>
                <input type="text" minlength="20" maxlength="65"placeholder=" Título do seu quizz (Min 20 e Max 65 caracteres">
            </div>
            <div>
                <input type="text" placeholder=" URL da imagem do seu quizz">
            </div>
            <div>
                <input type="text" placeholder=" Quantidade de perguntas do quizz (Min 3 perguntas)">
            </div>
            <div>
                <input type="text" placeholder=" Quantidade de níveis do quizz (Min 2 níveis)">
            </div>
        </div>
        <div class="botaoQuiz" onclick="gerarSegundaPagina()">
            <button>Prosseguir pra criar perguntas</button>
        </div>
    </div>
    `;
}

// Tela 2------------------------------------------------------------------------------------------------------------------

let pontos = 0;
let perguntasRespondidas = 0;
let perguntas = 0;
let respostas = [];
let renderQuizbody = ``;

buscarQuizz();

function buscarQuizz() {
    scrollTopo()
    const promessa = axios.get(urlQuizzUnico);
    // console.log(promessa);
    promessa.then(renderizarMensagens);
}

function mix() {
    return 0.5 - Math.random();
}

function renderizarMensagens(dados) {
    // console.log(dados);
    let quizBody = document.querySelector(".quizBody");
    renderQuizbody = ``;
    const axios = dados.data;

    renderQuizbody += `
    <div class="bannerQuizz">
        <h1 class="tituloQuizz">${axios.title}</h1>
        <img class="topoSegundaTela" src="${axios.image}" alt="">
        <div class="telaPreta"></div>
    </div>
    `;

    for (let i = 0; i < axios.questions.length; i++) {
        perguntas = axios.questions.length;
        // console.log(perguntas);

        renderQuizbody += `
        <div class="pergunta">
            <div style="background-color: ${axios.questions[i].color};" class="cxPergunta">
                <p>${axios.questions[i].title}</p >
            </div >
        </div >
            <div class="respostas respostaEscondida respostaOnHold proximo">
                `;

        axios.questions[i].answers.sort(mix);

        for (let j = 0; j < axios.questions[i].answers.length; j++) {
            if (axios.questions[i].answers[j].isCorrectAnswer === true) {
                renderQuizbody += `
            <div class="respostaCerta" onclick="selecionarResposta(this)">
                <img class="imgPerg" src="${axios.questions[i].answers[j].image}" alt="">
                <p>${axios.questions[i].answers[j].text}</p>
            </div>`;
            } else {
                renderQuizbody += `
            <div class="respostaErrada" onclick="selecionarResposta(this)">
                <img class="imgPerg" src="${axios.questions[i].answers[j].image}" alt="">
                <p>${axios.questions[i].answers[j].text}</p>
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

        if (perguntasRespondidas === perguntas) {
            buscarQuizz2();
        }
        setTimeout(scroll, 2000);
    }
}

function scroll() {
    document.querySelector(`.proximo`).scrollIntoView({ behavior: `smooth`, block: `end` });
}

function scrollTopo() {
    document.querySelector(`.bannerQuizz`).scrollIntoView({ behavior: `smooth`, block: `start` });
}

function buscarQuizz2() {
    const promessa = axios.get(urlQuizzUnico);
    console.log(promessa);
    promessa.then(renderizarResultado);
}

function renderizarResultado(dados) {
    console.log(dados);
    let quizBody = document.querySelector(".quizBody");
    const axios = dados.data;

    let porcentagem = Math.round(pontos / perguntas * 100);

    for (let k = 0; k < axios.levels.length; k++) {

        if (porcentagem >= axios.levels[k].minValue) {
            quizBody.innerHTML += `
            <div class="pergunta">
                <div style="background-color: #EC362D;" class="cxPergunta">
                    <p>${porcentagem}% de acerto: ${axios.levels[k].title}</p>
                </div>
            </div>
            <div class="resultadoAqui">
                <img class="imgResult" src="${axios.levels[k].image}" alt="">
                <p>${axios.levels[k].text}</p>
            </div>
        
            <button class="botaoVermelho" onclick="buscarQuizz()">Reiniciar Quizz</button>
            <div></div>
            <button class="botaoBranco  proximo" onclick="voltarHome()">Voltar pra home</button>
            `;
            return
        }
    }
}


// Tela 3---------------------------------------------------------------------------------------------------------------------------------