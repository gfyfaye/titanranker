import type { Route } from "./+types/home";
import Table from "./table";
import Bank from "./bank";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Titans" },
    { name: "description", content: "A website where you can rank titans" },
  ];
}

export default function Home() {
  return <div> 
            <div> Rank Some Titans 🔥</div> 
            <Table />
            <Bank />
         </div>;
}
