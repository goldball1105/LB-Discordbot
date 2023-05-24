const { Events, Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isModalSubmit()) return;
		const Action = {};

		const command = interaction.client.commands.get(interaction.commandName);
		const ActionFolderPath = path.join(__dirname, '..', 'unity', 'action');
		const actionFolders = fs.readdirSync(ActionFolderPath);

		for (const folder of actionFolders) {
			const actionPath = path.join(ActionFolderPath, folder);
			const actionFiles = fs.readdirSync(actionPath).filter(file => file.endsWith('.js'));
			for (const file of actionFiles) {
				const filePath = path.join(actionPath, file);
				const action = require(filePath);
				Action[action.customId] = action;
			}
		}

		const action = Action[interaction.customId];

		if (action) {
			try {
				await action.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'An error occurred while handling this interaction.', ephemeral: true });
			}
		}

		if (command) {
			try {
				if (interaction.isAutocomplete()) {
					await command.autocomplete(interaction);
				} else {
					await command.execute(interaction);
				}
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
	},
};