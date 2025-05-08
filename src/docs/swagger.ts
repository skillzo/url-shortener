import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShortLink API",
      version: "1.0.0",
      description: "API for a simple URL shortener",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["src/routes/*.ts"], // path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
