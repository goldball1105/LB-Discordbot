/*
 * @author: shane
 * @Date: 2023-05-25 09:10:24
 * @LastEditTime: 2023-05-25 09:21:39
 * @FilePath: \WhiteDragon\deploy.js
 */
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest')
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

console.log('\x1B[37m===============================================\x1B[0m')
//====================================
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	console.log(`\x1B[30m┬──────────[${folder}]─────`)
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
			console.log(`\x1B[30m├─\x1B[32m成功載入 \x1B[34m指令:[${file}]\x1B[0m`)
		} else {
			console.log(`\─x1B[31m[警告] 位於 ${filePath} 的指令缺少必要的 "data" 或 "execute" 屬性。\x1B[0m`);
		}
	}
}
//====================================

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`\x1B[37m-----------正在載入[${commands.length}]個指令-----------\x1B[0m`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`\x1B[32m===========已成功載入[${data.length}]個指令=========\x1B[0m`);

	} catch (error) {
		console.error(error);
	}
})();
