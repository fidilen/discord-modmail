# Discord Basic ModMail
A Discord bot that provides simple and straightforward DM support similar to ModMail.

## Prerequisites
* You should know how to create a Discord application. (See guide [here](https://github.com/fidilen/Starter-Discord-Bot))
* You should know how to get Channel and Role IDs. (See guide [here](https://ko-fi.com/post/Unlock-Developer-Mode-and-Find-Your-Discord-IDs-R6R3JIXEG))

## Instructions
### Discord Server
* Create a channel dedicated for tickets.
* Create a role dedicated for resolving the raised tickets.
* Invite your bot using this link (replace the `BOT_ID` accordingly): https://discord.com/api/oauth2/authorize?permissions=328565083200&scope=bot&client_id=BOT_ID
* Ensure that the bot has an access to the channel.
### Source Code
* Rename the `example.env` to `.env`
* Fill in all the necessary details in `.env` file.

## Usage
* Use case begins when a member sends a Direct Message to the bot.
* This message will be forwarded to a thread created under the dedicated channel.
* A message **Started a thread** will be sent in the dedicated channel, this serves as the notification whether a new ticket is created or one is not closed yet.
<br/><img src="https://cdn.discordapp.com/attachments/990077404661837854/1086681641000382656/dm.gif" width="400"/>
* Server staff members shall use the command **/reply** for their response.
<br/><img src="https://cdn.discordapp.com/attachments/990077404661837854/1086681640086024302/reply.gif" width="400"/>
* Server staff members shall use the command **/close** to lock and archive the ticket.
* Once closed, the message **Started a thread** in the dedicated channel will be removed immediately.
<br/><img src="https://cdn.discordapp.com/attachments/990077404661837854/1086681640534810684/close.gif" width="400"/>

## Need Assistance?
Contact the developer via [Discord](https://discord.gg/Urt5S2Ucju).

## Notifications
Want to get notified when the developer releases new projects?
<br/>Check out these [socials](https://linktr.ee/fidilen)!

## Buy Me a Coffee?
Did you find this application helpful and would like to support the developer?<br/>
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U7E7WXM)