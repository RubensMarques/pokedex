const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

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
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
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
renderPokemon(searchPokemon)

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase().trim());
})

prev.addEventListener('click', () =>{
    searchPokemon == 1 ? searchPokemon = 1 : searchPokemon--;
    renderPokemon(searchPokemon);
})

next.addEventListener('click', () =>{
    searchPokemon++;
    renderPokemon(searchPokemon);
})

function clean(){
    pokemonName.innerHTML = '';
    pokemonNumber.innerHTML = '';
    input.value = '';
}

