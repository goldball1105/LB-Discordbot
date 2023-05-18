const { Events } = require('discord.js');
const { clientId, guildId } = require('../config.json')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity({ name: '休閒生存 :>',type: 3});

        console.log(`Login : Bot ${client.user.tag}\nBotID : ${clientId}`);
        console.log(`ServerID : ${guildId}`);

		const guild = client.guilds.cache.get(guildId);
		const memberCount = guild.memberCount;
		console.log(`伺服器中有 ${memberCount} 位成員`);

	},
};
