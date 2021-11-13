import './App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Input from './components/Input';
import CardListing from './components/CardListing';

function App() {
  return (
    <div className="App">
      <h1>welcome to Count-Cuckoo</h1>
      <CardListing />
    </div>
  );
}

export default App;
