import 'dotenv/config';
import { setupApp } from '../infra/http/express/config/app';

const app = setupApp();

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at PORT ${process.env.PORT}`)
);
