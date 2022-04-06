/*
    Tratamento de botões e sliders

    Baseado em:
    https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input 
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
*/

// espere a janela carregar para chamar a main.
// onload é um evento do sistema.
window.onload = main;

// ==================================================================
// Variáveis globais
var ctx;
var width, height;  // área do canvas

// sugestão: organize os elementos da sua interface 
// Para saber mais sobre objetos em JS:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#defining_methods
var interface = {
};

//==================================================================
/**
 * função principal 
 */
function main() {
    const canvas = document.getElementById('meucanvas');
    ctx = canvas.getContext('2d');

    if (!ctx) alert("Não consegui abrir o contexto 2d :-( ");

    width = canvas.width;
    height = canvas.height;
    window.onkeydown = callbackTecladoDown
    //window.onkeyup = callbackTecladoUp
    console.log('w = ' + width + ' h = ' + height);

    construaInterface();
}

//==================================================================
// Interface e callbacks

/**
 * Registra os elementos HTML responsáveis pela interação no objeto
 * interface e os associa às rotinas de callback.
 */
function construaInterface() {
  // monta estrutura com os elementos da interface
  interface.barraR = document.getElementById('Barra R');
  interface.barraG = document.getElementById('Barra G');
  interface.barraB = document.getElementById('Barra B');
  interface.passo = document.getElementById('passo');

  // registro das funções de callback
  // associa um evento de um elemento a uma função
  interface.barraR.onchange = callbackBarraMudeCor;
  interface.barraG.onchange = callbackBarraMudeCor;
  interface.barraB.onchange = callbackBarraMudeCor;
  interface.passo.onchange = callbackPasso

  interface.quadX = 50
  interface.quadY = 50


  
  // chama a função de callback para criar o desenho inicial
  callbackBarraMudeCor();
}

// ------------------------------------------------------------------
// funções de CallBack
/**
 * Trata os eventos das 3 barras para mudança de cor.
 * Observe que a mesma função de callback é utilizada
 * para as 3 barras.
 * @param {*} e 
 */
function callbackBarraMudeCor(e) {
  let r = interface.barraR.value;
  let g = interface.barraG.value;
  let b = interface.barraB.value;

  let novacor = `rgb(${r}, ${g}, ${b})`;
  console.log("cor = ", novacor);

  ctx.fillStyle = novacor;
  desenheFillRect(interface.quadX, interface.quadY, 100, 50);
}

// ------------------------------------------------------------------
// funções de desenho
/**
 * desenha um retangulo prenchido com o cor 
 * atual no canto (x,y) com dimensao (w,h)
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 */
function desenheFillRect(x, y, w, h) {
  let quad = new Path2D();
  quad.moveTo(x, y);
  quad.lineTo(x + w, y);
  quad.lineTo(x + w, y + h);
  quad.lineTo(x, y + h);
  quad.closePath();
  ctx.fill(quad);
}

function callbackTecladoDown(event) {
    let keyName =  event.key
    let passo = interface.passo.value
    switch (keyName) {
        case 'w':
            if (interface.quadY - passo >= 0){
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                console.log("apetei w")
                interface.quadY -= passo
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);

            }
            else{
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                interface.quadY = 0
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);

            }
            break;
        case 'a':
            if (interface.quadX - passo >= 0){
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                console.log("apetei w")
                interface.quadX -= passo
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);
            }
            else {
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                interface.quadX = 0
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);
            }
            break;
        
        case 's':
            if (interface.quadY + passo < height - 50){
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                
                interface.quadY += passo
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);
            }
            else{
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                interface.quadY = height - 50
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);
            }
            break;
        
        case 'd':
            console.log()
            if (interface.quadX + passo < width - 100){
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                
                interface.quadX += passo
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);

            }
            else{
                ctx.clearRect(interface.quadX, interface.quadY, 100, 50)
                interface.quadX = width - 100
                desenheFillRect(interface.quadX, interface.quadY, 100, 50);
            }
            break;
        default:
            console.log("erro")
            break;
    }

}

function callbackPasso(event) {
    

}
