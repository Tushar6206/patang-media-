import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { UserBeat, UserAvatar, UserVoiceSample } from "@shared/schema";
import { Loader2 } from "lucide-react";

// Profile update schema
const profileSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  profileImage: z.string().optional(),
});

export default function ProfilePage() {
  const { user, updateProfileMutation, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");

  // Form for profile updates
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      profileImage: user?.profileImage || "",
    },
  });

  // Handle profile update submit
  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    updateProfileMutation.mutate(values);
  };
  
  // Fetch user content
  const { data: beats, isLoading: isLoadingBeats } = useQuery({
    queryKey: ["/api/beats"],
    queryFn: async () => {
      const res = await fetch("/api/beats");
      const data = await res.json();
      return data.data as UserBeat[];
    },
    enabled: !!user,
  });
  
  const { data: avatars, isLoading: isLoadingAvatars } = useQuery({
    queryKey: ["/api/avatars"],
    queryFn: async () => {
      const res = await fetch("/api/avatars");
      const data = await res.json();
      return data.data as UserAvatar[];
    },
    enabled: !!user,
  });
  
  const { data: voiceSamples, isLoading: isLoadingVoiceSamples } = useQuery({
    queryKey: ["/api/voice-samples"],
    queryFn: async () => {
      const res = await fetch("/api/voice-samples");
      const data = await res.json();
      return data.data as UserVoiceSample[];
    },
    enabled: !!user,
  });

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.fullName) {
      return user.fullName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.username.substring(0, 2).toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-[#060612] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-orbitron font-bold mb-4 text-white">Your Creator Profile</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Manage your account, view your creations, and track your progress in the Patang Omniverse.
          </p>
        </motion.div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mx-auto">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="content">My Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 bg-[#0A0A14] border-[#1A1A2E]">
                <CardHeader>
                  <CardTitle className="text-xl font-sora text-white">Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-6">
                    <AvatarImage src={user?.profileImage || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-[#8E24AA] to-[#00BCD4] text-xl">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-medium text-white">{user?.fullName || user?.username}</h3>
                    {user?.email && <p className="text-gray-400">{user.email}</p>}
                    <div className="bg-[#1A1A2E] text-gray-300 px-3 py-1 rounded-full text-xs mt-2 inline-block">
                      Creator Account
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="mt-4"
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Log Out"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-[#0A0A14] border-[#1A1A2E]">
                <CardHeader>
                  <CardTitle className="text-xl font-sora text-white">Edit Profile</CardTitle>
                  <CardDescription>
                    Update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
                                {...field} 
                                className="bg-[#121224] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormDescription>
                              This is how your name will appear on your profile
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                {...field} 
                                className="bg-[#121224] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormDescription>
                              Used for notifications and account recovery
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="profileImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Image URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/your-image.jpg" 
                                {...field} 
                                className="bg-[#121224] border-[#2A2A4A]"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter a URL for your profile picture
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 gap-8">
              {/* Beats Section */}
              <Card className="bg-[#0A0A14] border-[#1A1A2E]">
                <CardHeader>
                  <CardTitle className="text-xl font-sora text-white">My Beats</CardTitle>
                  <CardDescription>
                    All your generated beats and music
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingBeats ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#8E24AA]" />
                    </div>
                  ) : beats?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {beats.map((beat) => (
                        <div key={beat.id} className="bg-[#121224] rounded-lg p-4 border border-[#2A2A4A]">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-md bg-[#2A2A4A] flex-shrink-0 overflow-hidden">
                              {beat.coverImage ? (
                                <img src={beat.coverImage} alt={beat.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <i className="fas fa-music text-gray-400"></i>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{beat.name}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <span>{beat.genre}</span>
                                <span>•</span>
                                <span>{beat.bpm}</span>
                                {beat.duration && (
                                  <>
                                    <span>•</span>
                                    <span>{beat.duration}</span>
                                  </>
                                )}
                              </div>
                              {beat.description && (
                                <p className="text-sm text-gray-500 mt-2">{beat.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">You haven't created any beats yet.</p>
                      <Button className="mt-4 bg-gradient-to-r from-[#8E24AA] to-[#00BCD4]">
                        Create Your First Beat
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Avatars Section */}
              <Card className="bg-[#0A0A14] border-[#1A1A2E]">
                <CardHeader>
                  <CardTitle className="text-xl font-sora text-white">My Avatars</CardTitle>
                  <CardDescription>
                    Your digital twins and virtual performers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingAvatars ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#FF5722]" />
                    </div>
                  ) : avatars?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {avatars.map((avatar) => (
                        <div key={avatar.id} className="bg-[#121224] rounded-lg p-4 border border-[#2A2A4A]">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-md bg-[#2A2A4A] flex-shrink-0 overflow-hidden">
                              {avatar.previewImage ? (
                                <img src={avatar.previewImage} alt={avatar.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <i className="fas fa-user text-gray-400"></i>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{avatar.name}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <span>{avatar.type}</span>
                                <span>•</span>
                                <span>{avatar.style}</span>
                              </div>
                              {avatar.features && avatar.features.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {avatar.features.slice(0, 2).map((feature, idx) => (
                                    <span key={idx} className="text-xs bg-[#2A2A4A] text-gray-300 px-2 py-0.5 rounded-full">
                                      {feature}
                                    </span>
                                  ))}
                                  {avatar.features.length > 2 && (
                                    <span className="text-xs bg-[#2A2A4A] text-gray-300 px-2 py-0.5 rounded-full">
                                      +{avatar.features.length - 2} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">You haven't created any avatars yet.</p>
                      <Button className="mt-4 bg-gradient-to-r from-[#FF5722] to-[#4CAF50]">
                        Create Your First Avatar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Voice Samples Section */}
              <Card className="bg-[#0A0A14] border-[#1A1A2E]">
                <CardHeader>
                  <CardTitle className="text-xl font-sora text-white">My Voice Samples</CardTitle>
                  <CardDescription>
                    Your voice clones and audio samples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingVoiceSamples ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#2196F3]" />
                    </div>
                  ) : voiceSamples?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voiceSamples.map((sample) => (
                        <div key={sample.id} className="bg-[#121224] rounded-lg p-4 border border-[#2A2A4A]">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-md bg-[#2A2A4A] flex-shrink-0 overflow-hidden">
                              {sample.coverImage ? (
                                <img src={sample.coverImage} alt={sample.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <i className="fas fa-microphone text-gray-400"></i>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{sample.name}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                {sample.style && (
                                  <>
                                    <span>{sample.style}</span>
                                    <span>•</span>
                                  </>
                                )}
                                <span>{sample.duration || "Unknown duration"}</span>
                              </div>
                              {sample.features && sample.features.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {sample.features.slice(0, 2).map((feature, idx) => (
                                    <span key={idx} className="text-xs bg-[#2A2A4A] text-gray-300 px-2 py-0.5 rounded-full">
                                      {feature}
                                    </span>
                                  ))}
                                  {sample.features.length > 2 && (
                                    <span className="text-xs bg-[#2A2A4A] text-gray-300 px-2 py-0.5 rounded-full">
                                      +{sample.features.length - 2} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">You haven't created any voice samples yet.</p>
                      <Button className="mt-4 bg-gradient-to-r from-[#2196F3] to-[#E91E63]">
                        Create Your First Voice
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-[#0A0A14] border-[#1A1A2E]">
              <CardHeader>
                <CardTitle className="text-xl font-sora text-white">Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="username"
                      value={user?.username}
                      disabled
                      className="bg-[#121224] border-[#2A2A4A] text-gray-400"
                    />
                    <Button variant="outline" disabled className="whitespace-nowrap">
                      Change Username
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Username changes are currently disabled. Contact support for assistance.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Privacy Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-profile" className="text-white">Public Profile</Label>
                        <p className="text-xs text-gray-500">Allow others to view your profile</p>
                      </div>
                      <div className="bg-[#121224] border border-[#2A2A4A] px-2 py-1 rounded text-xs text-gray-400">
                        Coming Soon
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-content" className="text-white">Public Content</Label>
                        <p className="text-xs text-gray-500">Make your creations discoverable by others</p>
                      </div>
                      <div className="bg-[#121224] border border-[#2A2A4A] px-2 py-1 rounded text-xs text-gray-400">
                        Coming Soon
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium text-white mb-4">Danger Zone</h3>
                  <Button variant="destructive" className="w-full sm:w-auto" disabled>
                    Delete Account
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Account deletion is permanent and cannot be undone. All your data will be lost.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}