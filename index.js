const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const express = require('express');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '9' }).setToken('TOKEN');

const squadInfoFile = path.join(__dirname, 'squadInfo.json');

let squadInfo = {};

if (fs.existsSync(squadInfoFile)) {
  squadInfo = JSON.parse(fs.readFileSync(squadInfoFile));
}

function saveSquadInfo() {
  fs.writeFileSync(squadInfoFile, JSON.stringify(squadInfo));
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const commands = [{
    name: 'squadinfo',
    description: 'Shows your squad info!'
  }, {
    name: 'setp',
    description: 'Saves your squad info!',
    options: [{
      name: 'ign',
      type: 3,
      description: 'Your in-game name',
      required: true
    }, {
      name: 'gameid',
      type: 3,
      description: 'Your game ID',
      required: true
    }, {
      name: 'realname',
      type: 3,
      description: 'Your real name',
      required: true
    }, {
      name: 'devicename',
      type: 3,
      description: 'Your device name',
      required: true
    }]
  }, {
    name: 'editentry',
    description: 'Edits your squad info!',
    options: [{
      name: 'field',
      type: 3,
      description: 'The field to edit (ign, gameid, realname, or devicename)',
      required: true
    }, {
      name: 'value',
      type: 3,
      description: 'The new value for the field',
      required: true
    }]
  }, {
    name: 'ping',
    description: 'Shows the bot\'s latency'
  }, {
    name: 'help',
    description: 'Shows information on how to use the bot'
  }];

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands('APPLICATION_ID'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'squadinfo') {
    let info = squadInfo[interaction.user.id];
    if (!info) {
      await interaction.reply('No squad info found for you. Use /setp to save your info.');
      return;
    }

    let responseText = `**PLAYER INFORMATION**\n` +
      `*IGN:* **${info.ign}**\n` +
      `*Game ID:* **${info.gameId}**\n` +
      `*Real Name:* **${info.realName}**\n` +
      `*Device Name:* **${info.deviceName}**`;

    await interaction.reply(responseText);

  } else if (interaction.commandName === 'setp') {
    let ign = interaction.options.getString('ign');
    let gameId = interaction.options.getString('gameid');
    let realName = interaction.options.getString('realname');
    let deviceName = interaction.options.getString('devicename');
    squadInfo[interaction.user.id] = { ign, gameId, realName, deviceName };
    saveSquadInfo();
    await interaction.reply('Squad info saved!');
  } else if (interaction.commandName === 'editentry') {
    let field = interaction.options.getString('field');
    let value = interaction.options.getString('value');

    if (!squadInfo[interaction.user.id]) {
      await interaction.reply(`No squad info found for you. Use /setp to save your info.`);
      return;
    }

    if (field === 'ign') {
      squadInfo[interaction.user.id].ign = value;
      saveSquadInfo();
      await interaction.reply(`Your IGN has been updated to ${value}.`);
      return;
    } else if (field === 'gameid') {
      squadInfo[interaction.user.id].gameId = value;
      saveSquadInfo();
      await interaction.reply(`Your Game ID has been updated to ${value}.`);
      return;
    } else if (field === 'realname') {
      squadInfo[interaction.user.id].realName = value;
      saveSquadInfo();
      await interaction.reply(`Your Real Name has been updated to ${value}.`);
      return;
    } else if (field === 'devicename') {
      squadInfo[interaction.user.id].deviceName = value;
      saveSquadInfo();
      await interaction.reply(`Your Device Name has been updated to ${value}.`);
      return;
    }
  }
});

client.login('TOKEN');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});
