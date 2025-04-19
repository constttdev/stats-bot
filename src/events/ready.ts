import { Events, ActivityType } from "discord.js";

export const name = Events.ClientReady;

export const execute = async (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("Show diffrent stats with /stats", {
    type: ActivityType.Playing,
  });
};
