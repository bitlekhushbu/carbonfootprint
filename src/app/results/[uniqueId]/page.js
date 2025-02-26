"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ResourceSizeChart from "@/components/ResourceSizeChart";
import ResourceCountChart from "@/components/ResourceCountChart";

import "@/styles/HeroSection.css";

const ResultsPage = () => {
  const { uniqueId } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem(`report-${uniqueId}`);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setResults(parsedData);
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }, [uniqueId]);

  if (!results) return <p>⚠️ No report found for this ID. Please generate a new report.</p>;

  return (
    <div className="results-page">
      <div className="results-container">
        <h1>Analysis Report</h1>
        <p><strong>Device:</strong> {results.device || "Unknown"}</p>
        <p><strong>Page Weight:</strong> {results.MB || "N/A"} MB</p>
        <p><strong>CO₂ Emissions per Visit:</strong> {results.grams || "N/A"} g</p>

        {/* ✅ Show Resource Charts If Data Exists */}
        {results.resourceSizeData && results.resourceCountData ? (
          <div className="charts-container">
            <ResourceSizeChart data={results.resourceSizeData} />
            <ResourceCountChart data={results.resourceCountData} />
          </div>
        ) : (
          <p>📊 No resource data available.</p>
        )}

       
      </div>
    </div>
  );
};

export default ResultsPage;
