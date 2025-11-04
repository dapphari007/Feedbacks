import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface FeedbackItem {
  id: string;
  feedback: string;
  sentiment: string;
  category: string;
  createdAt: Date;
  employee: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
  author: {
    name: string;
    email: string;
  };
}

interface LeadFeedbackPageProps {
  feedback: FeedbackItem[];
  session: any;
}

export function LeadFeedbackPage({ feedback }: LeadFeedbackPageProps) {
    return (
        <div className="grid gap-6">
             <div>
                <h1 className="font-headline text-3xl font-bold text-foreground">Team Feedback</h1>
                <p className="text-muted-foreground">Review and address feedback from your team members.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Feedback Inbox</CardTitle>
                    <CardDescription>Recent anonymous submissions from your team.</CardDescription>
                </CardHeader>
                <CardContent>
                    {feedback.length > 0 ? (
                         <Accordion type="single" collapsible className="w-full">
                             {feedback.map(item => {
                                const sentimentVariant = 
                                  item.sentiment === 'POSITIVE' ? 'default' : 
                                  item.sentiment === 'NEGATIVE' ? 'destructive' : 
                                  'secondary';
                                
                                const sentimentDisplay = 
                                  item.sentiment === 'POSITIVE' ? 'Positive' :
                                  item.sentiment === 'NEGATIVE' ? 'Negative' :
                                  'Neutral';

                                return (
                                 <AccordionItem value={`item-${item.id}`} key={item.id}>
                                     <AccordionTrigger>
                                         <div className="flex items-center justify-between w-full pr-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="hidden h-9 w-9 sm:flex">
                                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${item.employee.email}`} alt={item.employee.name} />
                                                    <AvatarFallback>{item.employee.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-left">
                                                    <p className="font-medium">{item.category}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                      {item.employee.name} ({item.employee.department}) - {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant={sentimentVariant}>
                                                {sentimentDisplay}
                                            </Badge>
                                         </div>
                                     </AccordionTrigger>
                                     <AccordionContent>
                                         <p className="text-sm whitespace-pre-wrap p-4 bg-muted/50 rounded-md border-dashed border">{item.feedback}</p>
                                         <p className="text-xs text-muted-foreground mt-2 px-4">
                                           Submitted by: {item.author.name} ({item.author.email})
                                         </p>
                                     </AccordionContent>
                                 </AccordionItem>
                                );
                             })}
                         </Accordion>
                    ) : (
                        <p className="text-center text-sm text-muted-foreground py-8">No feedback has been submitted yet. Feedback will appear here once team members submit it.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
