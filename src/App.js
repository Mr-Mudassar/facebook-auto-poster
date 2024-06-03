import { useEffect } from "react";
import "./App.css";

function App() {
  const famousPersonalitiesWithQuotes = [
    "Albert Einstein",
    "Mahatma Gandhi",
    "Martin Luther King Jr.",
    "Nelson Mandela",
    "Winston Churchill",
    "Marie Curie",
    "Isaac Newton",
    "Leonardo da Vinci",
    "Abraham Lincoln",
    "Steve Jobs",
    "Oprah Winfrey",
    "Mark Twain",
    "William Shakespeare",
    "Mother Teresa",
    "Helen Keller",
    "Thomas Edison",
    "Rosa Parks",
    "Malala Yousafzai",
    "Elon Musk",
    "Imam Ali (AS)",
    "Dr Zakir Naik",
    "Rumi",
    "Ibn Sina (Avicenna)",
    "Al-Khwarizmi",
    "Ibn Battuta",
    "Jalaluddin Rumi",
    "Ibn Rushd (Averroes)",
    "Al-Farabi",
    "Saladin",
    "Muhammad Iqbal",
    "Suleiman the Magnificent",
    "Nur Jahan",
    "Malcolm X",
    "Muhammad Ali",
    "Yusuf Islam (Cat Stevens)",
    "Mufti Menk",
    "Tariq Ramadan",
  ];

  const StartPosting = async () => {
    console.log("Posting started")
    const GiminiAPIKey = process.env.REACT_APP_GIMINI_API_KEY;
    var ResponseFromAPI;
    const randomPersonality =
      famousPersonalitiesWithQuotes[
        Math.floor(Math.random() * famousPersonalitiesWithQuotes.length)
      ];
    // console.log(Math.floor(Math.random() * famousPersonalitiesWithQuotes.length))
    // console.log(randomPersonality, "random personality")

    try {
      const GeneratePrompt = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GiminiAPIKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a very short quote from personality ${randomPersonality}. The quote should be fully optimized, unique, human-readable, and in English only, including emojis and hashtags at the start of the quote. The author's name should be at the end of the quote. The text should not include any HTML tags.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      // Check if the response is successful (status code 200)
      if (GeneratePrompt.ok) {
        // Extract JSON data from the response
        const responseData = await GeneratePrompt.json();
        ResponseFromAPI = responseData?.candidates[0]?.content?.parts[0]?.text;
        console.log("Response data from Gimini", ResponseFromAPI);
      } else {
        // If the response is not successful, throw an error
        throw new Error("Failed to fetch data from Gimini API");
      }
    } catch (error) {
      console.log(error);
    }

    const PageId = 348070485049627;
    const AccessToken = process.env.REACT_APP_ACCESS_TOKEN;

    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/${PageId}/feed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AccessToken,
          },
          body: JSON.stringify({
            message: ResponseFromAPI,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    StartPosting();
    const StartLoop = setInterval(StartPosting, 3 * 60 * 60 * 1000);
    return () => clearInterval(StartLoop);
  }, []);

  return (
    <div>
      <p>Started Posting, To terminate the loop close the broswer tab</p>
    </div>
  );
}

export default App;
