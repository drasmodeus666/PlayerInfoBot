# Player Info Bot Discord

<b>The bot is created using discord.js V13.</b>  The Bot also Includes Express Webview (If You Run It On Replit, It's Going To Help You To Keep The Bot Running Using Uptimerobot). <b> The bot will automatically create a JSON file to store all the player data after informations are given    </b>

The Bot Includes : <br> <br>
<li>`/editentry` - to edit entries of players </li> <br>
<li>`/ping` - to show the bot's latency</li> <br>
<li> `/setp <ign> <gameid> <realname><devicename>` - to add information </li> <br> [you can change /setp command from the index.js file according to your preference.]
      and lastly <br><br>
<li> `/squadinfo` - to show all the player entries. </li> <br><br>

<b>The Bot Also Has Global Slash Commands Registration Included. </b> <br>

## Setup PROCESS: <br><br> 
### Here are some Important Links which You'll Be Needing - https://discord.com/developers/applications/

1. Clone the Repository or Download it
First, clone the repository to your local machine:
`git clone <gh repo clone drasmodeus666/Player-Info-Bot-v2.>
cd Player-Info-Bot`
<br> <br>


2. Directory Structure
Here’s a quick overview of the project structure:

Player-Info-Bot <br> <br>
├── Commands <br>
│   ├── ping.js <br>
│   ├── addplayer.js <br>
│   ├── removeplayer.js <br>
│   ├── getplayer.js <br>
│   ├── info.js <br>
│   ├── help.js <br>
├── Data <br>
│   └── players.json <br>
├── .env <br>
├── deploy-commands.js <br>
└── index.js <b> <br> <br>

3. Install Dependencies
Make sure you have Node.js installed. Then, install the required dependencies:

`npm install`
<br> <br>

4. Configure Environment Variables and Config File
.env File: Ensure your .env file in the root directory contains the following variables:
`DISCORD_TOKEN=your-bot-token` <br> <br>

`CLIENT_ID=your-client-id` <br> <br>

`GUILD_ID=your-guild-id` <br> <br>

Replace your-bot-token, your-client-id, and your-guild-id with your actual bot token, client ID, and guild ID.

config.json File: Create or update the config.json file in the root directory with the necessary configuration:
JSON

`{
  "token": "your-bot-token",
  "clientId": "your-client-id",
  "guildId": "your-guild-id"
}`
Replace your-bot-token, your-client-id, and your-guild-id with your actual bot token, client ID, and guild ID. <br> <br>


5. Deploy Commands <br> <br>

Run the deploy-commands.js script to register your bot’s commands:

`node deploy-commands.js`
<br> <br>
6. Run the Bot <br> <br>
Start your bot by running:

`node index.js`



