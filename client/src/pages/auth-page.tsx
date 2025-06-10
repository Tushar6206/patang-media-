import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PatSwapPreorderModal } from "@/components/patswap-preorder-modal";
import { CreditCard } from "lucide-react";
import TestUserSystem from "@/components/test-user-system";

// Login form schema
const loginSchema = z.object({
  username: z.string()
    .min(1, "Username is required")
    .max(50, "Username cannot exceed 50 characters"),
  password: z.string()
    .min(1, "Password is required")
    .max(100, "Password cannot exceed 100 characters"),
  rememberMe: z.boolean().optional().default(false),
});

// Registration form schema
const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and hyphens"),
  email: z.string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal('')),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
    .regex(/.*[a-z].*/, "Password must contain at least one lowercase letter")
    .regex(/.*\d.*/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showPatSwapModal, setShowPatSwapModal] = useState(false);
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();
  
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
      rememberMe: false,
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
    <div className="min-h-screen bg-[#060612] flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl">
        {/* Hero Section - Hidden on very small mobile devices */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-[#121232] to-[#1E1E48] p-8 md:p-12 flex flex-col justify-center hidden xs:flex"
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
          {/* Small screen logo - shown only on very small devices */}
          <div className="flex justify-center mb-6 xs:hidden">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#8E24AA] to-[#00BCD4] flex items-center justify-center">
                <span className="font-orbitron font-bold text-white text-2xl">P</span>
              </div>
              <h1 className="text-2xl font-orbitron font-bold mt-3 text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8E24AA] to-[#00BCD4]">
                  Patang
                </span>
              </h1>
            </div>
          </div>
          
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

                      <FormField
                        control={loginForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-[#8E24AA] data-[state=checked]:border-[#8E24AA]"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal text-gray-400">
                                Remember me
                              </FormLabel>
                            </div>
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
                  <div className="flex justify-center w-full">
                    <button 
                      className="text-sm text-gray-400 hover:text-[#00BCD4] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Coming Soon",
                          description: "Password recovery functionality will be available soon.",
                          variant: "default",
                        });
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
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
                            <div className="text-xs text-gray-500 mt-1">
                              Password must contain at least 8 characters, including uppercase, lowercase, and a number
                            </div>
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
                  <div className="w-full border-t border-[#2A2A4A] pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10"
                      onClick={() => setShowPatSwapModal(true)}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Get PatSwap Card Access
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Preorder PatSwap card for exclusive access and 500 RIKO tokens
                    </p>
                  </div>
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
      
      <PatSwapPreorderModal 
        isOpen={showPatSwapModal} 
        onClose={() => setShowPatSwapModal(false)} 
      />
    </div>
  );
}