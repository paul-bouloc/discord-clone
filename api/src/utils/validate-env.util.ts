import { cleanEnv, port, str } from "envalid";

const validateEnv = () =>{
  cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
  })
}

export default validateEnv;