# 🚀 Getting Started with PulseCheck + Prisma + PostgreSQL

## ⚡ 5-Minute Setup

### Step 1: Create Database
```powershell
psql -U postgres -c "CREATE DATABASE pulsecheck;"
```

### Step 2: Configure
Edit `.env` - replace `YOUR_PASSWORD` with your postgres password:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pulsecheck?schema=public"
```

### Step 3: Initialize
```powershell
# Create tables
npx prisma migrate dev --name init

# Add demo data  
npx prisma db seed
```

### Step 4: Run
```powershell
npm run dev
```

Visit http://localhost:9002 and log in:
- **HR:** hr@pulsecheck.dev / password
- **Lead:** lead@pulsecheck.dev / password
- **Employee:** employee@pulsecheck.dev / password

---

## 📚 Documentation

- **[Quick Start Guide](./docs/QUICKSTART_PRISMA.md)** - Get running in 5 minutes
- **[Complete Integration Guide](./docs/PRISMA_INTEGRATION_COMPLETE.md)** - Full details
- **[Detailed Setup](./docs/PRISMA_SETUP.md)** - Comprehensive setup instructions
- **[New Features](./docs/NEW_FEATURES.md)** - Feature documentation

---

## ✨ What's Included

✅ **PostgreSQL Database** - All data persisted  
✅ **Prisma ORM** - Type-safe database access  
✅ **Notification System** - Real-time notifications  
✅ **Activity Logging** - Complete audit trail  
✅ **Employee Management** - Full CRUD operations  
✅ **Feedback System** - Employee feedback tracking  
✅ **Report Generation** - Data analytics  
✅ **Demo Data** - Pre-populated sample data  

---

## 🛠️ Useful Commands

```powershell
# View database in browser
npx prisma studio

# Reset database
npx prisma migrate reset

# Regenerate Prisma Client
npx prisma generate
```

---

## 🐛 Having Issues?

Check the [troubleshooting section](./docs/QUICKSTART_PRISMA.md#-troubleshooting) in the Quick Start guide.

Common fixes:
- Verify PostgreSQL is running: `pg_isready`
- Check your .env DATABASE_URL
- Ensure database exists: `psql -U postgres -l`

---

**Need more help?** See detailed guides in the `/docs` folder.
