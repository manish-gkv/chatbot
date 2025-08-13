import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignUpEmailPassword } from "@nhost/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signUpEmailPassword,
        isLoading,
        isSuccess,
        isError,
        error } = useSignUpEmailPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signUpEmailPassword( email, password );
        console.log(result);
        if(isError) {
            toast.error("Sign up failed", error);
        }
        if(isSuccess) {
            toast.success("Sign up successful");
            toast.info("Redirecting to login...");
            navigate("/login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 justify-between w-9/10 sm:w-7/10 md:w-1/3 mx-auto rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
                <p className="text-center text-gray-500 mb-4 ">Create a new account to start chatting.</p>
                {isError && <p className="text-red-500 text-center mb-4">{error.message}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Email:
                            <input type="email" name="email" className="border p-2 rounded w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input type="password" name="password" className="border p-2 rounded w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer disabled:bg-blue-100 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        >Sign Up</button>
                        <p className="text-sm text-gray-500 mt-2">Already have an account? <NavLink to="/login" className="text-blue-500">Log in</NavLink></p>
                    </div>
                </form>
            </div></div>
    );
}
