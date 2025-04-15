import { execa } from 'execa';
import path from 'path';
import fs from 'fs-extra';

export const installDeps = async (projectName) => {
  const fullPath = path.resolve(process.cwd(), projectName);

  // Define paths to client and server
  const clientPath = path.join(fullPath, 'client');
  const serverPath = path.join(fullPath, 'server');

  try {
    // Install dependencies in the client folder (if it exists)
    if (fs.existsSync(clientPath)) {
      console.log('Installing client dependencies...');
      await execa('npm', ['install'], { cwd: clientPath });
    }

    // Install dependencies in the server folder (if it exists)
    if (fs.existsSync(serverPath)) {
      console.log('Installing server dependencies...');
      await execa('npm', ['install'], { cwd: serverPath });
    }
    
    console.log('Dependencies installed successfully!');
  } catch (error) {
    console.error('Error installing dependencies:', error);
    throw error;  // Rethrow error to be caught in startCLI
  }
};
