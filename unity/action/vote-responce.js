const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    customId: 'vote',
    async execute(interaction, client) {
        const name = interaction.fields.getTextInputValue('vote-title');
        const about = interaction.fields.getTextInputValue('vote-des');

        const embed = new EmbedBuilder()
            .setTitle(`${name}`)
            .setDescription(`${about}\n`)
            .addFields([
                { name: `—<:upvote:1051138113168212029> 人數`, value: `0`, inline: true },
                { name: `—<:downvote:1051138166096154674> 人數`, value: `0`, inline: true }
            ])
            .setTimestamp()

        const replything = await interaction.reply({ embeds: [embed], fetchReply: true });

        const upvote = new ButtonBuilder()
            .setCustomId(`vote-up-${replything.id}`)
            .setLabel('贊成')
            .setStyle(ButtonStyle.Success)

        const downvote = new ButtonBuilder()
            .setCustomId(`vote-down-${replything.id}`)
            .setLabel('反對')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents(upvote, downvote)

        await interaction.editReply({ components: [row] })
        
    }
};