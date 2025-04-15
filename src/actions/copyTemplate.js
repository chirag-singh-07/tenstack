import fs from "fs-extra";
import path from "path";

export const copyTemplate = async (template, language, projectName) => {
  const langFolder = language === "TypeScript" ? "ts" : "js";
  const templatePath = path.resolve(
    "C:/Users/chirag singh/Desktop/tenstack/templates",
    template,
    langFolder
  );
  const projectPath = path.resolve(process.cwd(), projectName);
  try {
    if (!fs.existsSync(templatePath)) {
      throw new Error(
        `❌ Template '${template}' does not exist at ${templatePath}`
      );
    }

    await fs.copy(templatePath, projectPath);
    console.log(
      `✅ Template '${template}' copied successfully to '${projectName}'.`
    );
  } catch (error) {
    console.error(`❌ Error copying template: ${error.message}`);
    throw error;
  }
};
