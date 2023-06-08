const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

const gg = require('gggg')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gglink')
        .setDescription('讓一個連結便更短')
        .addStringOption(options => options
            .setName('link')
            .setDescription('想要縮短的連結')
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName('custom')
            .setDescription('自訂連結名稱，不需要則留白')
            .setRequired(false)
        )
        .addBooleanOption(options => options
            .setName('norefs')
            .setDescription('使用連結轉換器')    
        ),

    async execute(interaction) {
        const input = interaction.options.getString('link')
        const custom = interaction.options.getString('custom')
        const norsfs = interaction.options.getBoolean('norefs')

        const options = {
            customPath: custom,
            useNorefs: norsfs
        }

        try {
            const short = await gg.shorten(input, options)

            const embed = new EmbedBuilder()
                .setTitle('這是你的連結')
                .setDescription(`> 縮短後的連結：${short}`)
                .setTimestamp()
                .setFooter({ text: '技術來自 [gg.gg]', iconURL: 'https://i.imgur.com/K6SCP3Z.png' })

            await interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (error) {

            const embed = new EmbedBuilder()
                .setColor(0xeb4034)
                .setTitle('連結已被使用')
                .setDescription('> 試試看其他的連結吧')

            await interaction.reply({ embeds: [embed], ephemeral: true })

            console.log(error)
        }
    },
};