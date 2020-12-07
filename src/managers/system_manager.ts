import Discord from 'discord.js';

class SystemManager {
  private static instance: SystemManager;

  private client: Discord.Client;

  private constructor(client: Discord.Client) {
    this.client = client;
  }

  public static init(client: Discord.Client): SystemManager {
    if (!SystemManager.instance) {
      SystemManager.instance = new SystemManager(client);
    }
    return SystemManager.instance;
  }

  public static getInstance(): SystemManager {
    if (!SystemManager.instance) {
      throw Error(`System Manager Not Inited , run the init method first`);
    }
    return SystemManager.instance;
  }
}

export default SystemManager;
