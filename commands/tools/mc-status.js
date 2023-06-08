const { SlashCommandBuilder, InteractionResponse } = require('discord.js');
const { EmbedBuilder, embedLength } = require('@discordjs/builders')
const mcs = require('node-mcstatus')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcip')
        .setDescription('查看一個minecraft伺服器的狀態')
        .addStringOption(options => options
            .setName('ip')
            .setDescription('Minecraft伺服器的IP')
            .setRequired(true)
        )
        .addNumberOption(options => options
            .setName('port')
            .setDescription('伺服器的端口')
        ),

    async execute(interaction) {
        const ip = interaction.options.getString('ip')
        let port = interaction.options.getNumber('port')
        if (port == null) { port = 25565 }

        interaction.reply({ content: '偵測中...', ephemeral: false })

        mcs.statusJava(ip, port).then((result) => {
            const json = result;

            if (json.online == true) {
                const embed = new EmbedBuilder()
                    .setColor(0x61ff69)
                    .setTitle(`════伺服器\`${json.host}\`的資訊════════`)
                    .setDescription(`版本：\`${json.version.name_clean}\`\n`)
                    .setThumbnail(`https://api.mcstatus.io/v2/icon/${ip}`)
                    .addFields(
                        { name: `**狀態：**:green_circle:`, value: '\u200B', inline: true },
                        { name: `人數：${json.players.online} / ${json.players.max}`, value: '\u200B', inline: true },
                        { name: `伺服器MOTD：`, value: `\`\`\`${json.motd.clean}\`\`\``, inline: false }
                    )
                setTimeout(() => {
                    interaction.editReply({ embeds: [embed], content:'' })
                }, 2000);

            } else {
                const embed = new EmbedBuilder()
                    .setColor(0xeb4034)
                    .setTitle(`未知的伺服器`)
                    .setDescription(`Error：\`無法偵測\`\n`)
                    .setThumbnail(`https://api.mcstatus.io/v2/icon/${ip}`)
                setTimeout(() => {
                    interaction.editReply({ embeds: [embed], content:'' })
                }, 2000);
            }

        }).catch((error) => {
            console.log(error)
        })
    },
};


// else if (json.online == false) {
//     const embed = new EmbedBuilder()
//         .setColor(0xeb4034)
//         .setTitle(`════伺服器\`${json.host}\`的資訊════════`)
//         .setDescription(`版本：\`伺服器關閉中\`\n`)
//         .setThumbnail(`https://api.mcstatus.io/v2/icon/${ip}`)
//         .addFields(
//             { name: `**狀態：**:red_circle:`, value: '\u200B', inline: true },
//             { name: `人數：未知 / 未知`, value: '\u200B', inline: true },
//             { name: `伺服器MOTD：`, value: `\`\`\`未知\`\`\``, inline: false }
//         )

//     interaction.reply({ embeds: [embed], ephemeral: true })
// }