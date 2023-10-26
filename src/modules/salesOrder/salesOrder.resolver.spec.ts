import { Test, TestingModule } from '@nestjs/testing';
import { SalesOrderResolver } from './salesOrder.resolver';

describe('SalesOrderResolver', () => {
  let resolver: SalesOrderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesOrderResolver]
    }).compile();

    resolver = module.get<SalesOrderResolver>(SalesOrderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
