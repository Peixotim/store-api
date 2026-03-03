import { Request, Response } from 'express';
import { UserService } from '../services/user-service';

export class UserController {
  private service = new UserService();

  public async health(req : Request , res: Response){
    return res.status(200).json({
      message : `API IS RUNNING !`
    })
  }
  
  public async create(req: Request, res: Response) {
    const user = await this.service.create(req.body);
    return res.status(201).json(user);
  }

  public async findAll(req: Request, res: Response) {
    const users = await this.service.findAll();
    return res.status(200).json(users);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.service.findById(id);
    return res.status(200).json(user);
  }

  public async findByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await this.service.findByEmail(email);
    return res.status(200).json(user);
  }

  public async findByCpf(req: Request, res: Response) {
    const { cpf } = req.params;
    const user = await this.service.findByCpf(cpf);
    return res.status(200).json(user);
  }

  public async desactive(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.desactive(id);
    return res.status(204).send();
  }
}