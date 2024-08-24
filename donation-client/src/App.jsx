

function App() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert('কপি করা হয়েছে: ' + text);
    }).catch((err) => {
        alert('কপি করতে সমস্যা হয়েছে: ', err);
    });
};

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
            <header className="bg-teal-700 text-white py-6 text-center border-b-4 border-teal-900">
                <h1 className="text-2xl font-bold">বন্যা দূর্গতদের জন্য ত্রাণ সংগ্রহ</h1>
            </header>
            <div className=" max-w-[1320px] mx-auto px-4 py-6">
                <div className="bg-teal-900 text-white p-4 rounded-md text-center mb-6">
                    <p>ফেসবুক পেজ: <a href="https://www.facebook.com/abutalhazubayermunna" target="_blank" rel="noopener noreferrer" className="font-bold underline">দশমাইল ছাত্র সমাজ</a></p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-12 grid-rows-2 max-h-[700px] gap-4 mb-6">
                        <div className="col-span-8  overflow-hidden rounded-lg">
                            <img src="https://c.ndtvimg.com/2024-08/cg0epsco_bangladesh-floods_625x300_23_August_24.jpeg" alt="Flood Affected Area 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="col-span-4 overflow-hidden rounded-lg">
                            <img src="https://i.ibb.co/YPKvzkP/IMG-9943.jpg" alt="Flood Affected Area 2" className="w-full h-full object-cover" />
                        </div>
                        <div className="col-span-4 overflow-hidden rounded-lg">
                            <img src="https://scontent.frjh5-1.fna.fbcdn.net/v/t39.30808-6/456683695_1069609504729591_8875126155124609571_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BKZ8jXsnfuoQ7kNvgH3zRpL&_nc_ht=scontent.frjh5-1.fna&oh=00_AYAogpVqxhByM6htGEyveIWwlMKAtX_wmqBOGuWUIMa-Kw&oe=66CEB7D5" alt="Flood Affected Area 3" className="w-full h-full object-cover" />
                        </div>
                        <div className="col-span-8 overflow-hidden rounded-lg">
                            <img src="https://scontent.frjh5-1.fna.fbcdn.net/v/t39.30808-6/456682894_3719369901649944_1414526817821081658_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=bYAmT22FPWMQ7kNvgErPU97&_nc_ht=scontent.frjh5-1.fna&oh=00_AYAUT8LrKmPsTr6If5d4jE6V2ObNYn4P0hQuM2qHTl72kw&oe=66CEC41A" alt="Flood Affected Area 4" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-teal-900 text-xl font-bold mb-4">বন্যা দূর্গতদের জন্য ত্রাণ সংগ্রহ</h2>
                        <p>তারিখ : ২৩-০৮-২৪</p>
                        <p>টাকা : ৩৩,৫৭২ /-</p>
                        <p>মোট সংগ্রহ : ৫০,০০০ টাকা</p>
                        <p>আপডেটের সময় : ২৪-০৮-২৪ ১৬:০০</p>
                    </div>
                    <div className="bg-teal-100 p-4 rounded-lg mb-6">
                        <h3 className="text-teal-700 font-bold text-lg mb-4">অর্থ প্রদান পদ্ধতি:</h3>
                        <div className="mb-4 relative border-b border-teal-700 pb-4">
                            <p>বিকাশ/নগদ : 01518-398400 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white rounded px-2 py-1 text-sm" onClick={() => copyToClipboard('01518-398400')}>কপি করুন</button></p>
                            <p>এ,বি,এম, সাখাওয়াত হোসেন (শিহাব)</p>
                        </div>
                        <div className="mb-4 relative border-b border-teal-700 pb-4">
                            <p>বিকাশ : 01744-867083 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white rounded px-2 py-1 text-sm" onClick={() => copyToClipboard('01744-867083')}>কপি করুন</button></p>
                            <p>মো: আল-মুকিত (অমিত)</p>
                        </div>
                        <div className="mb-4 relative border-b border-teal-700 pb-4">
                            <p>বিকাশ/নগদ : 01303-463436 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white rounded px-2 py-1 text-sm" onClick={() => copyToClipboard('01303-463436')}>কপি করুন</button></p>
                            <p>আবু তালহা (মুন্না)</p>
                        </div>
                        <div className="relative pb-4">
                            <p>বিকাশ : 01768-077142 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-900 text-white rounded px-2 py-1 text-sm" onClick={() => copyToClipboard('01768-077142')}>কপি করুন</button></p>
                            <p>মো: রাশেদ</p>
                        </div>
                    </div>
                    <p>আয়োজনে: দশমাইল ছাত্র সমাজ শেরপুর, বগুড়া</p>
                </div>
            </div>
            <footer className="text-center py-4 bg-teal-700 text-white mt-6 border-t-4 border-teal-900">
                <p>&copy; ২০২৪ দশমাইল ছাত্র সমাজ শেরপুর, বগুড়া</p>
            </footer>
        </div>
  )
}

export default App
