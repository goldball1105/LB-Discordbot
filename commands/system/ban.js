const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('一個想要封鎖的玩家')
        .addUserOption(options => options
            .setName('user')
            .setDescription('想要封鎖的玩家')
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

            const baner = await interaction.guild.members.fetch(user.id);

            const embed = new EmbedBuilder()
                .setColor(0xffa600)
                .setTitle('封鎖使用者')
                .setDescription(`:white_check_mark: 已成功封鎖 ${user}`)

            await baner.ban();
            interaction.reply({ embeds: [embed] });

        } catch (error) {

            const embed = new EmbedBuilder()
                .setColor(0xffa600)
                .setTitle('出現錯誤')
                .setDescription(`**錯誤資訊：**你輸入的使用者不再伺服器中\n(或者已被封鎖)`)
                .setTimestamp()

            interaction.reply({ embeds: [embed] , ephemeral: true })

        }


    },
};