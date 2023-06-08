const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rule')
        .setDescription('在這裡送出一個介紹規則的連結'),

    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages))
            return interaction.reply({ content: '你沒有權限使用這條指令', ephemeral: true });
        
        const embed1 = new EmbedBuilder()
            .setColor(0xeb4034)
            .setTitle('═════════════伺服器の規則═════════════')
            .setDescription('<:dt:1111170388421005362> 不破壞他人建築物在未經他人允許\n\n<:dt:1111170388421005362> 不偷竊/損毀他人財產\n\n<:dt:1111170388421005362> 避免與他人衝突\n\n<:dt:1111170388421005362> 禁止使用外掛軟體及崩服行為\n\n<:dt:1111170388421005362> 管理員擁有最後決定權')
        const embed2 = new EmbedBuilder()
            .setColor(0xb4034)
            .setTitle('═════════════伺服器資訊═════════════')
            .addFields(
                { name: '<:dt:1111170388421005362> 伺服器官網', value: '<:dt2:1111184360721367081> https://laid-back.xyz/\n<:dt2:1111184360721367081> http://gg.gg/laidback\n' },
                { name: '<:dt:1111170388421005362> 伺服器連線位置', value: '<:dt2:1111184360721367081> \`laid-back.xyz\`\n<:dt2:1111184360721367081> `192.168.0.1`\n' },
                { name: '<:dt:1111170388421005362> 遊玩版本', value: '<:dt2:1111184360721367081> \`1.19 ~ 1.19.4\`\n' },
                { name: '<:dt:1111170388421005362> 伺服器選單', value: '<:dt2:1111184360721367081> 到遊戲中輸入 \`/xx\`\n' }
            )
        const embed3 = new EmbedBuilder()
            .setColor(0xb4034)
            .setTitle('═════════════管理員名單═════════════')
            .addFields(
                { name: '<:dt:1111170388421005362> 創始人', value: '<:dt2:1111184360721367081> <@968013433482141696>\n<:dt2:1111184360721367081> <@735452040381333535>\n' },
                { name: '<:dt:1111170388421005362> 客服人員', value: '<:dt2:1111184360721367081> `___________`' },
            )
        const embed4 = new EmbedBuilder()
            .setColor(0xb4034)
            .setTitle('═════════════伺服器指令═════════════')
            .addFields(
                { name: '<:dt:1111170388421005362> 基本', value: '<:dt2:1111184360721367081> xxxxx' }
            )
        const embed5 = new EmbedBuilder()
            .setColor(0xb4034)
            .setTitle('═════════════伺服器連結═════════════')
            .addFields(
                { name: '<:dt:1111170388421005362> 永久連結', value: '<:dt2:1111184360721367081> `http://gg.gg/laidback-discord`\n' },
                { name: '<:dt:1111170388421005362> 暫時連結', value: '<:dt2:1111184360721367081> 可以使用 </dclink:1108294083853701140> 獲得一個暫時連結' }
            )
            .setTimestamp()

        await interaction.reply({ content:'處理中...', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
            interaction.channel.send({ embeds: [embed1, embed2, embed3, embed4, embed5], ephemeral: false })
        }, 500);
    },
};