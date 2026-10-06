import swaggerJSDoc from "swagger-jsdoc";
import { config } from "../config/config.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "REST API for managing tasks",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },
  },

  apis: ["./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
