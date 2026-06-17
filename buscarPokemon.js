const input = document.getElementById('searchInput');
const button = document.getElementById('searchBtn');
const results = document.getElementById('results');


button.addEventListener('click', async (e) => {
    e.preventDefault()
    const pokemonName = input.value.toLowerCase();
    console.log("hola");
    try {
        const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        if (!response.ok) {
        throw new Error('Pokémon no encontrado');
        }

        const pokemon = await response.json();

        results.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}"
                class="card-img-top" alt="ditto front">
            <div class="card-body">
                <span class="badge badge-pill badge-secondary">ID </span>
                <h5 class="card-title">${pokemon.name}</h5>
                <p>Tipo: ${pokemon.types[0].type.name}</p>
                <p>Habilidad principal: ${pokemon.abilities[0].ability.name}</p>
                <a href="#" class="btn btn-primary">Agregar a Favoritos</a>
            </div>
        </div>
        `;
    } catch (error) {
        results.innerHTML = '<p>Pokémon no encontrado</p>';
    }
});