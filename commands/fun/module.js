const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('測試一下'),

    async execute(interaction){
        await interaction.reply({ content: ':PP', ephemeral: true });
    },
};