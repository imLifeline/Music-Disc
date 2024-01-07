const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const embed = require('../../embeds/embeds');


module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Show now playing song',
    usage: 'nowplaying',
    category: 'Music',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `${client.config.deny} | There is no music currently playing.`, allowedMentions: { repliedUser: false } });


        const track = queue.currentTrack;
        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `Author : **${track.author}**\nDuration **${trackDuration}**\n`
            + '\n'
            + `${progress} (**${timestamp.progress}**%)`;


        const saveButton = new ButtonBuilder()
            .setCustomId('Save Song')
            .setLabel('Save Song')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(saveButton);

        return message.channel.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)], components: [row] });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `${client.config.deny} | There is no music currently playing.`, allowedMentions: { repliedUser: false } });


        const track = queue.currentTrack;
        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `Author : **${track.author}**\nDuration **${trackDuration}**\n`
            + '\n'
            + `${progress} (**${timestamp.progress}**%)`;


        const saveButton = new ButtonBuilder()
            .setCustomId('Save Song')
            .setLabel('Save Song')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(saveButton);

        return interaction.reply({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)], components: [row] });
    },
};