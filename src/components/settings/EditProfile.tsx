import React, { useState, useRef, useContext } from 'react';
import { MdEdit } from 'react-icons/md';
import { User } from '../../mock/types';
import { UserContext } from '../../context/context';

interface FormErrors {
  [key: string]: string;
}

const EditProfile: React.FC = () => {
  const { userInfo, updateUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState<string | null>(userInfo?.avatar ? userInfo.avatar : '/images/avatar.png');
  const [formData, setFormData] = useState<User>(userInfo);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    // Address validation
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent Address is required';
    }

    // Postal Code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Present Address validation
    if (!formData.presentAddress.trim()) {
      newErrors.presentAddress = 'Present Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      updateUser(formData);
      alert('Profile updated successfully');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr_4fr] gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              onClick={handleAvatarClick}
              className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-label-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-label-primary/80 duration-300">
              <MdEdit className="text-white" size={16} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder='Charlene Reed'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder='charlenereed@gmail.com'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              placeholder='25 January 1990'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Permanent Address</label>
            <input
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              placeholder='San Jose, California, USA'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.permanentAddress && <p className="text-red-500 text-sm mt-1">{errors.permanentAddress}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              placeholder='45962'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          </div>
        </div>

        {/* Third Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder='Charlene Reed '
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder='********'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Present Address</label>
            <input
              type="text"
              name="presentAddress"
              value={formData.presentAddress}
              placeholder='San Jose, California, USA'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.presentAddress && <p className="text-red-500 text-sm mt-1">{errors.presentAddress}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder='San Jose'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-label-primary mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              placeholder='USA'
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input-border rounded-xl placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent"
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-label-primary text-white rounded-2xl hover:opacity-80 duration-300 w-40"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile; 