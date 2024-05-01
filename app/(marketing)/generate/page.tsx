'use client'

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect, FormEvent } from "react";
import { useCompletion, useChat } from 'ai/react';

const TrialPage = () => {
    interface Color {
        HTML_Color_Name: string;
        Hex: string;
        RGB: string;
    }

    
    const { messages, input, handleInputChange,  handleSubmit } = useChat();
    const [obj, setObj] = useState<Color[]>([]);
    
    console.log(`Obj State: ${JSON.stringify(obj)}`);
    console.log(`MESSAGES: ${messages[1]?.content}`);
    useEffect(() => {
        const validJsonMessages = messages.filter(message => typeof message.content === 'string' && isValidJson(message.content));
        const parsedMessages = validJsonMessages.map(message => {
            const messageObj = JSON.parse(message.content);
            return messageObj.colors.map((colorObj: any) => Object.values(colorObj)[0] as Color);
        });
        setObj(parsedMessages.flat());
    }, [messages]);
    
    function isValidJson(json: string) {
        try {
            JSON.parse(json);
            return true;
        } catch {
            return false;
        }
    }

    return ( 
        <div className="h-full flex flex-col items-center">
            <Card className="min-w-[400px]">
                    <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Generate Palette</CardTitle>
                </CardHeader>
                <CardContent className="text-wrap">
                    <Input
                        className="w-full max-w-md p-2 mb-8"
                        value={input}
                        placeholder="Write a mood..."
                        onChange={handleInputChange}
                    />
                    <p className="w-full text-md font-normal mt-3 text-wrap">
                        {messages.map((message, index) => {
                            return (
                                <span key={index}>{message.content}</span>
                            );
                        })}
                    </p>
                </CardContent>
                <CardFooter>
                    <Button 
                        type="submit"
                    >
                        Generate  
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="ml-2 border-2 border-solid border-black hover:bg-black hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out"
                    >
                        Join  
                    </Button>
                </CardFooter>
                </form>
            </Card>
            <div className="w-[80%] border border-solid border-red-500 flex justify-start">
            {obj.map((color, index) => (
                <div key={index} className="w-[200px] h-[300px] rounded-lg p-6" style={{ backgroundColor: color.Hex}}>
                    <p>{color.HTML_Color_Name}</p>
                    <p>{color.Hex}</p>
                    <p>{color.RGB}</p>
                </div>
            ))}
                {/* {(obj && typeof obj === 'object') && (
                    <div className="w-[200px] h-[300px] rounded-lg p-6" style={{ backgroundColor: (obj as any).Hex}}>
                        <p>{(obj as any).HTML_Color_Name}</p>
                        <p>{(obj as any).Hex}</p>
                        <p>{(obj as any).RGB}</p>
                    </div>
                )} */}
            </div>
        </div>
    );
}
 
export default TrialPage;