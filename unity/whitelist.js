const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { whitelistChannel, emojiwhitelist, whitelistMsgId } = require('../config.json');
const { Message } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const channel = interaction.channels.cache.get(whitelistChannel);

        const embed = new EmbedBuilder()
            .setColor(0x67c773)
            .setTitle('閱讀完以上規則了')
            .setDescription(`> 現在你可以按下以下按鈕開始遊玩了！\n> **一定要閱讀完規則**\n> **一定要閱讀完規則**\n> **一定要閱讀完規則**\n因為很重要所以要說三次`);

        const button = new ButtonBuilder()
            .setCustomId('wlform')
            .setLabel('開始遊玩')
            .setEmoji({ name: emojiwhitelist })
            .setStyle('Success');

        const row = new ActionRowBuilder()
            .addComponents(button);

        try {
            const msg = await channel.messages?.fetch(whitelistMsgId).catch(() => { });
            if (msg) {
                if (msg.embeds[0].title === embed.title) {
                    await msg.edit({ embeds: [embed], components: [row] });
                } else {
                    await msg.edit({ embeds: [embed], components: [row] });
                }
            } else {
                await channel.send({ embeds: [embed], components: [row] });
            }
        } catch (e) {
            console.error(e);
        }
    }
}
