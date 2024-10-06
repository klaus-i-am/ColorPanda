import OpenAI from 'openai';
import Color from 'color';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';

function adjustColorHarmony(colors: string[]): string[] {
  const baseColor = Color(colors[0]);
  const hue = baseColor.hue();
  
  const scheme = [
    baseColor.hex(),
    baseColor.hue((hue + 30) % 360).hex(),  // Analogous
    baseColor.hue((hue - 30 + 360) % 360).hex(), // Analogous
    baseColor.hue((hue + 180) % 360).hex(), // Complementary
    baseColor.hue((hue + 150) % 360).saturate(0.1).lighten(0.1).hex() // Split-complementary
  ];
  
  return scheme;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await openai.chat.completions.create({
      // got-4 -> originally used 
      model: "gpt-4o",
      messages: [
        {
          "role": "system",
          "content": "You are a color expert skilled in creating harmonious color palettes based on emotions and themes."
        },
        {
          "role": "user",
          "content": `Generate a JSON object with five harmonious colors based on the theme: "${prompt}". 
          Consider color theory principles like analogous, complementary, or monochromatic schemes.
          Provide the main color first, followed by four complementary or harmonious colors.
          For each color, include "HTML_Color_Name", "Hex", and "RGB" values.
          Ensure the palette is visually appealing and cohesive.
          ONLY GIVE JSON as a response. Example format:
          {
            "color1": { "HTML_Color_Name": "", "Hex": "", "RGB": "" },
            "color2": { "HTML_Color_Name": "", "Hex": "", "RGB": "" },
            "color3": { "HTML_Color_Name": "", "Hex": "", "RGB": "" },
            "color4": { "HTML_Color_Name": "", "Hex": "", "RGB": "" },
            "color5": { "HTML_Color_Name": "", "Hex": "", "RGB": "" }
          }`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let message = response.choices[0]?.message?.content || '';
    message = message.replace(/```json|```/g, '').trim();

    const parsedColors = JSON.parse(message);

    // Extract hex values and adjust for harmony
    const hexColors = Object.values(parsedColors).map((color: any) => color.Hex);
    const harmonizedColors = adjustColorHarmony(hexColors);

    // Update the parsed colors with harmonized values
    Object.keys(parsedColors).forEach((key, index) => {
      const color = Color(harmonizedColors[index]);
      parsedColors[key].Hex = color.hex();
      parsedColors[key].RGB = `rgb(${color.red()}, ${color.green()}, ${color.blue()})`;
      // Note: HTML_Color_Name might not match the new color exactly
    });

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