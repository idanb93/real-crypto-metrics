import express, { Express } from "express";
import dotenv from "dotenv";
import { resolve } from "path";
// import { connectPostgreSqlDB } from "./services/sqlConnector";

dotenv.config({ path: resolve(__dirname, "../.env") });

const isValidPort = () => {
    const portAsNumber = Number(process.env.PORT);
    return !isNaN(portAsNumber) && portAsNumber >= 0 && portAsNumber < 65536;
}

const port: number = isValidPort() ? Number(process.env.PORT) : 3000;
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
//   app.listen(port, () => console.log(`Running on ${port}`));
// })();

app.listen(port, () => console.log(`Running on ${port}`));
