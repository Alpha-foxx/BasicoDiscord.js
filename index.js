const express = require('express');
const app = express();

app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos


client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${client.user.id}`) || 
  message.content.startsWith(`<@${client.user.id}`)) return;
      
  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  try {
    let commandfile = require(`./commands/${command}.js`);
    
    return commandfile.run(client, message, args);
  } catch (err) {
    console.error("erro" + err)
  }
});

client.on("ready", () =>{

  
  let activities =[
    ': use O!help para esibir a lista de comandos',
    `${client.guilds.cache.size} servidores`,
    `${client.users.cache.size} usuarios`,
    ': eu fui feita em 4 dias',
    ': minha foto foi escolida por Mio_Br_chan',
    ': 😢 + 🍪 = 😄',
    ': 🤵 💓 👰',
    ': 🔼🔼🔽🔽◀▶◀▶🅱🅰',
    ': eu adoro sorvete 🍨 e vocÊ ?',
    ': eu sempre to de vela e vendo os ships',
    ': meu criador  ama  raposas  🦊 ',
    ": https://www.youtube.com/channel/UC6XZHvGeNM3N8HPo0jT8Oeg",
    ':passa la no meu servido para me ajudar a ficar online (https://discord.gg/qxZTkDefNz)'
  
  ],

i = 0;
setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
  type: "WATCHING"
}), 6000);
console.log("estou online") // "LISTENING","WATCHING","PLAYING","STREAMING"
                           // "ouvindo","assistindo","jogando","transmitindo"    
    
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token
