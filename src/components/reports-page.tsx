'use client';

import { useState } from 'react';
import { generateReport } from '@/ai/flows/report-generation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const mockEmployees = [
  { id: 1, name: 'Alice Johnson', role: 'Software Engineer', department: 'Engineering' },
  { id: 2, name: 'Bob Williams', role: 'Product Manager', department: 'Product' },
  { id: 3, name: 'Charlie Brown', role: 'UX Designer', department: 'Design' },
  { id: 4, name: 'Diana Miller', role: 'Sales Executive', department: 'Sales' },
];

type ReportState = { [key: number]: { isLoading: boolean; report?: string } };

export function ReportsPage() {
    const [reports, setReports] = useState<ReportState>({});
    const { toast } = useToast();

    const handleGenerateReport = async (employee: typeof mockEmployees[0]) => {
      setReports(prev => ({
        ...prev,
        [employee.id]: { isLoading: true },
      }));

      try {
        const result = await generateReport({
          employeeName: employee.name,
          employeeRole: employee.role,
          employeeDepartment: employee.department,
        });
        setReports(prev => ({
          ...prev,
          [employee.id]: { isLoading: false, report: result.report },
        }));
      } catch (error) {
        console.error("Error generating report:", error);
        toast({
          title: "Error",
          description: "Failed to generate report. Please try again.",
          variant: "destructive",
        });
        setReports(prev => ({
          ...prev,
          [employee.id]: { isLoading: false },
        }));
      }
    };

    return (
        <div className="grid gap-6">
             <div>
                <h1 className="font-headline text-3xl font-bold text-foreground">Generate Reports</h1>
                <p className="text-muted-foreground">Select an employee to generate a personalized report using AI.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Employee List</CardTitle>
                    <CardDescription>Generate reports on satisfaction, engagement, and more.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {mockEmployees.map((employee) => {
                            const employeeReport = reports[employee.id];
                            return (
                                <AccordionItem value={`item-${employee.id}`} key={employee.id}>
                                    <div className="flex items-center gap-2">
                                      <AccordionTrigger className="flex-1">
                                        <div className="flex items-center justify-between w-full pr-4">
                                          <div className="text-left">
                                            <p className="font-medium">{employee.name}</p>
                                            <p className="text-sm text-muted-foreground">{employee.role} - {employee.department}</p>
                                          </div>
                                        </div>
                                      </AccordionTrigger>
                                      <Button
                                          size="sm"
                                          onClick={() => handleGenerateReport(employee)}
                                          disabled={employeeReport?.isLoading}
                                          className="shrink-0"
                                      >
                                          {employeeReport?.isLoading ? (
                                              <>
                                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                  Generating...
                                              </>
                                          ) : employeeReport?.report ? (
                                              <>
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                Regenerate
                                              </>
                                          ) : (
                                              <>
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                Generate Report
                                              </>
                                          )}
                                      </Button>
                                    </div>
                                    <AccordionContent>
                                      {employeeReport?.report ? (
                                          <div className="text-sm whitespace-pre-wrap p-4 bg-muted/50 rounded-md border-dashed border">
                                              <p>{employeeReport.report}</p>
                                          </div>
                                      ) : (
                                        <p className="text-sm text-muted-foreground italic px-4 py-2">Click "Generate Report" to create an AI-powered analysis for {employee.name}.</p>
                                      )}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
