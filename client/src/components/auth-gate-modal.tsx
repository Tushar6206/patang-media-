import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  usedCount: number;
  maxCount: number;
}

const AuthGateModal: React.FC<AuthGateModalProps> = ({
  isOpen,
  onClose,
  featureName,
  usedCount,
  maxCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-[#1A1A2E]/95 border-[#2979FF]/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2979FF] to-[#8E24AA] rounded-full flex items-center justify-center">
              <i className="fas fa-lock text-2xl text-white"></i>
            </div>
            <CardTitle className="text-2xl font-orbitron text-gradient-blue">
              Unlock {featureName}
            </CardTitle>
            <CardDescription className="text-gray-300">
              You've used {usedCount}/{maxCount} free generations. Join Patang Omniverse for unlimited access!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-[#0A0A14]/50 rounded-lg border border-[#2979FF]/20">
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <i className="fas fa-user mr-2 text-gray-400"></i>
                  Free Account
                </h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                    {maxCount} music generations
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                    Basic quality exports
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-times text-red-500 mr-2 text-xs"></i>
                    Limited features
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-times text-red-500 mr-2 text-xs"></i>
                    No commercial use
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-[#2979FF]/20 to-[#8E24AA]/20 rounded-lg border border-[#2979FF]/50 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-[#8E24AA] to-[#FF1493] text-white">
                    RECOMMENDED
                  </Badge>
                </div>
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <i className="fas fa-crown mr-2 text-[#FFD700]"></i>
                  Premium + PatSwap
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-infinity text-[#2979FF] mr-2 text-xs"></i>
                    Unlimited generations
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-hd-video text-[#2979FF] mr-2 text-xs"></i>
                    HD quality exports
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-magic text-[#2979FF] mr-2 text-xs"></i>
                    Advanced AI features
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-coins text-[#FFD700] mr-2 text-xs"></i>
                    500 RIKO tokens bonus
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-briefcase text-[#2979FF] mr-2 text-xs"></i>
                    Commercial license
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0A0A14]/30 rounded-lg p-4 border border-[#8E24AA]/30">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <i className="fas fa-gift mr-2 text-[#FF1493]"></i>
                PatSwap Card Exclusive Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-star mr-2 text-[#FFD700]"></i>
                  Priority access to new features
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-users mr-2 text-[#2979FF]"></i>
                  Exclusive community access
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-chart-line mr-2 text-[#00BCD4]"></i>
                  Revenue sharing program
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="flex-1 bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login / Register Free
              </Button>
              <Button 
                onClick={() => {
                  // Scroll to PatSwap section
                  const element = document.getElementById('campaign');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    onClose();
                  }
                }}
                className="flex-1 bg-gradient-to-r from-[#8E24AA] to-[#FF1493] hover:opacity-90"
              >
                <i className="fas fa-credit-card mr-2"></i>
                Get PatSwap Card
              </Button>
            </div>
            
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times mr-2"></i>
                Continue Browsing
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthGateModal;