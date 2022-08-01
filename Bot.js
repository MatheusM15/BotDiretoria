const {Client, Intents, MessageAttachment, MessageEmbed} = require("discord.js")
const Axios = require("axios")
const client =  new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING] })
const config = require("./config.json")
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')
const ytdl = require("ytdl-core")
const fs = require("fs")
var testeChannel = null

client.on('ready', () => {
    client.user.setActivity("Esta pegando a poliana <3")
   
})
client.on("message", async message => {
    let teste = new MessageAttachment("./assets/Poliana.png")
    let ambed = new MessageEmbed()
    .setTitle('A Maior safada da diretoria')
    .setDescription("instagram: https://www.instagram.com/polianaapaes/")
    testeChannel = message

    if (message.content.trim().split(" ")[0].toLowerCase() ==  config.prefix + "sister")
    {
            // message.channel.send({embeds: [ambed],files:[teste]})
            // let connection =  joinVoiceChannel({
            //     channelId: message.member.voice.channel.id,
            //     guildId: message.guild.id,
            //     adapterCreator: message.guild.voiceAdapterCreator
            // })
            // const player = createAudioPlayer()
            // const resource = createAudioResource("gemidao.mp3")
            // connection.subscribe(player)
            // player.play(resource)
            getSisterByName(message.content.trim().split(" ")[1])
    }
    if(message.content.trim().split(" ")[0].toLowerCase() ==  config.prefix + "member")
    {
        getMemberByName(message.content.trim().split(" ")[1])
    }
    if(message.content.trim().toLocaleLowerCase() == config.prefix + "katia")
        message.member.send("vai se fuder meu irmao")
    if(message.content.trim().toLowerCase().split(" ")[0] == "!play"){
        let teste = GetMusic(message.content)
        let connection =  joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        const player = createAudioPlayer()
        const resource = createAudioResource(teste)
        connection.subscribe(player)
        player.play(resource)

    }
    

})

client.on("messageCreate", async message => {
})

client.login(config.token)

function getSisterByName(name){
    Axios.get(config.IPI +  '/Sister/GetByName/' + name)
        .then(Response => {
            sfbuffer = new Buffer.from(Response.data.foto.arq, "base64");
            let teste = new MessageAttachment(sfbuffer)
            let ambed = new MessageEmbed()
                .setTitle(Response.data.name)
                .setDescription(Response.data.description + "<br> Teste")
            testeChannel.channel.send({embeds: [ambed],files:[teste]})
        })
        .catch(Error => console.log(Error))
}

function getMemberByName(name){
    Axios.get(config.IPI +  '/Member/GetByName/' + name)
    .then(Response => {
        sfbuffer = new Buffer.from(Response.data.foto.arq, "base64");
        let teste = new MessageAttachment(sfbuffer)
        let ambed = new MessageEmbed()
            .setTitle(Response.data.name)
            .setDescription(Response.data.description + "<br> Teste")
        testeChannel.channel.send({embeds: [ambed],files:[teste]})
    })
    .catch(Error => console.log(Error))
}

function GetMusic (url) {
   return ytdl(url.replace("!play","").trim(), {filter:'audioonly', format:'mp3',})
}
