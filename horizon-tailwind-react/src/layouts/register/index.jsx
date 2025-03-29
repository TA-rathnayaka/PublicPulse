import React, { useState } from "react";
import Footer from "components/footer/FooterAuthDefault";
import authImg from "assets/img/auth/auth.png";
import { Link } from "react-router-dom";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function InstitutionRegistration() {
  const [formData, setFormData] = useState({
    institutionName: "",
    email: "",
    contactPerson: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    institutionType: "",
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Form submitted:", formData);
  };

  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className="mx-auto min-h-screen">
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:min-h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link to="/" className="mt-0 w-max lg:pt-10">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                        fill="#A3AED0"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-gray-600">
                      Back to Home
                    </p>
                  </div>
                </Link>

                {/* Registration Form */}
                <div className="mt-10 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                  <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                      Institution Registration
                    </h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                      Register your institution to access our platform
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Institution Name"
                          placeholder="Harvard University"
                          id="institutionName"
                          name="institutionName"
                          value={formData.institutionName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Email"
                          placeholder="mail@institution.edu"
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Contact Person"
                          placeholder="John Doe"
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Phone Number"
                          placeholder="+1 (555) 123-4567"
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Password"
                          placeholder="Min. 8 characters"
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Confirm Password"
                          placeholder="Confirm Password"
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <InputField
                          variant="auth"
                          label="Address"
                          placeholder="123 Main St."
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                          <InputField
                            variant="auth"
                            label="City"
                            placeholder="New York"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <InputField
                            variant="auth"
                            label="Country"
                            placeholder="United States"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm text-navy-700 dark:text-white">
                          Institution Type
                        </label>
                        <select
                          name="institutionType"
                          id="institutionType"
                          value={formData.institutionType}
                          onChange={handleChange}
                          className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="university">University</option>
                          <option value="college">College</option>
                          <option value="school">School</option>
                          <option value="research">Research Institute</option>
                          <option value="government">Government Institution</option>
                          <option value="nonprofit">Non-profit Organization</option>
                          <option value="corporate">Corporate Training</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="mb-6 flex items-center gap-3">
                        <Checkbox 
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                        />
                        <label htmlFor="agreeTerms" className="text-sm text-navy-700 dark:text-white">
                          I agree to the {" "}
                          <Link to="/terms" className="text-brand-500 dark:text-white">
                            Terms of Service
                          </Link>{" "}
                          and {" "}
                          <Link to="/privacy" className="text-brand-500 dark:text-white">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                      >
                        Register Institution
                      </button>
                    </form>

                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
                        Already have an account?
                      </span>
                      <Link
                        to="/auth/sign-in"
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}