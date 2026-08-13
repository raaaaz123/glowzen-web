// `server-only` makes importing this file from a `"use client"` module a build
// error rather than a runtime surprise. That matters more here than anywhere
// else in the codebase: this module reads AWS credentials, and a client import
// would try to inline them into a browser bundle.
import "server-only";

import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

/**
 * The one place the site talks to a model.
 *
 * Bedrock's Converse API, same shape the Rexa backend uses (`src/llm.ts`), with
 * the same IAM user, region and model — `moonshotai.kimi-k2.5`. Converse is
 * provider-agnostic, so swapping the model id in the environment is the whole
 * migration if Kimi is ever replaced.
 *
 * Credentials are passed explicitly rather than left to the default provider
 * chain. On Vercel there is no instance profile to fall back to, so an implicit
 * chain would fail at request time with a much less obvious error than
 * `bedrockConfigured()` returning false.
 */

const REGION = process.env.AWS_REGION ?? "us-east-1";
const MODEL_ID = process.env.BEDROCK_MODEL_ID ?? "moonshotai.kimi-k2.5";
const MAX_TOKENS = Number(process.env.BEDROCK_MAX_TOKENS ?? 900);

/** Hard ceiling on one call. A hung request holds a serverless function open. */
const TIMEOUT_MS = 25_000;

let client: BedrockRuntimeClient | null = null;

/**
 * Built on first use, not at module load.
 *
 * The build imports this module while collecting page data, and a production
 * build should not fail — or worse, quietly construct a client with empty
 * credentials — just because the deploy environment has not been given its
 * secrets yet.
 */
function getClient(): BedrockRuntimeClient {
  client ??= new BedrockRuntimeClient({
    region: REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      sessionToken: process.env.AWS_SESSION_TOKEN || undefined,
    },
  });
  return client;
}

/**
 * Whether the environment can reach a model at all.
 *
 * Checked before every call so a missing key produces an honest "this is
 * unavailable right now" rather than a stack trace, and so the tool degrades
 * to its deterministic fallback instead of returning a 500.
 */
export function bedrockConfigured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY,
  );
}

export type ConverseOptions = {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
};

/** One non-streaming turn. Returns the assistant's text, trimmed. */
export async function converseOnce({
  system,
  user,
  maxTokens,
  temperature = 0.4,
}: ConverseOptions): Promise<string> {
  const response = await getClient().send(
    new ConverseCommand({
      modelId: MODEL_ID,
      system: [{ text: system }],
      messages: [{ role: "user", content: [{ text: user }] }],
      inferenceConfig: {
        maxTokens: maxTokens ?? MAX_TOKENS,
        temperature,
      },
    }),
    { abortSignal: AbortSignal.timeout(TIMEOUT_MS) },
  );

  return (response.output?.message?.content ?? [])
    .map((block) => block.text ?? "")
    .join("")
    .trim();
}
