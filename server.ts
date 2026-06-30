import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { buildCrisisPrompt } from "./src/lib/crisisPrompt";
import { parseCrisisOutput } from "./src/lib/parseOutput";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  
  // 1. Limit incoming JSON payloads to 15kb to protect against payload-size attacks
  app.use(express.json({ limit: "15kb" }));

  // 2. Add secure, production-ready security headers
  app.use((req, res, next) => {
    // Prevent MIME-type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");
    // Cross-site scripting protection for older browsers
    res.setHeader("X-XSS-Protection", "1; mode=block");
    // Protect referrer leakage
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    // Ensure transport layer security (HTTPS) in production
    if (process.env.NODE_ENV === "production") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }
    // Prevent Google FLoC tracking
    res.setHeader("Permissions-Policy", "interest-cohort=()");
    next();
  });

  // 3. Simple, highly robust in-memory API rate limiter to protect the Gemini API quota
  const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
  const rateLimiter = (limit: number, windowMs: number) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Behind Cloud Run / proxies, get the real client IP address
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";
      const now = Date.now();
      
      let record = rateLimitStore.get(ip);
      if (!record || now > record.resetTime) {
        record = { count: 0, resetTime: now + windowMs };
      }
      
      record.count++;
      rateLimitStore.set(ip, record);
      
      // Send standard rate limit headers
      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Remaining", Math.max(0, limit - record.count));
      res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));
      
      if (record.count > limit) {
        res.status(429).json({
          error: "Too many requests. Please slow down and try again in a minute.",
        });
        return;
      }
      next();
    };
  };

  // Initialize GoogleGenAI SDK safely
  let getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your environment variables or Secrets panel in AI Studio.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API endpoint for crisis analysis with rate limiting (max 10 requests per minute)
  app.post("/api/analyze", rateLimiter(10, 60000), async (req, res) => {
    try {
      const { userInput } = req.body;
      if (!userInput || typeof userInput !== "string" || userInput.trim() === "") {
        res.status(400).json({ error: " userInput is required and must be a non-empty string" });
        return;
      }

      // Safeguard: Limit the input size to prevent massive text blocks
      if (userInput.length > 4000) {
        res.status(400).json({ error: "The description exceeds the maximum secure length of 4000 characters." });
        return;
      }

      console.log(`Analyzing crisis text: "${userInput.substring(0, 50)}..."`);
      
      const startTime = Date.now();
      const ai = getAiClient();
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: buildCrisisPrompt(userInput),
        config: {
          responseMimeType: "application/json",
          temperature: 0.2, // low temperature for precise JSON obedience
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini model.");
      }

      const parsedJSON = parseCrisisOutput(responseText);

      // artificial minimum delay of 400ms to allow scanning animation to be appreciated
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 600) {
        await new Promise((resolve) => setTimeout(resolve, 600 - elapsedTime));
      }

      res.json(parsedJSON);
    } catch (error: any) {
      console.error("Crisis analysis API error:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred during crisis analysis.",
      });
    }
  });

  // Serve Vite in dev / Static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Crisis OS server booting up...`);
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Crisis OS server:", err);
});
