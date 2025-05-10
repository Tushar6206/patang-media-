import { useState, useEffect } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, ClipboardList, AtSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  interest: string;
  message: string;
  createdAt: string;
}

interface NewsletterSignup {
  id: number;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

  // Query for contact submissions
  const {
    data: contactSubmissions = [],
    isLoading: isLoadingContacts,
    refetch: refetchContacts,
  } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact-submissions'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/contact-submissions');
        const data = await response.json();
        return data.success ? data.data : [];
      } catch (error) {
        toast({
          title: 'Error loading contact submissions',
          description: 'Could not retrieve contact form submissions.',
          variant: 'destructive',
        });
        return [];
      }
    },
    enabled: !!user, // Only run if user is logged in
  });

  // Query for newsletter signups
  const {
    data: newsletterSignups = [],
    isLoading: isLoadingNewsletter,
    refetch: refetchNewsletter,
  } = useQuery<NewsletterSignup[]>({
    queryKey: ['/api/newsletter-signups'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/newsletter-signups');
        const data = await response.json();
        return data.success ? data.data : [];
      } catch (error) {
        toast({
          title: 'Error loading newsletter signups',
          description: 'Could not retrieve newsletter signups.',
          variant: 'destructive',
        });
        return [];
      }
    },
    enabled: !!user, // Only run if user is logged in
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // If user is not logged in, redirect to auth page
  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Admin Dashboard</h1>
        
        <Tabs defaultValue="contacts" className="mx-auto max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts">
              <ClipboardList className="h-4 w-4 mr-2" />
              Contact Submissions
            </TabsTrigger>
            <TabsTrigger value="newsletter">
              <AtSign className="h-4 w-4 mr-2" />
              Newsletter Signups
            </TabsTrigger>
          </TabsList>
          
          {/* Contact Submissions Tab */}
          <TabsContent value="contacts">
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Contact Form Submissions</CardTitle>
                    <CardDescription className="text-gray-400">
                      View all user contact form submissions
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetchContacts()}
                    disabled={isLoadingContacts}
                  >
                    {isLoadingContacts ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingContacts ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                  </div>
                ) : contactSubmissions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No contact form submissions yet</p>
                  </div>
                ) : (
                  <div>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableCaption>List of all contact form submissions</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactSubmissions.map((submission) => (
                            <TableRow 
                              key={submission.id}
                              className="cursor-pointer hover:bg-slate-800"
                              onClick={() => setSelectedContactId(submission.id)}
                            >
                              <TableCell className="text-xs">
                                {formatDate(submission.createdAt)}
                              </TableCell>
                              <TableCell>{submission.name}</TableCell>
                              <TableCell>{submission.email}</TableCell>
                              <TableCell>{submission.company || '-'}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{submission.interest}</Badge>
                              </TableCell>
                              <TableCell className="max-w-[200px] truncate">
                                {submission.message}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>

                    {selectedContactId && (
                      <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Selected Submission Details</h3>
                        {contactSubmissions
                          .filter(submission => submission.id === selectedContactId)
                          .map(submission => (
                            <div key={submission.id} className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-gray-400 text-sm">Date:</p>
                                  <p>{formatDate(submission.createdAt)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Name:</p>
                                  <p>{submission.name}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Email:</p>
                                  <p>{submission.email}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Company:</p>
                                  <p>{submission.company || '-'}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Interest:</p>
                                  <p>{submission.interest}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-400 text-sm">Message:</p>
                                <p className="p-3 bg-slate-700 rounded-md mt-1">{submission.message}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Newsletter Signups Tab */}
          <TabsContent value="newsletter">
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Newsletter Signups</CardTitle>
                    <CardDescription className="text-gray-400">
                      View all newsletter subscription emails
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetchNewsletter()}
                    disabled={isLoadingNewsletter}
                  >
                    {isLoadingNewsletter ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingNewsletter ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                  </div>
                ) : newsletterSignups.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No newsletter signups yet</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableCaption>List of all newsletter subscribers</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newsletterSignups.map((signup) => (
                          <TableRow key={signup.id}>
                            <TableCell>{formatDate(signup.createdAt)}</TableCell>
                            <TableCell>{signup.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}