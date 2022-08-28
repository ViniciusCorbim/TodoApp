//-----------------------Mudança de Modo Dark || Light-----------------------//
const changeModeButton = document.getElementById('buttonMode');
changeModeButton.addEventListener("click", changeMode);
let mode = "light"; //Define o modo claro como o inicial.

//Função que alterna os modos Claro e Escuro.
function changeMode () {
    //O estilo da página é feito atráves de variáveis do CSS.
    //Há dois arquivos diferentes que carregam variáveis com o mesmo nome,
    // porém com valores diferentes (cores e imagens).
    //O link "linkCSS" é responsável por carregar um desses arquivos.
    const imgButton = document.getElementById('iconMode');//Ícone do botão de alternar modo.
    const linkCSS = document.getElementById('modeCSS');//link do arquivo CSS com as variáveis.

    mode = mode=="light"?"dark":"light";//Inverte o modo.
    if (mode=="light") {
        //Carrega o arquivo do Modo Claro.
        linkCSS.href = "styles/lightMode.css";

        //Inicia uma animação para trocar o Ícone do botão.
        //A função não pode ser chamada durante a animação.
        imgButton.classList.add('animationMode');
        changeModeButton.removeEventListener("click", changeMode);
        setTimeout(function() {
            imgButton.src = "images/icon-moon.svg";
        }, 350);
    } else if(mode=="dark"){
        //Carrega o arquivo do Modo Claro.
        linkCSS.href = "styles/darkMode.css";

        //Inicia uma animação para trocar o Ícone do botão.
        //A função não pode ser chamada durante a animação.
        imgButton.classList.add('animationMode');
        changeModeButton.removeEventListener("click", changeMode);
        setTimeout(function() {
            imgButton.src = "images/icon-sun.svg";
        }, 350);
    }

    //Finaliza a animação de trocar o Ícone do botão.
    //A função pode ser chamada novamente.
    setTimeout(function() {
        imgButton.classList.remove('animationMode');
        changeModeButton.addEventListener("click", changeMode);
    }, 700);
}


//-----------------------------Criar um Novo Todo-----------------------------//
const inputNewTodo = document.getElementById('newTodo');
const divContainerTodos = document.getElementById('containerTodoList');
//O evento keypress é acionado sempre que uma tecla for pressionada.
inputNewTodo.addEventListener('keypress', createNewTodo);

//Função que cria um novo todo.
function createNewTodo (e) {
    //A função apenas continuará se a tecla Enter for pressionada e o Input não estiver vázio.
    const keycode = e.keyCode;
    if(keycode != 13 || inputNewTodo.value == ''){
        return
    }
    
    //Cria todos os elementos presentes em uma Div Todo.
    const divTodo = document.createElement('div');
    const divCircle = document.createElement('div');
    const pTodo = document.createElement('p');
    const imgIconCross = document.createElement('img');

    //Seta os Atributos da Div container.
    divTodo.setAttribute('class', 'DivTodoItem active');

    //Seta os Atributos da Div Circle.
    divCircle.setAttribute('class', 'circle TodoItem active');

    //Seta os Atributos do Paragrafo da Div Todo.
    pTodo.setAttribute('class', 'TodoItem');
    pTodo.innerHTML = inputNewTodo.value;

    //Seta os Atributos da Imagem Cross.
    imgIconCross.src = 'images/icon-cross.svg';
    imgIconCross.setAttribute('alt', 'icon-cross');
    imgIconCross.setAttribute('class', 'iconCross');


    //Coloca todos os elementos do Todo dentro da Div container.
    //Coloca a Div container dentro dentro do corpo do HTML, na Div que contém todos os Todo.
    divTodo.appendChild(divCircle);
    divTodo.appendChild(pTodo);
    divTodo.appendChild(imgIconCross);
    divContainerTodos.appendChild(divTodo);

    //Limpa o valor do Input
    inputNewTodo.value = '';
}