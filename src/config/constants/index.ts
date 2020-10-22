import dotenv from "dotenv"; 

dotenv.config();

export const constants = {
    port: process.env.PORT || 4000,
}