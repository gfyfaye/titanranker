import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./css/bankcss.css";
import Table from "./tablejs";

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

//use states
export default function Bank() {
  const [titans, setTitans] = useState([]);
  const [hoveredTitan, setHoveredTitan] = useState(null);
  const [rankedTitans, setRankedTitans] = useState({
    A: [],
    B: [],
    C: [],
    D: []
  });

  // Fetching titans
  useEffect(() => {
    const fetchTitans = async () => {
      const { data, error } = await supabase.from("titaninfo").select("*");

      if (error) {
        console.error("❌ Supabase Connection Failed:", error);
      } else {
        console.log("✅ Supabase Connection Successful! Data:", data);
        setTitans(data);
      }
    };

    fetchTitans();
  }, []);



  const moveToRank = (titan, newRank) => {
    setRankedTitans(prevRanks => {
      // Create a new object where titan is only in the new rank

      const updatedRanks = Object.fromEntries(
        Object.entries(prevRanks).map(([rank, titans]) => [
          rank,
          rank === newRank ? [...titans.filter(t => t.id !== titan.id), titan]
          : titans.filter(t => t.id !== titan.id)
        ])
      );
  
      return updatedRanks;
    });
  };

  return (
    <div>
      <Table rankedTitans={rankedTitans}/>
      <br />
      {titans.length > 0 ? (

        // Div to hold titan cards
        <div className="titan-grid">

        {titans
          .filter((titan) =>
              !Object.values(rankedTitans).some((rankGroup) =>
              rankGroup.some((t) => t.id === titan.id)))
          .map((titan) => (
            <div
              key={titan.id}
              className="titan-card"
              onMouseEnter={() => setHoveredTitan(titan.id)}
              onMouseLeave={() => setHoveredTitan(null)}>
              <img src={titan.image}/>

              {/* Show buttons only when hovering over the Titan */}
              {hoveredTitan === titan.id && (
                <div className="button-grid">
                  <div className="button-row">
                    <button className="action-button" id="rank1" onClick={() => moveToRank(titan, "A")}>👑</button>
                    <button className="action-button" id="rank2" onClick={() => moveToRank(titan, "B")}>👍</button>
                    <button className="action-button" id="rank3" onClick={() => moveToRank(titan, "C")}>👎</button>
                    <button className="action-button" id="rank4" onClick={() => moveToRank(titan, "D")}>🚫</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}