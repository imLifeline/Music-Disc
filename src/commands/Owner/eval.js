const _eval = require("@moscowcity/djs-eval");
const Eval = new _eval.Eval(["552998962055872515"], "ru");

module.exports = {
    name: 'eval',
    aliases: ['ev'],
    description: 'Eval',
    usage: 'eval',
    category: 'Owner',
    voiceChannel: false,
    options: [],

    async execute(client, message) {
        const code = message.content.split(' ').slice(1).join(' ');
        if (!code) return message.reply({ content: 'No code provided', allowedMentions: { repliedUser: false } });
        const evaled = await Eval.run(message, { bot: client, config: client.config, code: code });
        message.channel.send({ content: '```JS\n' + evaled + '```'}); // or message.reply('```JS\n' + evaulated + '```');
    },
    slashExecute(client, interaction) {
        const botPing = `${Date.now() - interaction.createdTimestamp}ms`;
        interaction.reply({ embeds: [embed.Embed_ping(botPing, client.ws.ping)], allowedMentions: { repliedUser: false } });
    },
}