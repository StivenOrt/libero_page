import { Module } from "@nestjs/common"
import { RoutesController } from "../controllers/route.controller"
import { RoutesService } from "../services/route.service"

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}