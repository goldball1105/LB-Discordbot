const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleintroduce')
        .setDescription('在這裡送出一個介紹身分組的Embed'),

    async execute(interaction) {
        const permission = new PermissionsBitField([PermissionsBitField.Flags.Administrator]);

        if (!permission.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply('no perm');
        
            await interaction.reply({ content: `處理中...`, ephemeral: true });

            const embed = new EmbedBuilder()
                .setColor(0xFF9900)
                .setTimestamp()
                .setTitle('═════════════伺服器中的身分組介紹═════════════')
                .setDescription('<:Moderatorowo:1051132518432252024>  **__伺服器經由討論或是自動給予ㄉ__**')
                .addFields(
                    { name:'\u200B', value:'<@&1029917790947258429>\n\n<@&1029379923141468160>\n\n<@&1048987464666198096>\n\n<@&1029383924373274664>', inline:true },
                    { name:'\u200B', value:'我們自家製作的Discord機器人，可以幫助管理伺服器\n\n管理伺服器中的所有事物，討論伺服器規劃\n\n伺服器的接單處理人員，有事情可以Tag他們\n\n以驗證的玩家，可以加入伺服器遊玩', inline:true },
                    { name:'──────────────────────────────', value:'<a:fire1:1069865007346614312>  **__以下是可自行領取的身分組~__**' },
                    { name:'\u200B', value:'<@&1051130659311202305>\n\n<@&1068565915177857166>\n\n<@&1092350002313052170>\n\n<@&1092349120527736852>\n\n<@&1092350574109937725>', inline:true },
                    { name:'\u200B', value:'當伺服器有心的公告時機器人就會自動tag你\n\n當伺服器有小更新時機器人就會自動tag這個身分組\n\n當伺服器有舉辦活動時我們就會tag這個身分組\n||每個活動幾乎都會有福利可以領取喔||\nOWO是紅石大老欸\n||你以為你很厲害嗎?w?||\nOWO是建築大老，神!!\n||這個沒有彩蛋.......||||騙你的||', inline:true }
                )
                .setFooter({ text:'休閒生存', iconURL:'https://i.imgur.com/BofLBPV.png' })

            setTimeout(() => {
                interaction.deleteReply();
                interaction.channel.send({ embeds: [embed] });
            }, 1000);
    },
};