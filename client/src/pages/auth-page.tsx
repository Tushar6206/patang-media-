import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email").optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // Handle login submit
  const handleLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };
  
  // Handle register submit
  const handleRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    const { confirmPassword, ...registerData } = values;
    registerMutation.mutate(registerData);
  };
  
  return (
    <div className="min-h-screen bg-[#060612] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-[#121232] to-[#1E1E48] p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8E24AA] to-[#00BCD4]">
                Patang Omniverse
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join the revolution in AI-powered media production and become a creator in the universe of tomorrow.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] flex items-center justify-center">
                  <i className="fas fa-music text-white"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium">AI Music Production</h3>
                  <p className="text-gray-400 text-sm">Create, customize and share AI-powered beats</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5722] to-[#4CAF50] flex items-center justify-center">
                  <i className="fas fa-user-alt text-white"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium">Digital Avatars</h3>
                  <p className="text-gray-400 text-sm">Generate photorealistic digital twins</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2196F3] to-[#E91E63] flex items-center justify-center">
                  <i className="fas fa-microphone text-white"></i>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-medium">Neural Voice Cloning</h3>
                  <p className="text-gray-400 text-sm">Create voice models that sound just like you</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Auth Forms */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 bg-[#0A0A14] p-8 md:p-12"
        >
          <Tabs 
            defaultValue="login" 
            onValueChange={setActiveTab}
            value={activeTab}
            className="w-full max-w-md mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Form */}
            <TabsContent value="login">
              <Card className="border-[#2A2A4A] bg-[#121224]">
                <CardHeader>
                  <CardTitle className="text-2xl font-sora text-white">Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your username" 
                                {...field} 
                                className="bg-[#0A0A14] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Your password" 
                                {...field} 
                                className="bg-[#0A0A14] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <span className="mr-2">Logging in</span>
                            <span className="flex gap-1">
                              <span className="animate-bounce">.</span>
                              <span className="animate-bounce animation-delay-200">.</span>
                              <span className="animate-bounce animation-delay-400">.</span>
                            </span>
                          </>
                        ) : (
                          "Log In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-gray-500 text-center w-full">
                    Don't have an account?{" "}
                    <button 
                      className="text-[#00BCD4] hover:underline" 
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Registration Form */}
            <TabsContent value="register">
              <Card className="border-[#2A2A4A] bg-[#121224]">
                <CardHeader>
                  <CardTitle className="text-2xl font-sora text-white">Create Account</CardTitle>
                  <CardDescription>
                    Join Patang Omniverse and unleash your creativity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Choose a username" 
                                {...field} 
                                className="bg-[#0A0A14] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Your email" 
                                {...field} 
                                className="bg-[#0A0A14] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Create a password" 
                                {...field} 
                                className="bg-[#0A0A14] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Confirm your password" 
                                {...field} 
                                className="bg-[#0A0A14] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90 mt-4"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <span className="mr-2">Creating account</span>
                            <span className="flex gap-1">
                              <span className="animate-bounce">.</span>
                              <span className="animate-bounce animation-delay-200">.</span>
                              <span className="animate-bounce animation-delay-400">.</span>
                            </span>
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-gray-500 text-center w-full">
                    Already have an account?{" "}
                    <button 
                      className="text-[#00BCD4] hover:underline" 
                      onClick={() => setActiveTab("login")}
                    >
                      Log In
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}