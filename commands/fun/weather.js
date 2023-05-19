const { SlashCommandBuilder } = require('discord.js');
const tw = require('taiwan-weather');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('天氣再台灣'),

    async execute(interaction) {
        tw.get('CWB-ABF2CCEB-E6ED-4F5C-81BE-9567D373C48F', null, err => {
            interaction.reply('rr')
        })


    },
};