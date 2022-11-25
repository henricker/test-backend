import 'dotenv/config';
import { setupApp } from '../infra/express/config/app';

const app = setupApp();

app.listen(process.env.PORT, () =>
  console.log(`Server running at PORT ${process.env.PORT}`)
);
