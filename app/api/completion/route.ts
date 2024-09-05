import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use the prompt to generate a color palette
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Change to a valid chat model (e.g., gpt-3.5-turbo, gpt-4)
      messages: [
        {
          "role": "user",
          "content": `Generate a JSON object with four colors that have the "color name", "hex", "rgb" based on the emotion: "${prompt}". ONLY GIVE JSON as a response. Example JSON: 
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
              
          }`
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Extract the AI's response (strip out the ```json and ``` markers)
    let message = response.choices[0]?.message?.content || '';
    message = message.replace(/```json|```/g, '').trim();  // Remove the ```json``` blocks

    // Try to parse the JSON from the response
    const parsedColors = JSON.parse(message);

    // Return the AI's response as JSON
    return new Response(JSON.stringify({ palette: parsedColors }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in OpenAI request:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate palette' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
