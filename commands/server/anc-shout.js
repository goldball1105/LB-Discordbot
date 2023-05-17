const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anc')
    .setDescription('發出一個公告'),

    async execute(interaction){
        const modal = new ModalBuilder()
        .setTitle('創建一個投票吧')
        .setCustomId('anc');

        const title = new TextInputBuilder()
        .setCustomId('anc-title')
        .setRequired(true)
        .setLabel('投票的主題')
        .setStyle(TextInputStyle.Short);

        const des = new TextInputBuilder()
        .setCustomId('anc-des')
        .setRequired(true)
        .setLabel('介紹一下投票吧')
        .setStyle(TextInputStyle.Paragraph);

        const actionone = new ActionRowBuilder().addComponents(title)
        const actiontwo = new ActionRowBuilder().addComponents(des)

        modal.addComponents(actionone, actiontwo)
        interaction.showModal(modal)
    },
};