import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  satisfactionScore: number;
  feedback?: FeedbackItem[];
}

interface FeedbackItem {
  id: string;
  feedback: string;
  sentiment: string;
  category: string;
  createdAt: Date;
}

interface EmployeesPageProps {
  employees: Employee[];
  feedback: any[];
  session: any;
}

export function EmployeesPage({ employees, feedback }: EmployeesPageProps) {
    return (
        <div className="grid gap-6">
             <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-headline text-3xl font-bold text-foreground">Manage Employees</h1>
                  <p className="text-muted-foreground">View, add, and manage employee information.</p>
                </div>
                <Button>
                  <PlusCircle className="mr-2" />
                  Add Employee
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Employees</CardTitle>
                    <CardDescription>A list of all employees in the organization.</CardDescription>
                </CardHeader>
                <CardContent>
                    {employees.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden md:table-cell">Department</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead className="hidden sm:table-cell">Satisfaction</TableHead>
                          <TableHead className="hidden lg:table-cell">Feedback</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employees.map((employee) => {
                          const employeeFeedback = employee.feedback || [];
                          const satisfactionColor = 
                            employee.satisfactionScore >= 80 ? 'text-green-600' :
                            employee.satisfactionScore >= 60 ? 'text-yellow-600' :
                            'text-red-600';

                          return (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-muted-foreground hidden sm:inline-block">{employee.email}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant="outline" className={cn("border-none text-xs", satisfactionColor)}>
                                {employee.satisfactionScore}%
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {employeeFeedback.length > 0 ? (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{employeeFeedback.length}</span>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">No feedback</span>
                              )}
                            </TableCell>
                          </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No employees found. Add employees to get started.</p>
                      </div>
                    )}
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{employees.length}</strong> of <strong>{employees.length}</strong> employees
                  </div>
                </CardFooter>
            </Card>
        </div>
    );
}