import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";

const MarketingPage = () => {
  return (
    <div className="h-screen flex flex-col dark:bg-[#1F1F1F] bg-[url('/bg.png')] bg-cover bg-no-repeat bg-fixed">
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <Heading />
      </div>
    </div>
  );
}

export default MarketingPage;

