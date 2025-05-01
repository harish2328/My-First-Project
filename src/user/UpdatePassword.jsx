import React, { useState } from "react";
import Spinner from "../helpers/Spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { __Auth } from "../backend/FirebaseConfig";

const UpdatePassword = () => {
  let [isloading, setlsloading] = useState(false);
  const [email, setEmail] = useState(" ");
  let navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    setlsloading(true);
    e.preventDefault();
    try {
      await sendPasswordResetEmail(__Auth, email);
      toast.success(" Update you password");
      navigate("/user-profile");
    } catch (error) {
      toast.success(error.message);
    }
  };
  return (
    <section
      className="h-[calc(100vh-70px)] 
w-[100%] bg-slate-700 flex justify-center 
items-center "
    >
      <div
        className="w-[30%] 
bg-slate-800 rounded-lg"
      >
        <header>
          <h1
            className="text-3xl 
text-center p-2"
          >
            Update Password
          </h1>
        </header>
        <main className="p-2">
          <form
            className="flex flex-col 
gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="outline-none 
border-1 my-1 w-[100%] rounded-lg pl-2"
                name="email"
                value={email}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <button
                className="p-2 
hover:bg-cyan-600 w-[100%] 
cursor-pointer rounded-xl bg-cyan-700 
mt-2 font-semibold"
              >
                Update Password
              </button>
            </div>
            <div className="mt-2 text-center" >
              <NavLink
                to="/user-profile"
                className="bg-fuchsia-700 w-[100%] 
block p-2 font-semibold rounded-lg 
hover:bg-fuchsia-500"
              >
                cancel
              </NavLink>
            </div>
            <div></div>
          </form>
        </main>
      </div>
      {isloading && <Spinner />}
    </section>
  );
};
export default UpdatePassword;
