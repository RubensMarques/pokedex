const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
const info = document.querySelector('.btn-info');
const imgArena = document.querySelector('.box-stats');
const imgStats = document.querySelector('.image-stats');
const type = document.querySelector('.type');
const hp = document.querySelector('#hp');
const barHp = document.querySelector('#bar-hp');
const attack = document.querySelector('#attack');
const barAttack = document.querySelector('#bar-attack');
const defense = document.querySelector('#defense');
const barDefense = document.querySelector('#bar-defense');
const specialAttack = document.querySelector('#special-attack');
const barSpecialAttack = document.querySelector('#bar-special-attack');
const specialDefense = document.querySelector('#special-defense');
const barSpecialDefense = document.querySelector('#bar-special-defense');
const speed = document.querySelector('#speed');
const barSpeed = document.querySelector('#bar-speed');
let clickedInfo = false;
let clickedInput = false;
let searchPokemon = 1;

//fazer requisicção api
const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await APIResponse.json();

    return data;

}

//renderizar dados trazidos da api
const renderPokemon = async (pokemon) =>{
    try{
        pokemonImg.style.display = 'block';
        imgStats.style.display = 'block';
        pokemonName.innerHTML = 'Loading...';
        pokemonNumber.innerHTML = '';
        pokemonImg.src = '';
        imgStats.src = '';
        const data = await fetchPokemon(pokemon);
        
        element(data);

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id + " - ";
        searchPokemon = data.id;
        input.value = '';
    }
    catch{
        clean();
        pokemonImg.style.display = 'none';
        imgStats.style.display = 'none';
        imgArena.style.display = 'none';
        pokemonName.innerHTML = "not found";

    }
    
}

//inicia sempre no pokemon de numero 1
renderPokemon(searchPokemon);

//submit do texto de pesquisa
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(input.value < 1 || input.value > 898)
    {
        clean();
        pokemonImg.style.display = 'none';
        imgStats.style.display = 'none';
        imgArena.style.display = 'none';
        clickedInfo = false;
        pokemonName.innerHTML = "not found";
    }
    else{
        renderPokemon(input.value.toLowerCase().trim());
    }
});

//pokemon anterior
prev.addEventListener('click', () =>{
    searchPokemon == 1 ? searchPokemon = 1 : searchPokemon--;
    renderPokemon(searchPokemon);
});

//pokemon posterior
next.addEventListener('click', () =>{
    searchPokemon == 898 ? searchPokemon = 898 : searchPokemon++;
    renderPokemon(searchPokemon);
});

//bool para não passar para o proximo ao clicar nas setas se input estiver com foco
input.addEventListener('focus', () =>{
    console.log('focou');
    clickedInput = true;
});
input.addEventListener('focusout', ()=>
{
    clickedInput = false;
});

//passar pokemons pelo clique nas setas esquerda e direita
document.addEventListener('keydown', function(e){
    console.log(e.key)
    if(!clickedInput)
    {
        switch(e.key)
        {
            case 'ArrowLeft':
            {
                searchPokemon == 1 ? searchPokemon = 1 : searchPokemon--;
                renderPokemon(searchPokemon);
                break;
            }

            case 'ArrowRight':
            {
                searchPokemon == 898 ? searchPokemon = 898 :searchPokemon   ++;
                renderPokemon(searchPokemon);
                break;
            }
        }
    }
    
});

//mostra informações do pokemon
info.addEventListener('click', () =>{
    if(!clickedInfo && pokemonName.innerHTML !== 'not found')
    {
        imgArena.style.display = "flex";    
        clickedInfo = true;
    }
    else if(clickedInfo){
        imgArena.style.display = "none";
        clickedInfo = false;
    }
});

//limpar tela
function clean(){
    pokemonName.innerHTML = '';
    pokemonNumber.innerHTML = '';
    input.value = '';
}

//alimenta os elementos do documento
function element(data)
{
    if(data.id < 649){
        
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        imgStats.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
    }
    else{
        
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        imgStats.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        
    }

    
    type.innerHTML = 'Type: ' + data['types']['0']['type']['name'];
    hp.innerHTML = 'hp: ' + data['stats'][0]['base_stat'];
    attack.innerHTML = 'attack: ' + data['stats'][1]['base_stat'];
    defense.innerHTML = 'defense: ' + data['stats'][2]['base_stat'];
    specialAttack.innerHTML = 'special-atk: ' + data['stats'][3]['base_stat'];
    specialDefense.innerHTML = 'special-def: ' + data['stats'][4]['base_stat'];
    speed.innerHTML = 'speed: ' + data['stats'][5]['base_stat'];
    barHp.style.width = `${data['stats'][0]['base_stat']/2.7}%`;
    barAttack.style.width = `${data['stats'][1]['base_stat']/2.7}%`;
    barDefense.style.width = `${data['stats'][2]['base_stat']/2.7}%`;
    barSpecialAttack.style.width = `${data['stats'][3]['base_stat']/2.7}%`;
    barSpecialDefense.style.width = `${data['stats'][4]['base_stat']/2.7}%`;
    barSpeed.style.width = `${data['stats'][5]['base_stat']/2.7}%`;
    
}
