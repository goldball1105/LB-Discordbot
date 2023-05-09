const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
module.exports = {
    customId: 'vote',
    async execute(interaction, client) {
        const name = interaction.fields.getTextInputValue('vote-title');
        const about = interaction.fields.getTextInputValue('vote-des');

        let upvotec = 0;
        let downvotec = 0;

        const embed = new EmbedBuilder()
            .setTitle(`${name}`)
            .setDescription(`${about}\n`)
            .addFields(
                { name: `———<:upvote:1051138113168212029>———`, value: `人數：\`${upvotec}\``, inline: true },
                { name: `———<:downvote:1051138166096154674>———`, value: `人數：\`${downvotec}\``, inline: true }
            )
            .setTimestamp()

        const upvote = new ButtonBuilder()
            .setCustomId('upvote')
            .setLabel('贊成')
            .setStyle(ButtonStyle.Success)

        const downvote = new ButtonBuilder()
            .setCustomId('downvote')
            .setLabel('反對')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents(upvote, downvote)

        await interaction.reply({ embeds: [embed], components: [row] })
//=============================
        
    }
};