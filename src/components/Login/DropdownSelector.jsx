// import React, { useState } from "react";

// const CountryDropdown = ({ countries, onSelectCountry }) => {
//   const [selectedCountry, setSelectedCountry] = useState(countries[0]);

//   const handleSelect = (country) => {
//     setSelectedCountry(country);
//     onSelectCountry(country);
//   };

//   return (
//     <div className="dropdown-container mb-3">
//       <h5 className="title">Country/Region</h5>
//       <button
//         className="btn dropdown-toggle w-100 btnn"
//         type="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="true"
//       >
//         {selectedCountry.name} ({selectedCountry.code})
//       </button>
//       <ul className="dropdown-menu dropdown-menu-scrollable w-100">
//         {countries.map((country, index) => (
//           <li key={index}>
//             <button
//               className="dropdown-item"
//               onClick={() => handleSelect(country)}
//             >
//               {country.name} ({country.code})
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const PhoneNumberForm = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState({
//     name: "Equatorial Guinea",
//     code: "+240",
//   });

//   const countries = [
//     { name: "Afghanistan", code: "+93" },
//     { name: "Belarus", code: "+375" },
//     { name: "Chile", code: "+56" },
//     { name: "Djibouti", code: "+253" },
//     { name: "Egypt", code: "+20" },
//     { name: "France", code: "+33" },
//     { name: "Gambia", code: "+220" },
//     { name: "Haiti", code: "+509" },
//     { name: "Iran", code: "+98" },
//     { name: "Japan", code: "+81" },
//     { name: "Kenya", code: "+254" },
//     { name: "Liberia", code: "+231" },
//     { name: "Maldives", code: "+960" },
//     { name: "Nepal", code: "+977" },
//     { name: "Oman", code: "+968" },
//     { name: "Panama", code: "+507" },
//   ];

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   return (
//     <div className="modal-body">
//       <div className="container-fluid">
//         <div className="row">
//           <h3 className="text-center">Welcome to Airbnb</h3>
//           <div className="input-group mb-3">
//             <div className="d-flex flex-column w-100">
//               <CountryDropdown
//                 countries={countries}
//                 onSelectCountry={setSelectedCountry}
//               />
//               <input
//                 type="text"
//                 className="form-control btnn2 num"
//                 placeholder="Enter your phone number"
//                 value={phoneNumber}
//                 onChange={handlePhoneNumberChange}
//                 required
//               />
//             </div>
//           </div>
//           <small>
//             We’ll call or text you to confirm your number. Standard message and
//             data rates apply.{" "}
//             <a href="#" className="title">
//               Privacy Policy
//             </a>
//           </small>
//         </div>
//       </div>
//       <div>
//         <button
//           className="btn w-100 butons"
//           type="button"
//           data-bs-target="#otpModal"
//           data-bs-toggle="modal"
//         >
//           Continue
//         </button>
//         <div className="divider text-center my-2">or</div>
//         <button className="btn btn-outline-primary w-100 subscribe" type="button">
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberForm;
