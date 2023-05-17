const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anc')
    .setDescription('發出一個公告'),

    async execute(interaction){
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: `**你沒有創建公告的權限**`, ephemeral: true })
        }

        const modal = new ModalBuilder()
        .setTitle('發送一個公告吧')
        .setCustomId('anc');

        const title = new TextInputBuilder()
        .setCustomId('anc-title')
        .setRequired(true)
        .setLabel('公告主題')
        .setStyle(TextInputStyle.Short);

        const des = new TextInputBuilder()
        .setCustomId('anc-des')
        .setRequired(true)
        .setLabel('公告內容')
        .setStyle(TextInputStyle.Paragraph);

        const actionone = new ActionRowBuilder().addComponents(title)
        const actiontwo = new ActionRowBuilder().addComponents(des)

        modal.addComponents(actionone, actiontwo)
        interaction.showModal(modal)
    },
};