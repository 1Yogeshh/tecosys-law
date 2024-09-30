import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
// const apikey = "AIzaSyDhhTsygyIY_o9JK_dfemu7QlgulfQmRc4";
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

// const API_KEY = "AIzaSyDhhTsygyIY_o9JK_dfemu7QlgulfQmRc4";
const apiKey = "AIzaSyDhhTsygyIY_o9JK_dfemu7QlgulfQmRc4";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


// This is where we need to connect backend websocket channel and retrieve genarated answer

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default run;
