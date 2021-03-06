let mode = document.getElementById('IconMode');
let inputNewTodo = document.getElementById('newTodo');
const DivContainerTodos = document.getElementById('containerTodo');

let spanAll = document.getElementById('spanAll');
let spanActive = document.getElementById('spanActive');
let spanCompleted = document.getElementById('spanCompleted');
let clearComplete = document.getElementById('clearComplete');
let visible = 0;
let modeVar = false;  // true - Modo Escuro   e   false - Modo Claro
let CacheDoNavegadorLimpo;

clearComplete.addEventListener('touchstart', touchStart);
clearComplete.addEventListener('touchend', touchEnd);
function touchStart() {
      clearComplete.classList.add('touch');
}
function touchEnd() {
      clearComplete.classList.remove('touch');
}

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
  }

let ToDos = [
    {text: 'Jog around the park 3x', active: false, id: 'item0'},
    {text: '10 minutes meditation', active: true, id: 'item1'},
    {text: 'Read for 1 hour', active: true, id: 'item2'},
    {text: 'Pick up groceries', active: true, id: 'item3'},
    {text: 'Complete Todo App on Frontend Mentor', active: true, id: 'item4'}
]
//localStorage.setItem('todoList', JSON.stringify(ToDos));

function loadBody () {
    CacheDoNavegadorLimpo = localStorage.getItem('CacheClear');
    if(CacheDoNavegadorLimpo == 'false' && getItem() != []){
        ToDos = getItem();
    }else{
        ToDos = [
            {text: 'Jog around the park 3x', active: false, id: 'item0'},
            {text: '10 minutes meditation', active: true, id: 'item1'},
            {text: 'Read for 1 hour', active: true, id: 'item2'},
            {text: 'Pick up groceries', active: true, id: 'item3'},
            {text: 'Complete Todo App on Frontend Mentor', active: true, id: 'item4'}
        ]
        localStorage.setItem('todoList', JSON.stringify(ToDos));
    }

    for(let i=0; i<ToDos.length; i++){
        let DivTodo = document.createElement('div');
        let DivCircle = document.createElement('div');
        let pTodo = document.createElement('p');
        let imgIconCross = document.createElement('img');

        imgIconCross.src = 'images/icon-cross.svg';
        imgIconCross.setAttribute('alt', 'icon-cross');
        imgIconCross.setAttribute('class', 'iconCross');
        imgIconCross.addEventListener('click', clearTodo);
        imgIconCross.addEventListener('touchend', clearTodo);

        DivTodo.setAttribute('class', 'DivTodoItem');
        DivTodo.addEventListener('mouseover', IconCrossVisible);
        DivTodo.addEventListener('mouseout', IconCrossNotVisible);
        DivCircle.setAttribute('class', 'circle TodoItem active');
        pTodo.setAttribute('class', 'TodoItem');

        pTodo.innerHTML = ToDos[i].text;

        if(ToDos[i].active){
            DivTodo.classList.add('active');
            DivTodo.setAttribute('id', ToDos[i].id);
            if(hasTouch()){
                DivCircle.addEventListener('touchend', markTodo);
                pTodo.addEventListener('touchend', markTodo);
            }else{
                DivCircle.addEventListener('click', markTodo);
                pTodo.addEventListener('click', markTodo);
            }
        }else{
            DivTodo.classList.add('completed');
            DivTodo.setAttribute('id', ToDos[i].id);
            if(hasTouch()){
                DivCircle.addEventListener('touchend', markOffTodo);
                pTodo.addEventListener('touchend', markOffTodo);
            }else{
                DivCircle.addEventListener('click', markOffTodo);
                pTodo.addEventListener('click', markOffTodo);
            }
        }

        inputNewTodo.focus();

        DivTodo.appendChild(DivCircle);
        DivTodo.appendChild(pTodo);
        DivTodo.appendChild(imgIconCross);
        DivContainerTodos.appendChild(DivTodo);
    }

    if(localStorage.getItem('DarkMode') == 'false'){
        modeVar = false;
    }else{
        modeVar = true;
    }

    ChangeMode();
    allVisible ();
    countActivesTodo ();
}

mode.addEventListener('click', ChangeMode);
function ChangeMode(){
    modeVar = !modeVar;
    mode.classList.add('AnimationA');
    if(modeVar){
        DarkMode ();
        localStorage.setItem('DarkMode', !modeVar);
    }else{
        LightMode ();
        localStorage.setItem('DarkMode', !modeVar);
    }

    setTimeout(function() {
        mode.classList.remove('AnimationA');
    }, 700);
}

function DarkMode () {
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('container');
    const divCreateTodo = document.getElementsByClassName('createTodo')[0];
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
    let CompletedTodo = document.querySelectorAll('div.DivTodoItem.completed');
    let Menu = document.getElementsByClassName('menu')[0];
    let t3fs = document.getElementsByClassName('t3fs')[0];
    let attribution = document.getElementsByClassName('attribution')[0];

    body.classList.remove('lightMode');
    container.classList.remove('lightMode');
    divCreateTodo.classList.remove('lightMode');
    inputNewTodo.classList.remove('lightMode');
    Menu.classList.remove('lightMode');
    t3fs.classList.remove('lightMode');
    clearComplete.classList.remove('lightMode');
    attribution.classList.remove('lightMode');

    
    body.classList.add('darkMode');
    container.classList.add('darkMode');
    divCreateTodo.classList.add('darkMode');
    inputNewTodo.classList.add('darkMode');
    t3fs.classList.add('darkMode');
    clearComplete.classList.add('darkMode');
    
    for(let i=0; i < ActivesTodo.length; i++){
        ActivesTodo[i].classList.add("darkMode");
        ActivesTodo[i].classList.remove("lightMode");
    }
    for(let i=0; i < CompletedTodo.length; i++){
        CompletedTodo[i].classList.add("darkMode");
        CompletedTodo[i].classList.remove("lightMode")
    }

    setTimeout(function() {
        mode.src = 'images/icon-sun.svg';
    }, 350);
}
function LightMode () {
    const body = document.getElementsByTagName('body')[0];
    const container = document.getElementById('container');
    const divCreateTodo = document.getElementsByClassName('createTodo')[0];
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
    let CompletedTodo = document.querySelectorAll('div.DivTodoItem.completed');
    let Menu = document.getElementsByClassName('menu')[0];
    let t3fs = document.getElementsByClassName('t3fs')[0];
    let attribution = document.getElementsByClassName('attribution')[0];

    body.classList.remove('darkMode');
    container.classList.remove('darkMode');
    divCreateTodo.classList.remove('darkMode');
    inputNewTodo.classList.remove('darkMode');
    t3fs.classList.remove('darkMode');
    clearComplete.classList.remove('darkMode');

    
    body.classList.add('lightMode');
    container.classList.add('lightMode');
    divCreateTodo.classList.add('lightMode');
    inputNewTodo.classList.add('lightMode');
    Menu.classList.add('lightMode');
    t3fs.classList.add('lightMode');
    clearComplete.classList.add('lightMode');
    attribution.classList.add('lightMode');

    for(let i=0; i < ActivesTodo.length; i++){
        ActivesTodo[i].classList.add("lightMode");
        ActivesTodo[i].classList.remove("darkMode");
    }
    for(let i=0; i < CompletedTodo.length; i++){
        CompletedTodo[i].classList.add("lightMode");
        CompletedTodo[i].classList.remove("darkMode");
    }
    setTimeout(function() {
        mode.src = 'images/icon-moon.svg';
    }, 350);
}

inputNewTodo.addEventListener('keypress', function(e){
    //Verifica se foi a tecla Enter que acionou o evento keypress
    //se n??o for a fun????o ?? encerrada
    //verifica tamb??m se o Input est?? vazio, e se estiver a fun????o tamb??m ?? encerrada
    const keycode = e.keyCode;
    if(keycode != 13 || inputNewTodo.value == ''){
        return;
    }
    //se foi a tecla enter o resto da fun????o ?? executado
    let DivTodo = document.createElement('div');
    let DivCircle = document.createElement('div');
    let pTodo = document.createElement('p');
    let imgIconCross = document.createElement('img');

    imgIconCross.src = 'images/icon-cross.svg';
    imgIconCross.setAttribute('alt', 'icon-cross');
    imgIconCross.setAttribute('class', 'iconCross');
    imgIconCross.addEventListener('click', clearTodo);
    imgIconCross.addEventListener('touchend', clearTodo);

    DivTodo.setAttribute('class', 'DivTodoItem active');
    DivTodo.id = 'item'+ToDos.length;
    DivTodo.addEventListener('mouseover', IconCrossVisible);
    DivTodo.addEventListener('mouseout', IconCrossNotVisible);
    DivCircle.setAttribute('class', 'circle TodoItem active');

    if(hasTouch()){
        DivCircle.addEventListener('touchend', markTodo);
        pTodo.addEventListener('touchend', markTodo);
    }else{
        DivCircle.addEventListener('click', markTodo);
        pTodo.addEventListener('click', markTodo);
    }

    pTodo.setAttribute('class', 'TodoItem');
    pTodo.innerHTML = inputNewTodo.value;

    let pTodoDocument = document.querySelectorAll('p.TodoItem');
    for(let i = 0; i < document.querySelectorAll('p.TodoItem').length; i++){
        if(pTodo.innerHTML == pTodoDocument[i].innerHTML){
            inputNewTodo.value = 'This Todo exists!';
            return;
        }
    }

    DivTodo.appendChild(DivCircle);
    DivTodo.appendChild(pTodo);
    DivTodo.appendChild(imgIconCross);
    DivContainerTodos.appendChild(DivTodo);

    inputNewTodo.value = '';
    countActivesTodo ();

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }

    switch(visible){
        case 0: allVisible ();
            break;
        case 1: activeVisible ();
            break;
        case 2: completedVisible ();
            break;
    }

    PushToDo (pTodo.innerText, true);
    localStorage.setItem('CacheClear', false);
});

function markTodo() {
    if(x === 1){
        x = 0;
        return;
    }
    let children = this.parentNode.children;
    this.parentNode.classList.remove('active');
    this.parentNode.classList.add('completed');

    for(let i=0; i<ToDos.length ; i++){
        if(ToDos[i].id == this.parentNode.id){
            ToDos[i].active = false;
            setItem ();
        }
    }

    if(hasTouch()){
        for(let i = 0; i < children.length; i++){
            children[i].removeEventListener('touchend',markTodo);
            children[i].addEventListener('touchend',markOffTodo);
        }
    }else{
        for(let i = 0; i < children.length; i++){
            children[i].removeEventListener('click',markTodo);
            children[i].addEventListener('click',markOffTodo);
        }
    }

    countActivesTodo ();

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }

    switch(visible){
        case 0: allVisible ();
            break;
        case 1: activeVisible ();
            break;
        case 2: completedVisible ();
            break;
    }

    localStorage.setItem('CacheClear', false);

    setTimeout(function() {
        countActivesTodo ();
    }, 200);
}

function markOffTodo () {
    if(x === 1){
        x = 0;
        return;
    }

    let children = this.parentNode.children;
    this.parentNode.classList.add('active');
    this.parentNode.classList.remove('completed');

    if(hasTouch()){
        for(let i = 0; i < children.length; i++){
            children[i].removeEventListener('touchend',markOffTodo);
            children[i].addEventListener('touchend', markTodo);
        }
    }else{
        for(let i = 0; i < children.length; i++){
            children[i].removeEventListener('click',markOffTodo);
            children[i].addEventListener('click', markTodo);
        }
    }

    for(let i=0; i<ToDos.length ; i++){
        if(ToDos[i].id == this.parentNode.id){
            ToDos[i].active = true;
            setItem ();
        }
    }

    countActivesTodo ();

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }

    switch(visible){
        case 0: allVisible ();
            break;
        case 1: activeVisible ();
            break;
        case 2: completedVisible ();
            break;
    }

    localStorage.setItem('CacheClear', false);

    setTimeout(function() {
        countActivesTodo ();
    }, 200);
}

function countActivesTodo (){
    for(let i=0; i<10; i++){
        let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
        let numberItensLeft = document.getElementById('numberItensLeft');
        numberItensLeft.innerHTML = ActivesTodo.length;
    }
}


spanAll.addEventListener('click', allVisible);
function allVisible () {
    visible = 0;
    spanAll.setAttribute('class', 'spanActiveVisible');
    spanActive.removeAttribute('class');
    spanCompleted.removeAttribute('class');

    let onlyActiveTodoVisible = document.querySelectorAll('div.DivTodoItem.completed');
    for(let i = 0; i < onlyActiveTodoVisible.length; i++){
        onlyActiveTodoVisible[i].setAttribute('class', 'DivTodoItem completed');
    }

    let onlyCompletedTodoVisible = document.querySelectorAll('div.DivTodoItem.active');
    for(let i = 0; i < onlyCompletedTodoVisible.length; i++){
        onlyCompletedTodoVisible[i].setAttribute('class', 'DivTodoItem active');
    }

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }
}

spanActive.addEventListener('click', activeVisible);
function activeVisible () {
    visible = 1;
    spanAll.removeAttribute('class');
    spanActive.setAttribute('class', 'spanActiveVisible');
    spanCompleted.removeAttribute('class');

    let onlyActiveTodoVisible = document.querySelectorAll('div.DivTodoItem.completed');
    for(let i = 0; i < onlyActiveTodoVisible.length; i++){
        onlyActiveTodoVisible[i].setAttribute('class', 'DivTodoItem completed notVisible');
    }

    let onlyCompletedTodoVisible = document.querySelectorAll('div.DivTodoItem.active');
    for(let i = 0; i < onlyCompletedTodoVisible.length; i++){
        onlyCompletedTodoVisible[i].setAttribute('class', 'DivTodoItem active');
    }

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }
}

spanCompleted.addEventListener('click', completedVisible);
function completedVisible () {
    visible = 2;
    spanAll.removeAttribute('class');
    spanActive.removeAttribute('class');
    spanCompleted.setAttribute('class', 'spanActiveVisible');

    let onlyActiveTodoVisible = document.querySelectorAll('div.DivTodoItem.completed');
    for(let i = 0; i < onlyActiveTodoVisible.length; i++){
        onlyActiveTodoVisible[i].setAttribute('class', 'DivTodoItem completed');
    }

    let onlyCompletedTodoVisible = document.querySelectorAll('div.DivTodoItem.active');
    for(let i = 0; i < onlyCompletedTodoVisible.length; i++){
        onlyCompletedTodoVisible[i].setAttribute('class', 'DivTodoItem active notVisible');
    }

    if(modeVar){
        DarkMode ()
    }else{
        LightMode ();
    }
}

    function IconCrossVisible () {
        let children = this.children;
        for(let i=0; i < children.length; i++){
            if(children[i].classList == 'iconCross'){
                children[i].classList.add('Visible')
            }
        }
    }
    function IconCrossNotVisible () {
        let Visible = document.querySelector('img.iconCross.Visible');
        Visible.classList.remove('Visible');
    }

clearComplete.addEventListener('click', ClearCompleteTodo);
function ClearCompleteTodo () {
    let completedTodo = document.querySelectorAll('div.DivTodoItem.completed');
    const DivContainerTodos = document.getElementById('containerTodo');

    for(let i = 0; i < completedTodo.length; i++){
        DivContainerTodos.removeChild(completedTodo[i]);

        ToDos.forEach(function(valor, index){
            if(!valor.active){
                SliceToDo (index);
            }
        })
    }
    localStorage.setItem('CacheClear', false);
}

function clearTodo () {
    ToDos = getItem();
    let parent = this.parentNode;
    DivContainerTodos.removeChild(parent);

    ToDos.forEach(function(valor, index){
        if(valor.id == parent.id){
            SliceToDo (index);
        }
    })
    countActivesTodo ();
    localStorage.setItem('CacheClear', false);
}

const getItem = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

function setItem () {
    ToDos.forEach(function(valor, indice){
        valor.id = 'item'+indice;
    });

    let allTodo = document.querySelectorAll('div.DivTodoItem');
    for(let i=0; i < ToDos.length; i++){
        allTodo[i].id = `item${i}`;
    }

    localStorage.setItem('todoList', JSON.stringify(ToDos));
    ToDos = getItem();
}

function PushToDo (texto, ativo) {
    ToDos.push({text: texto, active: ativo, id: 'item'+Number(ToDos.length)});
    setItem ();
}

function SliceToDo (index) {
    ToDos.splice(index, 1);
    setItem ();
}

//Eventos do Mouse
DivContainerTodos.addEventListener('mouseenter', reorganizarToDos);
DivContainerTodos.addEventListener('mouseout', reorganizarToDos);
DivContainerTodos.addEventListener('mousemove', reorganizarToDos);
DivContainerTodos.addEventListener('mousedown', reorganizarToDos);
DivContainerTodos.addEventListener('mouseup', reorganizarToDos);


function reorganizarToDos(){
    let allTodo = document.querySelectorAll('div.DivTodoItem');
    ToDos = getItem();
    for(let i=0; i < allTodo.length; i++){
        setTimeout(function() {
                if(allTodo.length == ToDos.length){
                    if(allTodo[i].id !== ToDos[i].id){
                    for(let i=0; i<allTodo.length; i++){
                        if(allTodo[i].classList.contains("active") == true){
                            ToDos[i] = {text: allTodo[i].innerText, active: true, id: allTodo[i].id};
                        }else{
                            ToDos[i] = {text: allTodo[i].innerText, active: false, id: allTodo[i].id};
                        }
                    }
                    setItem ();
                    localStorage.setItem('CacheClear', false);
                }}
        }, 200);
    }
  }

  //Eventos TouchScreen
DivContainerTodos.addEventListener('touchstart', reorganizaToDosPhone);
DivContainerTodos.addEventListener('touchend', reorganizaToDosPhone);
DivContainerTodos.addEventListener('touchmove', reorganizaToDosPhone);
DivContainerTodos.addEventListener('touchmove', CancelEventMarkTodo);
DivContainerTodos.addEventListener('touchcancel', reorganizaToDosPhone);

function reorganizaToDosPhone () {
    reorganizarToDos();

    setTimeout(function() {
        reorganizarToDos();
    }, 200);

    setTimeout(function() {
        reorganizarToDos();
    }, 400);

    setTimeout(function() {
        reorganizarToDos();
    }, 600);

    setTimeout(function() {
        reorganizarToDos();
    }, 800);

    setTimeout(function() {
        reorganizarToDos();
    }, 1000);
}


//O usu??rio pode reorganizar e marcar/desmarcar um ToDo ao mesmo tempo, e nisso a a????o de reorganizar ?? cancelada
//Para resolver isso eu cancelei a a????o de marcar/desmarcar quando ocorrer um evento touchmove
//quando a vari??vel x valer 1, os evento markTodo e MarkOffTodo ser??o encerrados no inicio e a vari??vel x receber?? o valor 0
//e quando o usu??rio remover o dedo a vari??vel x tamb??m receber?? 0
function CancelEventMarkTodo () {
    x = 1;
    DivContainerTodos.addEventListener('touchend', ReactivateEventMarkTodo);
}
let x = 0;

function ReactivateEventMarkTodo () {
    x = 0;
    DivContainerTodos.removeEventListener('touchend', ReactivateEventMarkTodo);
}