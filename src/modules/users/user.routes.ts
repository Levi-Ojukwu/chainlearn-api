import type { FastifyInstance, FastifySchema } from "fastify";
import { userController } from "./user.controller.js";
import { authGuard } from "../../middleware/auth.js";
import { validate } from "../../middleware/validation.js";
import { updateProfileSchema } from "./user.types.js";

export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("onRequest", authGuard);

  app.get(
    "/me",
    {
      schema: {
        description: "Get authenticated user profile",
        tags: ["users"],
      } as FastifySchema,
    },
    ((request: any, reply: any) => userController.getMe(request, reply)) as any
  );

  app.put(
    "/me",
    {
      preHandler: [validate({ body: updateProfileSchema })],
      schema: {
        description: "Update authenticated user profile",
        tags: ["users"],
      } as FastifySchema,
    },
    ((request: any, reply: any) => userController.updateMe(request, reply)) as any
  );

  app.get(
    "/me/progress",
    {
      schema: {
        description: "Get learning progress stats",
        tags: ["users"],
      } as FastifySchema,
    },
    ((request: any, reply: any) => userController.getProgress(request, reply)) as any
  );
}
