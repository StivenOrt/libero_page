import { Injectable } from "@nestjs/common"
import { join } from "path"

const PUBLIC = join(process.cwd(), "src", "public")

@Injectable()
export class RoutesService {

  getIndex() {
    return join(PUBLIC, "index.html")
  }

  getLogin() {
    return join(PUBLIC, "login.html")
  }


}