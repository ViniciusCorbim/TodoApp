//-----------------------Mudança de Modo Dark || Light-----------------------//
const changeModeButton = document.getElementById('buttonMode');
changeModeButton.addEventListener("click", changeMode);
let mode = "light"; //Define o modo claro como o padrão.

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
    localStorage.setItem('mode', mode);//Salva o modo no localStorage.

    //Finaliza a animação de trocar o Ícone do botão.
    //A função pode ser chamada novamente.
    setTimeout(function() {
        imgButton.classList.remove('animationMode');
        changeModeButton.addEventListener("click", changeMode);
    }, 700);
}


let allTodo = [];
//-----------------------------Criar um Novo Todo-----------------------------//
const inputNewTodo = document.getElementById('newTodo');
const divCircleCreate = document.getElementById('divCircleCreate');
let situationCreate = 'active';

//Define o estado que o Todo deve ser criado, "active" ou "completed".
divCircleCreate.addEventListener('click', function (e) {
    //situationCreateCompleted
    if (divCircleCreate.classList.contains('situationCreateCompleted')) {
        divCircleCreate.classList.remove('situationCreateCompleted');
        inputNewTodo.classList.remove('situationCreateCompleted');
        situationCreate = 'active';
    }else{
        divCircleCreate.classList.add('situationCreateCompleted');
        inputNewTodo.classList.add('situationCreateCompleted');
        situationCreate = 'completed';
    }
});


const divContainerTodos = document.getElementById('containerTodoList');
//O evento keypress é acionado sempre que uma tecla for pressionada.
inputNewTodo.addEventListener('keypress', createNewTodo);

//Função que cria um novo todo.
function createNewTodo (e) {
    //A função apenas continuará se foi a tecla Enter que acionou a função e o Input não estiver vázio.
    const keycode = e.keyCode;
    if(keycode != 13 || inputNewTodo.value == ''){
        return
    }
    
    //Cria o objeto do Todo e o armazena na variável que contém todos os objetos.
    allTodo.push(new Todo(inputNewTodo.value, situationCreate));

    //Cria todos os elementos presentes em uma Div Todo.
    const divTodo = document.createElement('div');
    const divCircle = document.createElement('div');
    const pTodo = document.createElement('p');
    const imgIconCross = document.createElement('img');

    //Seta os Atributos e Funções da Div container.
    divTodo.classList.add('divTodoItem');
    divTodo.classList.add(situationCreate);
    divTodo.setAttribute('id', allTodo[allTodo.length - 1].id);
    divTodo.addEventListener("mouseover", iconCross);
    divTodo.addEventListener("mouseout", iconCross);

    //Seta os Atributos da Div Circle.
    divCircle.classList.add('circle');
    divCircle.classList.add('todoItem');
    divCircle.addEventListener('click', markTodo);

    //Seta os Atributos do Paragrafo da Div Todo.
    pTodo.classList.add('todoItem')
    pTodo.addEventListener('click', markTodo);
    pTodo.innerHTML = inputNewTodo.value;

    //Seta os Atributos da Imagem Cross.
    imgIconCross.src = 'images/icon-cross.svg';
    imgIconCross.setAttribute('alt', 'icon-cross');
    imgIconCross.classList.add('iconCross');
    imgIconCross.addEventListener('click', deleteTodo);


    //Coloca todos os elementos do Todo dentro da Div container.
    //Coloca a Div container dentro dentro do corpo do HTML, na Div que contém todos os Todo.
    divTodo.appendChild(divCircle);
    divTodo.appendChild(pTodo);
    divTodo.appendChild(imgIconCross);
    divContainerTodos.appendChild(divTodo);
    allTodoDocument = document.querySelectorAll('div.divTodoItem');//Atualiza a variável que recebe todos os Todo.

    //Limpa o valor do Input
    inputNewTodo.value = '';

    setItem([]);//Limpa a todoList no localStorage.
    setItem(allTodo);//Salva a nova todoList no localStorage.
    todoVisible (visibleTodo);//Vai para a função que define quais Todo estarão visiveis.
    displayTodoActive ();//Atualiza a quantidade de itens ativos.
}
//{text: "Todo" ,situation: "completed",id: "item1"}
class Todo{
    constructor(text, situation){
        this.text = text;
        this.situation = situation;
        this.id = "item"+(allTodoDocument.length + 1);
    }
}


//---------------------Icone de Cruz Vísivel e Não Vísivel---------------------//
//O ícone da cruz, responsável por apagar o todo, só fica vísivel quando o usuário passa o mouse por cima da div do Todo
let allTodoDocument = document.querySelectorAll('div.divTodoItem');
for(let i=0; i < allTodoDocument.length; i++){
    allTodoDocument[i].addEventListener('mouseover', iconCross);
    allTodoDocument[i].addEventListener('mouseout', iconCross);
}
function iconCross () {
    const children = this.children;
    for(let i=0; i < children.length; i++){
        if(children[i].classList.contains('iconCross')){
            //Se o ícone já tiver a classe "visible", então essa é removida, caso contrário, é adicionada.
            children[i].classList.toggle('visible');
        }
    }
}


//-------------------------Marcar e Desmarcar um Todo-------------------------//
//Adiciona o evento a todos as as divCircle.
for(let i=0; i < allTodoDocument.length; i++){
    const children = allTodoDocument[i].children;
    for(let i=0; i < children.length; i++){
        if (children[i].classList.contains("todoItem")) {
            children[i].addEventListener('click', markTodo);
        }
    }
}
function markTodo() {
    if (this.parentNode.classList.contains('active')) {
        this.parentNode.classList.remove('active');
        this.parentNode.classList.add('completed');
        //Altera o valor da propriedade "situation" para completed.
        for(let i=0; i < allTodo.length; i++){
            if(allTodo[i].id == this.parentNode.id){
                allTodo[i].situation = "completed";
            }
        }
    }else if(this.parentNode.classList.contains('completed')){
        this.parentNode.classList.remove('completed');
        this.parentNode.classList.add('active');
        //Altera o valor da propriedade "situation" para active.
        for(let i=0; i < allTodo.length; i++){
            if(allTodo[i].id == this.parentNode.id){
                allTodo[i].situation = "active";
            }
        }  
    }
    setItem([]);//Limpa a todoList no localStorage.
    setItem(allTodo);//Salva a nova todoList no localStorage.
    todoVisible (visibleTodo);//Vai para a função que define quais Todo estarão visiveis.
    displayTodoActive ();//Atualiza a quantidade de itens ativos.
}


//---------------------Deletar um Todo qualquer ou todos os Todo Completados---------------------//
for(let i=0; i < allTodoDocument.length; i++){
    const children = allTodoDocument[i].children;
    for(let i=0; i < children.length; i++){
        if (children[i].classList.contains("iconCross")) {
            children[i].addEventListener('click', deleteTodo);
        }
    }
}
function deleteTodo () {
    const id = this.parentNode.id;
    divContainerTodos.removeChild(this.parentNode);
    allTodoDocument = document.querySelectorAll('div.divTodoItem');//Atualiza a variável que recebe todos os Todo.

    allTodo.forEach(function(value, index){
        if(value.id == id){
            allTodo.splice(index, 1);
        }
    })
    setItem([]);//Limpa a todoList no localStorage.
    setItem(allTodo);//Salva a nova todoList no localStorage.
    displayTodoActive ();//Atualiza a quantidade de itens ativos.
}

//Remove todos os Todo completados.
const buttonClearAllCompletedTodo = document.getElementById('buttonClearComplete');
buttonClearAllCompletedTodo.addEventListener('click', deleteAllCompletedTodo);
function deleteAllCompletedTodo () {
    const allcompletedTodo = document.querySelectorAll('div.divTodoItem.completed');
    allcompletedTodo.forEach(function(value){
        divContainerTodos.removeChild(value);
        allTodo.forEach(function(valueAll, index){
            if(valueAll.id == value.id){
                allTodo.splice(index, 1);
            }
        })
    })
    setItem([]);//Limpa a todoList no localStorage.
    setItem(allTodo);//Salva a nova todoList no localStorage.
}


//--------------------Atualiza a Quantidade de Itens Ativos--------------------//
function displayTodoActive () {
    const numberItensLeft = document.getElementById('numberItensLeft');
    const activeTodo = document.querySelectorAll('div.divTodoItem.active');
    numberItensLeft.innerHTML = activeTodo.length;
}


//--------------------Define quais Todo devem ficar visiveis--------------------//
let visibleTodo = 'all';//Define por padrão que todos os Todo devem ficar visiveis.
const buttonAllVisible = document.getElementById('buttonAll');
const buttonActiveVisible = document.getElementById('buttonActive');
const buttonCompleted = document.getElementById('buttonCompleted');
buttonAllVisible.addEventListener('click', function () {todoVisible ("all")});
buttonActiveVisible.addEventListener('click', function () {todoVisible ("active")});
buttonCompleted.addEventListener('click', function () {todoVisible ("completed")});
function todoVisible (visible) {
    visibleTodo = visible; 
    switch (visible) {
        case 'all':
            buttonAllVisible.classList.add('buttonVisible');
            buttonActiveVisible.classList.remove('buttonVisible');
            buttonCompleted.classList.remove('buttonVisible');

            allTodoDocument = document.querySelectorAll('div.divTodoItem');//Atualiza a variável que recebe todos os Todo.
            allTodoDocument.forEach(function(value){
                value.classList.remove('notVisible');
            })
            break;
        case 'active':
            buttonAllVisible.classList.remove('buttonVisible');
            buttonActiveVisible.classList.add('buttonVisible');
            buttonCompleted.classList.remove('buttonVisible');

            allTodoDocument = document.querySelectorAll('div.divTodoItem');//Atualiza a variável que recebe todos os Todo.
            allTodoDocument.forEach(function(value){
                if(value.classList.contains('active')){
                    value.classList.remove('notVisible');
                }else if(value.classList.contains('completed')){
                    value.classList.add('notVisible');
                }
            })
            break;
        case 'completed':
            buttonAllVisible.classList.remove('buttonVisible');
            buttonActiveVisible.classList.remove('buttonVisible');
            buttonCompleted.classList.add('buttonVisible');

            allTodoDocument = document.querySelectorAll('div.divTodoItem');//Atualiza a variável que recebe todos os Todo.
            allTodoDocument.forEach(function(value){
                if(value.classList.contains('active')){
                    value.classList.add('notVisible');
                }else if(value.classList.contains('completed')){
                    value.classList.remove('notVisible');
                }
            })
            break;
        default:
            break;
    }
}


const getItem = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setItem = (value) => localStorage.setItem('todoList', JSON.stringify(value));



//-------------------------Ao carregar a página mantém a todoList e o modo-------------------------//
function loadBody () {
    loadMode ();//Carrega o tema de cor salvo pelo usuário.
    loadTodoList ();//Carrega a todoList na página.
    todoVisible ("all");//Define que todos os todo são visiveis.
    displayTodoActive ();//Atualiza a quantidade de itens ativos.
}

function loadTodoList () {
    if(localStorage.getItem('todoList') == null){
        allTodo = [
            {text: 'Jog around the park 3x', situation: "completed", id: 'item1'},
            {text: '10 minutes meditation', situation: "active", id: 'item2'},
            {text: 'Read for 1 hour', situation: "active", id: 'item3'},
            {text: 'Pick up groceries', situation: "active", id: 'item4'},
            {text: 'Complete Todo App on Frontend Mentor', situation: "active", id: 'item5'}
        ]
     }else{
        allTodo = getItem();
     }

    allTodo.forEach(function(value){
        //Cria todos os elementos presentes em uma Div Todo.
        const divTodo = document.createElement('div');
        const divCircle = document.createElement('div');
        const pTodo = document.createElement('p');
        const imgIconCross = document.createElement('img');

        //Seta os Atributos e Funções da Div container.
        divTodo.classList.add('divTodoItem');
        divTodo.classList.add(value.situation);
        divTodo.setAttribute('id', value.id);
        divTodo.addEventListener("mouseover", iconCross);
        divTodo.addEventListener("mouseout", iconCross);

        //Seta os Atributos da Div Circle.
        divCircle.classList.add('circle');
        divCircle.classList.add('todoItem');
        divCircle.addEventListener('click', markTodo);

        //Seta os Atributos do Paragrafo da Div Todo.
        pTodo.classList.add('todoItem')
        pTodo.addEventListener('click', markTodo);
        pTodo.innerHTML = value.text;

        //Seta os Atributos da Imagem Cross.
        imgIconCross.src = 'images/icon-cross.svg';
        imgIconCross.setAttribute('alt', 'icon-cross');
        imgIconCross.classList.add('iconCross');
        imgIconCross.addEventListener('click', deleteTodo);


        //Coloca todos os elementos do Todo dentro da Div container.
        //Coloca a Div container dentro dentro do corpo do HTML, na Div que contém todos os Todo.
        divTodo.appendChild(divCircle);
        divTodo.appendChild(pTodo);
        divTodo.appendChild(imgIconCross);
        divContainerTodos.appendChild(divTodo);
        allTodoDocument = document.querySelectorAll('div.divTodoItem');//Atualiza a variável que recebe todos os Todo.
        })
}

function loadMode () {
    const imgButton = document.getElementById('iconMode');//Ícone do botão de alternar modo.
    const linkCSS = document.getElementById('modeCSS');//link do arquivo CSS com as variáveis.
    if (localStorage.getItem('mode') == 'light') {
        mode = 'light';
        linkCSS.href = "styles/lightMode.css";
        imgButton.src = "images/icon-moon.svg";
    }else if(localStorage.getItem('mode') == 'dark'){
        //Aguarda carregar o modo claro e depois vai para o escuro.
        mode = 'light';
        setTimeout(function() {
                changeMode();
        }, 400);
    }
}