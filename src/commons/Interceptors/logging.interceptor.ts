import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@wahyoo/wahyoo-shared';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const now = Date.now();

    // This is for REST petitions
    if (request) {
      return next
        .handle()
        .pipe(
          tap(() =>
            Logger.log(
              `${request.method} ${request.url} ${Date.now() - now}ms`,
              `${context.getClass().name}.${context.getHandler().name}`
            )
          )
        );
    } else {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo();
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const requestBody = ctx.getContext().req.body;
      const currentUser = ctx.getContext().req.user;
      const now = Date.now();
      return next.handle().pipe(
        tap(
          value => {
            const message = `GraphQL - ${parentType} - ${fieldName} : ${Date.now() -
              now}ms`;
            // Log entry maximum size 256.0K
            let responseString = JSON.stringify(value);
            const byteLength = Buffer.byteLength(responseString, 'utf8');
            const maxLength = 200000; // set max to 200k
            if (byteLength > maxLength) {
              const regexMatchArray: RegExpMatchArray = responseString.match(
                new RegExp('.{1,' + maxLength + '}', 'g')
              );
              responseString = regexMatchArray[0];
            }
            this.loggerService.info({
              message,
              payload: {
                currentUser: currentUser ? currentUser : {},
                resolverName: fieldName,
                request: requestBody,
                response: responseString
              }
            });
          },
          err => {
            console.error(err);
            let errorDetail = '';
            if (err instanceof Error) {
              errorDetail = err.stack;
            } else {
              errorDetail = err.toString();
            }
            this.loggerService.error({
              errorCode: '',
              errorDetail,
              payload: {
                currentUser: currentUser ? currentUser : {},
                resolverName: fieldName,
                request: requestBody,
                response: {}
              }
            });
          }
        )
      );
    }
  }
}
