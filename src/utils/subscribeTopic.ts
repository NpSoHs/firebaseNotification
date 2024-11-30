export const subscribeToTopic = async (token: string, topic: string) => {
    const response = await fetch('http://localhost:8000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, topic }),
    });
    const data = await response.json();
    console.log(data);
  }