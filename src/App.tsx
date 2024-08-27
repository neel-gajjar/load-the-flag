import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import FlagLoader from './components/FlagLoader';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<FlagLoader />
			</div>
		</>
	);
}

export default App;
