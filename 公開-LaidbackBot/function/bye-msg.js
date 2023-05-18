const { EmbedBuilder, ClientUser } = require('discord.js')
const { welcomeChannel } = require('../config.json')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const channel = member.guild.channels.cache.get(welcomeChannel);

        const embed = new EmbedBuilder()
            .setColor("#ff8b33")
            .setAuthor({ name: '玩家退出 D:', iconURL: 'https://i.imgur.com/WemUkDT.png' })
            .setFields(
                { name: '------------------------------------------------', value: `**再見** <@${member.user.id}> **後會有期**` },
                { name: '\u200B', value: `當你改變想法時...\n去我的私人訊息查看邀**請訊連結**吧` }
            )
            .setTimestamp()
            .setThumbnail(member.user.avatarURL())

        channel.send({ embeds: [embed] })
    }
}