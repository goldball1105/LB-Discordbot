const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, Client, GuildMemberFlagsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rule')
    .setDescription('在這裡送出一個介紹規則的連結'),

    async execute(interaction){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)){
            return interaction.reply({ content: '你沒有權限使用這條指令', ephemeral: true});
        }

        const link = {
            color: 0xFF9900,
            title: '伺服器中的規則介紹',
            description: '<#1029380467226595368>'
        };

        await interaction.reply({ embeds: [link], ephemeral:true });

    },
};