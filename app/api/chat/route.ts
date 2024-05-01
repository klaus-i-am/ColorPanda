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
    temperature: 0.9,
    top_p: 1,
    response_format: { "type": "json_object" },
    messages: [
      {
        role: 'user',
        content: `i'm feeling sad today.`,
      },
      {
        role: 'system',
        content: `[
          {
            "HTML_Color_Name": "<HTML Color Name>",
            "Hex": "<Hex color code>",
            "RGB": "<RGB values>"
          },
          {
            "HTML_Color_Name": "<HTML Color Name>",
            "Hex": "<Hex color code>",
            "RGB": "<RGB values>"
          },
          {
            "HTML_Color_Name": "<HTML Color Name>",
            "Hex": "<Hex color code>",
            "RGB": "<RGB values>"
          },
          {
            "HTML_Color_Name": "<HTML Color Name>",
            "Hex": "<Hex color code>",
            "RGB": "<RGB values>"
          }
        ]`,
      },
      {
        role: 'system',
        content:  `Given the mood "${prompt}", generate four different colors. Each color should be described with its HTML color name, hex code, and RGB values. Output the palette as a ((four)) JSON objects with each color's details in the following format: 
        {
          "HTML_Color_Name": "", 
          "Hex": "", 
          "RGB": "",
        } .Only return the JSON object.NO JSON OBJECT NAME\n
        It MUST be a TOTAL of FOUR OBJECTS in ONE array.`,
      }
    ],
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  console.log(`OBJECT: ${response}`);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}