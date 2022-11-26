export interface IValidator {
  validate(input: any): Promise<string | {}> | string | {};
}
