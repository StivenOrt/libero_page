import { Controller, Get, Res } from "@nestjs/common"
import type { Response } from "express"
import { RoutesService } from "./route.service"

@Controller()
export class RoutesController {

  constructor(private readonly RoutesService: RoutesService) { }

  @Get()
  home(@Res() res: Response) {
    res.sendFile(this.RoutesService.getIndex())
  }

  @Get('login')
  login(@Res() res: Response) {
    res.sendFile(this.RoutesService.getLogin())
  }


}