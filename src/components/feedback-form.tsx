'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface FeedbackFormProps {
  employeeId: string;
  currentUserId: string;
}

export function FeedbackForm({ employeeId, currentUserId }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !sentiment || !feedback.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: employeeId,
          category,
          sentiment,
          feedback: feedback.trim(),
          authorId: currentUserId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Self-Review Submitted',
          description: 'Your self-review has been recorded successfully.',
        });
        
        // Reset form
        setCategory('');
        setSentiment('');
        setFeedback('');
      } else {
        throw new Error(result.error || 'Failed to submit feedback');
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Failed to submit self-review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Self-Review</CardTitle>
        <CardDescription>
          Share your thoughts about your own work experience, achievements, and areas for growth.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Team Culture">Team Culture</SelectItem>
                <SelectItem value="Career Growth">Career Growth</SelectItem>
                <SelectItem value="Work-Life Balance">Work-Life Balance</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Tools & Resources">Tools & Resources</SelectItem>
                <SelectItem value="Work Environment">Work Environment</SelectItem>
                <SelectItem value="Performance Reviews">Performance Reviews</SelectItem>
                <SelectItem value="Facilities">Facilities</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sentiment">Sentiment</Label>
            <Select value={sentiment} onValueChange={setSentiment}>
              <SelectTrigger id="sentiment">
                <SelectValue placeholder="Select sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="POSITIVE">Positive</SelectItem>
                <SelectItem value="NEUTRAL">Neutral</SelectItem>
                <SelectItem value="NEGATIVE">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Your Self-Review</Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts about your work experience, accomplishments, challenges, and areas for growth..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {feedback.length} characters
            </p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Self-Review'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
