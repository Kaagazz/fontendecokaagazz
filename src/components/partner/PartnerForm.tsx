import { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const TEMPLATE_USER_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_USER_ID!;
const TEMPLATE_ADMIN_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN_ID!;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;

const PartnerWithUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    phone: '',
    timeFrame: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const services = [
    'CSR',
    'Company Drive',
    'Print With Us',
    'Sustainability Collaboration',
    'Others',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const templateParams = {
      ...formData,
      time: new Date().toLocaleString(),
    };

    try {
      // Send confirmation to user
      await emailjs.send(SERVICE_ID, TEMPLATE_USER_ID, templateParams, PUBLIC_KEY);

      // Send form data to admin
      await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN_ID, templateParams, PUBLIC_KEY);

      setStatus('Form submitted successfully. Thank you!');
      setFormData({
        name: '',
        company: '',
        email: '',
        service: '',
        phone: '',
        timeFrame: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending emails:', error);
      setStatus('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#faf9f7] py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-neutral-200">
        <h2 className="text-3xl font-serif font-semibold text-neutral-900 text-center mb-8 tracking-tight">
          Partner With Us
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-neutral-700 mb-1">Service Type</label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-neutral-700 mb-1">
              Estimated Time Frame
            </label>
            <input
              type="text"
              name="timeFrame"
              value={formData.timeFrame}
              onChange={handleChange}
              placeholder="e.g. 2 weeks, 1 month"
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-neutral-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-[#fcfcfc]"
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-neutral-800 transition-all duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
            {status && <p className="mt-4 text-sm text-neutral-600">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default PartnerWithUs;
