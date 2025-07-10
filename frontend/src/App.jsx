import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test', {
      credentials: 'include', // for cookie auth (optional for now)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert(data.message);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err);
      });
  }, []);


  return (
    <div className="App">
      <h1>Testing backend connection...</h1>
    </div>
  );
}

export default App;
