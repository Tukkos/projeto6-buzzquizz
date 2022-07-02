const urlQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/";


// Tela 1------------------------------------------------------------------------------------------------------------------

listarQuizz();

function listarQuizz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/");
    promessa.then(renderizarListaQuizz);
}

function renderizarListaQuizz(dados) {
    const axios = dados.data;
    let quizBody = document.querySelector(".quizBody");
    renderQuizbody = "";

    renderQuizbody += `
    <div class="lista-de-quizzes">
    <!-- Quizzes do Usuário sem Quizzes -->
        <div class="quizzes-usuario-vazio">
            <div class="quizzes-usuario">
                <span>Você não criou nenhum quizz ainda :(</span>
                <div>
                    <button onclick="gerarCriacaoComeco()">Criar Quizz</button>
                </div>
            </div>
            <div>
                <h1>Todos os Quizzes</h1>
            </div>
            <div class="quizzes-todos">`;
            for(let i = 0; i < axios.length; i++) {
                renderQuizbody += `    
                <div class="caixa-quizz">
                    <img class="caixa-quizz-imagem" src="${axios[i].image}" alt=""/>
                    <div class="caixa-quizz-gradient"></div>
                    <h2 class="caixa-quizz-titulo">${axios[i].title}</h2>
                </div>
                `;                
            }
            renderQuizbody += `
            </div>
        </div>
    </div>
    `;
    quizBody.innerHTML = renderQuizbody;
}

// Tela 2------------------------------------------------------------------------------------------------------------------

let pontos = 0;
let perguntasRespondidas = 0;
let perguntas = 0;
let respostas = [];
let renderQuizbody;

// buscarQuizz();

function buscarQuizz() {
    const urlQuizzUnico = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/6";
    const promessa = axios.get(urlQuizzUnico);
    // console.log(promessa);
    promessa.then(renderizarPerguntas);
}

function mix() {
    return 0.5 - Math.random();
}

function renderizarPerguntas(dados) {
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

function buscarQuizz2() {
    const urlQuizzUnico = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/6";
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
            pontos = 0;
            perguntasRespondidas = 0;
            perguntas = 0;
            return
        }
    }
}


// Tela 3---------------------------------------------------------------------------------------------------------------------------------
let quizzTitulo;
let quizzImage;
let quizzNPerguntas;
let quizzNNiveis;

//gerarCriacaoComeco();

function gerarCriacaoComeco() {
    let quizBody = document.querySelector(".quizBody");

    quizBody.innerHTML = `
    <h1 class="titulo">Comece pelo começo</h1>
        <div class="listaCriacao">
            <div>
                <input type="text" maxlength="65" placeholder=" Título do seu quizz (Min 20 e Max 65 caracteres)" class="qTitulo" >
            </div>
            <div>
                <input type="text" placeholder=" URL da imagem do seu quizz" class="qImage">
            </div>
            <div>
                <input type="number" min="3" placeholder=" Quantidade de perguntas do quizz (Min 3 perguntas)" class="nPerguntas">
            </div>
            <div>
                <input type="number" min="2" placeholder=" Quantidade de níveis do quizz (Min 2 níveis)" class="nNiveis">
            </div>
        </div>
        <div class="botaoQuiz" onclick="validarCriacaoComeco()">
            <button>Prosseguir pra criar perguntas</button>
        </div>
    `;
}

function validarCriacaoComeco() {
    quizzTitulo = document.querySelector(".qTitulo").value;
    quizzImage = document.querySelector(".qImage").value;
    quizzNPerguntas = document.querySelector(".nPerguntas").value;
    quizzNNiveis = document.querySelector(".nNiveis").value;

    if (
        quizzTitulo.length < 20 ||
        quizzNPerguntas < 3 ||
        quizzNNiveis < 2 ||
        (quizzImage.indexOf("https://") < 0 && isImage(quizzImage) === false)
    ) {
        alert("Informações não são válidas");
    } else {
        console.log("Está válido");
        gerarCriacaoPerguntas();
    }
}

function gerarCriacaoPerguntas() {

}

function gerarCriacaoNiveis() {

}