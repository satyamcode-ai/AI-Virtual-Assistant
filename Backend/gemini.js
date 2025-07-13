import axios from "axios";

export const geminiResponse = async (command,assistantName,userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.
Your task is to understand the user's natural language input and respond with a JSON
object like this:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
          "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
          "instagram_open" | "facebook_open" | "weather-show" |"amazon_open"|"flipkart_open",
  "userinput": "<original user input (remove your assistant's name if mentioned); if it's a search command, only the search text>",
  "response": "<a short spoken response to read out loud to the user>"
}

// Instructions:
- "type": determine the intent of the user.
- "userinput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., 
    "Sure, playing it now", 
    "Here's what I found", 
    "Today is Tuesday", etc.

// Type meanings:
- "general": if it's a factual or informational question.
- "google_search": if user wants to search something on Google.
- "youtube_search": if user wants to search something on YouTube.
- "youtube_play": if user wants to directly play a video or song.
- "calculator_open": if user wants to open a calculator.
- "instagram_open": if user wants to open Instagram.
- "facebook_open": if user wants to open facebook.
- "weather-show": if user wants to know weather
- "get_time": if user asks for current time.
- "get_date": if user asks for today's date.
- "get_day": if user asks what day it is.
- "get_month": if user asks for the current month.

Important:
- Use "{author name}" agar koi puche tumhe kisne banaya
- Only respond with the JSON object, nothing else.

now your userInput- ${command}
`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response?.data?.candidates?.[0]?.contents?.[0]?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return null;
  }
};

