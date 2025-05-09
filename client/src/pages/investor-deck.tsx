import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InvestorDeck: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-10">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="text-[#2979FF] hover:text-white hover:bg-[#2979FF]/20"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Home
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-custom flex items-center justify-center">
              <span className="font-orbitron font-bold text-white text-sm">P</span>
            </div>
            <span className="font-orbitron font-bold text-lg text-white">
              PATANG <span className="text-[#2979FF]">OMNIVERSE</span>
            </span>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#2979FF]/20 text-[#2979FF] hover:bg-[#2979FF]/30">CONFIDENTIAL</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6">
              Investor <span className="text-gradient-blue">Deck</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The future of entertainment is here. Discover how Patang Omniverse is redefining 
              content creation, music production, and virtual performers.
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-[#1A1A2E]">
              <TabsTrigger value="overview" className="font-sora">Overview</TabsTrigger>
              <TabsTrigger value="financials" className="font-sora">Financials</TabsTrigger>
              <TabsTrigger value="roadmap" className="font-sora">Roadmap</TabsTrigger>
              <TabsTrigger value="team" className="font-sora">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Overview & Vision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Mission Statement</h3>
                    <p className="text-gray-300">
                      Patang Omniverse aims to become the world's premier entertainment conglomerate 
                      by fusing cutting-edge AI technology with human creativity to build the largest 
                      interconnected entertainment universe in existence, surpassing traditional media giants.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Market Opportunity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <div className="text-4xl text-[#2979FF] mb-2">$3.2T</div>
                        <p className="text-gray-300">Global entertainment & media market size by 2030</p>
                      </div>
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <div className="text-4xl text-[#2979FF] mb-2">47%</div>
                        <p className="text-gray-300">Annual growth in AI-generated content consumption</p>
                      </div>
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <div className="text-4xl text-[#2979FF] mb-2">$850B</div>
                        <p className="text-gray-300">Projected AI music and virtual performer market by 2029</p>
                      </div>
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <div className="text-4xl text-[#2979FF] mb-2">2.4B</div>
                        <p className="text-gray-300">Gen Z content creators looking for AI tools by 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Our Core Products</h3>
                    <div className="space-y-4">
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-[#2979FF] mb-2">VocalVerse™</h4>
                        <p className="text-gray-300">
                          Neural voice cloning and singing synthesis platform that allows anyone to create 
                          professional-grade vocal performances without traditional training or recording equipment.
                        </p>
                      </div>
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-[#2979FF] mb-2">BeatDrop™</h4>
                        <p className="text-gray-300">
                          AI-powered music production platform that enables users to create professional-quality
                          beats and generate viral-ready music videos with minimal technical expertise.
                        </p>
                      </div>
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-[#2979FF] mb-2">TwinSync™</h4>
                        <p className="text-gray-300">
                          Digital avatar creation technology that transforms users into photorealistic
                          virtual performers capable of dancing, singing, and acting in any style.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Competitive Advantage</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#2979FF]/10">
                        <h4 className="font-medium text-white">Proprietary AI Framework</h4>
                        <p className="text-sm text-gray-400">Our neural networks outperform competitors by 4.2x in quality</p>
                      </div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#2979FF]/10">
                        <h4 className="font-medium text-white">Supermodel Portfolio</h4>
                        <p className="text-sm text-gray-400">Portfolio of 12+ AI supermodels with established audiences</p>
                      </div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#2979FF]/10">
                        <h4 className="font-medium text-white">Brand Partnerships</h4>
                        <p className="text-sm text-gray-400">Exclusive contracts with 7 Fortune 500 companies</p>
                      </div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#2979FF]/10">
                        <h4 className="font-medium text-white">Technical Talent</h4>
                        <p className="text-sm text-gray-400">Team of ML/AI experts from leading tech companies</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financials">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Financial Projections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Strategic Investment Round</h3>
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <div className="text-3xl text-[#2979FF] mb-2">$30M</div>
                          <p className="text-gray-300">Investment target</p>
                        </div>
                        <div>
                          <div className="text-3xl text-[#2979FF] mb-2">$380M</div>
                          <p className="text-gray-300">Pre-money valuation</p>
                        </div>
                        <div>
                          <div className="text-3xl text-[#2979FF] mb-2">36mo</div>
                          <p className="text-gray-300">Growth acceleration timeline</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">
                        This strategic investment round is specifically designed to propel Patang Omniverse into 
                        the next phase of our cosmic expansion, targeting three core pillars for sustained growth and market leadership.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#161630] p-4 rounded-lg border border-[#2979FF]/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#2979FF]/20 flex items-center justify-center text-[#2979FF]">
                              <i className="fas fa-rocket text-sm"></i>
                            </div>
                            <h4 className="font-medium text-white">Operational Scale</h4>
                          </div>
                          <p className="text-sm text-gray-400">$10.5M (35%) for expanding global infrastructure, cloud systems, and market presence</p>
                        </div>
                        
                        <div className="bg-[#161630] p-4 rounded-lg border border-[#FF2E63]/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#FF2E63]/20 flex items-center justify-center text-[#FF2E63]">
                              <i className="fas fa-brain text-sm"></i>
                            </div>
                            <h4 className="font-medium text-white">Proprietary LLMs</h4>
                          </div>
                          <p className="text-sm text-gray-400">$9M (30%) for patented AI technology development and neural synthesis research</p>
                        </div>
                        
                        <div className="bg-[#161630] p-4 rounded-lg border border-[#08FDD8]/20">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#08FDD8]/20 flex items-center justify-center text-[#08FDD8]">
                              <i className="fas fa-users text-sm"></i>
                            </div>
                            <h4 className="font-medium text-white">Talent Acquisition</h4>
                          </div>
                          <p className="text-sm text-gray-400">$10.5M (35%) for world-class AI researchers and global sales team expansion</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-[#161630] rounded-lg border border-[#FFC700]/20">
                        <div className="w-8 h-8 rounded-full bg-[#FFC700]/20 flex items-center justify-center text-[#FFC700]">
                          <i className="fas fa-lightbulb text-sm"></i>
                        </div>
                        <p className="text-sm text-gray-300">
                          Our strategic investment is designed to scale our operations and proprietary technology to become the dominant force 
                          in the emerging AI entertainment sector, rivaling traditional media giants like Disney and Sony.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Revenue Projections</h3>
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <div className="relative h-64 mb-6">
                        {/* Simplified chart visualization */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700"></div>
                        <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-700"></div>
                        
                        <div className="absolute bottom-0 left-8 w-16 h-12 bg-[#2979FF]/30">
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#2979FF]/70"></div>
                        </div>
                        <div className="absolute bottom-0 left-36 w-16 h-32 bg-[#2979FF]/30">
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#2979FF]/70"></div>
                        </div>
                        <div className="absolute bottom-0 left-64 w-16 h-52 bg-[#2979FF]/30">
                          <div className="absolute bottom-0 left-0 right-0 h-52 bg-[#2979FF]/70"></div>
                        </div>
                        <div className="absolute bottom-0 left-92 w-16 h-64 bg-[#2979FF]/30">
                          <div className="absolute bottom-0 left-0 right-0 h-64 bg-[#2979FF]/70"></div>
                        </div>
                        
                        <div className="absolute bottom-[-24px] left-12 text-sm text-gray-400">Y1</div>
                        <div className="absolute bottom-[-24px] left-40 text-sm text-gray-400">Y2</div>
                        <div className="absolute bottom-[-24px] left-68 text-sm text-gray-400">Y3</div>
                        <div className="absolute bottom-[-24px] left-96 text-sm text-gray-400">Y4</div>
                        
                        <div className="absolute top-0 left-[-40px] text-sm text-gray-400">$100M</div>
                        <div className="absolute top-[50%] left-[-40px] text-sm text-gray-400">$50M</div>
                        <div className="absolute bottom-[-8px] left-[-40px] text-sm text-gray-400">$0</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-white">Key Revenue Streams</h4>
                          <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1 mt-2">
                            <li>AI agent licensing (42%)</li>
                            <li>Subscription services (28%)</li>
                            <li>Corporate partnerships (18%)</li>
                            <li>Content marketplace (12%)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Growth Targets</h4>
                          <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1 mt-2">
                            <li>Y1: $4.2M revenue</li>
                            <li>Y2: $18.5M revenue (340% growth)</li>
                            <li>Y3: $52M revenue (180% growth)</li>
                            <li>Y4: $95M revenue (83% growth)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Exit Strategy</h3>
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <p className="text-gray-300 mb-4">
                        We anticipate multiple potential exit pathways within 5-7 years:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-[#2979FF]/20 p-4 rounded-lg">
                          <h4 className="font-medium text-white mb-2">Acquisition</h4>
                          <p className="text-sm text-gray-400">
                            Strategic acquisition by major tech or entertainment conglomerate at 12-15x revenue
                          </p>
                        </div>
                        <div className="border border-[#2979FF]/20 p-4 rounded-lg">
                          <h4 className="font-medium text-white mb-2">IPO</h4>
                          <p className="text-sm text-gray-400">
                            Public offering once revenue exceeds $100M with established market leadership
                          </p>
                        </div>
                        <div className="border border-[#2979FF]/20 p-4 rounded-lg">
                          <h4 className="font-medium text-white mb-2">Private Equity</h4>
                          <p className="text-sm text-gray-400">
                            Secondary sale to PE firm at 8-10x revenue with continued growth trajectory
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roadmap">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Product Roadmap & Strategic Partnerships</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="mb-12">
                    <h3 className="text-xl font-medium mb-6">Key Strategic Partnerships</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#0A0A14] p-6 rounded-lg border border-[#2979FF]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#2979FF]/10 text-[#2979FF] text-xs px-3 py-1 rounded-bl-lg">Confirmed</div>
                        <h4 className="text-lg font-medium text-white mb-2">Global Entertainment Conglomerate</h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Multi-year licensing agreement for Patang's AI voice synthesis technology across the conglomerate's animation and gaming divisions.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Deal Value:</span>
                            <span className="text-[#2979FF]">$8.5M annually</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Timeline:</span>
                            <span className="text-white">Q2 2024 - Q2 2027</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-green-400">Signed LOI</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A0A14] p-6 rounded-lg border border-[#FF2E63]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#FF2E63]/10 text-[#FF2E63] text-xs px-3 py-1 rounded-bl-lg">Advanced Talks</div>
                        <h4 className="text-lg font-medium text-white mb-2">Fortune 100 Tech Company</h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Co-development of neural music generation platform with integration into the partner's existing content creation ecosystem.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Deal Value:</span>
                            <span className="text-[#FF2E63]">$15M + Revenue Share</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Timeline:</span>
                            <span className="text-white">Q3 2024 - Open-ended</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-yellow-400">Term Sheet Stage</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A0A14] p-6 rounded-lg border border-[#08FDD8]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#08FDD8]/10 text-[#08FDD8] text-xs px-3 py-1 rounded-bl-lg">Strategic</div>
                        <h4 className="text-lg font-medium text-white mb-2">Leading Academic Research Institute</h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Exclusive access to cutting-edge AI research and talent pipeline, with first-rights to commercialize emerging technologies.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Deal Value:</span>
                            <span className="text-[#08FDD8]">$4.2M research grant</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Timeline:</span>
                            <span className="text-white">Q1 2024 - Q1 2029</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-blue-400">Final Negotiations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-16 md:left-24 w-0.5 bg-gradient-to-b from-[#2979FF] to-[#4CAF50]/50"></div>
                    
                    {/* Q3 2023 (Past) */}
                    <div className="relative pl-20 md:pl-32 pb-12">
                      <div className="absolute left-14 md:left-22 top-0 w-4 h-4 rounded-full bg-[#2979FF]"></div>
                      <div className="absolute left-0 top-0 text-sm font-medium text-[#2979FF]">Q3 2023</div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Foundation Phase <Badge className="ml-2 bg-green-500/20 text-green-400">Completed</Badge></h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>✓ Initial AI agent development</li>
                          <li>✓ Prototype of voice cloning technology</li>
                          <li>✓ Seed funding secured</li>
                          <li>✓ Core team assembled</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Q1 2024 (Current) */}
                    <div className="relative pl-20 md:pl-32 pb-12">
                      <div className="absolute left-14 md:left-22 top-0 w-4 h-4 rounded-full bg-[#2979FF]"></div>
                      <div className="absolute left-0 top-0 text-sm font-medium text-[#2979FF]">Q1 2024</div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border-2 border-[#2979FF]/40">
                        <h3 className="text-lg font-medium mb-2">Product Launch Phase <Badge className="ml-2 bg-blue-500/20 text-blue-400">Current</Badge></h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>✓ VocalVerse™ beta release</li>
                          <li>✓ BeatDrop™ alpha version</li>
                          <li>→ Initial brand partnerships</li>
                          <li>→ Series A funding round</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Q3 2024 */}
                    <div className="relative pl-20 md:pl-32 pb-12">
                      <div className="absolute left-14 md:left-22 top-0 w-4 h-4 rounded-full bg-[#1D1D30] border border-[#2979FF]/50"></div>
                      <div className="absolute left-0 top-0 text-sm font-medium text-gray-400">Q3 2024</div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#1D1D30]">
                        <h3 className="text-lg font-medium mb-2">Expansion Phase</h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>Full launch of TwinSync™ platform</li>
                          <li>Integration between all three core products</li>
                          <li>Expansion to additional 5 AI agents</li>
                          <li>Mobile applications development</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Q1 2025 */}
                    <div className="relative pl-20 md:pl-32 pb-12">
                      <div className="absolute left-14 md:left-22 top-0 w-4 h-4 rounded-full bg-[#1D1D30] border border-[#2979FF]/50"></div>
                      <div className="absolute left-0 top-0 text-sm font-medium text-gray-400">Q1 2025</div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#1D1D30]">
                        <h3 className="text-lg font-medium mb-2">Scaling Phase</h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>Enterprise solution for major media companies</li>
                          <li>Creator marketplace launch</li>
                          <li>International market expansion</li>
                          <li>Immersive XR experiences</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Q4 2025 */}
                    <div className="relative pl-20 md:pl-32">
                      <div className="absolute left-14 md:left-22 top-0 w-4 h-4 rounded-full bg-[#1D1D30] border border-[#2979FF]/50"></div>
                      <div className="absolute left-0 top-0 text-sm font-medium text-gray-400">Q4 2025</div>
                      <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#1D1D30]">
                        <h3 className="text-lg font-medium mb-2">Industry Leadership</h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>Patang Studios launch (original content)</li>
                          <li>First AI-human collaborative feature film</li>
                          <li>Licensing platform for third-party developers</li>
                          <li>Series B funding round</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Team & Advisors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-6">Leadership Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* CEO */}
                      <div className="bg-[#0A0A14] rounded-lg overflow-hidden">
                        <div className="h-48 bg-[#1D1D30] flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2979FF] to-[#00BCD4] flex items-center justify-center">
                            <i className="fas fa-user text-3xl text-white"></i>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-medium">Rohan Mehta</h4>
                          <p className="text-[#2979FF] text-sm mb-2">CEO & Co-Founder</p>
                          <p className="text-gray-400 text-sm">
                            Former VP of AI at [Major Tech Company], 3x successful exits in AI/ML space.
                          </p>
                        </div>
                      </div>
                      
                      {/* CTO */}
                      <div className="bg-[#0A0A14] rounded-lg overflow-hidden">
                        <div className="h-48 bg-[#1D1D30] flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#9C27B0] to-[#2979FF] flex items-center justify-center">
                            <i className="fas fa-user text-3xl text-white"></i>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-medium">Aanya Sharma</h4>
                          <p className="text-[#2979FF] text-sm mb-2">CTO & Co-Founder</p>
                          <p className="text-gray-400 text-sm">
                            PhD in ML from [Prestigious University], led voice synthesis at [Leading AI Lab].
                          </p>
                        </div>
                      </div>
                      
                      {/* CPO */}
                      <div className="bg-[#0A0A14] rounded-lg overflow-hidden">
                        <div className="h-48 bg-[#1D1D30] flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FF5722] to-[#FFC107] flex items-center justify-center">
                            <i className="fas fa-user text-3xl text-white"></i>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-medium">Maya Patel</h4>
                          <p className="text-[#2979FF] text-sm mb-2">Chief Product Officer</p>
                          <p className="text-gray-400 text-sm">
                            Former product exec at [Entertainment Giant], 10+ years in digital media.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-[#2979FF]/20" />
                  
                  <div>
                    <h3 className="text-xl font-medium mb-6">Advisory Board</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#0A0A14] p-4 rounded-lg flex items-center">
                        <div className="h-16 w-16 rounded-full bg-[#1D1D30] flex items-center justify-center mr-4">
                          <i className="fas fa-user text-xl text-[#2979FF]"></i>
                        </div>
                        <div>
                          <h4 className="font-medium">Dr. Ravi Kumar</h4>
                          <p className="text-[#2979FF] text-sm mb-1">ML Research, [Tech Giant]</p>
                          <p className="text-gray-400 text-xs">
                            Leading voice in generative AI research with 40+ patents.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A0A14] p-4 rounded-lg flex items-center">
                        <div className="h-16 w-16 rounded-full bg-[#1D1D30] flex items-center justify-center mr-4">
                          <i className="fas fa-user text-xl text-[#2979FF]"></i>
                        </div>
                        <div>
                          <h4 className="font-medium">Jennifer Chen</h4>
                          <p className="text-[#2979FF] text-sm mb-1">Former CEO, [Music Label]</p>
                          <p className="text-gray-400 text-xs">
                            25+ years in music industry, led digital transformation.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A0A14] p-4 rounded-lg flex items-center">
                        <div className="h-16 w-16 rounded-full bg-[#1D1D30] flex items-center justify-center mr-4">
                          <i className="fas fa-user text-xl text-[#2979FF]"></i>
                        </div>
                        <div>
                          <h4 className="font-medium">Alex Rodriguez</h4>
                          <p className="text-[#2979FF] text-sm mb-1">Partner, [Top VC Firm]</p>
                          <p className="text-gray-400 text-xs">
                            Led investments in 12 unicorns in AI/ML and media space.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A0A14] p-4 rounded-lg flex items-center">
                        <div className="h-16 w-16 rounded-full bg-[#1D1D30] flex items-center justify-center mr-4">
                          <i className="fas fa-user text-xl text-[#2979FF]"></i>
                        </div>
                        <div>
                          <h4 className="font-medium">Sarah Washington</h4>
                          <p className="text-[#2979FF] text-sm mb-1">CMO, [Fashion Brand]</p>
                          <p className="text-gray-400 text-xs">
                            Pioneered virtual brand ambassador programs with 300% ROI.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#0A0A14] p-6 rounded-lg mt-8 text-center">
                    <h3 className="text-xl font-medium mb-4">Join Our Vision</h3>
                    <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                      Patang Omniverse is building the future of entertainment, where AI and human creativity 
                      converge to create unprecedented experiences. Partner with us on this journey.
                    </p>
                    <Button className="bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90">
                      Request Private Investment Memo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InvestorDeck;