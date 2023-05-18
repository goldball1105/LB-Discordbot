const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dclink')
        .setDescription('產生一個新連結'),

    async execute(interaction, client) {
        const channel = interaction.guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildText).first();
        const invite = await channel.createInvite({ maxAge: 86400, maxUses: 1 })

        try {

            const embed = new EmbedBuilder()
                .setColor(0x647ffa)
                .setTitle('這是你的邀請連結')
                .setDescription('> 這個邀請連結的時效只有一天\n> 並且只能使用一次\n> **所以請記得在時間內使用喔**')
                .addFields({ name: '邀請連結', value:`\`\`\`${invite}\`\`\`` })
                .setTimestamp()

            interaction.reply({ embeds: [embed], ephemeral: true })

        } catch (error) {
            console.error('創建邀請連結時發生錯誤：', error);
            await interaction.reply('無法創建邀請連結：發生錯誤');
        }

    },
};