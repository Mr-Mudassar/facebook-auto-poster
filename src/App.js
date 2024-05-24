import "./App.css";

function App() {
  const StartPosting = async () => {
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
