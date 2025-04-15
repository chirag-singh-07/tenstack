import fs from "fs";
import path from "path";

export const writeEnvFile = async (projectPath, mongoUri) => {
  // Ensure `.env` is created inside the `server` folder
  const envFilePath = path.join(projectPath, "server", ".env");

  // Default environment variables
  const envVariables = [
    `PORT=5000`,
    `JWT_SECRET="ggg#g4gj97394=24@J24oi24-"`,
    `MONGO_URI=${mongoUri}`,
    `CLIENT_URL=http://localhost:5173`,
  ];

  try {
    // Ensure the 'server' folder exists
    fs.mkdirSync(path.dirname(envFilePath), { recursive: true });

    // Read existing .env content if the file exists
    let envContent = "";
    if (fs.existsSync(envFilePath)) {
      envContent = fs.readFileSync(envFilePath, "utf-8");
    }

    // Append missing environment variables
    envVariables.forEach((line) => {
      const key = line.split("=")[0];
      if (!envContent.includes(key)) {
        envContent += `\n${line}`;
      }
    });

    // Write updated content to .env
    fs.writeFileSync(envFilePath, envContent.trim() + "\n");

    console.log(`✅ .env file successfully created at: ${envFilePath}`);
  } catch (error) {
    console.error(`❌ Error writing .env file: ${error.message}`);
    throw error;
  }
};
