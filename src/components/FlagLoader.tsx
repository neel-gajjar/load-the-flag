import React, { useEffect, useState } from 'react';

const FlagLoader: React.FC = () => {
	const [flag, setFlag] = useState<string>('');
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [displayedFlag, setDisplayedFlag] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFlag = async () => {
			try {
				const response = await fetch(
					'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636861'
				);
				if (!response.ok) {
					throw new Error(`HTTP error!, status: ${response.status}`);
				}
				const data = await response.text();
				setFlag(data);
			} catch (error) {
				setError('Error fetching the flag!');
				console.error('Error fetching the flag:', error);
			}
		};

		fetchFlag();
	}, []);

	useEffect(() => {
		if (flag) {
			const interval = setInterval(() => {
				setDisplayedFlag((prev) => prev + flag.charAt(currentIndex));
				setCurrentIndex((prevIndex) => prevIndex + 1);

				if (currentIndex >= flag.length - 1) {
					clearInterval(interval);
				}
			}, 500);

			return () => clearInterval(interval);
		}
	}, [currentIndex, flag]);

	if (error) {
		return <div style={{ color: 'red' }}>{error}</div>;
	}

	if (!flag) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
			{displayedFlag}
		</div>
	);
};

export default FlagLoader;
