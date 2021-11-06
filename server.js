const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.set('view engine', 'ejs')
app.use(express.static('public'))
const link = require("https");
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));
let id=1;

require('dotenv').config({path: 'variables.env'})

app.get("/",(req,res)=>{
    const chunks = [];
    let listMoves=[];
    let listAbilities=[];
    let listTypes=[];
    const url = `https:pokeapi.co/api/v2/pokemon/${id}/`;
    link.get(url, (response)=>{
        response.on("data",(data)=>{
            chunks.push(data);
        });
        response.on("end",()=>{
            const data = Buffer.concat(chunks);
            const pokemon = JSON.parse(data);
            let name = pokemon.name;
            let height = pokemon.height;
            let weight = pokemon.weight;
            let image = pokemon.sprites.other.home.front_default;
            let icon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`;
            let experience = pokemon.base_experience;
            let abilities = pokemon.abilities;
            let moves = pokemon.moves;
            let types = pokemon.types;
            for (i = 0; i < moves.length; i++){
                listMoves.push(moves[i].move.name);
            }
            for (i = 0; i < abilities.length; i++){
                listAbilities.push(abilities[i].ability.name);
            }
            for (i = 0; i < types.length; i++){
                listTypes.push(types[i].type.name);
            }
            res.render(__dirname + "/views/poke.ejs", { name:name, height:height, weight:weight, image:image, icon: icon, experience:experience, moves: listMoves, abilities:listAbilities, types:listTypes, id:id });
        });
    });
});

app.post("/",(req, res)=>{
    let listMoves=[];
    let listAbilities=[];
    let listTypes=[];
    const chunks = [];
    const url = `https:pokeapi.co/api/v2/pokemon/${req.body.pokemonName.toLowerCase()}/`;
    link.get(url, (response)=>{
        response.on("data",(data)=>{
            chunks.push(data);
        });
        response.on("end",()=>{
            try {
            const data = Buffer.concat(chunks);
            let pokemon = JSON.parse(data);
            let name = pokemon.name;
            let height = pokemon.height;
            let weight = pokemon.weight;
            let image = pokemon.sprites.other.home.front_default;
            let icon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemon.id}.png`;
            let experience = pokemon.base_experience;
            let abilities = pokemon.abilities;
            let moves = pokemon.moves;
            let types = pokemon.types;
            id=pokemon.id;
            for (i = 0; i < moves.length; i++){
                listMoves.push(moves[i].move.name);
            }
            for (i = 0; i < abilities.length; i++){
                listAbilities.push(abilities[i].ability.name);
            }
            for (i = 0; i < types.length; i++){
                listTypes.push(types[i].type.name);
            }
            res.render(__dirname + "/views/poke.ejs", { name:name, height:height, weight:weight, image:image, icon: icon,experience:experience, moves: listMoves, abilities:listAbilities, types:listTypes, id:id });
            } catch (error) {
                res.render("error.ejs");
            }
        });
    });
});
app.post("/next",(req, res)=>{
    if(id==893){
        id=1;
    }else{
        id++;
    }
    let listMoves=[];
    let listAbilities=[];
    let listTypes=[];
    const chunks = [];
    const url = `https:pokeapi.co/api/v2/pokemon/${id}/`;
    link.get(url, (response)=>{
        response.on("data",(data)=>{
            chunks.push(data);
        });
        response.on("end",()=>{
            const data = Buffer.concat(chunks);
            let pokemon = JSON.parse(data);
            let name = pokemon.name;
            let height = pokemon.height;
            let weight = pokemon.weight;
            let image = pokemon.sprites.other.home.front_default;
            let icon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`;
            let experience = pokemon.base_experience;
            let abilities = pokemon.abilities;
            let moves = pokemon.moves;
            let types = pokemon.types;
            for (i = 0; i < moves.length; i++){
                listMoves.push(moves[i].move.name)
            }
            for (i = 0; i < abilities.length; i++){
                listAbilities.push(abilities[i].ability.name)
            }
            for (i = 0; i < types.length; i++){
                listTypes.push(types[i].type.name);
            }
            res.render(__dirname + "/views/poke.ejs", { name:name, height:height, weight:weight, image:image,icon:icon, experience:experience, moves: listMoves, abilities:listAbilities, types:listTypes, id:id });
        });
    });
});
app.post("/prev",(req, res)=>{
    if(id==1){
        id=893;
    }else{
        id--;
    }
    let listMoves=[];
    let listAbilities=[];
    let listTypes=[];
    const chunks = [];
    const url = `https:pokeapi.co/api/v2/pokemon/${id}/`;
    link.get(url, (response)=>{
        response.on("data",(data)=>{
            chunks.push(data);
        });
        response.on("end",()=>{
            const data = Buffer.concat(chunks);
            let pokemon = JSON.parse(data);
            let name = pokemon.name;
            let height = pokemon.height;
            let weight = pokemon.weight;
            let image = pokemon.sprites.other.home.front_default;
            let icon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`;
            let experience = pokemon.base_experience;
            let abilities = pokemon.abilities;
            let moves = pokemon.moves;
            let types = pokemon.types;
            for (i = 0; i < moves.length; i++){
                listMoves.push(moves[i].move.name);
            }
            for (i = 0; i < abilities.length; i++){
                listAbilities.push(abilities[i].ability.name);
            }
            for (i = 0; i < types.length; i++){
                listTypes.push(types[i].type.name);
            }
            res.render(__dirname + "/views/poke.ejs", { name:name, height:height, weight:weight, image:image, icon:icon, experience:experience, moves: listMoves, abilities:listAbilities, types:listTypes, id:id });
        });
    });
});

const host = process.env.host || '0.0.0.0';
const port = process.env.port || 3000;


app.listen(port, host, ()=> {
       
})