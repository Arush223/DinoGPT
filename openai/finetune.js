import 'dotenv/config.js'
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const fineTune = await openai.fineTuning.jobs.create({ training_file: 'file-6BmsZcVrY3USDrZkqYUP0neX', model: 'gpt-3.5-turbo' });