const { SlashCommandBuilder, TextInputStyle } = require('discord.js');
const { EmbedBuilder ,ModalBuilder, ActionRowBuilder, TextInputBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sourcebin')
        .setDescription('讓一個連結便更短'),

    async execute(interaction) {

        const modal = new ModalBuilder()
        .setTitle('儲存一個code吧')
        .setCustomId('sourcebin');

        const title = new TextInputBuilder()
        .setCustomId('bin-title')
        .setRequired(false)
        .setLabel('Code的標題')
        .setStyle(TextInputStyle.Short);

        const des = new TextInputBuilder()
        .setCustomId('bin-des')
        .setRequired(false)
        .setLabel('Code的介紹')
        .setStyle(TextInputStyle.Short);

        const code = new TextInputBuilder()
        .setCustomId('bin-code')
        .setRequired(true)
        .setLabel('貼上你的code吧')
        .setStyle(TextInputStyle.Paragraph)

        const actionone = new ActionRowBuilder().addComponents(title)
        const actiontwo = new ActionRowBuilder().addComponents(des)
        const actionthr = new ActionRowBuilder().addComponents(code)

        modal.addComponents(actionone, actiontwo, actionthr)
        interaction.showModal(modal)
       
    },
};