import "./App.css";

function App() {
  const StartPosting = async () => {
    const GiminiAPIKey = "AIzaSyB1kD08Y6OBFPlRBRu8InIMi8kfXOQpqAg";

    try {
      const GeneratePrompt = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GiminiAPIKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Explain how AI works" }] }],
          }),
        }
      );

      // Check if the response is successful (status code 200)
      if (GeneratePrompt.ok) {
        // Extract JSON data from the response
        const responseData = await GeneratePrompt.json();
        console.log("Response data from Gimini", responseData?.candidates[0]?.content?.parts[0]?.text);
      } else {
        // If the response is not successful, throw an error
        throw new Error("Failed to fetch data from Gimini API");
      }

      // const ResponseDataFromGimini = GeneratePrompt.candidates;
      // console.log("Response data from gimini", ResponseDataFromGimini);
    } catch (error) {
      console.log(error);
    }

    console.log("Starting Posting");

    const PageId = 100353242098913;
    const AccessToken = process.env.REACT_APP_ACCESS_TOKEN;
    console.log(AccessToken);

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
            message: "Hello World",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data, "response from API");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <button onClick={StartPosting}>Starting Posting</button>
      {/* <button onClick={"StopPosting"}>Stop Posting</button> */}
    </div>
  );
}

export default App;
