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