import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-8">
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
