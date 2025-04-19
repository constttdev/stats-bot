import { EmbedBuilder } from "discord.js";
import axios from "axios";

export async function getLocationInfo(city: string) {
  try {
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    return new EmbedBuilder()
      .setTitle(`Info about ${city}`)
      .addFields(
        {
          name: "Temperature",
          value: `${response.data.current_condition[0].temp_C}` + "°C",
          inline: true,
        },
        {
          name: "Humidity",
          value: `${response.data.current_condition[0].humidity}` + "%",
          inline: true,
        },
        {
          name: "Wind Speed",
          value:
            `${response.data.current_condition[0].windspeedKmph}` + " km/h",
          inline: true,
        },
        {
          name: "Feels Like",
          value: `${response.data.current_condition[0].FeelsLikeC}` + "°C",
          inline: true,
        },
        {
          name: "Current Weather",
          value: `${response.data.current_condition[0].weatherDesc[0].value}`,
          inline: true,
        },
        {
          name: "Average Temperature",
          value: `${response.data.weather[0].avgtempC}` + "°C",
          inline: true,
        }
      )
      .setFooter({
        text: `Observation Time: ${response.data.current_condition[0].observation_time}`,
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription("Could not fetch data.");
  }
}

export async function getSunRiseSetTimes(city: String) {
  try {
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    return new EmbedBuilder()
      .setTitle(`Sun rise and set times in ${city}`)
      .addFields(
        {
          name: "Sunrise 🌅",
          value: response.data.weather[0].astronomy[0].sunrise,
          inline: true,
        },
        {
          name: "Sunset 🌇",
          value: response.data.weather[0].astronomy[0].sunset,
          inline: true,
        }
      );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription("Could not fetch data.");
  }
}

export async function getMoonRiseSetTimes(city: String) {
  try {
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    return new EmbedBuilder()
      .setTitle(`Moon rise and set times in ${city}`)
      .addFields(
        {
          name: "Moonrise 🌕",
          value: response.data.weather[0].astronomy[0].moonrise,
          inline: true,
        },
        {
          name: "Moonset 🌑",
          value: response.data.weather[0].astronomy[0].moonset,
          inline: true,
        }
      );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription("Could not fetch data.");
  }
}

export async function getPopulation(city: string) {
  try {
    const searchRes = await axios.get(`https://www.wikidata.org/w/api.php`, {
      params: {
        action: "wbsearchentities",
        search: city,
        language: "en",
        format: "json",
      },
    });
    const searchData = searchRes.data;

    const entityId = searchData.search[0].id;

    const entityRes = await axios.get(
      `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`
    );
    const entityData = entityRes.data;

    const claims = entityData.entities[entityId].claims;
    const popClaim = claims.P1082?.[0]?.mainsnak?.datavalue?.value?.amount;

    if (popClaim) {
      const population = Number(popClaim.replace("+", ""));
      return new EmbedBuilder().setTitle(`Population of ${city}`).addFields({
        name: "Population",
        value: population.toLocaleString(),
        inline: true,
      });
    } else {
      throw new Error("Population data not found.");
    }
  } catch (error) {
    console.error("Error fetching population:", error);
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription(
        "Could not fetch population data for the specified city."
      );
  }
}

export async function getBirthRate(country: string) {
  try {
    const searchRes = await axios.get(
      `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
        country
      )}&language=en&format=json&origin=*`
    );
    const searchData = searchRes.data;

    if (!searchData.search || searchData.search.length === 0) {
      throw new Error("Country not found on Wikidata.");
    }

    const entityId = searchData.search[0].id;

    const entityRes = await axios.get(
      `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`
    );
    const entityData = entityRes.data;

    const claims = entityData.entities[entityId].claims;

    const birthRateClaim = claims.P4511?.[0];

    if (birthRateClaim?.mainsnak?.datavalue?.value) {
      const birthRate = birthRateClaim.mainsnak.datavalue.value;

      return new EmbedBuilder().setTitle(`Birth Rate in ${country}`).addFields({
        name: "Fertility Rate",
        value: `${birthRate} births per woman, per 1000 people`,
        inline: true,
      });
    } else {
      console.log("P5327 not found in claims for:", country);
      throw new Error("Birth rate data not available.");
    }
  } catch (error) {
    console.error("Error fetching birth rate:", error);
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription(
        "Could not fetch birth rate data for the specified country."
      );
  }
}

export async function getJavaMCServerInfo(serverAdress: string) {
  try {
    const response = await axios.get(
      `https://api.mcsrvstat.us/3/${serverAdress}`
    );

    const data = response.data;

    return new EmbedBuilder()
      .setTitle(`Server Info about ${serverAdress}`)
      .addFields(
        {
          name: "IP",
          value: String(data.ip || "Unknown"),
          inline: true,
        },
        {
          name: "Port",
          value: String(data.port || "Unknown"),
          inline: true,
        },
        {
          name: "Is bedrock",
          value: String(data.debug?.bedrock ?? "Unknown"),
          inline: true,
        },
        {
          name: "Motd",
          value: data.motd?.clean?.join("\n") || "None",
          inline: true,
        },
        {
          name: "Players",
          value: `${data.players?.online ?? "?"}/${data.players?.max ?? "?"}`,
          inline: true,
        },
        {
          name: "Version",
          value: String(data.version || "Unknown"),
          inline: true,
        },
        {
          name: "Is premium",
          value: String(data.online ?? "Unknown"),
          inline: true,
        },
        {
          name: "Hostname",
          value: String(data.hostname || "Unknown"),
          inline: true,
        },
        {
          name: "Eula Blocked",
          value: String(data.eula_blocked ?? "Unknown"),
          inline: true,
        }
      );
  } catch (error) {
    console.error("Error fetching server info:", error);
    return new EmbedBuilder()
      .setTitle("Error")
      .setDescription(
        "Could not fetch server info for the specified Minecraft server."
      );
  }
}