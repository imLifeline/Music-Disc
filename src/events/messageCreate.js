const { color } = require(`${__dirname}/../utils/constants`);


module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.prefix;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (message.channel.id === '1026241280730214460' && cmd && cmd.inGeneral === false) return message.react(client.config.deny);
    
    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel)
            return message.reply({ content: `❌ | You are not connected to an audio channel.`, allowedMentions: { repliedUser: false } });

        if (message.guild.members.me.voice.channel && message.member.voice.channelId !== message.guild.members.me.voice.channelId)
            return message.reply({ content: `❌ | You are not on the same audio channel as me.`, allowedMentions: { repliedUser: false } });
    }

    if (cmd) {
        console.log(`(${color.grey}${message.guild.name}${color.white}) ${message.author.username} : ${message.content}`);
        message.channel.sendTyping();
        cmd.execute(client, message, args);
    }
};
