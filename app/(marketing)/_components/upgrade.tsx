import Image from "next/image";
import { Nunito, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

const nunito = Nunito({ 
    weight: ['800'],
    subsets: ['latin'],
});

// Stripe Plans >> fill in your own priceId & link
export const plans = [
    {
        link: process.env.NODE_ENV === 'development' 
            ? 'https://buy.stripe.com/test_dR6eVvfca0wU5riaEE' 
            : '',
        priceId: process.env.NODE_ENV === 'development' 
            ? 'buy_btn_1Q6aBgDSV23XHbjH32Z9PhKC' 
            : '',
        price: 5,
        duration: '/lifetime'
    }
];


export const Upgrade = () => {
    const { data: session } = useSession();
    const [plan, setPlan] = useState(plans[0]);

    return (
        <div className="hidden md:flex flex-col justify-start gap-x-2">
            <h2 className={`${nunito.className} font-normal text-slate-700`}>
                Current Plan: <span className={cn`text-slate-500 ${nunito.className} font-normal tracking-wide `}>Free
                    <br/>
                    <span className="text-sm">
                        (2/5 generations remaining)
                    </span>
                </span>
            </h2>
            <Link 
                target='_blank'
                href={
                        plan.link +
                        '?prefilled_email=' +
                        session?.user?.email
                    }
                className="text-sm text-blue-500 underline mt-1"
            >
                    Upgrade
            </Link>
        </div>
    );
}    