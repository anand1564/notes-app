
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../layouts/header";
import Features from "../layouts/features";
import Hero from "../layouts/hero";
import Footer from "../layouts/footer";

export const Home = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main>
                <Hero />
                <Features />
            <div className="mt-10 mb-10 ml-10 flex flex-row items-center">
                <div className="w-1/2">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
           <span className="text-indigo-600">Join Now </span>to organize, upload, and access your notes anytime, anywhere!
          </h1>
                </div>
                <div className="md:w-1/2"><h1>Hi</h1></div>
            </div>
            </main>
            <Footer />
        </div>
    );
};
