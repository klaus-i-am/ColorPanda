'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect, FormEvent } from "react";
import { useCompletion, useChat } from 'ai/react';

const TrialPage = () => {
    const { messages, input, handleInputChange,  handleSubmit } = useChat();
    const [obj, setObj] = useState({});
    
    console.log(`Obj State: ${JSON.stringify(obj)}`);

    useEffect(() => {
        const content = messages[1]?.content;
        if (typeof content === 'string' && isValidJson(content)) {
            console.log(`JSON: ${content}`)
            setObj(JSON.parse(content));
        }
    }, [messages, obj]);
    
    function isValidJson(json: string) {
        try {
            JSON.parse(json);
            return true;
        } catch {
            return false;
        }
    }

    console.log(obj);

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
                    {/* {obj && Object.entries(obj).map(([key, value]) => (
                        <div key={key}>
                            <p style={{color: (value as any).Hex }}>HTML Color Name: {(value as any).HTML_Color_Name}</p>
                            <p>Hex: {(value as any).Hex}</p>
                            <p style={{color: (obj as any).RGB }}>RGB: {(value as any).RGB}</p>
                        </div>
                    ))} */}
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
                {(obj && typeof obj === 'object') && (
                    <div className="w-[200px] h-[300px] rounded-lg p-6" style={{ backgroundColor: (obj as any).Hex}}>
                        <p>{(obj as any).HTML_Color_Name}</p>
                        <p>{(obj as any).Hex}</p>
                        <p>{(obj as any).RGB}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default TrialPage;