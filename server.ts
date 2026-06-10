import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory databases for rich real-time interactions
const appointments: any[] = [
  {
    id: "b-1",
    clientName: "Jane Doe (Sample Patient)",
    phone: "(713) 555-0199",
    email: "janedoe@example.com",
    service: "Skilled Nursing",
    preferredDate: "2026-06-15",
    preferredTime: "10:00 AM",
    message: "Requires post-hospital surgical wound care evaluation.",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  },
  {
    id: "b-2",
    clientName: "Robert Smith (Sample Patient)",
    phone: "(832) 555-7821",
    email: "robert.smith@example.com",
    service: "Dementia & Alzheimer's Care",
    preferredDate: "2026-06-18",
    preferredTime: "02:00 PM",
    message: "Companion support and cognitive engagement for my grandfather.",
    status: "Pending Specialist Matching",
    createdAt: new Date().toISOString()
  }
];

const jobApplications: any[] = [];

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    console.log("Successfully initialized GoogleGenAI client.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. AI chat assistant will run in compassionate local-simulation fallback mode.");
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: aiClient ? "AI Mode" : "Simulation Mode" });
});

// 2. Compassionate Live AI Care Assistant Chat
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemInstruction = `You are "Joy", the compassionate Lead Care Coordinator & Interactive Assistant for Ambiance Joy Nursing Services located at 4020 Saint Peter Lane, Houston, TX 77045 (Phone: (832) 814-7008). 
Your goal is to answer client, patient, or caregiver questions professionally, reassuringly, and warmly. You should highlight our commitment to compassion, dignity, safety, and personalized home healthcare.

Key facts:
- Services we offer: Skilled Nursing, Personal Care Assistance, Companion Care, Dementia & Alzheimer's Care, Respite Care, Recovery Care, and Medication Management.
- Service Area: Houston, Texas and surrounding communities.
- Highlight features: Licensed & Insured, Experienced registered nurses (RNs) and caregivers, Free clinical care consultation, Customized match for caregivers.
- Contact Details: Phone: (832) 814-7008, Address: 4020 Saint Peter Lane, Houston, TX 77045.
- Keep answers professional, empathetic, readable, and structured. Encourage them to book a free consultation using our booking tool on the page! You are an ambassador of comfort and peace of mind. Give advice with professional medical humility, clarifying you are here to guide services coordination.`;

  if (aiClient) {
    try {
      // Structure contents with past history
      const formattedHistory = Array.isArray(history) 
        ? history.map((h: any) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          }))
        : [];

      formattedHistory.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I am here to guide you. Ambiance Joy is dedicated to your peace of mind. How else can we support your family today?";
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API call error:", err);
      // Fallback response with helpful details instead of crude failure
      const fallbackReply = generateFallbackResponse(message);
      return res.json({ reply: fallbackReply + " (Note: Using local backup care assistance due to momentary server lookup)." });
    }
  } else {
    // Elegant system coordinator simulation
    const reply = generateFallbackResponse(message);
    return res.json({ reply: reply });
  }
});

// 3. Appointment Consultation Booking
app.post("/api/book", (req, res) => {
  const { clientName, phone, email, service, preferredDate, preferredTime, message } = req.body;
  if (!clientName || !phone || !service || !preferredDate) {
    return res.status(400).json({ error: "Missing required booking details (Name, Phone, Service, and Date are needed)." });
  }

  const newAppointment = {
    id: `b-${appointments.length + 1}-${Math.floor(Math.random() * 1000)}`,
    clientName,
    phone,
    email: email || "N/A",
    service,
    preferredDate,
    preferredTime: preferredTime || "Anytime",
    message: message || "No additional notes provided.",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  appointments.unshift(newAppointment);

  res.json({
    success: true,
    message: "Your care consultation has been scheduled! A registered nurse will call you to confirm your care plan details.",
    appointment: newAppointment
  });
});

// 4. Get active bookings (to show visual updates)
app.get("/api/bookings", (req, res) => {
  res.json(appointments);
});

// 5. Careers Recruiting Application
app.post("/api/careers", (req, res) => {
  const { fullName, email, phone, position, experienceYears, resumeText, message } = req.body;
  if (!fullName || !email || !phone || !position) {
    return res.status(400).json({ error: "Missing required fields (Full Name, Email, Phone, and Position are needed)." });
  }

  const newApplication = {
    id: `app-${jobApplications.length + 1}-${Math.floor(Math.random() * 1000)}`,
    fullName,
    email,
    phone,
    position,
    experienceYears: experienceYears || "None noted",
    resumeText: resumeText || "",
    message: message || "",
    appliedAt: new Date().toISOString()
  };

  jobApplications.unshift(newApplication);

  res.json({
    success: true,
    message: "Thank you for applying to join the Ambiance Joy family! Our recruiting team will review your application and contact you shortly.",
    application: newApplication
  });
});

app.get("/api/careers", (req, res) => {
  res.json(jobApplications);
});

// Fallback helper of compassionate simulation text
function generateFallbackResponse(userPrompt: string): string {
  const p = userPrompt.toLowerCase();
  
  if (p.includes("cost") || p.includes("price") || p.includes("insurance") || p.includes("pay")) {
    return `At Ambiance Joy Nursing Services, we work closely with families to establish care plans that fit their budget and coverage. We accept private pay, long-term care insurance, and various other private plans. Please schedule an initial clinical consultation right on this screen so we can assess your loved one's structured needs and provide an accurate cost estimation. You can also reach us directly at (832) 814-7008!`;
  }
  
  if (p.includes("location") || p.includes("houston") || p.includes("address") || p.includes("where")) {
    return `Our office is proudly located at 4020 Saint Peter Lane, Houston, TX 77045. We serve families across the entire Houston metropolitan region with premium, high-quality, in-home caregiving and clinical nursing support.`;
  }

  if (p.includes("nurse") || p.includes("skilled") || p.includes("clinical") || p.includes("wound") || p.includes("medication")) {
    return `Our Skilled Nursing division provides expert clinical oversight, including complex wound care, medication management, post-hospital transition recovery, and vitals tracking. Each of our healthcare plans is crafted and supervised by Registered Nurses (RNs) to guarantee maximum safety and excellence in clinical care. Let us support your loved one safely at home today.`;
  }

  if (p.includes("dementia") || p.includes("alzheimer") || p.includes("memory") || p.includes("confusion")) {
    return `We specialize in loving, professional Dementia & Alzheimer's Care. Our caregivers undergo specific training to handle memory loss with utmost patience, calming routines, cognitive engagement exercises, and safety protocols to prevent wandering. We protect their dignity while giving peace of mind to the family.`;
  }

  return `Thank you for reaching out to Ambiance Joy Nursing Services! 🌸 

We provide exceptional home healthcare services in Houston, TX tailored to your family's needs—including Skilled Nursing, Companion Care, Personal Care, and Dementia support. 

I strongly recommend using our "Schedule Free Consultation" or "Caregiver Match Tool" on this page, or calling us directly at (832) 814-7008. How can I help you support your loved one's independence today?`;
}

// 6. Vite Integration / Fallback Page Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring Vite in middlewareMode for development.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production assets from /dist.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Server booted successfully and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
