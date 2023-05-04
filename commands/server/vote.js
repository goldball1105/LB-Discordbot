const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('創建一個投票'),

    async execute(interaction){
        const modal = new ModalBuilder()
        .setTitle('創建一個投票吧')
        .setCustomId('vote');

        const title = new TextInputBuilder()
        .setCustomId('vote-title')
        .setRequired(true)
        .setLabel('投票的主題')
        .setStyle(TextInputStyle.Short);

        const des = new TextInputBuilder()
        .setCustomId('vote-des')
        .setRequired(true)
        .setLabel('介紹一下投票吧')
        .setStyle(TextInputStyle.Paragraph);

        const actionone = new ActionRowBuilder().addComponents(title)
        const actiontwo = new ActionRowBuilder().addComponents(des)

        modal.addComponents(actionone, actiontwo)
        interaction.showModal(modal)
    },
};