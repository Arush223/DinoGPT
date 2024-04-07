import fs from 'fs';
import 'dotenv/config.js'
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

await openai.files.create({ file: fs.createReadStream('./openai/data.jsonl'), purpose: 'fine-tune' });