import { AbstractPlugin } from 'discord-oasis';

class TestManager extends AbstractPlugin {
  constructor(commands_folder: string) {
    super(commands_folder);
  }
  public convertText(input: string) {
    return input + '  -- > 1234567890';
  }
}

export default TestManager;
