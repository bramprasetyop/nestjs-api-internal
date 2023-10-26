import {
  createParamDecorator,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql/dist/services/gql-execution-context';
import { AuthGuard } from '@nestjs/passport';
import { ICurrentUserArgs } from './repositories/currentUser.interface';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Promise<ICurrentUserArgs> => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);
