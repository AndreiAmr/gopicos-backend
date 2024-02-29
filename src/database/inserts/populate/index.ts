import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const sql: string = fs.readFileSync(path.join(__dirname, 'data.sql'), 'utf8');
  const commands: string[] = sql.split(';').filter(Boolean);

  for (const command of commands) {
    try {
      await prisma.$executeRawUnsafe(command);
    } catch (err) {
      console.log({ err });
    }
  }
}

main()
  .then(() => console.log('Populate finished'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
