import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const dynamic = 'force-dynamic';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 256,
    stream: true,
    messages: [
      {
        role: 'user',
        content:  `Given the mood "${prompt}", generate a palette of four colors. Each color should be described with its HTML color name, hex code, and RGB values. Output the palette as a JSON object with each color's details in the following format: [{ "HTML_Color_Name": "", "Hex": "", "RGB": "" }]. Only return the JSON object.NO JSON OBJECT NAME. No outside object words.
        Output:\n`,
      },
    ],
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}