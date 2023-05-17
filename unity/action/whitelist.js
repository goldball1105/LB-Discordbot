const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    customId: 'wlform',
    async execute(interaction, client) {
        const modal = new ModalBuilder()
        .setTitle('一些基礎問題')
        .setCustomId('wlsform');

        const mc = new TextInputBuilder()
        .setCustomId('mc-id')
        .setRequired(true)
        .setLabel('你的MinecraftId')
        .setStyle(TextInputStyle.Short);

        const dc = new TextInputBuilder()
        .setCustomId('dc-id')
        .setRequired(true)
        .setLabel('你的DiscordId')
        .setStyle(TextInputStyle.Short);

        const hlong = new TextInputBuilder()
        .setCustomId('hlong')
        .setRequired(true)
        .setLabel('你玩多久了(單位年計算)')
        .setStyle(TextInputStyle.Short);

        const actionone = new ActionRowBuilder().addComponents(mc)
        const actiontwo = new ActionRowBuilder().addComponents(dc)
        const actionthr = new ActionRowBuilder().addComponents(hlong)

        modal.addComponents(actionone, actiontwo, actionthr)
        interaction.showModal(modal)

    }
};