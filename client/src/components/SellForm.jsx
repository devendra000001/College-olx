import React, { useState } from 'react';
import { Camera, Plus, X, ChevronDown } from 'lucide-react';

export default function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  const MAX_DESC_CHARS = 450;
  const MAX_IMAGES = 5;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} photos.`);
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product Posted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-5xl border-2 border-black rounded-2xl p-6 md:p-10 shadow-sm"
      >

        {/* RESPONSIVE WRAPPER */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10">

          {/* RIGHT SIDE → DETAILS (FIRST ON MOBILE) */}
          <div className="flex flex-col gap-6 order-1">

            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full py-3 text-3xl font-bold border-b-2 focus:border-black outline-none"
            />

            <div className="flex items-center border-b-2 focus-within:border-black">
              <span className="text-2xl font-semibold mr-2">₹</span>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full py-3 text-xl outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Description</label>
              <textarea
                maxLength={MAX_DESC_CHARS}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border-2 rounded-lg min-h-[140px] resize-none focus:border-black outline-none"
              />
              <div className="text-right text-xs text-gray-400">
                {description.length} / {MAX_DESC_CHARS}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Category Tag</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-4 pr-10 border-2 rounded-lg appearance-none"
                >
                  <option value="" disabled>Select a tag</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

          </div>

          {/* LEFT SIDE → IMAGES (BELOW CATEGORY ON MOBILE) */}
          <div className="flex flex-col gap-5 order-2 md:order-1">

            <label className="relative w-full aspect-[4/3] flex items-center justify-center border-2 border-dashed rounded-xl bg-gray-50 cursor-pointer overflow-hidden">
              {images.length > 0 ? (
                <>
                  <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(0)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <Camera size={40} className="text-gray-300" />
                  <span className="text-sm text-gray-500">Add Main Photo</span>
                </>
              )}
              {images.length === 0 && (
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              )}
            </label>

            <div className="flex gap-3 flex-wrap">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 border rounded-lg overflow-hidden">
                  <img src={img} className="w-full h-full object-cover" />
                  <div
                    onClick={() => removeImage(idx + 1)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X size={20} />
                  </div>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <label className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                  <Plus size={24} />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>

          </div>

        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-black text-white py-4 rounded-lg text-lg font-semibold"
        >
          Post Product
        </button>

      </form>
    </div>
  );
}
