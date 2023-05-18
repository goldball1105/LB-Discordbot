const { EmbedBuilder } = require('@discordjs/builders')
const { welcomeChannel } = require('../config.json')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.get(welcomeChannel);
        const ruleid = '1029380467226595368';

        const embed = new EmbedBuilder()
            .setColor(0xf78d02)
            .setAuthor({ name: '玩家加入 :D', iconURL: 'https://i.imgur.com/tDr6KrN.png' })
            .setFields(
                { name: '------------------------------------------------', value: `**歡迎** <@${member.user.id}> **來到休閒生存！**` },
                { name: '\u200B', value: `在加入伺服器前請先去 <#${ruleid}>\n閱讀**基礎規則**在遊玩喔` }
            )
            .setTimestamp()
            .setThumbnail(member.user.avatarURL())

        channel.send({ embeds: [embed] })

        const dmMessage = new EmbedBuilder()
            .setTitle('歡迎加入~')
            .setDescription('歡迎加入休閒大家庭，希望你能在這裡休閒的生存')
            .setThumbnail(member.user.avatarURL())
            .setColor(0xff8b33)
            .setTimestamp()
            .setFields(
                { name: '這是伺服器的邀請連結，以防你不小心退出等事件發生', value: 'https://laid-back.xyz/discord' },
                { name: '\u200B', value: '如果邀請連結失效可以在這裡輸入指令\`/dclink\`生產一個新連結' }
            )

        member.send({ embeds: [dmMessage] }).catch(err => { console.log('私人訊息關閉') })
    }
}