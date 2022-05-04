const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemons = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
  const typesPokemons = types.map(typeInfo => typeInfo.type.name)

  accumulator += `
        <li class="card ${typesPokemons[0]}">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
            <h2 class="card-title">${id}.${name}</h2>
            <p class="card-subtitle">${typesPokemons.join(' | ')}</p>
        </li>
        `

  return accumulator
}, ' ')

const insertPokemonsInPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')

  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemons()

// for (let i = 1; i <= 150; i++) {
//   pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
// }

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsInPage)
