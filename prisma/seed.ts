import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create demo users
  const hrUser = await prisma.user.upsert({
    where: { email: 'hr@pulsecheck.dev' },
    update: {},
    create: {
      email: 'hr@pulsecheck.dev',
      name: 'HR Manager',
      role: 'HR',
    },
  });
  console.log('✓ Created HR user');

  const leadUser = await prisma.user.upsert({
    where: { email: 'lead@pulsecheck.dev' },
    update: {},
    create: {
      email: 'lead@pulsecheck.dev',
      name: 'Team Lead',
      role: 'LEAD',
    },
  });
  console.log('✓ Created Lead user');

  // Create demo employees with their user accounts
  // John Doe
  const johnUser = await prisma.user.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      email: 'john.doe@company.com',
      name: 'John Doe',
      role: 'EMPLOYEE',
    },
  });

  const john = await prisma.employee.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      satisfactionScore: 85,
    },
  });

  // Jane Smith
  const janeUser = await prisma.user.upsert({
    where: { email: 'jane.smith@company.com' },
    update: {},
    create: {
      email: 'jane.smith@company.com',
      name: 'Jane Smith',
      role: 'EMPLOYEE',
    },
  });

  const jane = await prisma.employee.upsert({
    where: { email: 'jane.smith@company.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      satisfactionScore: 92,
    },
  });

  // Bob Johnson
  const bobUser = await prisma.user.upsert({
    where: { email: 'bob.johnson@company.com' },
    update: {},
    create: {
      email: 'bob.johnson@company.com',
      name: 'Bob Johnson',
      role: 'EMPLOYEE',
    },
  });

  const bob = await prisma.employee.upsert({
    where: { email: 'bob.johnson@company.com' },
    update: {},
    create: {
      name: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      satisfactionScore: 78,
    },
  });

  // Alice Williams
  const aliceUser = await prisma.user.upsert({
    where: { email: 'alice.williams@company.com' },
    update: {},
    create: {
      email: 'alice.williams@company.com',
      name: 'Alice Williams',
      role: 'EMPLOYEE',
    },
  });

  const alice = await prisma.employee.upsert({
    where: { email: 'alice.williams@company.com' },
    update: {},
    create: {
      name: 'Alice Williams',
      email: 'alice.williams@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      satisfactionScore: 88,
    },
  });

  // Charlie Brown
  const charlieUser = await prisma.user.upsert({
    where: { email: 'charlie.brown@company.com' },
    update: {},
    create: {
      email: 'charlie.brown@company.com',
      name: 'Charlie Brown',
      role: 'EMPLOYEE',
    },
  });

  const charlie = await prisma.employee.upsert({
    where: { email: 'charlie.brown@company.com' },
    update: {},
    create: {
      name: 'Charlie Brown',
      email: 'charlie.brown@company.com',
      department: 'Design',
      position: 'UX Designer',
      satisfactionScore: 90,
    },
  });

  console.log('✓ Created 5 employees with user accounts');

  // Create sample feedback
  await prisma.feedback.createMany({
    data: [
      {
        feedback: 'Great team collaboration and supportive environment. Everyone is willing to help each other out.',
        sentiment: 'POSITIVE',
        category: 'Team Culture',
        employeeId: john.id,
        authorId: leadUser.id,
      },
      {
        feedback: 'Would like more opportunities for professional development and training programs.',
        sentiment: 'NEUTRAL',
        category: 'Career Growth',
        employeeId: jane.id,
        authorId: leadUser.id,
      },
      {
        feedback: 'Excellent work-life balance and flexible hours. Very satisfied with remote work options.',
        sentiment: 'POSITIVE',
        category: 'Work-Life Balance',
        employeeId: alice.id,
        authorId: leadUser.id,
      },
      {
        feedback: 'The new project management tools are not very intuitive. Need better documentation.',
        sentiment: 'NEGATIVE',
        category: 'Tools & Resources',
        employeeId: bob.id,
        authorId: leadUser.id,
      },
      {
        feedback: 'Really enjoying the creative freedom in design work. Great to see our ideas being implemented.',
        sentiment: 'POSITIVE',
        category: 'Work Environment',
        employeeId: charlie.id,
        authorId: leadUser.id,
      },
      {
        feedback: 'Communication between departments could be improved. Sometimes unclear about project priorities.',
        sentiment: 'NEUTRAL',
        category: 'Communication',
        employeeId: john.id,
        authorId: hrUser.id,
      },
      {
        feedback: 'The quarterly reviews are very helpful. Good feedback and clear goals.',
        sentiment: 'POSITIVE',
        category: 'Performance Reviews',
        employeeId: jane.id,
        authorId: hrUser.id,
      },
      {
        feedback: 'Office facilities are great but could use more meeting rooms during peak hours.',
        sentiment: 'NEUTRAL',
        category: 'Facilities',
        employeeId: alice.id,
        authorId: hrUser.id,
      },
    ],
  });

  console.log('✓ Created 8 sample feedback entries');

  // Create sample activity logs
  await prisma.activityLog.create({
    data: {
      action: 'login',
      description: 'logged into the system',
      userId: hrUser.id,
      userName: hrUser.name,
    },
  });

  await prisma.activityLog.create({
    data: {
      action: 'create',
      description: 'added a new employee',
      userId: hrUser.id,
      userName: hrUser.name,
      metadata: { employeeId: john.id },
    },
  });

  console.log('✓ Created sample activity logs');

  // Create sample notifications
  await prisma.notification.create({
    data: {
      title: 'Welcome to PulseCheck',
      message: 'Your account has been set up successfully.',
      type: 'INFO',
      userId: hrUser.id,
    },
  });

  await prisma.notification.create({
    data: {
      title: 'New Feedback Submitted',
      message: 'Team Lead has submitted feedback for John Doe.',
      type: 'SUCCESS',
      userId: hrUser.id,
      actionUrl: '/hr-dashboard',
    },
  });

  console.log('✓ Created sample notifications');

  // Create sample report
  await prisma.report.create({
    data: {
      title: 'Monthly Satisfaction Report - November 2025',
      type: 'Satisfaction',
      data: {
        averageScore: 86.6,
        totalEmployees: 5,
        byDepartment: {
          Engineering: 86.5,
          Marketing: 92,
          Sales: 78,
          Design: 90,
        },
      },
      createdById: hrUser.id,
    },
  });

  console.log('✓ Created sample report');

  console.log('\n✅ Database seeded successfully!');
  console.log('\nDemo Accounts (all passwords: "password"):');
  console.log('  HR:       hr@pulsecheck.dev');
  console.log('  Lead:     lead@pulsecheck.dev');
  console.log('\nEmployee Accounts:');
  console.log('  John Doe:     john.doe@company.com');
  console.log('  Jane Smith:   jane.smith@company.com');
  console.log('  Bob Johnson:  bob.johnson@company.com');
  console.log('  Alice Williams: alice.williams@company.com');
  console.log('  Charlie Brown: charlie.brown@company.com');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
