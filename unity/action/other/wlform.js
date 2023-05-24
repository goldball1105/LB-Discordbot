const { EmbedBuilder } = require('discord.js')
const { whitelistlogchannel } = require('../../../config.json')

module.exports = {
    customId: 'wlsform',
    async execute(interaction, client) {

        const mc = interaction.fields.getTextInputValue('mc-id');
        const userTag = interaction.fields.getTextInputValue('dc-id');
        const hlong = interaction.fields.getTextInputValue('hlong');
        const saysome = interaction.fields.getTextInputValue('saysome');


        const embed = new EmbedBuilder()
            .setColor(0xffffff)
            .setTitle(`白名單增加`)
            .setDescription(`歡迎 **${userTag}** 加入生存大家庭`)
            .setFields(
                { name: '遊戲Id', value: `\`${mc}\``, inline: true },
                { name: '遊玩時長', value: `**${hlong}** 年`, inline: true },
                { name: '~~--------~~', value: `\`\`\`${saysome}\`\`\``, inline:false }
            )
            .setTimestamp()

        await interaction.reply({ content: '已成功註冊白名單', ephemeral: true })

        const channel = interaction.guild.channels.cache.get(whitelistlogchannel);
        channel.send({ embeds:[embed] })

    }
};