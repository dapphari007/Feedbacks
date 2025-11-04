"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Star } from 'lucide-react';
import { FeedbackForm } from '@/components/feedback-form';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';

interface FeedbackItem {
  id: string;
  feedback: string;
  sentiment: string;
  category: string;
  createdAt: Date;
  employee: {
    name: string;
    department: string;
    position: string;
  };
  author: {
    name: string;
    role: string;
  };
}

interface EmployeeDashboardPageProps {
  employeeId: string;
  session: any;
  myFeedback: FeedbackItem[];
}

export function EmployeeDashboardPage({ employeeId, session, myFeedback }: EmployeeDashboardPageProps) {
    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return 'bg-green-100 text-green-800 hover:bg-green-100';
            case 'NEGATIVE':
                return 'bg-red-100 text-red-800 hover:bg-red-100';
            case 'NEUTRAL':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
        }
    };

    return (
        <div className="grid gap-6">
             <div>
                <h1 className="font-headline text-3xl font-bold text-foreground">Employee Dashboard</h1>
                <p className="text-muted-foreground">Your personal space for feedback and team collaboration.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <MessageSquare className="size-6" />
                        </div>
                        <div>
                            <CardTitle>Welcome Back, {session?.user?.name}!</CardTitle>
                            <CardDescription>
                              Submit your self-review to share your thoughts and experiences.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* My Feedback Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                            <Star className="size-6" />
                        </div>
                        <div>
                            <CardTitle>Feedback About Me</CardTitle>
                            <CardDescription>
                                View feedback that others have shared about you ({myFeedback.length} total)
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {myFeedback.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No feedback yet. Keep up the great work!</p>
                    ) : (
                        <Accordion type="single" collapsible className="w-full">
                            {myFeedback.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-3 text-left">
                                            <Badge className={getSentimentColor(item.sentiment)}>
                                                {item.sentiment}
                                            </Badge>
                                            <span className="font-medium">{item.category}</span>
                                            <span className="text-sm text-muted-foreground">
                                                • {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-2 pt-2">
                                            <p className="text-sm">{item.feedback}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>From: {item.author.name} ({item.author.role})</span>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </CardContent>
            </Card>

            {/* Submit Self-Review Form */}
            <FeedbackForm 
              employeeId={employeeId} 
              currentUserId={session?.user?.id || ''} 
            />
        </div>
    );
}
