import { readFile } from "fs/promises";
import 'dotenv/config.js'
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import {SupabaseVectorStore} from "@langchain/community/vectorstores/supabase"

try {
  // Read text file
  const text = await readFile('supabase/info.txt','utf-8')

  const sbApiKey = process.env.SUPABASE_API_KEY
  const sbUrl = process.env.SUPABASE_URL
  const openAIApiKey = process.env.OPENAI_API_KEY

  const client = createClient(sbUrl,sbApiKey)

  // Split text
  const splitText = text.split('\n\n')

  let i = 0

  // Create document objects
  const docs = splitText.map(text => ({
    pageContent: text,
    metadata: {id: i += 1}
  }))

  // Upload documents and vector embeddings to Supabase
  await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({openAIApiKey}),
    {
      client,
      tableName: 'documents',
    }
  )

} catch (e) {
  console.error(e);
}
