/*
 * @author: shane
 * @Date: 2023-05-19 06:59:59
 * @LastEditTime: 2023-05-23 03:27:05
 * @FilePath: \timepost\src\commands\practical\clear.js
 */
const { SlashCommandBuilder } = require('discord.js');
const CheckDebugMode = require(`../../function/CheckDebugMode.js`);
const { notifyId } = require(`../../config.json`);
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('刪除訊息')
        .setDefaultMemberPermissions(0)
        .addIntegerOption(option =>
            option
                .setName('刪除歷史天數')
                .setDescription('設定要刪除的歷史紀錄，最多可以選擇刪除14天以內的記錄。')
                .setMinValue(1)
                .setMaxValue(14)
        )
        .addIntegerOption(option =>
            option
                .setName('刪除歷史小時數')
                .setDescription('設定要刪除的小時數')
                .setMinValue(1)
                .setMaxValue(24)
        ),
    async execute(interaction) {
        const messagesToDelete = []; // 存储要删除的消息的集合
        const channel = interaction.channel; // 替换为您要操作的频道对象
        const limit = 100; // 指定要获取的消息数量
        const day_limit = interaction.options.getInteger('刪除歷史天數') ?? null;
        const hour_limit = interaction.options.getInteger('刪除歷史小時數') ?? null;
        const fourteenDaysAgo = new Date();
        let messagesToDeleteWithin14Days

        CheckDebugMode(day_limit, hour_limit);
        if (day_limit !== null) {
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - day_limit);
            CheckDebugMode('DaD');
        } else if (hour_limit !== null) {
            fourteenDaysAgo.setHours(fourteenDaysAgo.getHours() - hour_limit);
            CheckDebugMode('hourD');
        } else {
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
            CheckDebugMode('14D');
        }
        channel.messages.fetch({ limit: limit })
            .then(fetchedMessages => {
                for (const message of fetchedMessages.values()) {
                    messagesToDelete.push(message);
                }
                CheckDebugMode(messagesToDelete);

            })
            .catch(error => {
                console.error('無法獲取頻道訊息：', error);
            });

        await wait(1000);
        messagesToDeleteWithin14Days = messagesToDelete.filter(msg => msg.createdAt > fourteenDaysAgo);
        CheckDebugMode(messagesToDelete);
        // 批量删除14天内的消息
        if (messagesToDeleteWithin14Days.length > 0) {
            const channel = interaction.channel; // 替换为您的消息所在的频道
            // const messageIdsToDelete = messagesToDeleteWithin14Days.map(msg => msg.id);
            const messageIdsToDelete = messagesToDeleteWithin14Days.length;
            CheckDebugMode(messageIdsToDelete);
            channel.bulkDelete(messageIdsToDelete)
                .then(deletedMessages => {
                    const deletedMessageIds = deletedMessages.map(msg => msg.id);
                    CheckDebugMode(`成功删除 ${deletedMessages.size} 條消息`);
                    CheckDebugMode('成功删除的消息的 ID:', deletedMessageIds);
                    interaction.reply({
                        content: `成功删除 ${deletedMessages.size} 條消息`,
                        ephemeral: true
                    });
                })
                .catch(async error => {
                    console.error('刪除訊息時發生錯誤', error);
                    await interaction.reply({
                        content: `刪除訊息發生錯誤。`,
                        ephemeral: true
                    });
                });
        } else {
            interaction.reply({
                content: '所選時間段內無訊息',
                ephemeral: true
            });
        }
    },
};