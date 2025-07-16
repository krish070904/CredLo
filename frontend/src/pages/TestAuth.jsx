import React, { useEffect, useState } from "react";
import api from "../services/api";
const TestAuth = () => {
  const [result, setResult] = useState("Testing...");
  useEffect(() => {
    const testAuth = async () => {
      try {
        const { data } = await api.get("/user/me");
        setResult(
          `✅ Authentication Working!\nUser: ${data.name}\nEmail: ${data.email}\nCIBIL: ${data.cibilScore}`,
        );
      } catch (error) {
        setResult(
          `❌ Authentication Failed!\nError: ${error.response?.data?.message || error.message}\nStatus: ${error.response?.status}`,
        );
      }
    };
    testAuth();
  }, []);
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
      }}
    >
      <h1>Authentication Test</h1>
      <div>{result}</div>
      <br />
      <div>
        LocalStorage User:{" "}
        {localStorage.getItem("user") ? "✅ Present" : "❌ Missing"}
      </div>
    </div>
  );
};
export default TestAuth;
