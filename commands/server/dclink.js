const { SlashCommandBuilder } = require('discord.js');
const { guildId } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dclink')
        .setDescription('產生一個新連結')
        .setDMPermission(true),

    async execute(interaction, client) {
        const guild = client.guilds.cache.get(guildId)

        try {
            const invite = await guild.channels.cache
                .filter(channel => channel.type === 'GUILD_TEXT')
                .first().createInvite({ maxAge: 86400, maxUses: 1 });

            await interaction.reply(`成功創建邀請連結：${invite.url}`);
        } catch (error) {
            console.error('創建邀請連結時發生錯誤：', error);
            await interaction.reply('無法創建邀請連結：發生錯誤');
        }

    },
};