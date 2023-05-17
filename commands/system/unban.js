const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder, GuildBanManager } = require('discord.js')
const { logchannel } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('一個想要解封的玩家')
        .addUserOption(options => options
            .setName('user')
            .setDescription('想要解封的玩家ID')
            .setRequired(true)
        ),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: `**你沒有權限**`, ephemeral: true })
        } else if (!user) {
            return interaction.reply({ content: `你沒有輸入使用者`, ephemeral: true })
        }

        try {
            await interaction.guild.bans.fetch()
            interaction.guild.bans.remove(user);

            const embed = new EmbedBuilder()
                .setColor(0xffa600)
                .setTitle('解封使用者')
                .setDescription(`:white_check_mark: 已成功解封 ${user}`)

            const log = new EmbedBuilder()
                .setColor(0x34ebe5)
                .setTitle('封鎖使用者')
                .setDescription(`執行者：<@${interaction.user.id}>\n被解者：<@${user}>\n使用者Id：${user.id}`)

            interaction.reply({ embeds: [embed] });

            const channel = interaction.guild.channels.cache.get(logchannel);
            channel.send({ embeds: [log] })

        } catch (error) {

            const embed = new EmbedBuilder()
                .setColor(0xffa600)
                .setTitle('出現錯誤')
                .setDescription(`**錯誤資訊：**你輸入的使用者不再伺服器中\n(或者已被封鎖)`)
                .setTimestamp()

            interaction.reply({ embeds: [embed], ephemeral: true })

        }


    },
};