const Discord = require("discord.js");
const { GatewayIntentBits } = require('discord.js');
const { ActivityType } = require("discord.js");

// DB
const { QuickDB } = require("quick.db");
global.db = new QuickDB();
//

const config = require("./config.json");

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        '32767'
    ]
});

global.embed_color = config.client.embed;

module.exports = client

client.on('interactionCreate', (interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return interaction.reply({ content: `Erro, este comando não existe`, ephemeral: true });

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction)

    }
});

client.on("ready", () => {
    console.log(`👋 Hello world`)
    console.log(`🤖 My name is ${client.user.username}`)
    console.log(`💔 I have ${client.users.cache.size} friends`)
    console.log(`👨 More than ${client.guilds.cache.size} groups support me.`)
});

/*============================= | Import handler | =========================================*/

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.client.token)

/*============================= | Anti OFF | =========================================*/

process.on('multipleResolves', (type, reason, promise) => {
     return;
 });
 process.on('unhandRejection', (reason, promise) => {
     return;
 });
 process.on('uncaughtException', (error, origin) => {
     return;
 });
process.on('uncaughtException', (error, origin) => {
     return;
 });