import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
// import TimerComponent from './practice/TimerComponent'

function App() {
  const xyz = {createdAt: new Date(), duration: new Date("2023-01-15T23:59:00")}
  return (
    <div className="App">
        <WelcomePage/>
    </div>
  );
}

export default App;
