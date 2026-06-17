async function personajes() {
    try {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=50";

        const response = await fetch(url);
        const data = await response.json();

        let pokemones = [];

        for (let i = 0; i < data.results.length; i++) {
            const res = await fetch(data.results[i].url);
            const pokemon = await res.json();

            pokemones.push(pokemon);
        }

        crearTarjetas(pokemones);

    } catch (error) {
        console.log("Error al cargar los personajes: ", error);
    }
}

function crearTarjetas(pokemones) {
    try {
        const contenedor = document.getElementById("container-cards");

        for (let personaje of pokemones) {
            let tarjeta = document.createElement("div");

            tarjeta.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${personaje.sprites.other['official-artwork'].front_default}"
                        class="card-img-top" alt="pokemon">
                    <div class="card-body">
                        <span class="badge bg-secondary">ID ${personaje.id}</span>
                        <h5 class="card-title">${personaje.name}</h5>
                        <a href="#" class="btn btn-primary">Agregar a Favoritos</a>
                    </div>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        }
    } catch (error) {
        console.log("Error al crear las tarjetas: ", error);
    }
}

personajes();