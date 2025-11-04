import Link from 'next/link';
import { FeedbackSummarizer } from './feedback-summarizer';
import { SatisfactionScoreCard } from './satisfaction-score-card';
import { SatisfactionTrendCard } from './satisfaction-trend-card';
import { SegmentationCard } from './segmentation-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';

export function DashboardPage() {
    return (
        <div className="mx-auto grid w-full max-w-7xl auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-3">
                <h1 className="font-headline text-3xl font-bold text-foreground">Welcome back, HR Manager.</h1>
                <p className="text-muted-foreground">Here's your organization's pulse at a glance.</p>
            </div>
            
            <SatisfactionScoreCard />

            <SatisfactionTrendCard />
            
            <SegmentationCard />

            <Card className="lg:col-span-2 flex flex-col">
                <CardHeader>
                    <CardTitle>Feedback Summarizer</CardTitle>
                        <CardDescription>Use AI to instantly analyze and summarize employee feedback.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <FeedbackSummarizer />
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                        <FileText className="size-6" />
                    </div>
                    <div>
                        <CardTitle>Personalized Reports</CardTitle>
                        <CardDescription>Tailored insights for each employee.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">Generate personalized reports for employees, including engagement insights and suggestions based on their feedback and role.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full" variant="secondary">
                        <Link href="/hr-dashboard/reports">Generate Reports <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
