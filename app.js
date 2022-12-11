const express = require('express')
const { success, uniqueId } = require('./helper')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

let pokemons = require('./moke-pokemons')


const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res) => { res.send('Hello from express ! 🤫') })
app.get('/api/pokemon/:id', (req, res) => {
    const id = req.params.id
    const pokemon = pokemons.find(pokemon => pokemon.id === +id)
    const message = 'un Pokemon a bien été trouvé'
    res.json(success(message, pokemon))
});
app.get('/api/pokemons', (req, res) => {
        const message = `la liste a bien été trouvé qui contient ${pokemons.length} pokemons`
        res.json(success(message, pokemons))
    })
    // on mettra dans le body lees datas du nouveau pok sauf l'ID ET LE CREATED
app.post('/api/pokemons', (req, res) => {
        const id = uniqueId(pokemons)
        const pokemonCreated = {...req.body, ... { id: id, created: new Date() } }
        pokemons.push(pokemonCreated)
        const message = `le pok ${pokemons.name} a bien été généré`
        res.json(success(message, pokemonCreated))
    })
    // pour la modif on crée le pok modif en json
    // que l'on met dans le body sauf l'id que l'on rajoute
app.put('/api/pokemons/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const pokemonUpdated = {...req.body, ... { id: id } }
        pokemons = pokemons.map(pokemon => {
            return pokemon.id === id ? pokemonUpdated : pokemon
        })

        const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
        res.json(success(message, pokemonUpdated))
    })
    // suppression
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
});



app.listen(port, () => { console.log('Express est démarré sur le port 3000 !!') });