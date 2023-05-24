const { r1 } = require('../../../config.json')

module.exports = {
    customId: 'r1',
    async execute(interaction, client) {
        if (interaction.member.roles.cache.some((role) => role.id == r1)) {
            interaction.reply({
              content: `已移除你的 <@&${r1}> 身分組`,
              ephemeral: true,
            });
            interaction.member.roles.remove(r1);
          } else {
            interaction.member.roles.add(r1);
            await interaction.reply({
              content: `以幫你加入 <@&${r1}> 身分組`,
              ephemeral: true,
            });
          }

    }
};