import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import bankingHero from "@/assets/banking-hero.jpg";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <img
        src={bankingHero}
        alt="Banking Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
      
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CreditCard className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold">SecureBank</h1>
        </div>
        
        <h2 className="text-6xl font-bold mb-6">
          Your Future Banking Experience
        </h2>
        
        <p className="text-xl mb-8 text-white/90">
          Experience secure, modern banking with comprehensive digital services. 
          Manage accounts, transfer money, and track finances with ease.
        </p>
        
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 px-8 py-4"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 px-8 py-4"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
