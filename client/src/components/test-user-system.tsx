import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const TestUserSystem: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { loginMutation } = useAuth();
  const { toast } = useToast();

  const testUsers = [
    {
      username: "demo_producer",
      password: "demo123",
      type: "Music Producer",
      description: "Full access to all music generation features",
      benefits: ["Unlimited song generation", "All genres & moods", "HD audio exports", "Commercial license"]
    },
    {
      username: "demo_artist",
      password: "demo123", 
      type: "Artist",
      description: "Complete creative suite access",
      benefits: ["Voice cloning", "Beat generation", "Mood detection", "Social sharing"]
    },
    {
      username: "demo_premium",
      password: "demo123",
      type: "Premium User",
      description: "Full platform access + PatSwap benefits",
      benefits: ["All features unlocked", "500 RIKO tokens", "Priority support", "Revenue sharing"]
    }
  ];

  const handleTestLogin = async (username: string, password: string, userType: string) => {
    setIsLoggingIn(true);
    
    try {
      await loginMutation.mutateAsync({ username, password });
      
      toast({
        title: "Test Login Successful",
        description: `Logged in as ${userType} with unlimited access to all features.`,
      });
    } catch (error) {
      toast({
        title: "Test Login Failed", 
        description: "Unable to login with test credentials. Please try registration instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-orbitron text-white mb-2">Try Unlimited Features</h3>
        <p className="text-gray-400 text-sm">Login with test credentials to experience all features without limits</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testUsers.map((user, index) => (
          <Card key={index} className="bg-[#1A1A2E]/90 border-[#2979FF]/30 backdrop-blur-sm hover:border-[#2979FF]/60 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center justify-between">
                {user.type}
                <Badge className="bg-[#2979FF]/20 text-[#2979FF]">TEST</Badge>
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm">
                {user.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Username: {user.username}</div>
                <div className="text-xs text-gray-500">Password: {user.password}</div>
              </div>
              
              <ul className="space-y-1">
                {user.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-center">
                    <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleTestLogin(user.username, user.password, user.type)}
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90 text-sm"
              >
                {isLoggingIn ? (
                  <>
                    <i className="fas fa-spinner animate-spin mr-2"></i>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Login as {user.type}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center p-4 bg-[#0A0A14]/30 rounded-lg border border-[#8E24AA]/30">
        <p className="text-sm text-gray-400 mb-2">
          <i className="fas fa-info-circle mr-2 text-[#2979FF]"></i>
          Test accounts provide full access to demonstrate unlimited functionality
        </p>
        <p className="text-xs text-gray-500">
          Create your own account for personalized experience and data persistence
        </p>
      </div>
    </div>
  );
};

export default TestUserSystem;