import { LeadFeedbackPage } from '@/components/lead-feedback-page';
import { getSession } from '@/lib/actions';
import { getFeedback } from '@/lib/db-actions';
import { redirect } from 'next/navigation';

export default async function LeadFeedback() {
  const session = await getSession();
  if (session?.user?.role !== 'lead') {
    redirect('/login');
  }

  // Fetch feedback from database
  const feedbackResult = await getFeedback();
  const feedback = feedbackResult.success ? feedbackResult.feedback : [];

  return (
    <LeadFeedbackPage feedback={feedback} session={session} />
  );
}
