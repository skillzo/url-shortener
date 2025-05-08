import express from "express";
import urlRoutes from "./routes/url.routes";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", urlRoutes);

app.get("/:shortId", urlRoutes);

app.use(errorHandler);

export default app;
