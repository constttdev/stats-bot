import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";

import * as functions from "../../func/functions";

export const data = new SlashCommandBuilder()
  .setName("stat")
  .setDescription("Replies with a stat that you select")
  .addStringOption((option: SlashCommandStringOption) => {
    return option
      .setName("stat")
      .setDescription("The stat to display")
      .setRequired(true)
      .setMinLength(1);
  })
  .addStringOption((option: SlashCommandStringOption) => {
    return option
      .setName("statoption")
      .setDescription("An option for the stat your displaying")
      .setRequired(true)
      .setMinLength(1);
  });

const defaultEmbed = new EmbedBuilder().setTitle("Error in command").addFields({
  name: "Please input an stat like location info",
  value: "/stat <stat> <statoption>",
});

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const stat = interaction.options.getString("stat");
  const statoption = interaction.options.getString("statoption");

  switch (stat) {
    case "locationinfo":
      const weatherEmbed = await functions.getLocationInfo(String(statoption));
      return interaction.editReply({ embeds: [weatherEmbed] });
      break;

    case "sunriseset":
      const sunrisesetEmbed = await functions.getSunRiseSetTimes(
        String(statoption)
      );
      return interaction.editReply({ embeds: [sunrisesetEmbed] });
      break;

    case "population":
      const populationEmbed = await functions.getPopulation(String(statoption));
      return interaction.editReply({ embeds: [populationEmbed] });
      break;

    case "birthrate":
      const birthrateEmbed = await functions.getBirthRate(String(statoption));
      return interaction.editReply({ embeds: [birthrateEmbed] });
      break;

    case "moonriseset":
      const moonrisesetEmbed = await functions.getMoonRiseSetTimes(
        String(statoption)
      );
      return interaction.editReply({ embeds: [moonrisesetEmbed] });
      break;
    case "jmserverinfo":
      const javaServerInfoEmbed = await functions.getJavaMCServerInfo(
        String(statoption)
      );
      return interaction.editReply({ embeds: [javaServerInfoEmbed] });
      break;

    default:
      return interaction.editReply({ embeds: [defaultEmbed] });
      break;
  }
}
