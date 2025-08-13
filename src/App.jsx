import { SignedIn, useAuthenticationStatus } from "@nhost/react"
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ChatBot from "./components/ChatBot";
function App() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(!isAuthenticated){
    return (
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  return (
    <>
      <div className="min-h-screen w-full">
        <SignedIn>
          <ChatBot />
        </SignedIn>
      </div>
    </>
  );
}


export default App
