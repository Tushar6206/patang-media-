import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { User } from "@shared/schema";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<{ user: User }, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<{ user: User }, Error, RegisterData>;
  updateProfileMutation: UseMutationResult<{ user: User }, Error, UpdateProfileData>;
};

// Data type for login
type LoginData = {
  username: string;
  password: string;
};

// Data type for registration
type RegisterData = {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
};

// Data type for profile updates
type UpdateProfileData = {
  email?: string;
  fullName?: string;
  profileImage?: string;
};

// Create auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Query current user data
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery<{ user: User } | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      const userData = data?.user;
      queryClient.setQueryData(["/api/user"], userData);
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData?.username || "User"}!`,
      });
      
      // Trigger login event that could be used for analytics or session tracking
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('user:login', { 
          detail: { username: userData?.username }
        });
        window.dispatchEvent(event);
      }
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      
      let errorMessage = "Invalid username or password";
      
      // Try to parse the error response
      try {
        const errorData = JSON.parse(error.message);
        errorMessage = errorData.message || errorData.errors?.auth || "Login failed";
      } catch (e) {
        // If parsing fails, use the error message directly
        errorMessage = error.message || errorMessage;
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data.user);
      toast({
        title: "Registration successful",
        description: `Welcome to Patang Omniverse, ${data.user.username}!`,
      });
      
      // Trigger a welcome event that could be used for analytics
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('user:registered', { 
          detail: { username: data.user.username }
        });
        window.dispatchEvent(event);
      }
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      
      let errorMessage = "Could not create account";
      let errorDetails: Record<string, string> = {};
      
      // Try to parse the error response
      try {
        const errorData = JSON.parse(error.message);
        errorMessage = errorData.message || "Registration failed";
        errorDetails = errorData.errors || {};
        
        // If we have specific field errors, update the form with them
        if (Object.keys(errorDetails).length > 0) {
          const detailsStr = Object.values(errorDetails).join(', ');
          errorMessage = detailsStr || errorMessage;
        }
      } catch (e) {
        // If parsing fails, use the error message directly
        errorMessage = error.message || errorMessage;
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: UpdateProfileData) => {
      const res = await apiRequest("PUT", "/api/profile", profileData);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data.user);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Could not update profile",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: userData?.user || null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
        updateProfileMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}