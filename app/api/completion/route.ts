import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const dynamic = 'force-dynamic';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    max_tokens: 256,
    stream: true,
    prompt: `give a color palette in the form of an javacript object array in based on the following \n\n${prompt}\n
    const palette = [{HTML color name: san juan, hex: #30475e, rgb(48,71,94)},{HTML color name: san juan, hex: #30475e, rgb(48,71,94)}]\n
    ONLY GIVE THE JAVASCRIPT OBJECT ARRAY\n
    `
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}