const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { RoleLinkChannel, RoleLinkMsgId } = require('../config.json');
const { r1e, r2e, r3e, r4e, r5e } = require('../config.json');
const { Message } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const channel = interaction.channels.cache.get(RoleLinkChannel);

        const embed = new EmbedBuilder()
            .setColor(0xff9900)
            .setTimestamp()
            .setFooter({ text:'休閒生存', iconURL:'https://i.imgur.com/BofLBPV.png' })
            .setTitle(`**在這裡你可以領取你想要的身分組，每個身分組都有他的介紹喔**`)
            .setDescription(`**=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=**\n`)
            .addFields(
                { name: '📢 公告通知', value: '\`伺服器有重大更新時你將會收到伺服器公告通知\`' },
                { name: '🆕 更新通知', value: '\`當伺服器有重大更新時我們就會通知擁有此身分組的人\`' },
                { name: '🎁 活動通知', value: '\`當伺服器有舉辦大型活動時我們就會@這個身分組，每個活動幾乎都會有福利可以領取喔\`' },
                { name: '\u200B', value: '**===============================**' },
                { name: '🔨 建築玩家', value: '\`如果你是喜歡建築的玩家，你可以選擇這項身分組為自己分類喔\`' },
                { name: '💡 紅石玩家', value: '\`如果你是紅石大神，歡迎你選這個身分組與其他人交流！\`' },
                { name: '\u200B', value: '**===============================**' },
            )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("r1")
                .setLabel("公告")
                .setStyle("Primary")
                .setEmoji({ name: r1e }),
            new ButtonBuilder()
                .setCustomId("r2")
                .setLabel("更新")
                .setStyle("Primary")
                .setEmoji({ name: r2e }),
            new ButtonBuilder()
                .setCustomId("r3")
                .setLabel("活動")
                .setStyle("Primary")
                .setEmoji({ name: r3e }),
            new ButtonBuilder()
                .setCustomId("r4")
                .setLabel("建築")
                .setStyle("Success")
                .setEmoji({ name: r4e }),
            new ButtonBuilder()
                .setCustomId("r5")
                .setLabel("紅石")
                .setStyle("Success")
                .setEmoji({ name: r5e })
        );

        try {
            const msg = await channel.messages?.fetch(RoleLinkMsgId).catch(() => { });
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
