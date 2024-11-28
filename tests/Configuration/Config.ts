import * as fs from 'fs';
import * as path from 'path';

interface ConfigData {
  url: string;
  username: string;
  password: string;
}

class Config {
  private configData: ConfigData;

  constructor() {
    this.configData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../Configuration/Configuration.json'), 'utf-8'));
  }

  get url(): string {
    return this.configData.url;
  }

  get username(): string {
    return this.configData.username;
  }

  get password(): string {
    return this.configData.password;
  }
}
const config: Config = new Config();
export default config;