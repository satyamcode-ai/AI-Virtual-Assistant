import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = "AIzaSyCTWw2tKqTu_TY_DpjRrw1otkcvJXOhBFY"; 
const genAI = new GoogleGenerativeAI(api_key);

async function main(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const text = result.response.candidates[0].content.parts[0].text;

  console.log(text);
  return text
}

export default main;
