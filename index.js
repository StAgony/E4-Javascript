
///////////////////////////////variables/////////////////////////////////////////////

const numero = document.getElementById('num')
const pokeform = document.getElementById('pokeform')
const pokefoto = document.getElementById('fotopokemon')
const screen = document.getElementById('screen')
const ant = document.getElementById('boton1')
const sig = document.getElementById('boton2')
const shy = document.getElementById('boton3')
const back = document.getElementById('boton4')
const url = 'https://pokeapi.co/api/v2/pokemon/'

let currentnumber
let situationSH = false
let situationBK = false

//////////////////////////////////////////////init////////////////////////////////////////

const init = async ()=> {
    pokeform.addEventListener('submit', getnumber);
    ant.addEventListener('click', anterior)
    sig.addEventListener('click', siguiente)
    shy.addEventListener('click', shiny)
    back.addEventListener('click', backpoke)
}

//////////////////////////////////////////botones////////////////////////////////////

const shiny = async () => {
    console.log('ENTRE A SHINY')
    if (situationSH){
        situationSH = false
    }
    else {
        situationSH = true
    }    
    screen.innerHTML = await render(currentnumber)
}

const backpoke = async() => {
    console.log('ENTRE A BACK')
    if (situationBK){
        situationBK = false
    }
    else {
        situationBK = true
    }    
    screen.innerHTML = await render(currentnumber)
}
const anterior = async () => {
    console.log(currentnumber)
    situationBK = false
    currentnumber = currentnumber - 1
    screen.innerHTML = await render(currentnumber) 
}

const siguiente = async () => {
    console.log(currentnumber)
    situationBK = false
    currentnumber = Number(currentnumber) + 1
    screen.innerHTML = await render(currentnumber)
}

/////////////////////////////////////////////Funcionamiento base////////////////////////////////////

const getnumber = async (n)=>{
    n.preventDefault();
    situationSH = false
    situationBK = false
    currentnumber = numero.value

    if (currentnumber >= 1 && currentnumber <= 905){
        screen.innerHTML = await render(currentnumber)
    }  
    else {
        screen.innerHTML = `<div class="error">
                                <p class="error-cartel">¡ERROR!</p>
                                <P class="error-text">ingrese un ID valido</P>
                            </div>`
        console.log('ERROR')   
    }
}

/////////////////////////////////////////////Promesas a la api//////////////////////////////////////

const pokedata = async (nid) => {
    let NUMEROID = await nid
    const res = await fetch(url + NUMEROID);
    const data = await res.json();
    return await data; 
}

//////////////////////////////////////////////////render////////////////////////////////////

const render = async (nid) => {
    let pokemon = await pokedata(nid)
    console.log('objeto a renderizar>>>>>>>>>>>')
    console.log(pokemon)
  
    const {name, height, weight, types, sprites} = pokemon
    
    const mariana = (tipos) => {
        let tiposlista = ''  
        tipos.forEach(element => {
            
            tiposlista = tiposlista + `<li>${element.type.name}</li>`
        })
        return tiposlista
    }

    const setfoto = (sh,bk) => {
        console.log("la situacion es: >>>>>>>>>>")
        console.log(sh)
        console.log(bk)
        if (sh == true & bk == true){
            return sprites.back_shiny     
        }
        else if(sh == false && bk == true){
            return sprites.back_default   
        }
        else if(sh == true && bk== false){
            return sprites.front_shiny  
        }
        else if(sh == false && bk == false ){
            return sprites.front_default       
        }
    } 
    
    return `
            <div class="nombre"><p>${name}</p></div>
            <div class="up">
                <div class="foto-contenedor" id="fotopokemon">
                    <img class="foto" src="${setfoto(situationSH,situationBK)}" alt="${name} foto">
                </div>
                <div class="tipos">
                <p>Tipos: </p>
                <ul>
                ${mariana(types)}
                </ul>
                </div>
            </div>
            <div class="down">
            <div class="caracteristicas">
            <div class="peso"><p>Peso:${weight /10} Kg</p></div>
            <div class="altura"><p>Altura:${height /10}  M</p></div>
            </div>
            </div>
            `
}

init();





