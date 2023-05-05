const { EmbedBuilder } = require('discord.js')
const { verifyRoleone, verifyRoletwo } = require('../../config.json')
module.exports = {
    customId: 'upvote',
    async execute(interaction, client) {
        console.log('work')
        upvotec++;

        embed.fields[0].value = `人數：\`${upvotec}\``;
        embed.fields[1].value = `人數：\`${downvotec}\``;

        await interaction.update({ embeds: [embed], components: [row] });
    }
}
