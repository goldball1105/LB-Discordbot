const { ButtonInteraction } = require('discord.js')

const votemember = new Set();

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const array = interaction.customId.split('-');
        if (array[0] !== "vote") return;

        if (votemember.has(`${interaction.user.id}-${interaction.message.id}`))
            return interaction.reply({ content: '你已按過按鈕ㄌ', ephemeral: true });

        votemember.add(`${interaction.user.id}-${interaction.message.id}`)

        const voteembed = interaction.message.embeds[0];
        if (!voteembed) return interaction.reply({ content: '出現錯誤請聯絡管理員', ephemeral: true })

        const uvote = voteembed.fields[0];
        const dvote = voteembed.fields[1];

        const numberPattern = /\d+/;
        let newup, newdown;

        switch (array[1]) {
            case 'up': {
                const match = uvote.value.match(numberPattern);
                if (match) {
                    const oldValue = parseInt(match[0]);
                    newup = oldValue + 1;
                    uvote.value = uvote.value.replace(numberPattern, newup);
                }

                interaction.reply({ content: '已成功贊成此投票', ephemeral: true });
                interaction.message.edit({ embeds: [voteembed] });
            }
                break;
            case 'down': {
                const match = dvote.value.match(numberPattern);
                if (match) {
                    const oldValue = parseInt(match[0]);
                    newdown = oldValue + 1;
                    dvote.value = dvote.value.replace(numberPattern, newdown);
                }

                interaction.reply({ content: '已成功投反對此投票', ephemeral: true });
                interaction.message.edit({ embeds: [voteembed] });
            }
                break;
            case 'anc': {
                const match = uvote.value.match(numberPattern);
                if (match) {
                    const oldValue = parseInt(match[0]);
                    newup = oldValue + 1;
                    uvote.value = uvote.value.replace(numberPattern, newup);
                }

                interaction.reply({ content: '給你一個讚', ephemeral: true });
                interaction.message.edit({ embeds: [voteembed] });
            }
                break;
            default:
                break;
        }

    }
}
