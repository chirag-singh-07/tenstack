import { promptUser } from "./promptUser.js";
import { copyTemplate } from "./actions/copyTemplate.js";
import { installDeps } from "./actions/installDeps.js";
import { writeEnvFile } from "./actions/writeEnv.js";
import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";
import path from "path";

export const startCLI = async () => {
  console.log(
    chalk.blueBright(
      figlet.textSync("TenStack App", { horizontalLayout: "full" })
    )
  );
  console.log(
    chalk.greenBright("\n🚀 Welcome to the TenStack project setup!\n")
  );

  const { projectName, template, mongoUri, language } = await promptUser();

  const spinner = ora(chalk.yellow("Setting up your project...")).start();

  try {
    // 1. Copy Template Files
    spinner.text = chalk.cyan("Copying template files...\n\n");
    await copyTemplate(template, language, projectName);
    spinner.succeed(
      chalk.greenBright(
        `\n\n✅ Template '${template}' copied successfully!\n\n`
      )
    );

    // 2. Write Mongo URI to .env if provided
    if (mongoUri) {
      spinner.text = chalk.magenta("Writing MongoDB URI to .env...");
      const fullPath = path.resolve(process.cwd(), projectName);
      await writeEnvFile(fullPath, mongoUri);
      spinner.succeed(
        chalk.greenBright(" MongoDB URI stored successfully!\n\n")
      );
    }

    // 3. Install Dependencies
    spinner.text = chalk.blue("Installing dependencies...");
    await installDeps(projectName);
    spinner.succeed(chalk.greenBright(`Dependencies installed successfully!`));

    console.log(
      chalk.bold.green(`\n🎉 Project "${projectName}" set up successfully!\n`)
    );
    console.log(
      chalk.blueBright(`📁 Navigate into your project:`),
      chalk.yellow(`cd ${projectName}`)
    );
    console.log(
      chalk.blueBright(`🚀 Start the app:`),
      chalk.yellow(`cd server && npm run dev\n`)
    );
  } catch (error) {
    spinner.fail(chalk.redBright("❌ Something went wrong! Please try again."));
    console.error(chalk.red(error));
  }
};
