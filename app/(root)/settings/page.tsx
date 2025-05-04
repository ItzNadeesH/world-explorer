"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          const data = await res.json();
          setProfile({ username: data.name || "", email: data.email || "", password: "" });
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Implement save functionality here (e.g. call an API)
    console.log("Saving profile:", profile);
  };

  return (
    <div className="max-w-7xl mx-auto mt-2 p-5 space-y-8">
      <div className="pb-12 max-w-2xl mx-auto">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-y-4">
          <InputField
            label="Username"
            name="username"
            type="text"
            value={profile.username}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="block cursor-pointer bg-black hover:bg-black/90 text-white font-semibold text-sm px-4 py-2 mt-4 ml-auto rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, type, value, onChange }: InputFieldProps) => (
  <div className="sm:col-span-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
    </div>
  </div>
);

export default Settings;
