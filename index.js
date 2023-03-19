require("dotenv").config();
const { Client, GatewayIntentBits, REST, Routes, Events, Partials } = require("discord.js");
const { CommandBuilder, Handler } = require('djs-fm');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

const commandBuiler = new CommandBuilder(process.env.DISCORD_BOT_TOKEN, process.env.CLIENT_ID, REST, Routes);
const handler = new Handler('/config/handlers.json');

commandBuiler.build('/config/commands.json');

client.on('ready', () => {
  console.log("Ready: " + client.user.username);
});

client.on(Events.InteractionCreate, async (interaction) => {
  await handler.interaction(interaction, client);
});

client.on(Events.MessageCreate, async (event) => {
  await handler.dm(event, client);
});

client.login(process.env['DISCORD_BOT_TOKEN']);