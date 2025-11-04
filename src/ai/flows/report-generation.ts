'use server';

/**
 * @fileOverview An AI flow for generating personalized employee reports.
 *
 * - generateReport - A function that handles the report generation process.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateReportInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee.'),
  employeeRole: z.string().describe('The job title or role of the employee.'),
  employeeDepartment: z.string().describe('The department the employee works in.'),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  report: z.string().describe('A personalized report with engagement insights and development suggestions.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `You are an expert HR analyst. Generate a personalized employee engagement and development report.

The report should be encouraging and constructive.

Employee Details:
- Name: {{{employeeName}}}
- Role: {{{employeeRole}}}
- Department: {{{employeeDepartment}}}

Based on this information, provide:
1.  A summary of potential engagement drivers for someone in this role and department.
2.  Personalized development suggestions and growth opportunities.
3.  Actionable feedback suggestions for their manager to help them thrive.

Structure the output as a concise, professional report.`,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
