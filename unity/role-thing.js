const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { VerifyChannel, RuleChannel, emojiverify, verifyMsgId } = require('../config.json');
const { Message } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const channel = interaction.channels.cache.get(VerifyChannel);

        const embed = new embed()
            .setColor(`#ff9900`)
            .setTimestamp(`2023-04-03T12:30:00.000`)
            .setFooter(`休閒生存`, `https://i.imgur.com/BofLBPV.png`)
            .setTitle(`**在這裡你可以領取你想要的身分組，每個身分組都有他的介紹喔**`)
            .addFields(
                { name: '📢-- 公告通知 -->', value: '\`伺服器有重大更新時你將會收到伺服器公告通知\`' },
                { name: '🆕-- 更新通知 -->', value: '\`當伺服器有重大更新時我們就會通知擁有此身分組的人\`' },
                { name: '🎁-- 活動通知 -->', value: '\`當伺服器有舉辦大型活動時我們就會@這個身分組，每個活動幾乎都會有福利可以領取喔\`' },
                { name: '\u200B', value: '**===============================**' },
                { name: '🔨-- 建築玩家  -->', value: '\`如果你是喜歡建築的玩家，你可以選擇這項身分組為自己分類喔\`' },
                { name: '💡-- 紅石玩家   -->', value: '\`如果你是紅石大神，歡迎你選這個身分組與其他人交流！\`' },
                { name: '\u200B', value: '**===============================**' },
            )
            .setDescription(`**=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=**\n`)

        const row = new row().addComponents(
            new button()
                .setCustomId("r1")
                .setLabel("公告")
                .setStyle("PRIMARY")
                .setEmoji(r1e),
            new button()
                .setCustomId("r2")
                .setLabel("更新")
                .setStyle("PRIMARY")
                .setEmoji(r2e),
            new button()
                .setCustomId("r3")
                .setLabel("活動")
                .setStyle("PRIMARY")
                .setEmoji(r3e),
            new button()
                .setCustomId("r4")
                .setLabel("建築")
                .setStyle("SUCCESS")
                .setEmoji(r4e),
            new button()
                .setCustomId("r5")
                .setLabel("紅石")
                .setStyle("SUCCESS")
                .setEmoji(r5e)
        );

        try {
            const msg = await channel.messages?.fetch(verifyMsgId).catch(() => { });
            if (msg) {
                if (msg.embeds[0].title === embed.title) {
                    await msg.edit({ embeds: [embed], components: [row] });
                } else {
                    await msg.edit({ embeds: [embed], components: [row] });
                }
            } else {
                await channel.send({ embeds: [embed], components: [row] });
            }
        } catch (e) {
            console.error(e);
        }
    }
}
