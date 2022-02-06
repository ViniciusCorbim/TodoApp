let mode = document.getElementById('IconMode');
let inputNewTodo = document.getElementById('newTodo');
const DivContainerTodos = document.getElementById('containerTodo');

let spanAll = document.getElementById('spanAll');
let spanActive = document.getElementById('spanActive');
let spanCompleted = document.getElementById('spanCompleted');
let clearComplete = document.getElementById('clearComplete');
let visible = 0;
let modeVar = false;  // true - Modo Escuro   e   false - Modo Claro

clearComplete.addEventListener('touchstart', touchStart);
clearComplete.addEventListener('touchend', touchEnd);
function touchStart() {
      clearComplete.classList.add('touch');
}
function touchEnd() {
      clearComplete.classList.remove('touch');
}

let ToDos = [
    {text: 'Jog around the park 3x', active: false, id: 'item0'},
    {text: '10 minutes meditation', active: true, id: 'item1'},
    {text: 'Read for 1 hour', active: true, id: 'item2'},
    {text: 'Pick up groceries', active: true, id: 'item3'},
    {text: 'Complete Todo App on Frontend Mentor', active: true, id: 'item4'}
]

function loadBody () {
    ToDos = getItem();

    for(let i=0; i<ToDos.length; i++){
        let DivTodo = document.createElement('div');
        let DivCircle = document.createElement('div');
        let pTodo = document.createElement('p');
        let imgIconCross = document.createElement('img');

        imgIconCross.src = 'images/icon-cross.svg';
        imgIconCross.setAttribute('alt', 'icon-cross');
        imgIconCross.setAttribute('class', 'iconCross');
        imgIconCross.addEventListener('click', clearTodo);

        DivTodo.setAttribute('class', 'DivTodoItem');
        DivTodo.addEventListener('mouseover', IconCrossVisible);
        DivTodo.addEventListener('mouseout', IconCrossNotVisible);
        DivCircle.setAttribute('class', 'circle TodoItem active');
        DivCircle.addEventListener('click', markTodo);
        pTodo.setAttribute('class', 'TodoItem');
        pTodo.addEventListener('click', markTodo);

        pTodo.innerHTML = ToDos[i].text;

        if(ToDos[i].active){
            DivTodo.classList.add('active');
            DivTodo.setAttribute('id', ToDos[i].id);
        }else{
            DivTodo.classList.add('completed');
            DivTodo.setAttribute('id', ToDos[i].id);
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
    //se não for a função é encerrada
    //verifica também se o Input está vazio, e se estiver a função também é encerrada
    const keycode = e.keyCode;
    if(keycode != 13 || inputNewTodo.value == ''){
        return;
    }
    //se foi a tecla enter o resto da função é executado
    let DivTodo = document.createElement('div');
    let DivCircle = document.createElement('div');
    let pTodo = document.createElement('p');
    let imgIconCross = document.createElement('img');

    imgIconCross.src = 'images/icon-cross.svg';
    imgIconCross.setAttribute('alt', 'icon-cross');
    imgIconCross.setAttribute('class', 'iconCross');
    imgIconCross.addEventListener('click', clearTodo);

    DivTodo.setAttribute('class', 'DivTodoItem active');
    DivTodo.id = 'item'+ToDos.length;
    DivTodo.addEventListener('mouseover', IconCrossVisible);
    DivTodo.addEventListener('mouseout', IconCrossNotVisible);
    DivCircle.setAttribute('class', 'circle TodoItem active');
    DivCircle.addEventListener('click', markTodo);
    pTodo.setAttribute('class', 'TodoItem');
    pTodo.addEventListener('click', markTodo);
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
});

function markTodo() {
    let children = this.parentNode.children;
    this.parentNode.setAttribute('class', 'DivTodoItem completed');

    for(let i=0; i<ToDos.length ; i++){
        if(ToDos[i].id == this.parentNode.id){
            ToDos[i].active = false;
            setItem ();
        }
    }

    for(let i = 0; i < children.length; i++){
        children[i].removeEventListener('click',markTodo);
        children[i].addEventListener('click',markOffTodo);
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
    const imgIconCross = document.querySelector('img.iconCross.Visible');
    imgIconCross.removeEventListener('click',markTodo);
    imgIconCross.removeEventListener('click',markOffTodo);
}

function markOffTodo () {
    let children = this.parentNode.children;
    this.parentNode.setAttribute('class', 'DivTodoItem active');
    for(let i = 0; i < children.length; i++){
        children[i].removeEventListener('click',markOffTodo);
        children[i].addEventListener('click', markTodo);
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

    const imgIconCross = document.querySelector('img.iconCross.Visible');
    imgIconCross.removeEventListener('click',markTodo);
    imgIconCross.removeEventListener('click',markOffTodo);
}

function countActivesTodo (){
    let ActivesTodo = document.querySelectorAll('div.DivTodoItem.active');
    let numberItensLeft = document.getElementById('numberItensLeft');
    numberItensLeft.innerHTML = ActivesTodo.length;
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
                //console.log(allTodo[i].innerText);
                //console.log(ToDos[i].text);
                console.log("Evento de Reorganizar os ToDos ativo");
                for(let i=0; i<allTodo.length; i++){
                    if(allTodo[i].classList.contains("active") == true){
                        ToDos[i] = {text: allTodo[i].innerText, active: true, id: allTodo[i].id};
                    }else{
                        ToDos[i] = {text: allTodo[i].innerText, active: false, id: allTodo[i].id};
                    }
                }
                setItem ();
            }}
        }, 200);
    }
  }