import Image from "next/image";
import Home from "../components/screens/Home/Home";

export default function PageHome() {
  return (
    <main className="flex w-full h-[100dvh] flex-col items-center justify-center">
      <Home />
    </main>
  );
}
