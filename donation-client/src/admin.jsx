import { useState, useEffect } from 'react';

// Function to convert English numbers to Bengali numbers
const convertToBengaliNumber = (number) => {
    const englishDigits = '0123456789';
    const bengaliDigits = '০১২৩৪৫৬৭৮৯';
  
    return number.toString().split('').map(char => {
        const index = englishDigits.indexOf(char);
        return index !== -1 ? bengaliDigits[index] : char;
    }).join('');
};

const App = () => {
    const [dailyAmount, setDailyAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [latestDaily, setLatestDaily] = useState(0);
    const [lastUpdated, setLastUpdated] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');

    // Fetch latest data on component mount
    const fetchLatestData = async () => {
        try {
            const response = await fetch('http://localhost:5000/fund-info/latest');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTotalAmount(data.totalAmount);
            setLatestDaily(data.dailyAmount);
            setLastUpdated(data.updatedAt); // Update the lastUpdated state
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchLatestData();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Replace 'your-password' with your actual password
        if (password === 'secureAdmin') {
            localStorage.setItem('authenticated', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authenticated');
        setIsAuthenticated(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/fund-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dailyAmount: parseFloat(dailyAmount),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const latestData = await response.json();
            setTotalAmount(latestData.totalAmount);
            setLatestDaily(latestData.dailyAmount);
            setLastUpdated(latestData.updatedAt); // Update the lastUpdated state

            // Clear input field
            setDailyAmount('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            {!isAuthenticated ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white p-2 rounded mb-4 hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                    <h1 className="text-2xl font-bold mb-4 text-center">অ্যাডমিন প্যানেল</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="dailyAmount" className="text-lg font-medium text-gray-700">আজকের সংগ্রহ</label>
                            <input
                                type="number"
                                id="dailyAmount"
                                value={dailyAmount}
                                onChange={(e) => setDailyAmount(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
                        <h2 className="text-xl font-semibold mb-2">মোট সংগ্রগ</h2>
                        <p className="text-lg text-gray-800">{convertToBengaliNumber(totalAmount)} টাকা</p>
                        <h2 className="text-xl font-semibold mt-4 mb-2">আজকের মোট সংগ্রহ</h2>
                        <p className="text-lg text-gray-800">{convertToBengaliNumber(latestDaily)} টাকা</p>
                        <h2 className="text-xl font-semibold mt-4 mb-2">শেষ আপডেট</h2>
                        <p className="text-lg text-gray-800">{lastUpdated}</p> {/* Display last updated time */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
