export async function validator(schema: any, input: any) {
  try {
    const parsed = await schema.validate(input, { abortEarly: false });
    return parsed;
  } catch (err) {
    return err.errors.join(', ');
  }
}
