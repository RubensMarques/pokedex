const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
const info = document.querySelector('.btn-info');
const infoPokemon = document.querySelector('.arena')
const imgArena = document.querySelector('.box-stats');
const imgStats = document.querySelector('.image-stats');
const type = document.querySelector('.text-stats');

let searchPokemon = 1;
const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await APIResponse.json();

    return data;

}



const renderPokemon = async (pokemon) =>{

    try{
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = 'Loading...'
        pokemonNumber.innerHTML = '';
        const data = await fetchPokemon(pokemon);
        if(data.id < 649)
        {
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

            imgStats.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
            
            type.innerHTML = 'Type: ' + data['types']['0']['type']['name'];

        }
        else{
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];

            imgStats.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];

            type.innerHTML = 'Type: ' + data['types']['0']['type']['name'];
        }
        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id + " - ";
        searchPokemon = data.id;
        input.value = '';
    }
    catch{
        clean();
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = "not found"
    }
    
}


renderPokemon(searchPokemon);

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(input.value < 1 || input.value > 898)
    {
        clean();
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = "not found"
    }
    else{
        renderPokemon(input.value.toLowerCase().trim());
    }
})
    
    

prev.addEventListener('click', () =>{
    searchPokemon == 1 ? searchPokemon = 1 : searchPokemon--;
    renderPokemon(searchPokemon);
})

next.addEventListener('click', () =>{
    searchPokemon == 898 ? searchPokemon = 898 : searchPokemon++;
    renderPokemon(searchPokemon);
})

let clickedInfo = false
info.addEventListener('click', () =>{
    if(!clickedInfo)
    {
        imgArena.style.display = "flex";    
        clickedInfo = true;
    }
    else{
        imgArena.style.display = "none";
        clickedInfo = false;
    }
})

function clean(){
    pokemonName.innerHTML = '';
    pokemonNumber.innerHTML = '';
    input.value = '';
}

