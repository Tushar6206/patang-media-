import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Coins, 
  Trophy, 
  BookOpen,
  Code,
  Palette,
  Music,
  Video,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react';

interface CareersSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  location: string;
  experience: string;
  rikoTokens: number;
  description: string;
  requirements: string[];
  benefits: string[];
  featured?: boolean;
}

interface InternshipProgram {
  id: string;
  name: string;
  duration: string;
  rikoTokens: number;
  description: string;
  tracks: string[];
  requirements: string[];
  outcomes: string[];
  icon: React.ReactNode;
}

export default function CareersSection({ onNavigate }: CareersSectionProps) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const jobOpenings: JobOpening[] = [
    {
      id: 'ai-engineer-intern',
      title: 'AI/ML Engineer Intern',
      department: 'Engineering',
      type: 'Internship',
      location: 'Remote/Hybrid',
      experience: 'Entry Level',
      rikoTokens: 2500,
      description: 'Join our AI team to develop cutting-edge machine learning models for music generation, voice synthesis, and visual creation. Work directly with our AI agents Stacy™, Kairo™, and Viya™.',
      requirements: [
        'Currently pursuing degree in Computer Science, AI, or related field',
        'Knowledge of Python, TensorFlow/PyTorch',
        'Understanding of neural networks and deep learning',
        'Experience with audio/visual processing (preferred)',
        'Strong mathematical foundation'
      ],
      benefits: [
        'Direct mentorship from senior AI engineers',
        'Access to cutting-edge AI infrastructure',
        'Opportunity to publish research',
        'Flexible working hours',
        '2500 RIKO token bonus upon completion'
      ],
      featured: true
    },
    {
      id: 'content-creator-intern',
      title: 'Digital Content Creator Intern',
      department: 'Creative',
      type: 'Internship',
      location: 'Los Angeles, CA',
      experience: 'Entry Level',
      rikoTokens: 1800,
      description: 'Create engaging content for our social media platforms, work with our AI agents to produce viral marketing campaigns, and develop creative strategies for brand partnerships.',
      requirements: [
        'Studying Marketing, Communications, or related field',
        'Portfolio of creative work (video, graphics, writing)',
        'Social media management experience',
        'Knowledge of video editing tools',
        'Understanding of current digital trends'
      ],
      benefits: [
        'Work with top-tier creative professionals',
        'Access to professional content creation tools',
        'Build portfolio with major brand campaigns',
        'Networking opportunities in entertainment',
        '1800 RIKO token reward'
      ]
    },
    {
      id: 'fullstack-engineer',
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      experience: 'Senior Level',
      rikoTokens: 5000,
      description: 'Lead development of our omniverse platform, working on both frontend experiences and backend AI infrastructure. Shape the future of AI-powered media creation.',
      requirements: [
        '5+ years full stack development experience',
        'Expertise in React, Node.js, TypeScript',
        'Experience with AI/ML integration',
        'Knowledge of cloud platforms (AWS/GCP)',
        'Database design and optimization skills'
      ],
      benefits: [
        'Competitive salary + equity',
        'Remote-first culture',
        'Top-tier health benefits',
        'Professional development budget',
        '5000 RIKO tokens annually'
      ],
      featured: true
    },
    {
      id: 'music-producer-intern',
      title: 'Music Production Intern',
      department: 'Audio',
      type: 'Internship',
      location: 'Los Angeles, CA',
      experience: 'Entry Level',
      rikoTokens: 2000,
      description: 'Work alongside our audio team and Stacy™ AI to produce music for major brand campaigns. Learn cutting-edge AI-assisted music production techniques.',
      requirements: [
        'Music production or audio engineering studies',
        'Proficiency in DAW software (Logic, Pro Tools, Ableton)',
        'Understanding of music theory',
        'Creative portfolio of original compositions',
        'Interest in AI music technology'
      ],
      benefits: [
        'Learn from Grammy-nominated producers',
        'Access to professional studio facilities',
        'Credits on major brand campaigns',
        'Music industry networking',
        '2000 RIKO token completion bonus'
      ]
    },
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Hybrid',
      experience: 'Mid Level',
      rikoTokens: 3500,
      description: 'Design intuitive interfaces for our AI-powered creative tools. Work closely with Kairo™ to create next-generation user experiences.',
      requirements: [
        '3+ years UI/UX design experience',
        'Proficiency in Figma, Adobe Creative Suite',
        'Experience with design systems',
        'Understanding of AI/ML user interfaces',
        'Portfolio demonstrating complex product design'
      ],
      benefits: [
        'Design tools and software budget',
        'Flexible hybrid working',
        'International design conference attendance',
        'Collaboration with world-class team',
        '3500 RIKO tokens quarterly'
      ]
    }
  ];

  const internshipPrograms: InternshipProgram[] = [
    {
      id: 'omniverse-academy',
      name: 'Omniverse Academy',
      duration: '12 weeks',
      rikoTokens: 3000,
      description: 'Comprehensive program covering AI, creative technologies, and business strategy. Work on real projects with our core team.',
      tracks: ['AI Engineering', 'Creative Technology', 'Business Strategy', 'Product Management'],
      requirements: [
        'Minimum 3.5 GPA',
        'Currently enrolled in relevant degree program',
        'Demonstrated passion for AI and creativity',
        'Strong communication skills',
        'Portfolio of relevant work'
      ],
      outcomes: [
        'Full-time job offers for top performers',
        'Industry-recognized certification',
        'Mentorship from C-level executives',
        'Published case study contributions',
        'Global network of Patang alumni'
      ],
      icon: <Trophy className="h-6 w-6" />
    },
    {
      id: 'ai-research-program',
      name: 'AI Research Fellowship',
      duration: '16 weeks',
      rikoTokens: 4000,
      description: 'Deep dive into cutting-edge AI research with potential for academic publication. Work on breakthrough technologies.',
      tracks: ['Neural Audio Processing', 'Computer Vision', 'Natural Language Processing', 'Generative AI'],
      requirements: [
        'Graduate level studies in AI/ML',
        'Published research experience',
        'Advanced mathematics background',
        'Programming expertise in Python/C++',
        'Academic recommendations'
      ],
      outcomes: [
        'Co-authorship on research papers',
        'Conference presentation opportunities',
        'PhD program recommendations',
        'Industry research position offers',
        'Access to proprietary AI datasets'
      ],
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: 'creative-incubator',
      name: 'Creative Technology Incubator',
      duration: '10 weeks',
      rikoTokens: 2500,
      description: 'For creative minds who want to explore the intersection of art and technology. Build the future of digital creativity.',
      tracks: ['Digital Art', 'Music Technology', 'Interactive Media', 'AR/VR Experiences'],
      requirements: [
        'Portfolio of creative work',
        'Basic programming knowledge',
        'Experience with creative software',
        'Vision for technology in arts',
        'Collaborative mindset'
      ],
      outcomes: [
        'Launch creative technology startup',
        'Exhibition in digital art galleries',
        'Collaboration with major artists',
        'Creative director opportunities',
        'Technology-art hybrid projects'
      ],
      icon: <Palette className="h-6 w-6" />
    }
  ];

  const rikoTokenBenefits = [
    {
      title: 'Ecosystem Access',
      description: 'Use RIKO tokens to access premium features across the Patang Omniverse platform',
      icon: <Globe className="h-5 w-5" />
    },
    {
      title: 'AI Agent Priority',
      description: 'Get priority queue access for interactions with Stacy™, Kairo™, and Viya™',
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: 'Exclusive Content',
      description: 'Access to premium templates, samples, and creative assets',
      icon: <Star className="h-5 w-5" />
    },
    {
      title: 'Trading & Rewards',
      description: 'Trade tokens with other users and earn rewards for platform contributions',
      icon: <Coins className="h-5 w-5" />
    }
  ];

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-[#0A0A14] to-[#121232] relative overflow-hidden">
      {/* Background elements */}
      <div className="shape-blob bg-[#2979FF]/10 w-96 h-96 -left-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#8E24AA]/10 w-80 h-80 -right-40 bottom-20 blur-2xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#2979FF]/20 text-[#2979FF] hover:bg-[#2979FF]/30 backdrop-blur-sm">
            JOIN THE REVOLUTION
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient">
            Build the Future with Us
          </h2>
          <p className="text-xl text-gray-300">
            Join Patang Omniverse and shape the next generation of AI-powered creativity. 
            Earn RIKO tokens while building groundbreaking technology.
          </p>
        </motion.div>

        <Tabs defaultValue="openings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="openings">Job Openings</TabsTrigger>
            <TabsTrigger value="internships">Internship Programs</TabsTrigger>
            <TabsTrigger value="riko">RIKO Token Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="openings">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`h-full bg-[#1E1E1E] border-[#2A2A4A] hover:border-[#2979FF]/50 transition-all duration-300 ${job.featured ? 'ring-2 ring-[#2979FF]/30' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <CardTitle className="text-white text-lg mb-2">{job.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {job.department}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${job.type === 'Internship' ? 'border-[#00BCD4] text-[#00BCD4]' : 'border-[#2979FF] text-[#2979FF]'}`}
                            >
                              {job.type}
                            </Badge>
                            {job.featured && (
                              <Badge className="text-xs bg-[#FF5722] text-white">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-[#00BCD4]">
                            <Coins className="h-4 w-4" />
                            <span className="text-sm font-bold">{job.rikoTokens}</span>
                          </div>
                          <span className="text-xs text-gray-400">RIKO</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                        {job.description}
                      </CardDescription>
                      
                      <Button 
                        className="w-full bg-[#2979FF] hover:bg-[#1976D2] text-white"
                        onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                      >
                        {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      
                      {selectedJob === job.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-[#2A2A4A]"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-white font-semibold mb-2">Requirements:</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#2979FF] mt-1">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-semibold mb-2">Benefits:</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                {job.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#00BCD4] mt-1">•</span>
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <Button 
                              className="w-full bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90"
                              onClick={() => window.open('mailto:careers@patangomniverse.com?subject=Application for ' + job.title, '_blank')}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="internships">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {internshipPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] border-[#2979FF]/30 hover:border-[#2979FF]/70 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-[#2979FF]/20 rounded-lg text-[#2979FF]">
                          {program.icon}
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">{program.name}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="border-[#00BCD4] text-[#00BCD4]">
                              {program.duration}
                            </Badge>
                            <div className="flex items-center gap-1 text-[#00BCD4]">
                              <Coins className="h-4 w-4" />
                              <span className="font-bold">{program.rikoTokens} RIKO</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <CardDescription className="text-gray-300">
                        {program.description}
                      </CardDescription>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-3">Program Tracks:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {program.tracks.map((track, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs justify-center">
                              {track}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-3">Key Outcomes:</h4>
                        <ul className="text-sm text-gray-300 space-y-2">
                          {program.outcomes.slice(0, 3).map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-[#2979FF] mt-0.5 flex-shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-[#2979FF] to-[#8E24AA] hover:opacity-90"
                        onClick={() => window.open('mailto:internships@patangomniverse.com?subject=Application for ' + program.name, '_blank')}
                      >
                        Apply for Program
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="riko">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 p-6 bg-gradient-to-r from-[#00BCD4]/20 to-[#2979FF]/20 rounded-2xl border border-[#00BCD4]/30 mb-8">
                  <Coins className="h-12 w-12 text-[#00BCD4]" />
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-white">RIKO Token</h3>
                    <p className="text-gray-300">Web3-based rewards for the Patang ecosystem</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  RIKO tokens are our Web3-based reward system that recognizes your contributions to the Patang Omniverse. 
                  Earn tokens through work, use them for platform benefits, and participate in our decentralized creative economy.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {rikoTokenBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-[#1E1E1E] border-[#2A2A4A] hover:border-[#00BCD4]/50 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#00BCD4]/20 rounded-lg text-[#00BCD4] flex-shrink-0">
                            {benefit.icon}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg mb-2">{benefit.title}</h4>
                            <p className="text-gray-300">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-[#2979FF]/10 to-[#00BCD4]/10 border-[#2979FF]/30">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                    Earn RIKO Tokens Today
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Start your journey with Patang Omniverse. Every role comes with RIKO token rewards, 
                    from internships to full-time positions. Join our ecosystem and help build the future of AI creativity.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-[#2979FF] hover:bg-[#1976D2] text-white"
                      onClick={() => window.open('mailto:careers@patangomniverse.com', '_blank')}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Explore Careers
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4]/10"
                      onClick={() => window.open('mailto:internships@patangomniverse.com', '_blank')}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Apply for Internship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}