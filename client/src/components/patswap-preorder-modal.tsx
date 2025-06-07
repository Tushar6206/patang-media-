import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, CreditCard, Gift, Star, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PatSwapPreorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatSwapPreorderModal({ isOpen, onClose }: PatSwapPreorderModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePreorder = () => {
    setIsLoading(true);
    // Open the preorder URL in a new tab
    window.open('https://patswaporder.replit.app/', '_blank');
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#121232] to-[#1E1E48] border border-[#2979FF]/30">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-orbitron font-bold text-gradient mb-2">
            PatSwap Card Preorder
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-300">
            Be among the first to own the revolutionary PatSwap card and unlock exclusive access to Patang Omniverse
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Card Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-gradient-to-br from-[#2979FF] to-[#8E24AA] p-8 rounded-2xl shadow-2xl">
              {/* Card front */}
              <div className="aspect-[1.586/1] bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2979FF]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8E24AA]/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-xl font-orbitron font-bold">PATSWAP</h3>
                      <p className="text-sm text-gray-300">OMNIVERSE ACCESS</p>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded"></div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-2xl font-mono tracking-wider">
                      **** **** **** 1337
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">VALID THRU</p>
                      <p className="text-sm font-mono">12/29</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">MEMBER SINCE</p>
                      <p className="text-sm font-mono">2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-4">Exclusive Benefits</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#2979FF]/10 rounded-lg border border-[#2979FF]/20">
                  <Star className="h-5 w-5 text-[#2979FF]" />
                  <span className="text-gray-300">Priority access to all Patang Omniverse features</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#8E24AA]/10 rounded-lg border border-[#8E24AA]/20">
                  <Users className="h-5 w-5 text-[#8E24AA]" />
                  <span className="text-gray-300">Exclusive AI agent interactions and premium prompts</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#FF5722]/10 rounded-lg border border-[#FF5722]/20">
                  <Gift className="h-5 w-5 text-[#FF5722]" />
                  <span className="text-gray-300">500 Riko Tokens airdrop upon activation</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#00BCD4]/10 rounded-lg border border-[#00BCD4]/20">
                  <Clock className="h-5 w-5 text-[#00BCD4]" />
                  <span className="text-gray-300">Early access to new features and beta testing</span>
                </div>
              </div>
            </div>

            <Card className="bg-[#1E1E1E] border-[#2979FF]/30">
              <CardHeader>
                <CardTitle className="text-[#2979FF] flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Preorder Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Preorder Price:</span>
                    <span className="text-white font-bold">$49.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Delivery:</span>
                    <span className="text-white">Q2 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Riko Tokens Included:</span>
                    <span className="text-[#00BCD4] font-bold">500 RIKO</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={handlePreorder}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-[#2979FF] to-[#8E24AA] hover:from-[#1976D2] hover:to-[#7B1FA2] text-white font-orbitron font-bold py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Preorder Now
                  </div>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-[#2979FF]/50 text-[#2979FF] hover:bg-[#2979FF]/10"
              >
                Maybe Later
              </Button>
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="bg-[#00BCD4]/20 text-[#00BCD4] border-[#00BCD4]/30">
                Limited Time: First 1000 preorders get bonus 200 RIKO tokens
              </Badge>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}