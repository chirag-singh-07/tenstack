import inquirer from "inquirer";

export const promptUser = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "my-tenstack-app",
    },
    {
      type: "list",
      name: "template",
      message: "Which template would you like to use?",
      choices: ["blank", "ecomm (coming soon)", "blog (coming soon)"],
      default: "blank",
    },
    {
      type: 'list',
      name: 'language',
      message: 'Which language would you like to use?',
      choices: ['JavaScript', 'TypeScript'],
    },
    {
      type: "confirm",
      name: "hasMongoUri",
      message: "Do you have a MongoDB connection URI ready?",
      default: true,
    },
    {
      type: "input",
      name: "mongoUri",
      message: "Paste your MongoDB URI:",
      when: (answers) => answers.hasMongoUri,
      validate: (input) =>
        input.startsWith("mongodb")
          ? true
          : "Please enter a valid MongoDB URI.",
    },
    {
      type: "confirm",
      name: "showMongoGuide",
      message: "Do you want help creating a free MongoDB account?",
      when: (answers) => !answers.hasMongoUri,
      default: true,
    },
  ]);

  // 💡 If they said no and want help
  if (!answers.hasMongoUri && answers.showMongoGuide) {
    console.log("\n🌐 To create a MongoDB URI:");
    console.log(`1. Go to: https://www.mongodb.com/cloud/atlas`);
    console.log(`2. Create a free account & project.`);
    console.log(`3. Create a database and user.`);
    console.log(
      `4. Get your URI like: mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`
    );
    console.log(`5. Paste it into the server/.env file as MONGO_URI=\n`);
  }

  return answers;
};
