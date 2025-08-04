import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { Metadata } from "../types";

export const metadata: Metadata = {
  title: "Meal Command",
  description: "Register todays meal preference",
};

export const execute = async ({
  ack,
  say,
  command,
}: SlackCommandMiddlewareArgs) => {
  await ack();
  await say(`Hello, <@${command.user_id}>!`);
};
