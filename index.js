const urlQuizzes = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";


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

let arrPerguntas = [];
let arrNiveis = [];
let quizFinal = [];

// gerarCriacaoComeco();

function gerarCriacaoComeco() {
    let quizBody = document.querySelector(".quizBody");

    quizBody.innerHTML = `
    <h1 class="titulo">Comece pelo começo</h1>
        <div class="listaCriacao">
            <div  class="criacaoDois">
                <input type="text" maxlength="65" placeholder=" Título do seu quizz (Min 20 e Max 65 caracteres)" class="qTitulo" >
            </div>
            <div  class="criacaoDois">
                <input type="text" placeholder=" URL da imagem do seu quizz" class="qImage">
            </div>
            <div  class="criacaoDois">
                <input type="number" min="3" placeholder=" Quantidade de perguntas do quizz (Min 3 perguntas)" class="nPerguntas">
            </div>
            <div  class="criacaoDois">
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
        // console.log(quizzTitulo);
        // console.log(quizzImage);
        // console.log(quizzNPerguntas);
        // console.log(quizzNNiveis);
        gerarCriacaoPerguntas();
    }
}

// gerarCriacaoPerguntas()

let quizzTituloPergunta;
let quizzCorPergunta;
let quizzRespostaCerta;
let quizzRespostaCertaImagem;
let quizzRespostaErrada;
let quizzRespostaErradaImagem;
let quizzRespostaErradaDois;
let quizzRespostaErradaImagemDois;
let quizzRespostaErradaTres;
let quizzRespostaErradaImagemTres;

function gerarCriacaoPerguntas() {
    let quizBody = document.querySelector(".quizBody");
    // quizzNPerguntas = 1;

    renderQuizbody = ``;

    renderQuizbody += `
        <h1 class="titulo">Crie suas perguntas</h1>
    `;
    for (let i = 0; i < Number(quizzNPerguntas); i++) {
        renderQuizbody += `
        <div class="listaCriacao">
            <li class="expandir">
                <h1>Pergunta ${i + 1}</h1>
                <ion-icon name="chevron-down-outline" onclick="mostrarPerguntas(this)"></ion-icon>
            </li>
            <div class="criacaoDois escondido">
                <input class="qPergunta${i}" type="text" minlength="20" placeholder=" Texto da pergunta (Min 20 caracteres)">
                <input class="qCor${i}" type="text" maxlength="7" placeholder=" Cor de fundo da pergunta (Modelo Hexadecimal)">
                <h1>Resposta correta</h1>
                <input class="qRespostaCerta${i}" type="text" placeholder=" Resposta correta">
                <input class="qRespostaCertaImagem${i}" type="text" placeholder=" URL da imagem">
                <h1>Respostas incorretas</h1>
                <input class="qRespostaErrada${i}" type="text" placeholder=" Resposta incorreta 1">
                <input class="qRespostaErradaImagem${i}" type="text" placeholder=" URL da imagem 1">
                <div class="recuo"></div>
                <input class="qRespostaErradaDois${i}" type="text" placeholder=" Resposta incorreta 2 (opcional)">
                <input class="qRespostaErradaDoisImagem${i}" type="text" placeholder=" URL da imagem 2 (opcional)">
                <div class="recuo"></div>
                <input class="qRespostaErradaTres${i}" type="text" placeholder=" Resposta incorreta 3 (opcional)">
                <input class="qRespostaErradaTresImagem${i}" type="text" placeholder=" URL da imagem 3 (opcional)">
                <div class="recuo"></div>
            </div>
        </div>
        `;
    }

    renderQuizbody += `
        <div>
            <button class="botaoVermelho" onclick="validarCriacaoPerguntas()">Prosseguir para criar níveis</button>
        </div>
    `;


    quizBody.innerHTML = renderQuizbody;
}

function validarCriacaoPerguntas() {
    for (let j = 0; j < Number(quizzNPerguntas); j++) {
        quizzTituloPergunta = document.querySelector(`.qPergunta${j}`).value;
        quizzCorPergunta = document.querySelector(`.qCor${j}`).value;
        quizzRespostaCerta = document.querySelector(`.qRespostaCerta${j}`).value;
        quizzRespostaCertaImagem = document.querySelector(`.qRespostaCertaImagem${j}`).value;
        quizzRespostaErrada = document.querySelector(`.qRespostaErrada${j}`).value;
        quizzRespostaErradaImagem = document.querySelector(`.qRespostaErradaImagem${j}`).value;
        quizzRespostaErradaDois = document.querySelector(`.qRespostaErradaDois${j}`).value;
        quizzRespostaErradaImagemDois = document.querySelector(`.qRespostaErradaDoisImagem${j}`).value;
        quizzRespostaErradaTres = document.querySelector(`.qRespostaErradaTres${j}`).value;
        quizzRespostaErradaImagemTres = document.querySelector(`.qRespostaErradaTresImagem${j}`).value;


        if (
            quizzTituloPergunta.length < 20 ||

            quizzCorPergunta.length < 7 ||
            quizzCorPergunta.indexOf("#") < 0 ||

            quizzRespostaCerta.length === 0 ||
            (quizzRespostaCertaImagem.indexOf("https://") < 0 && isImage(quizzRespostaCertaImagem) === false) ||

            quizzRespostaErrada.length === 0 ||
            (quizzRespostaErradaImagem.indexOf("https://") < 0 && isImage(quizzRespostaErradaImagem) === false)
        ) {
            alert("Informações não são válidas");
        } else {
            console.log("Está válido");

            arrPerguntas += [{
                title: quizzTituloPergunta,
                color: quizzCorPergunta,
                answers: [{
                    text: quizzRespostaCerta,
                    image: quizzRespostaCertaImagem,
                    isCorrectAnswer: true
                }][{
                        text: quizzRespostaErrada,
                        image: quizzRespostaErrada,
                        isCorrectAnswer: false
                    }]
            }]

            if (
                quizzRespostaErradaDois.length === 0 ||
                (quizzRespostaErradaImagemDois.indexOf("https://") < 0 && isImage(quizzRespostaErradaImagemDois) === false)
            ) {
            } else {
                arrPerguntas.answers += [{
                    text: quizzRespostaErradaDois,
                    image: quizzRespostaErradaImagemDois,
                    isCorrectAnswer: false
                }]
            }

            if (
                quizzRespostaErradaTres.length === 0 ||
                (quizzRespostaErradaImagemTres.indexOf("https://") < 0 && isImage(quizzRespostaErradaImagemTres) === false)
            ) {
            } else {
                arrPerguntas.answers += [{
                    text: quizzRespostaErradaTres,
                    image: quizzRespostaErradaImagemTres,
                    isCorrectAnswer: false,
                }]
            }
        }
        console.log(arrPerguntas);
        gerarCriacaoNiveis();
    }

}

gerarCriacaoNiveis();

let quizzNivel;
let quizzPorcentagem;
let quizzNivelImagem;
let quizzNivelDescricao;

function gerarCriacaoNiveis() {
    let quizBody = document.querySelector(".quizBody");
    quizzNNiveis = 2;

    renderQuizbody = ``;

    renderQuizbody += `
        <h1 class="titulo">Agora decida os níveis</h1>
    `;

    for (let i = 0; i < (Number(quizzNNiveis) - 1); i++) {
        renderQuizbody += `
            <div class="listaCriacao">
                <li class="expandir">
                    <h1>Nível ${i + 1}</h1>
                    <ion-icon name="chevron-down-outline" onclick="mostrarPerguntas(this)"></ion-icon>
                </li>
                <div class="criacaoDois escondido">
                    <input class="qNivel${i}" type="text" minlength="10" placeholder=" Título do nível (Min 10 caracteres)">
                    <input class="qPorcentagem${i}" type="text" placeholder=" % de acerto mínima (um número entre 1 e 100)">
                    <input class="qNivelImagem${i}" type="text" placeholder=" URL da imagem do nível">
                    <input class="grande qNivelDescricao${i}" type="text" minLenght="30" placeholder=" Descrição do nível (Min 30 caracteres)">
                </div>
            </div>
            `
    }

    renderQuizbody += `
        <div class="listaCriacao">
            <li class="expandir">
                <h1>Nível ${Number(quizzNNiveis)}</h1>
                <ion-icon name="chevron-down-outline" onclick="mostrarPerguntas(this)"></ion-icon>
            </li>
            <div class="criacaoDois escondido">
                <input class="qNivel${Number(quizzNNiveis)}" type="text" minlength="10" placeholder=" Título do nível pra quem errou tudo :/ (Min 10 caracteres)">
                <input class="qNivelImagem${Number(quizzNNiveis)}" type="text" placeholder=" URL da imagem do nível pra quem errou tudo :/">
                <input class="grande qNivelDescricao${Number(quizzNNiveis)}" type="text" minLenght="30" placeholder=" Descrição do nível pra quem errou tudo :/ (Min 30 caracteres)">
            </div>
        </div>
        <div class="botaoQuiz">
            <button onclick="validarCriacaoNiveis()">Finalizar Quizz</button>
        </div>
    `;

    quizBody.innerHTML = renderQuizbody;
}

function validarCriacaoNiveis() {
    for (let j = 0; j < (Number(quizzNNiveis) - 1); j++) {
        quizzNivel = document.querySelector(`.qNivel${j}`).value;
        quizzPorcentagem = document.querySelector(`.qPorcentagem${j}`).value;
        quizzNivelImagem = document.querySelector(`.qNivelImagem${j}`).value;
        quizzNivelDescricao = document.querySelector(`.qNivelDescricao${j}`).value;

        if (
            quizzNivel.length < 10 ||

            quizzPorcentagem <= 0 ||
            quizzPorcentagem > 100 ||

            (quizzNivelImagem.indexOf("https://") < 0 && isImage(quizzNivelImagem) === false) ||

            quizzNivelDescricao.length < 30
        ) {
            alert("Informações não são válidas");
        } else {
            console.log("Está válido");

            arrNiveis += [{
                title: quizzNivel,
                image: quizzNivelImagem,
                text: quizzNivelDescricao,
                minValue: quizzPorcentagem
            }]
        }
    }

    quizzNivelZero = document.querySelector(`.qNivel${Number(quizzNNiveis)}`).value;
    quizzPorcentagemZero = 0;
    quizzNivelImagemZero = document.querySelector(`.qNivelImagem${Number(quizzNNiveis)}`).value;
    quizzNivelDescricaoZero = document.querySelector(`.qNivelDescricao${Number(quizzNNiveis)}`).value;

    if (
        quizzNivelZero.length < 10 ||

        (quizzNivelImagemZero.indexOf("https://") < 0 && isImage(quizzNivelImagemZero) === false) ||

        quizzNivelDescricaoZero.length < 30
    ) {
        alert("Informações não são válidas");
    } else {
        console.log("Está válido");

        arrNiveis += [{
            title: quizzNivelZero,
            image: quizzNivelImagemZero,
            text: quizzNivelDescricaoZero,
            minValue: "0"
        }]
    }
    console.log(arrNiveis);
    gerarQuizzValidado()
}

function gerarQuizzValidado() {

}

function mostrarPerguntas(elemento) {
    elemento.classList.add("escondido");
    elemento.parentNode.parentNode.querySelector(".criacaoDois").classList.remove("escondido");
}