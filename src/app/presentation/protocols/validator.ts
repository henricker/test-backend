export interface IValidator {
  validate(input: any): Promise<string[] | void> | string[] | void;
}
