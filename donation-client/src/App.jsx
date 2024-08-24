import { useEffect, useState } from "react";

const convertToBengaliNumber = (number) => {
  if (number === undefined || number === null) return 'N/A';

  const englishDigits = '0123456789';
  const bengaliDigits = '০১২৩৪৫৬৭৮৯';

  return number.toString().split('').map(char => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? bengaliDigits[index] : char;
  }).join('');
};

function App() {
  const [fundInfo, setFundInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('কপি করা হয়েছে: ' + text);
    }).catch((err) => {
      alert('কপি করতে সমস্যা হয়েছে: ', err);
    });
  };

  useEffect(() => {
    const fetchFundInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/fund-info-user');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFundInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundInfo();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      <header className="bg-teal-800 text-white py-4 border-b-4 border-teal-900">
        <h1 className="text-2xl font-bold text-center">বন্যা দূর্গতদের জন্য ত্রাণ সংগ্রহ</h1>
      </header>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-teal-900 text-white py-4 rounded-lg mb-4 text-center">
          <p>ফেসবুক পেজ: <a href="https://www.facebook.com/abutalhazubayermunna" target="_blank" rel="noopener noreferrer" className="font-bold text-lg hover:underline">দশমাইল ছাত্র সমাজ</a></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-12">
            <div className="col-span-8 h-72 overflow-hidden relative rounded-lg">
              <img src="https://c.ndtvimg.com/2024-08/cg0epsco_bangladesh-floods_625x300_23_August_24.jpeg" alt="Flood Affected Area 1" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-4 h-72 overflow-hidden relative rounded-lg">
              <img src="https://i.ibb.co/YPKvzkP/IMG-9943.jpg" alt="Flood Affected Area 2" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-4 h-72 overflow-hidden relative rounded-lg">
              <img src="https://scontent.frjh5-1.fna.fbcdn.net/v/t39.30808-6/456683695_1069609504729591_8875126155124609571_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BKZ8jXsnfuoQ7kNvgH3zRpL&_nc_ht=scontent.frjh5-1.fna&oh=00_AYAogpVqxhByM6htGEyveIWwlMKAtX_wmqBOGuWUIMa-Kw&oe=66CEB7D5" alt="Flood Affected Area 3" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-8 h-72 overflow-hidden relative rounded-lg">
              <img src="https://scontent.frjh5-1.fna.fbcdn.net/v/t39.30808-6/456682894_3719369901649944_1414526817821081658_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=bYAmT22FPWMQ7kNvgErPU97&_nc_ht=scontent.frjh5-1.fna&oh=00_AYAUT8LrKmPsTr6If5d4jE6V2ObNYn4P0hQuM2qHTl72kw&oe=66CEC41A" alt="Flood Affected Area 4" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-teal-900 text-xl font-semibold mb-4">বন্যা দূর্গতদের জন্য ত্রাণ সংগ্রহ</h2>
            <p>তারিখ : {getTodayDate()}</p>
            <p>আজকের মোট টাকা : {fundInfo[0] ? convertToBengaliNumber(fundInfo[0].dailyAmount) : 'N/A'}</p>
            <p>মোট সংগ্রহ : {fundInfo[0] ? convertToBengaliNumber(fundInfo[0].totalAmount) : 'N/A'}</p>
            <p>আপডেটের সময় : {fundInfo[0]?.updatedAt ? formatDateTime(fundInfo[0]?.updatedAt) : 'N/A'}</p>
            <div className="bg-teal-100 p-4 rounded-lg">
              <h3 className="text-teal-800 text-lg font-semibold mb-2">অর্থ প্রদান পদ্ধতি:</h3>
              <div className="mb-2 border-b border-teal-800 pb-2 relative">
                <p>বিকাশ/নগদ : 01518-398400 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white px-2 py-1 text-sm rounded" onClick={() => copyToClipboard('01518-398400')}>কপি করুন</button></p>
                <p>এ,বি,এম, সাখাওয়াত হোসেন (শিহাব)</p>
              </div>
              <div className="mb-2 border-b border-teal-800 pb-2 relative">
                <p>বিকাশ : 01744-867083 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white px-2 py-1 text-sm rounded" onClick={() => copyToClipboard('01744-867083')}>কপি করুন</button></p>
                <p>মো: আল-মুকিত (অমিত)</p>
              </div>
              <div className="mb-2 border-b border-teal-800 pb-2 relative">
                <p>বিকাশ/নগদ : 01303-463436 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white px-2 py-1 text-sm rounded" onClick={() => copyToClipboard('01303-463436')}>কপি করুন</button></p>
                <p>আবু তালহা (মুন্না)</p>
              </div>
              <div className="relative">
                <p>বিকাশ : 01768-077142 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white px-2 py-1 text-sm rounded" onClick={() => copyToClipboard('01768-077142')}>কপি করুন</button></p>
                <p>মো: রাশেদ</p>
              </div>
            </div>
            <p>আয়োজনে: দশমাইল ছাত্র সমাজ শেরপুর, বগুড়া</p>
          </div>
        </div>
      </div>
      <footer className="text-center p-4 bg-teal-800 text-white mt-4">
        <p>&copy; ২০২৪ দশমাইল ছাত্র সমাজ। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
}

export default App;
