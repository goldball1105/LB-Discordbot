const { r4 } = require('../../config.json')

module.exports = {
    customId: 'r4',
    async execute(interaction, client) {
        if (interaction.member.roles.cache.some((role) => role.id == r4)) {
            interaction.reply({
              content: `已移除你的 <@&${r4}> 身分組`,
              ephemeral: true,
            });
            interaction.member.roles.remove(r4);
          } else {
            interaction.member.roles.add(r4);
            await interaction.reply({
              content: `以幫你加入 <@&${r4}> 身分組`,
              ephemeral: true,
            });
          }

    }
};