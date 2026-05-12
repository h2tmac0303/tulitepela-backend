import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRoutes } from "./http/routes/auth.routes";
import { investmentRoutes } from "./http/routes/investment.routes";
import { cropRoutes } from "./http/routes/crop.routes";
import { adminRoutes } from "./http/routes/admin.routes";

const app = express();
const PORT = process.env.PORT || 3333;
const origins = process.env.ALLOWED_ORIGINS?.split(",") || [];
// Configuração do CORS
app.use(
  cors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/crops", cropRoutes);
app.use("/investments", investmentRoutes);
app.use("/admin", adminRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Tulitepela API running on port ${PORT}`);
});
