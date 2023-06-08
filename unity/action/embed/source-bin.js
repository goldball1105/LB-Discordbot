const { EmbedBuilder } = require('@discordjs/builders')
const { create } = require('sourcebin')

module.exports = {
    customId: 'sourcebin',
    async execute(interaction, client) {
        await interaction.reply({ content: '處理中', ephemeral: true })

        const title = interaction.fields.getTextInputValue('bin-title');
        const des = interaction.fields.getTextInputValue('bin-des');
        const code = interaction.fields.getTextInputValue('bin-code');

        try {
            const bin = await create({
                title: title,
                description: des,
                files: [{ content: code }]
            })

            const embed = new EmbedBuilder()
                .setColor(0x8ae3e3)
                .setTitle('你的SourceBin連結')
                .addFields(
                    { name: `你的連結${bin.url}`, value: `短連結：${bin.shortUrl}\nCode長度：${code.length}\n\n**預覽畫面**`, inline: false },
                    { name: bin.title, value: `${bin.description}\n\n`, inline: false }
                )
                .setTimestamp()

            await interaction.editReply({ embeds: [embed], content: '完成' });

        } catch (error) {
            console.log(error)
            await interaction.editReply('發生錯誤')
        }
    }
};