const { EmbedBuilder } = require('discord.js')
const { verifyRoleone, verifyRoletwo } = require('../../config.json')
module.exports = {
    customId: 'upvote',
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('hi')

        await interaction.reply({ embeds: [embed] })
    }
}