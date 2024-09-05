
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
    max_tokens: 1024,
    stream: true,
    temperature: 0.3,
    top_p: 1,
    response_format: { "type": "json_object" },
    messages: [
      {
        role: 'user',
        content: `i'm feeling sad today.`,
      },
      {
        role: 'system',
        content: `You are an AI that generates color palettes based on mood descriptions .\n
        {
          color#1: { "HTML_Color_Name": "", 
            "Hex": "", 
            "RGB": "",
        },
          color#2 { "HTML_Color_Name": "", 
            "Hex": "", 
            "RGB": "",
        },
          color#3: { "HTML_Color_Name": "", 
            "Hex": "", 
            "RGB": "",
        },
          color#3: { "HTML_Color_Name": "", 
            "Hex": "", 
            "RGB": "",
        },
          
      }. Each color should be described with its HTML color name, hex code, and RGB values. Output the palette as a four JSON objects in an ARRAY.\n`,
      }
    ],
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  
  // Respond with the stream
  return new StreamingTextResponse(stream);
}