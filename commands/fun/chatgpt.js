const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')
const { chatgptapi } = require('../../config.json');
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: chatgptapi
})

const openai = new OpenAIApi(configuration)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('chatgpt command')
        .addStringOption(options => options
            .setName('qustion')
            .setDescription('想問的問題')
            .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const question = interaction.options.getString('qustion');

        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question + "#zh_tw"
            })

            const embed = new EmbedBuilder()
                .setDescription(`${res.data.choices[0].text}`)
                .setTimestamp()

            await interaction.editReply({ embeds:[embed] })

        } catch (error) {
            console.log(error)
            return await interaction.editReply({ content:`出現錯誤`, ephemeral:true})
        }



    },
};