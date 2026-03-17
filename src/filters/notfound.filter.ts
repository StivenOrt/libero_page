import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException
} from '@nestjs/common'
import { Response, Request } from 'express'
import { join } from 'path'

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {

  catch(exception: NotFoundException, host: ArgumentsHost) {

    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()

    // si es API devolvemos JSON normal
    if (req.url.startsWith('/api')) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Endpoint not found'
      })
    }

    // si es frontend devolvemos HTML
    return res.status(404).sendFile(
      join(process.cwd(), 'src', 'public', 'error.html')
    )
  }
}