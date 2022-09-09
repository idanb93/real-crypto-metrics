import express, { Express } from "express";
import dotenv from "dotenv";
import { resolve } from "path";
import { connectPostgreSqlDB } from "./services/sqlConnector";

dotenv.config({ path: resolve(__dirname, "../.env") });

const PORT: number = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 3000;
const app: Express = express();

// if (!process.env.POSTGRESQL_URL) {
//   console.error(
//     '[error]: The "POSTGRESQL_URL" environment variable is required'
//   );
//   process.exit(1);
// }

// async function connectPostgreSql() {
//   const { POSTGRESQL_URL = null } = process.env;

//   if (!POSTGRESQL_URL) {
//     console.error(
//       '[error]: The "POSTGRESQL_URL" environment variable is required'
//     );
//     process.exit(1);
//   }
//   await connectPostgreSqlDB();
// }

// (async () => {
//   app.use(helmet());
//   app.use(cors());
//   app.use(bodyParser.json({ limit: "5mb" }));
//   app.use(bodyParser.urlencoded({ extended: true }));

//   configureRoutes(app);

//   await connectPostgreSql();
//   await connectBankDB();
//   app.listen(PORT, () => console.log(`Running on ${PORT}`));
// })();

app.listen(PORT, () => console.log(`Running on ${PORT}`));
