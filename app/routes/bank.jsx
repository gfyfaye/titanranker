import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./css/bankcss.css";

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Bank() {
  const [titans, setTitans] = useState([]);

  useEffect(() => {
    const fetchTitans = async () => {
      const {data, error } = await supabase
        .from("titaninfo")
        .select("*");
      if (data) {
        console.log("Data exists: ", data);
      }

      if (error) {
        console.error("❌ Supabase Connection Failed:", error);
      } else {
        console.log("✅ Supabase Connection Successful! Data:", data);
        setTitans(data);
      }
    };

    fetchTitans();
  }, []);

  return (
    <div>
    <br></br>
      {titans.length > 0 ? (
        <div className="titan-grid" draggable >
          {titans.map((titan) => (
            <div key={titan.id} className="titan-card">
              <img src={titan.image} alt={titan.name}/>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
