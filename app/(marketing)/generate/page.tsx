'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const TrialPage = () => {
  interface Color {
    HTML_Color_Name: string;
    Hex: string;
    RGB: string;
  }

  const [input, setInput] = useState('');
  const [palette, setPalette] = useState<Color[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make the API call to get the color palette
      const response = await fetch('/api/completion', {
        method: 'POST', // Use POST request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }), // Send the prompt as JSON
      });

      // Throw an error if the response is not ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the API response
      const data = await response.json();
      console.log('Full API Response:', data);

      // Extract color values into an array
      if (data.palette && typeof data.palette === 'object') {
        const colorsArray = Object.values(data.palette); // Extract values from the object
        console.log('Extracted palette colors:', colorsArray);
        setPalette(colorsArray);  // Set the colors array from the object values
        console.log("Prompt: ", input);
      } else {
        console.error('Invalid palette data:', data.palette);
        setError("Invalid palette data returned from API.");
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError("Failed to generate the palette.");
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <Card className="min-w-[400px] mt-[40px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Generate Palette</CardTitle>
          </CardHeader>
          <CardContent className="text-wrap">
            <Input
              className="w-full max-w-md p-2 mb-8"
              value={input}
              placeholder="Write a mood..."
              onChange={(e) => setInput(e.target.value)}
            />
            
            {error && <p className="text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit">Generate</Button>
          </CardFooter>
        </form>
      </Card>
      {/* Display random color palette until user generates a custom palette */}

      <div className="w-[80%] mt-5 py-4 border border-solid border-red-500 flex flex-col justify-center items-center">
        {/* Display loading animation here: displays until result is finished */}
            {/* User's Prompt */}
            <h2 className="text-lg font-bold my-4">{input}</h2>
        <div className="flex flex-row justify-center items-center">
            {/* Map palette color object */}
            {palette.map((color, index) => (
            <div
                key={index}
                className="w-[200px] h-[200px] rounded-md mx-5 p-6 hover:scale-105 hover:cursor-pointer"
                style={{ backgroundColor: color.Hex }}
            >
                <span className="bg-slate-50/45">
                    <p>{color.HTML_Color_Name}</p>
                    <p>{color.Hex}</p>
                    <p>{color.RGB}</p>
                </span>
            </div>
            ))}
        </div>
      </div>

      
    </div>
  );
};

export default TrialPage;
