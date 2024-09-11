import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";

const MarketingPage = () => {
  return (
    <div className="h-screen min-h-full flex flex-col dark:bg-[#1F1F1F] bg-[url('/bg.png')] bg-cover bg-no-repeat bg-bottom">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6">
        <Heading />
      </div>
    </div>
  );
}

export default MarketingPage;

