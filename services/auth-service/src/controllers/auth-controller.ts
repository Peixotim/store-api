  import { AuthService } from "../services/auth-service";
  import { NextFunction, Request, Response } from "express";
  export class AuthController{

    private authService = new AuthService();

      public async health(req: Request, res: Response){
        return res.status(200).json({
          message: `API IS RUNNING !`
        })
      }
  public async login(req : Request , res : Response,next: NextFunction){
      try{
      const tokens = await this.authService.login(req.body);
      return res.status(200).json(tokens);
    }catch(error){
      next(error);
    }
    }

    public async register(req: Request , res: Response , next : NextFunction){
      try{
        await this.authService.register(req.body);
        return res.status(201).json({
          message: `User registered successfully`
        })
      }catch(error){
        next(error)
      }
    }

    public async refresh(req: Request, res : Response, next : NextFunction){
      try{
        const { refreshToken } = req.body;
        const tokens = await this.authService.refresh(refreshToken);
        return res.status(200).json(tokens);
      }catch(error){
        next(error);
      }
    }
  }