const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    customId: 'anc',
    async execute(interaction, client) {
        await interaction.reply({ content: '已發送公告摟', ephemeral: true })

        const emoji = '<:verified:1051138246626791505>';
        const name = interaction.fields.getTextInputValue('anc-title');
        const about = interaction.fields.getTextInputValue('anc-des');

        const embed = new EmbedBuilder()
            .setTitle(`<:announcement:1051132059801894972> - ${name}`)
            .setDescription(`\n${about}\n`)
            .addFields(
                { name: `${emoji}`, value: `勾勾：\`0\`\n---------------------------------------`, inline: true },
            )
            .setTimestamp()

        const replything = await interaction.channel.send({ embeds: [embed], fetchReply: true });

        const upvote = new ButtonBuilder()
            .setCustomId(`vote-anc-${replything.id}`)
            .setLabel('收到!')
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(upvote)

        await replything.edit({ components: [row] });


    }
};