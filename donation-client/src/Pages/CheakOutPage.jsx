
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CheckOutPage = () => {
  const [searchParams] = useSearchParams();
  const number = searchParams.get("number");
  console.log(number);


  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    fetch("http://localhost:5000/order", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((result) => {
        console.log(result);
        if (result.uri) {
            // Handle the URL here
            window.location.href = result.uri; // Redirect to the payment gateway
        }
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
};


  return (
<div className=" min-h-screen flex justify-center items-center">
<div className="bg-[#ccfbf1] p-6 w-[500px] mx-auto rounded-lg shadow-lg">
    <h2 className="text-3xl font-semibold text-[#0f766e] mb-6 text-center">Checkout Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-[#0f766e] font-medium mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#0f766e] rounded focus:outline-none focus:border-[#0c5f58]"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-[#0f766e] font-medium mb-2">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="BDT"
          required
          className="w-full px-4 py-2 border border-[#0f766e] rounded focus:outline-none focus:border-[#0c5f58]"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-[#0f766e] font-medium mb-2">Address:</label>
        <input
          type="text"
          id="address"
          placeholder="Enter Your Sort Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#0f766e] rounded focus:outline-none focus:border-[#0c5f58]"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="phone" className="block text-[#0f766e] font-medium mb-2">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#0f766e] rounded focus:outline-none focus:border-[#0c5f58]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#0f766e] text-white py-2 px-4 rounded hover:bg-[#0c5f58] transition-colors"
      >
        Submit
      </button>
    </form>
  </div>
</div>
  );
};

export default CheckOutPage;
