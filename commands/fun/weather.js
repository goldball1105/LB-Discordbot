const { SlashCommandBuilder } = require('discord.js');
const weather = require('taiwan-weather');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('天氣再台灣'),

    async execute(interaction) {
        let data = weather.get('CWB-ABF2CCEB-E6ED-4F5C-81BE-9567D373C48F', {
            loc: [tw.DataEnum.Loc.TAIPEI_CITY, tw.DataEnum.Loc.HSINCHU_CITY],
            freq: tw.DataEnum.Freq.WEEKDAY,
            lang: tw.DataEnum.Lang.EN,
            output: 'data',
            prefix: Date.now() + '_',
            toJson: true,
            debug: true },
        )

        console.log(data);
    },
};