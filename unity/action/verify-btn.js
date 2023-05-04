const { EmbedBuilder } = require('discord.js')
const { verifyRoleone, verifyRoletwo } = require('../../config.json')
module.exports = {
    customId: 'veritfy',
    async execute(interaction, client){
        const embedsuccess = new EmbedBuilder()
        .setTitle('成功驗證')
        .setDescription('> \< 你以成功驗證身分 \>\n> 接下來你可以到以下頻道獲取相關知識')
        .setFields(
            { name: '-------', value:'> 獲取相關身分主\n> 回報問題我們\n> 遊戲同步\n> 閒聊吧\n> Moordi建議我plz', inline: true },
            { name:'\u200B', value:`<#1092446938630193273>\n<#1069949269265621033>\n<#1092423289651081236>\n<#1092673963387260958>\n<@${735452040381333535}>`, inline: true },
            { name:'請等待10秒', value:`秒後機器人將自動給你身分主觀看更多頻道` }
        )
        const embedfail = new EmbedBuilder()
        .setTitle('成功驗證')
        .setDescription('> \< 你以取消驗證身分 \>\n> 已移除你的')
        .setFields(
            { name: '\u2008', value:`> <@&${verifyRoleone}>\n> <@&${verifyRoletwo}>\n\n> 你可以再次點選驗證按鈕驗證` },
        )

        if (interaction.member.roles.cache.some((role) => role.id == (verifyRoleone&&verifyRoletwo))) {

            interaction.reply({ embeds: [embedfail], ephemeral: true,});
            interaction.member.roles.remove(verifyRoleone);
            interaction.member.roles.remove(verifyRoletwo);

          } else {

            await interaction.reply({ embeds: [embedsuccess], ephemeral: true,});

            setTimeout(() => {
                interaction.member.roles.add(verifyRoleone);
                interaction.member.roles.add(verifyRoletwo);
            }, 10000)
        }
    }

}