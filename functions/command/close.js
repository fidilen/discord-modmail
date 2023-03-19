module.exports = async (interaction, client, utils) => {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.member.user;

    if (!interaction.member.roles?.cache?.find(role => role.id == process.env.SUPPORT_ROLE_ID)) {
        return interaction.reply({ ephemeral: true, content: `Only members with <@&${process.env.SUPPORT_ROLE_ID}> can use this command.` });
    }

    if (!interaction.channel.isThread()) {
        return interaction.reply({ ephemeral: true, content: `Please use this command in a ticket thread.` });
    }

    const recipientID = interaction.channel.name?.match(/\d+/g)?.pop();

    if (recipientID) {
        try {
            await client.users.send(`${recipientID}`, `Your ticket is now closed.`);

            await interaction.channel.send(`Closed by <@${user.id}>.`);

            await utils.sleep(600);

            await interaction.channel.setLocked(true);
            await interaction.channel.setArchived(true);

            await interaction.editReply({ ephemeral: true, content: `Closed! ✅` });

            await utils.sleep(600);

            const ticket_channel = await client.channels.cache.get(`${process.env.TICKETS_CHANNEL_ID}`);

            await ticket_channel.messages.fetch(`${interaction.channel.id}`)
                .then(message => message.delete())
                .catch(console.error);

        } catch (e) {
            console.error(e);

            await interaction.editReply({ ephemeral: true, content: `Error: ${e.message}` });
        }
    } else {
        await interaction.editReply({ ephemeral: true, content: `Invalid ticket thread. Please ensure that the thread name contains the Ref ID.` });
    }
}