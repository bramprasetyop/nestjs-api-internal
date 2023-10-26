export interface IUseCase {
  execute(dto: any): Promise<any>;
}
