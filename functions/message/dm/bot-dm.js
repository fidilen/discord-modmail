module.exports = async (event, client, utils) => {
    const user = event.author;

    const thread_reference = `Ref ID: ${user.id}`;

    const tickets_channel = client.channels.cache.get(`${process.env.TICKETS_CHANNEL_ID}`);

    let thread = tickets_channel.threads?.cache?.find(t => t.name.includes(user.id) && !t.locked);

    try {
        let content = `**${user.username}#${user.discriminator}** : ${event.content}`;

        if (!thread) {
            thread = await tickets_channel.threads.create({
                name: `${user.username}#${user.discriminator} - ${thread_reference}`,
                autoArchiveDuration: 1440,
                type: 11,
                reason: `ModMail thread for ${user.username}`,
            });

            content = `Please use the command **/reply** to respond, and **/close** to lock the thread.\n\n\n` + content;
        }

        if (event.attachments.size > 0) {
            content += `\n${event.attachments.map(a => { return a.url })?.join('\n')}`;
        }

        thread.send(content);

        await utils.sleep(600);

        await event.react(`✅`);
    } catch (e) {
        console.error(e);

        await utils.sleep(600);

        await event.react(`❌`);

        await event.channel.send(`Message not sent due to: ${e.message}`);
    }
}