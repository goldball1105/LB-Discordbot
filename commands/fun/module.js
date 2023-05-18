const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('name')
    .setDescription('description'),

    async execute(interaction){
        await interaction.reply({ content: 'just a test command', ephemeral: true });
    },
};