const { r3 } = require('../../config.json')

module.exports = {
    customId: 'r3',
    async execute(interaction, client) {
        if (interaction.member.roles.cache.some((role) => role.id == r3)) {
            interaction.reply({
              content: `已移除你的 <@&${r3}> 身分組`,
              ephemeral: true,
            });
            interaction.member.roles.remove(r3);
          } else {
            interaction.member.roles.add(r3);
            await interaction.reply({
              content: `以幫你加入 <@&${r3}> 身分組`,
              ephemeral: true,
            });
          }

    }
};