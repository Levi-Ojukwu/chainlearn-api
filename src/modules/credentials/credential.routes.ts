import type { FastifyInstance, FastifySchema } from "fastify";
import { credentialController } from "./credential.controller.js";
import { authGuard } from "../../middleware/auth.js";
import { validate } from "../../middleware/validation.js";
import { mintCredentialSchema } from "./credential.types.js";

export async function credentialRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", authGuard);

  app.post(
    "/mint",
    {
      preHandler: [validate({ body: mintCredentialSchema })],
      schema: {
        description: "Mint a course completion credential (NFT)",
        tags: ["credentials"],
      } as FastifySchema,
    },
    ((request: any, reply: any) => credentialController.mint(request, reply)) as any
  );

  app.get(
    "/",
    {
      schema: {
        description: "List user credentials",
        tags: ["credentials"],
      } as FastifySchema,
    },
    ((request: any, reply: any) => credentialController.list(request, reply)) as any
  );
}
