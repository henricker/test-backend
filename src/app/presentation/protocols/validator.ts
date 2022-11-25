export interface IValidator {
  validate(input: any): Promise<string[] | undefined> | string[] | undefined;
}
