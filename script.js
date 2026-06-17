class Pokemon {
    constructor(id, nombre, imagen, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.tipo = tipo;
    }
}


const listaPokemon = document.querySelector(".pokemon-lista");
const seccionFavoritos = document.querySelector(".favoritos");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

let pokemonesCargados = [];

function cargarPokemonesKanto() {
    for (let id = 1; id <= 151; id++) {
        buscarPokemon(id);
    }
}

async function buscarPokemon(idPokemon) {

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);

    const data = await respuesta.json();

    const pokemon = new Pokemon(
        data.id,
        data.name,
        data.sprites.other['official-artwork'].front_default,
        data.types[0].type.name
    );

    pokemonesCargados.push(pokemon);
    crearCardPokemon(pokemon);
}

function crearCardPokemon(pokemon) {
    listaPokemon.innerHTML += `
    <div class="card" style="width: 18rem;">
            <img src="${pokemon.imagen}"
                class="card-img-top" alt="${pokemon.nombre}">
            <div class="card-body">
                <span class="badge text-bg-secondary">ID ${pokemon.id}</span>
                <span class="badge text-bg-success">${pokemon.tipo}</span>
                <h5 class="card-title">${pokemon.nombre}</h5>
                <button class="btn btn-primary" onclick="agregarFavorito(${pokemon.id})">Agregar a Favoritos</button>
            </div>
        </div> `;
}

function agregarFavorito(idPokemon) {

    let pokemonEncontrado = null;

    for (const pokemon of pokemonesCargados) {
        if (pokemon.id === idPokemon) {
            pokemonEncontrado = pokemon;
        }
    }

    let existe = false;

    for (const pokemon of favoritos) {
        if (pokemon.id === idPokemon) {
            existe = true;
        }
    }

    if (existe === true) {
        alert("Este Pokémon ya está en favoritos");
        return;
    }

    favoritos.push(pokemonEncontrado);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarFavoritos();
}

async function mostrarFavoritos() {
    seccionFavoritos.innerHTML = "";

    for (const pokemon of favoritos) {
        seccionFavoritos.innerHTML += `
    <div class="card" style="width: 18rem;">
            <img src="${pokemon.imagen}"
                class="card-img-top" alt="${pokemon.nombre}">
            <div class="card-body">
                <span class="badge text-bg-secondary">ID ${pokemon.id}</span>
                <span class="badge text-bg-success">${pokemon.tipo}</span>
                <h5 class="card-title">${pokemon.nombre}</h5>
                <button class="btn btn-primary" onclick="agregarFavorito(${pokemon.id})">Agregar a Favoritos</button>
                <button class="btn btn-danger" onclick="quitarFavorito(${pokemon.id})">Quitar</button>
            </div>
        </div> `;
    }
}

function quitarFavorito(idPokemon) {

    let nuevaLista = [];

    for (const pokemon of favoritos) {
        if (pokemon.id !== idPokemon) {
            nuevaLista.push(pokemon);
        }
    }

    favoritos = nuevaLista;

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarFavoritos();
}

cargarPokemonesKanto();
mostrarFavoritos();


const input = document.getElementById('searchInput');
const button = document.getElementById('searchBtn');
const results = document.getElementById('results');


button.addEventListener('click', async (e) => {
    e.preventDefault()
    const pokemonName = input.value.toLowerCase();
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const pokemonData = await response.json();

        const pokemon = new Pokemon(
            pokemonData.id,
            pokemonData.name,
            pokemonData.sprites.other['official-artwork'].front_default,
            pokemonData.types[0].type.name
        );

        results.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${pokemon.imagen}"
                class="card-img-top" alt="${pokemon.nombre}">
            <div class="card-body">
                <span class="badge text-bg-secondary">ID ${pokemon.id}</span>
                <span class="badge text-bg-success">${pokemon.tipo}</span>
                <h5 class="card-title">${pokemon.nombre}</h5>
                <button class="btn btn-primary" onclick="agregarFavorito(${pokemon.id})">Agregar a Favoritos</button>
                <button class="btn btn-danger" onclick="quitarFavorito(${pokemon.id})">Quitar</button>
            </div>
        </div> `;
    } catch (error) {
        results.innerHTML = '<p>Pokémon no encontrado</p>';
    }
});