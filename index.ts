import { App, SlackCommandMiddlewareArgs } from "@slack/bolt";

import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Metadata } from "./types";
import { APP_NAME } from "./constants";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: 3000,
});

fs.readdir(path.join(__dirname, "commands"), async (err, files) => {
  if (err) {
    app.logger.error("Error reading the commands directory!");
    return;
  }

  const commandFiles = files.filter((file) => file.endsWith(".ts"));

  for (let file of commandFiles) {
    const filePath = path.join(__dirname, "commands", file);
    const command = (await import(filePath)) as {
      metadata: Metadata;
      execute: (args: SlackCommandMiddlewareArgs) => Promise<void>;
    };

    const commandName = command.metadata.command ?? file.replace(".ts", "");

    app.logger.info(`✅ Command -${commandName}- loaded!`);

    app.command(`/${commandName}`, command.execute);
  }
});

(async () => {
  await app.start();

  app.logger.info(`🏃 ${APP_NAME} is running!`);
})();
