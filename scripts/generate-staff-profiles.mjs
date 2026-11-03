import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [source] = process.argv.slice(2);
if (!source) throw new Error('Usage: node scripts/generate-staff-profiles.mjs <roles.json>');

const raw = JSON.parse(await readFile(source, 'utf8'));
if (!Array.isArray(raw)) throw new Error('roles.json must contain an array.');

const profiles = raw.map((role) => ({
  id: String(role.id || ''),
  name: String(role.name || ''),
  kind: String(role.kind || ''),
  description: String(role.description || ''),
  model: String(role.model || ''),
  instructions: String(role.instructions || ''),
})).filter((profile) => profile.id && profile.name);

const directory = path.dirname(fileURLToPath(import.meta.url));
const destination = path.resolve(directory, '..', 'staff-profiles.js');
await writeFile(destination, `/* Generated from an approved roles.json export. */\nwindow.staffProfiles = ${JSON.stringify(profiles, null, 2)};\n`, 'utf8');
console.log(`Wrote ${profiles.length} public staff profiles to ${destination}`);
