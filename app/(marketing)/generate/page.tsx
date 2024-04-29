'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompletion, useChat } from 'ai/react';
import { Input } from "@/components/ui/input";
import { useState } from "react";

const TrialPage = () => {
    const { messages, input, data, handleInputChange, handleSubmit } = useChat();

    console.log(data);
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
                    {messages.map(m => (
                        <div key={m.id}>
                        {m.content}
                        </div>
                    ))}
                 </p>
                </CardContent>
                <CardFooter>
                <Button type="submit">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Generate  
                    </Button>
                    <Button
                        variant="outline"
                        className="ml-2 border-2 border-solid border-black hover:bg-black hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out"
                    >
                        Join  
                    </Button>
                </CardFooter>
                </form>
            </Card>
        </div>
    );
}
 
export default TrialPage;