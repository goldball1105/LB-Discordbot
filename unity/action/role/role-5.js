const { r5 } = require('../../config.json')

module.exports = {
    customId: 'r5',
    async execute(interaction, client) {
        if (interaction.member.roles.cache.some((role) => role.id == r5)) {
            interaction.reply({
              content: `已移除你的 <@&${r5}> 身分組`,
              ephemeral: true,
            });
            interaction.member.roles.remove(r5);
          } else {
            interaction.member.roles.add(r5);
            await interaction.reply({
              content: `以幫你加入 <@&${r5}> 身分組`,
              ephemeral: true,
            });
          }

    }
};