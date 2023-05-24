const { r2 } = require('../../../config.json')

module.exports = {
    customId: 'r2',
    async execute(interaction, client) {
        if (interaction.member.roles.cache.some((role) => role.id == r2)) {
            interaction.reply({
              content: `已移除你的 <@&${r2}> 身分組`,
              ephemeral: true,
            });
            interaction.member.roles.remove(r2);
          } else {
            interaction.member.roles.add(r2);
            await interaction.reply({
              content: `以幫你加入 <@&${r2}> 身分組`,
              ephemeral: true,
            });
          }

    }
};