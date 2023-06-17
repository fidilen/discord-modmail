module.exports = async (interaction, client, utils) => {
    await interaction.deferReply({ ephemeral: true });

    const content = interaction.options.getString("content").replace(/\\n/g, "\n");

    const user = interaction.member.user;

    if (!interaction.member.roles?.cache?.find(role => role.id == process.env.SUPPORT_ROLE_ID)) {
        return interaction.editReply({ ephemeral: true, content: `Only members with <@&${process.env.SUPPORT_ROLE_ID}> can use this command.` });
    }

    if (!interaction.channel.isThread()) {
        return interaction.editReply({ ephemeral: true, content: `Please use this command in a ticket thread.` });
    }

    const recipientID = interaction.channel.name?.match(/\d+/g)?.pop();

    if (recipientID) {
        try {
            await client.users.send(`${recipientID}`, `${content}`);

            await utils.sleep(600);

            await interaction.channel.send(`<@${user.id}>: ${content}`);

            await interaction.editReply({ ephemeral: true, content: `Reply sent! ✅` });
        } catch (e) {
            console.error(e);

            await interaction.editReply({ ephemeral: true, content: `Message not sent due to: ${e.message}` });
        }
    } else {
        await interaction.editReply({ ephemeral: true, content: `Invalid ticket thread. Please ensure that the thread name contains the Ref ID.` });
    }
}