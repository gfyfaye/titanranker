import type { Route } from "./+types/home";
import Bank from "./bank";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Titans" },
    { name: "description", content: "A website where you can rank titans" },
  ];
}

export default function Home() {
  return <div> 
            <div> Rank Titan Drip 🔥 <span style={{fontSize:"0.5em"}}>JUST FOR FUN IDK BY GRACE</span></div> 
            <Bank />
         </div>;
}
