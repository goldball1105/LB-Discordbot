const { EmbedBuilder } = require('discord.js')
const { whitelistlogchannel } = require('../../config.json')

module.exports = {
    customId: 'wlsform',
    async execute(interaction, client) {

        const mc = interaction.fields.getTextInputValue('mc-id');
        const dc = interaction.fields.getTextInputValue('dc-id');
        const hlong = interaction.fields.getTextInputValue('hlong');

        const channel = client.channels.cache.get(whitelistlogchannel);

        const user = client.users.cache.find((u) => u.tag === dc);
        const userID = user ? user.id : null;

        const embed = new EmbedBuilder()
            .setColor(0xffffff)
            .setTitle(`白名單增加`)
            .setDescription(`歡迎 <@${userID}> 加入生存大家庭`)
            .setFields(
                { name: '遊戲Id', value: `\`${mc}\``, inline: true },
                { name: '遊玩時長', value: `**${hlong}**`, inline: true }
            )
            .setTimestamp()

        await interaction.reply({ content: '已成功註冊白名單', ephemeral: true })
        await channel.send({ embeds: [embed] })


    }
};