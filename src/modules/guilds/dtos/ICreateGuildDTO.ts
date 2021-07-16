import Discord from "discord.js"; "discord.js"

interface ICreateGuildDTO {
  id: Discord.Snowflake;
  prefix?: string;
}

export { ICreateGuildDTO };
