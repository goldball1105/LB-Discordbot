const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    customId: 'anc',
    async execute(interaction, client) {
        await interaction.reply({ content: '已發送公告摟', ephemeral: true })

        const name = interaction.fields.getTextInputValue('anc-title');
        const about = interaction.fields.getTextInputValue('anc-des');

        const embed = new EmbedBuilder()
            .setTitle(`<:announcement:1051132059801894972>${name}`)
            .setDescription(`${about}\n`)
            .addFields(
                { name: `<:verified:1051138246626791505>了解了~`, value: `人數：\`0\``, inline: true }
            )
            .setTimestamp()

        const replything = await interaction.channel.send({ embeds: [embed], fetchReply: true });

        const upvote = new ButtonBuilder()
            .setCustomId(`vote-up-${replything.id}`)
            .setLabel('收到!')
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(upvote)

        await replything.edit({ components: [row] });


    }
};