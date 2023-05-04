const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { VerifyChannel, RuleChannel, emojiverify, verifyMsgId } = require('../config.json');
const { Message } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const channel = interaction.channels.cache.get(VerifyChannel);

        const embed = new EmbedBuilder()
            .setColor(0x67c773)
            .setTitle('驗證訊息')
            .setDescription(`> 在按下 **驗證** 按鈕前請先閱讀<#${RuleChannel}>\n> 在進行動作喔`);

        const button = new ButtonBuilder()
            .setCustomId('veritfy')
            .setLabel('驗證') 
            .setEmoji({ name: emojiverify })
            .setStyle('Success');

        const row = new ActionRowBuilder()
            .addComponents(button);

        try {
            const msg = await channel.messages?.fetch(verifyMsgId).catch(() => { });
            if (msg) { // 如果訊息存在
                if (msg.embeds[0].title === embed.title) { // 檢查是否和要發送的訊息相同
                    await msg.edit({ embeds: [embed], components: [row] });
                } else {
                    await msg.edit({ embeds: [embed], components: [row] });
                }
            } else { // 如果訊息不存在
                await channel.send({ embeds: [embed], components: [row] });
            }
        } catch (e) {
            console.error(e);
        }
    }
}
