import { Module } from "@nestjs/common"
import { RoutesController } from "./route.controller"
import { RoutesService } from "./route.service"

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule { }