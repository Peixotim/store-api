import { Request, Response } from 'express';
export class OrderController {
  public async health(req: Request, res: Response) {
    return res.status(200).json({
      message: `API IS RUNNING !`,
    });
  }
}
