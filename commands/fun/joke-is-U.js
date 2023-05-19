const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('告訴你一個天大的笑話'),

    async execute(interaction){
        await interaction.reply({ content: '你真的想知道這個笑話?\n||**你**就是個天大的笑話||', ephemeral: true });
    },
};