import axios from 'axios';




/* the backend response json has these keys: 
question: the prompt from frontend
chat_history: [] basically an array to store chat history
answer: the generated answer based on the question */

async function run(prompt) {
  console.log(prompt);
    try {
      const response = await axios.post('http://localhost:8000/legal-solutions/lawchatbot/', { query: prompt });
      const answer = response.data.answer;
      return answer;
    } catch (error) {
      console.log("error in connecting backend", error);
    }
  }

export default run;