import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { TRPCError } from "@trpc/server";

export const aiRouter = createTRPCRouter({
  generate: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    if (input.trim().length === 0) throw new TRPCError({ code: "BAD_REQUEST" });
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY ?? "",
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-ada-001",
      prompt: `Generate a professional profile with a maximum of 100 words and base it on this context: ${input}`,
      max_tokens: 200,
      temperature: 0.5,
      top_p: 1,
      n: 1,
    });

    console.log(response.data.choices);

    return response.data.choices[0]?.text ?? "";
  }),
});
