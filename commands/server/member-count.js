const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, GuildMember, Guild, User } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mbcount')
    .setDescription('這個伺服器目前的人數'),

    async execute(interaction){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)){
            return await interaction.reply({ content: '你沒有權限使用這個指令', ephemeral: true})
        }

        let bots = false;
        interaction.guild.members.fetch().then(members => {
          bots = members.filter(member => member.user.bot).size;
        }).catch(console.error);

		    const getMembersCounts = async (guild, interaction) => {
          await guild.fetch();
          const total = guild.approximateMemberCount;
          const online = guild.approximatePresenceCount;
          return { total, online }
        }
        const { total, online } = await getMembersCounts(interaction.guild);

        const users = total - bots;

        const embed = new EmbedBuilder()
        .setColor(0xffa600)
        .setTitle('◉ 伺服器人數')
        .setDescription(`**目前休閒人數有** : \`${total}\`人\n➖➖➖➖➖➖➖➖➖➖➖➖➖`)
        .setFields(
            { name: '狀\n態', value: `\u200B`, inline: true },
            { name: '🟢 線上',  value: `\`${online}\``, inline: true },
            { name: '🔴 線下',  value: `\`${total - online}\``, inline: true },
            { name: '\u200B', value: `═══════════════════════` },
            { name: '人\n機', value: `\u200B`, inline: true },
            { name: ':computer: 真人數', value: `\`${users}\``, inline: true },
            { name: ':gear: 機器人數',  value: `\`${bots}\``, inline: true },
        )

        return interaction.reply({ embeds:[embed], ephemeral: true});
    },
};