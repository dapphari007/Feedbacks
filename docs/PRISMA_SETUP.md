# Prisma + PostgreSQL Setup Guide

This guide will help you set up PostgreSQL and Prisma for the PulseCheck application.

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL installed locally or access to a PostgreSQL database

## Installation Steps

### 1. Install PostgreSQL (if not already installed)

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Run the installer and remember your postgres user password
- Default port: 5432

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### 2. Create Database

Open PostgreSQL terminal (psql):

```bash
# Windows: Open SQL Shell (psql) from Start Menu
# Mac/Linux: Run this command
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE pulsecheck;
\q
```

### 3. Update Environment Variables

Edit `.env` file and update the DATABASE_URL with your actual credentials:

```env
# Replace these values:
# USER: your postgres username (default: postgres)
# PASSWORD: your postgres password
# HOST: your database host (default: localhost)
# PORT: your database port (default: 5432)
# DATABASE: pulsecheck

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pulsecheck?schema=public"
```

**Example:**
If your postgres password is `mypass123`:
```env
DATABASE_URL="postgresql://postgres:mypass123@localhost:5432/pulsecheck?schema=public"
```

### 4. Run Prisma Migrations

This will create all the tables in your database:

```powershell
npx prisma migrate dev --name init
```

This command will:
- Create a new migration
- Apply it to your database
- Generate Prisma Client

### 5. Seed the Database (Optional)

You can add some initial data by creating a seed script.

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  const leadUser = await prisma.user.upsert({
    where: { email: 'lead@pulsecheck.dev' },
    update: {},
    create: {
      email: 'lead@pulsecheck.dev',
      name: 'Team Lead',
      role: 'LEAD',
    },
  });

  const employeeUser = await prisma.user.upsert({
    where: { email: 'employee@pulsecheck.dev' },
    update: {},
    create: {
      email: 'employee@pulsecheck.dev',
      name: 'Sample Employee',
      role: 'EMPLOYEE',
    },
  });

  // Create demo employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        position: 'Senior Developer',
        satisfactionScore: 85,
      },
    }),
    prisma.employee.create({
      data: {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Marketing',
        position: 'Marketing Manager',
        satisfactionScore: 92,
      },
    }),
    prisma.employee.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob.johnson@company.com',
        department: 'Sales',
        position: 'Sales Representative',
        satisfactionScore: 78,
      },
    }),
  ]);

  console.log('Database seeded successfully!');
  console.log({ hrUser, leadUser, employeeUser, employees });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run the seed:

```powershell
npx prisma db seed
```

### 6. Verify Setup

Open Prisma Studio to view your database:

```powershell
npx prisma studio
```

This will open a browser window at http://localhost:5555 where you can view and edit your data.

## Database Schema

The following tables are created:

- **users** - User accounts with roles (HR, LEAD, EMPLOYEE)
- **notifications** - User notifications
- **activity_logs** - Activity tracking
- **employees** - Employee records
- **feedback** - Employee feedback entries
- **reports** - Generated reports

## Common Commands

```powershell
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations to production
npx prisma migrate deploy

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Format Prisma schema
npx prisma format
```

## Troubleshooting

### Error: "Can't reach database server"

- Check if PostgreSQL is running
- Verify your DATABASE_URL in `.env`
- Check firewall settings
- Try: `pg_isready` to check PostgreSQL status

### Error: "Authentication failed"

- Double-check your password in DATABASE_URL
- Make sure the user exists: `psql -U postgres -c "\du"`

### Error: "Database doesn't exist"

- Create the database: `psql -U postgres -c "CREATE DATABASE pulsecheck;"`

### Reset Everything

If you need to start fresh:

```powershell
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS pulsecheck;"
psql -U postgres -c "CREATE DATABASE pulsecheck;"

# Run migrations again
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

## Using Prisma in Development

The application now uses Prisma for all database operations. The key changes:

1. **Notifications** - Stored in PostgreSQL instead of localStorage
2. **Activity Logs** - Stored in PostgreSQL instead of localStorage
3. **Employees, Feedback, Reports** - All stored in PostgreSQL

### Initializing User Context

After login, the application automatically:
1. Creates/updates user in database
2. Sets userId in notification context
3. Tracks all user activities

## Production Deployment

For production, you'll want to use a hosted PostgreSQL service:

- **Vercel**: Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- **Railway**: [Railway PostgreSQL](https://railway.app/)
- **Supabase**: [Supabase Database](https://supabase.com/)
- **AWS RDS**: [Amazon RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/)
- **Heroku**: [Heroku Postgres](https://www.heroku.com/postgres)

Update your DATABASE_URL environment variable with the production connection string.

## Security Notes

⚠️ **Important:**
- Never commit your `.env` file
- Use strong passwords for production
- Enable SSL for production databases
- Consider using connection pooling (PgBouncer)
- Regularly backup your database

## Next Steps

1. Update DATABASE_URL in `.env`
2. Run migrations: `npx prisma migrate dev`
3. Start the development server: `npm run dev`
4. Log in and test the features

All notifications and activity logs will now be persisted to PostgreSQL!
