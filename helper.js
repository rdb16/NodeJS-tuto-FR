exports.success = (message, data) => {
    return { message, data }
}

exports.uniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b))
    return maxId + 1

}