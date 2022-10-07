const numero = document.getElementById('num')
const pokeform = document.getElementById('pokeform')
const screen = document.getElementById('screen')
const ant = document.getElementById('boton1')
const sig = document.getElementById('boton2')
const shy = document.getElementById('boton3')
const back = document.getElementById('boton4')
const url = 'https://pokeapi.co/api/v2/pokemon/'



const init = async ()=> {
    pokeform.addEventListener('submit', getnumber);
    ant.addEventListener('click', anterior)
    sig.addEventListener('click', siguiente)

}
const anterior = async () => {
    let newnid = await numero.value - 1
    screen.innerHTML = await render(newnid) 
}

const siguiente = async () => {
    let newnid = await Number(numero.value) + 1
    screen.innerHTML = await render(newnid) 
}
const getnumber = async (n)=>{
    n.preventDefault();
    if (numero.value >= 1 && numero.value <= 905){
        screen.innerHTML = await render(numero.value)
    }  
    else {
        screen.innerHTML = `<div class="error">
                                <p class="error-cartel">¡ERROR!</p>
                                <P class="error-text">ingrese un ID valido</P>
                            </div>`
        console.log('ERROR')   
    }
}
///////////////////////////////////////////////////////////////////////////////////
const pokedata = async (nid) => {
    let NUMEROID = await nid
    const res = await fetch(url + NUMEROID);
    const data = await res.json();
    return await data; 
}
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
    console.log ('pokemon a renderizar =>>>>>>' + name, height, weight, types, sprites)
    
    
    return `
            <div class="nombre"><p>${name}</p></div>
            <div class="up">
                <div class="foto-contenedor">
                    <img class="foto" src="${sprites.front_default}" alt="${name} foto">
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





