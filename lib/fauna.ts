import { Client, fql, FaunaError } from "fauna";
import { config } from "../config";

// configure your client
export const client = new Client({
  secret: config.secretKeyDb,
});
