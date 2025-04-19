import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("availiblestats")
  .setDescription("Replies with the avalible stats");

const embed = new EmbedBuilder()
  .setTitle("Currently availible stats")
  .addFields(
    {
      name: "`/stat <locationinfo> <city>`",
      value: "Displays info for an specific city",
      inline: false,
    },
    {
      name: "`/stat <sunriseset> <city>`",
      value: "Shows the sun rise and set times for an specific city",
      inline: false,
    },
    {
      name: "`/stat <moonriseset> <city>`",
      value: "Shows the moon rise and set times for an specific city",
      inline: false,
    },
    {
      name: "`/stat <population> <city/country/town/region/provinces>`",
      value: "Returns the population of an specific city",
      inline: false,
    },
    {
      name: "`/stat <birthrate> <country>`",
      value: "Returns the birth rate of an specific city",
      inline: false,
    },
    {
      name: "`/stat <jmserverinfo> <adress>`",
      value: "Returns info about an specific java minecraft server",
      inline: false,
    }
  )
  .setFooter({
    text: "All data the returns may be wrong, if you are planing things based on the returned values please look it up or use an other trusted source.",
  });

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({ embeds: [embed] });
}
