const Discord = require("discord.js");
const config = require('../../config.json')

module.exports = {
    name: "ativarkey", // Coloque o nome do comando
    description: "📱 [Configuração] Ativar key para receber um cargo!", // Coloque a descrição do comando
    options: [
        {
            name: 'key',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Qual a quantidade de keys serão geradas?',
            required: true,
        },
    ],
    type: Discord.ApplicationCommand.ChatInput,

    run: async (client, interaction) => {
        let key = interaction.options.getString('key');

        if (interaction.channel.id !== config.gerarkey.channel_active_key) return interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor('#ffe100')
                    .setDescription(`\`\`\`⚠️ VOCÊ NÃO ESTA NO CANAL PERMITIDO PARA ATIVAR KEYS!\`\`\` \n\n Redirecione para o <#${config.gerarkey.channel_active_key}>`)
            ]
        })

        const row = await db.get(key);

        if (!row) return interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`\`\`\`❌ A KEY INSERIDA ESTA INVÁLIDA!\`\`\``)
            ]
        })

        if (row.includes(':')) {
            interaction.user.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor(config.client.embed)
                        .setTitle('Conta gerada')
                        .setDescription(`\`\`\`${row}\`\`\``)
                ]
            }).then(() => {
                db.delete(key);
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor(config.client.embed)
                            .setDescription(`\`\`\`✅ KEY ATIVADA COM SUCESSO ! VOCÊ RECEBEU A CONTA EM SEU PRIVADO!\`\`\``)
                    ]
                })
            })
        } else {
            interaction.member.roles.add(row).then(() => {
                db.delete(key);
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor(config.client.embed)
                            .setDescription(`\`\`\`✅ KEY ATIVADA COM SUCESSO !\`\`\``)
                    ]
                })
            }).catch(error => {
                interaction.reply(`❌ Não foi possível ativar a key, eu não possuo permissão! Contate a administração.`)
            })
        }
    }
}