import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Task } from '../tasks.ts';


const HOME_DIR = os.homedir();
const PTA_DIR = path.join(HOME_DIR, '.pta');
const DB_PATH = path.join(PTA_DIR, 'tasks.json');

// Ensure ~/.pta exists, if not, create it
function ensureDirectory() {
  if (!fs.existsSync(PTA_DIR)) {
    fs.mkdirSync(PTA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '[]', 'utf-8');
  }
}


function readDB(): Task[] {
  ensureDirectory();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(tasks: Task[]): void {
  ensureDirectory();
  fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export {
  readDB,
  writeDB,
  generateId,
}
