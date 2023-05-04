const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, Client, GuildMemberFlagsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roleintroduce')
    .setDescription('在這裡送出一個介紹身分組的Embed'),

    async execute(interaction){
        const permission = new PermissionsBitField([
            PermissionsBitField.Flags.Administrator,
        ]);

        const role = {
            color: 0xFF9900,
            timestamp: new Date().toISOString(),
            title: '伺服器中的身分組介紹',
            description: '**==============================**',
            fields: [
                { name: '\u200B', value: '<@&1029917790947258429>' },
                { name: '我們自家製作的Discord機器人，可以幫助管理伺服器\n---------', value: '<@&1048987464666198096>'},
                { name: '伺服器的雜事處理人員，有事情可以Tag他們\n---------', value: '<@&1029383924373274664>' },
                { name: '以驗證的Discord使用者\n==============================', value: '<@&1051130659311202305>'},
                { name: '伺服器有重大更新時你將會收到伺服器公告通知\n---------', value: '<@&1068565915177857166>'},
                { name: '當伺服器有重大更新時我們就會通知擁有此身分組的人\n---------', value: '<@&1092350002313052170>'},
                { name: '當伺服器有舉辦大型活動時我們就會@這個身分組，每個活動幾乎都會有福利可以領取喔\n---------', value: '<@&1092350574109937725>'},
                { name: '如果你是喜歡建築的玩家，你可以選擇這項身分組為自己分類喔\n---------', value: '<@&1092349120527736852>'},
                { name: '如果你是紅石大神，歡迎你選這個身分組與其他人交流！', value: '================================='},
            ],
            footer: {text: '休閒生存', icon_url: 'https://i.imgur.com/BofLBPV.png'},
        };


        if(permission.has(PermissionsBitField.Flags.Administrator)){
            await interaction.reply({ content: `處理中...`, ephemeral: true });

            setTimeout(() => {
                interaction.deleteReply();
                interaction.channel.send({ embeds: [role]});
            }, 1000);

        } else {
            interaction.reply('no perm');
        }
    },
};