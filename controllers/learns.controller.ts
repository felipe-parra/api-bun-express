import { Request, Response } from "express";
import { fql } from "fauna";
import { client } from "../lib/fauna";

export { getAllLearns };

async function getAllLearns(req: Request, res: Response) {
  try {
    const learns = fql`learns.all()`;

    const result = await client.query(learns);

    return res.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      success: false,
      message: "Something wen't wrong :(",
    });
  } finally {
    // clean up any remainng resources
    client.close();
  }
}
