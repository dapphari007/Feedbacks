# Quick Start Guide - Prisma + PostgreSQL Integration

## ⚡ Quick Setup (5 minutes)

### Step 1: Install PostgreSQL

**Windows:**
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer (remember your password!)
3. Use default settings (port 5432)

**Already installed?** Skip to Step 2

### Step 2: Create Database

Open PowerShell and run:

```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql, create database:
CREATE DATABASE pulsecheck;
\q
```

### Step 3: Configure Environment

Edit `.env` file - replace `YOUR_PASSWORD` with your postgres password:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pulsecheck?schema=public"
```

Example:
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/pulsecheck?schema=public"
```

### Step 4: Run Migrations

```powershell
# Create database tables
npx prisma migrate dev --name init

# Seed with demo data (optional but recommended)
npx prisma db seed
```

### Step 5: Start Application

```powershell
npm run dev
```

Visit http://localhost:9002 and log in with:
- **HR:** hr@pulsecheck.dev / password
- **Lead:** lead@pulsecheck.dev / password  
- **Employee:** employee@pulsecheck.dev / password

## ✅ What Changed?

### Before (localStorage):
- Notifications stored in browser
- Activity logs stored in browser
- Data lost on browser clear

### After (PostgreSQL):
- ✅ Notifications stored in database
- ✅ Activity logs stored in database
- ✅ Employees, Feedback, Reports in database
- ✅ Data persists across devices
- ✅ Multi-user support
- ✅ Real-time updates

## 🔧 Verify Setup

Open Prisma Studio to view your data:

```powershell
npx prisma studio
```

Visit http://localhost:5555 to browse your database visually.

## 📊 Database Models

- **User** - User accounts (HR, Lead, Employee)
- **Notification** - System notifications
- **ActivityLog** - User action tracking
- **Employee** - Employee records
- **Feedback** - Employee feedback
- **Report** - Generated reports

## 🎯 Key Features Now Using Database

### 1. Notifications
- Stored per user in database
- Accessible from any device
- Notification history preserved

### 2. Activity Logging
- All user actions tracked
- Query by user, date, action type
- Audit trail for compliance

### 3. Employee Management
- Full CRUD operations
- Search and filter
- Relationship tracking with feedback

### 4. Feedback System
- Link feedback to employees
- Track sentiment over time
- Category-based organization

### 5. Reporting
- Store generated reports
- Historical report access
- JSON data storage for flexibility

## 🛠️ Common Operations

### View Database in Browser
```powershell
npx prisma studio
```

### Reset Database
```powershell
npx prisma migrate reset
```

### Add New Field to Model
1. Edit `prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name add_new_field`

### Backup Database
```powershell
pg_dump -U postgres pulsecheck > backup.sql
```

### Restore Database
```powershell
psql -U postgres pulsecheck < backup.sql
```

## 🐛 Troubleshooting

### "Can't reach database server"
```powershell
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL service (Windows)
net start postgresql-x64-16
```

### "Authentication failed"
- Double-check password in `.env`
- Verify user exists: `psql -U postgres -c "\du"`

### "Database doesn't exist"
```powershell
psql -U postgres -c "CREATE DATABASE pulsecheck;"
```

### Clear and Restart
```powershell
# Drop and recreate
dropdb -U postgres pulsecheck
createdb -U postgres pulsecheck

# Run migrations
npx prisma migrate dev --name init

# Seed data
npx prisma db seed
```

## 📝 Using the Database in Code

### Server Actions (Already Created)

All database operations are in `src/lib/db-actions.ts`:

```typescript
// Notifications
createNotification(data)
getUserNotifications(userId)
markNotificationAsRead(id)

// Activity Logs
createActivityLog(data)
getActivityLogs(limit)

// Employees
createEmployee(data)
getEmployees(filters)
updateEmployee(id, data)

// Feedback
createFeedback(data)
getFeedback(filters)

// Reports
createReport(data)
getReports(filters)
```

### Example Usage

```typescript
import { createNotification, createActivityLog } from '@/lib/db-actions';

// Add notification
await createNotification({
  title: 'Welcome',
  message: 'Account created successfully',
  type: 'SUCCESS',
  userId: user.id,
});

// Log activity
await createActivityLog({
  action: 'create',
  description: 'created a new report',
  userId: user.id,
  userName: user.name,
  metadata: { reportId: report.id },
});
```

## 🚀 Next Steps

1. ✅ Database is set up
2. ✅ Data models created
3. ✅ Demo data seeded
4. ✅ Application connected

Now you can:
- Create employees
- Add feedback
- Generate reports
- Track activities
- Send notifications

All data is automatically saved to PostgreSQL!

## 📚 More Information

- Full setup guide: `docs/PRISMA_SETUP.md`
- Prisma documentation: https://www.prisma.io/docs
- PostgreSQL docs: https://www.postgresql.org/docs/

## 💡 Tips

1. Use Prisma Studio for quick data inspection
2. Run migrations before deploying
3. Backup database regularly
4. Use `npx prisma format` to format schema
5. Check `npx prisma --help` for all commands

---

**Need help?** Check `docs/PRISMA_SETUP.md` for detailed troubleshooting.
