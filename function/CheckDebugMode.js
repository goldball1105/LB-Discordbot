/*
 * @author: shane
 * @Date: 2023-05-18 22:39:51
 * @LastEditTime: 2023-05-19 00:44:33
 * @FilePath: \timepost\src\function\CheckDebugMode.js
 */
const { DebugMode } = require(`../config.json`)
function CheckDebugMode(...InputCommands) {
    if (DebugMode === true) {
        console.log(...InputCommands);
    }
}

module.exports = CheckDebugMode;