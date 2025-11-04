import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Users, UserCheck, ArrowRight } from 'lucide-react';
import { SatisfactionScoreCard } from './satisfaction-score-card';
import { SatisfactionTrendCard } from './satisfaction-trend-card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Button } from './ui/button';

const teamMembers = [
    { name: 'Alice Johnson', role: 'Software Engineer', avatar: 'alice.j@pulsecheck.dev' },
    { name: 'Bob Williams', role: 'Product Manager', avatar: 'bob.w@pulsecheck.dev' },
    { name: 'Charlie Brown', role: 'UX Designer', avatar: 'charlie.b@pulsecheck.dev' },
];

export function LeadDashboardPage() {
    return (
        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
             <div className="lg:col-span-3">
                <h1 className="font-headline text-3xl font-bold text-foreground">Team Lead Dashboard</h1>
                <p className="text-muted-foreground">An overview of your team's pulse.</p>
            </div>
            
            <SatisfactionScoreCard />
            
            <div className="lg:col-span-2">
                <SatisfactionTrendCard />
            </div>

            <Card className="lg:col-span-2 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <Users className="size-6" />
                        </div>
                        <div>
                            <CardTitle>My Team</CardTitle>
                            <CardDescription>A list of your direct reports.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-4">
                       {teamMembers.map(member => (
                           <li key={member.name} className="flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                   <Avatar>
                                       <AvatarImage src={`https://i.pravatar.cc/150?u=${member.avatar}`} alt={member.name} />
                                       <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                   </Avatar>
                                   <div>
                                       <p className="font-medium">{member.name}</p>
                                       <p className="text-sm text-muted-foreground">{member.role}</p>
                                   </div>
                               </div>
                               <Button variant="outline" size="sm">View Profile</Button>
                           </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <UserCheck className="size-6" />
                        </div>
                        <div>
                            <CardTitle>Review Feedback</CardTitle>
                            <CardDescription>See what your team is saying.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                   <p className="text-sm text-muted-foreground">Check in on recent feedback submissions from your team to stay informed and proactive.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full" variant="secondary">
                        <Link href="/lead-dashboard/feedback">View Feedback <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
