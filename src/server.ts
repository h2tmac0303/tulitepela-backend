import 'dotenv/config';
import express from "express";
import cors from "cors";
import { authRoutes } from "./http/routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
