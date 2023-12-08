import express, { Request, Response } from "express";
import { getAllLearns } from "./controllers/learns.controller";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Its working");
});

app.post("/todayilearned", async (req: Request, res: Response) => {});

app.get("/todayilearned", getAllLearns);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
