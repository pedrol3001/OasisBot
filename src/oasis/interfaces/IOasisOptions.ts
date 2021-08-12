import { AbstractPlugin } from '@plugin/class/AbstractPlugin';

export interface IOasisOptions {
  shard_count?: number;
  plugins?: AbstractPlugin[];
  commands_folder: string;
  environment: string;
}
