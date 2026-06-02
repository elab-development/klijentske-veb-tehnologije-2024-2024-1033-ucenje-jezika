import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function App() {
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios.post('/api/create-tokens', {code})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error.message))
  }

  const responseError = (error) => {
    console.log(error);
  }

  return (
    <div className="App">
      <h1>Google Calendar API</h1>
      <div>
        <GoogleLogin 
          clientId='576057248891-ugeot81nvpo1qbr02m5qega0i99ob6t4.apps.googleusercontent.com'
          buttonText='Sign in to Google'
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={'single_host_origin'}
          responseType='code'
          accessType='offline'
          scope='openid email profile https://www.googleapis.com/auth/calendar'
        />
      </div>
    </div>
  );
}

export default App;
