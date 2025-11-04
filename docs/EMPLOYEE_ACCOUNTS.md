# Employee Account System - Complete Guide

## 🎉 What's New

### Individual Employee Accounts
Each employee now has their own user account and can:
- ✅ Log in with their email
- ✅ Submit feedback about colleagues
- ✅ View feedback **only about themselves**
- ✅ **Cannot** see feedback about other employees
- ✅ **Cannot** access Lead or HR dashboards

### Security & Privacy
- **Employees**: Can only view feedback about themselves
- **Leads**: Can view all team feedback
- **HR**: Can view all employees and feedback counts
- **Role-based access**: Each dashboard is protected by role authentication

---

## 👥 User Accounts

### Management Accounts
| Role | Email | Password | Access |
|------|-------|----------|--------|
| HR | hr@pulsecheck.dev | password | All HR features, employee management, reports |
| Lead | lead@pulsecheck.dev | password | Team feedback, performance tracking |

### Employee Accounts
| Name | Email | Password | Department | Position |
|------|-------|----------|------------|----------|
| John Doe | john.doe@company.com | password | Engineering | Senior Developer |
| Jane Smith | jane.smith@company.com | password | Marketing | Marketing Manager |
| Bob Johnson | bob.johnson@company.com | password | Sales | Sales Representative |
| Alice Williams | alice.williams@company.com | password | Engineering | Frontend Developer |
| Charlie Brown | charlie.brown@company.com | password | Design | UX Designer |

---

## 🔒 Access Control

### Employee Dashboard
**URL**: `/employee-dashboard`

**Who can access**: Only users with `EMPLOYEE` role

**Features**:
1. **Feedback About Me** section
   - Shows only feedback submitted about the logged-in employee
   - Color-coded sentiment badges (Positive/Neutral/Negative)
   - Category labels
   - Author information (who submitted the feedback)
   - Timestamps (relative time)
   - Accordion interface for easy browsing

2. **Submit Feedback** section
   - Select any colleague (excluding yourself)
   - Choose category (Team Culture, Career Growth, etc.)
   - Select sentiment
   - Write detailed feedback
   - Submit to database

**Privacy**:
- ❌ Cannot see feedback about other employees
- ❌ Cannot access Lead dashboard
- ❌ Cannot access HR dashboard
- ✅ Can only view their own feedback
- ✅ Can submit feedback about colleagues

---

### Lead Dashboard
**URL**: `/lead-dashboard/feedback`

**Who can access**: Only users with `LEAD` role

**Features**:
- View **all** feedback from the database
- See employee details (name, department, position)
- View sentiment and category
- See who submitted each feedback
- Filter and search capabilities

**Privacy**:
- ✅ Can view all team feedback
- ❌ Cannot access HR-specific features

---

### HR Dashboard
**URL**: `/hr-dashboard/employees`

**Who can access**: Only users with `HR` role

**Features**:
- View all employees
- See satisfaction scores
- View feedback count per employee
- Access to reports and analytics
- Employee management

**Privacy**:
- ✅ Full access to all data
- ✅ Can see aggregated feedback metrics

---

## 🧪 Testing Scenarios

### Scenario 1: Employee Submits Feedback
1. Login as: `john.doe@company.com` / `password`
2. Go to Employee Dashboard
3. Submit feedback about Jane Smith:
   - Category: "Team Culture"
   - Sentiment: "Positive"
   - Feedback: "Great collaboration on the project"
4. Click "Submit Feedback"
5. See success notification

### Scenario 2: Employee Views Their Own Feedback
1. Login as: `alice.williams@company.com` / `password`
2. Go to Employee Dashboard
3. See "Feedback About Me" section
4. View feedback that Lead/HR submitted about Alice
5. **Cannot** see feedback about other employees

### Scenario 3: Lead Views All Feedback
1. Login as: `lead@pulsecheck.dev` / `password`
2. Navigate to "Team Feedback"
3. See **all** feedback including:
   - Feedback from the seed data
   - New feedback submitted by employees
4. Filter by sentiment, category, or employee

### Scenario 4: HR Views Employee Overview
1. Login as: `hr@pulsecheck.dev` / `password`
2. Navigate to "Manage Employees"
3. See all 5 employees
4. View satisfaction scores
5. See feedback count for each employee

### Scenario 5: Access Control Test
1. Login as: `bob.johnson@company.com` / `password`
2. Try to access `/lead-dashboard` → **Redirected to login**
3. Try to access `/hr-dashboard` → **Redirected to login**
4. Can only access `/employee-dashboard` ✅

---

## 📊 Database Structure

### Employee Feedback Flow
```
Employee submits feedback
         ↓
API: /api/feedback
         ↓
createFeedback() saves to database
         ↓
Feedback linked to:
  - Employee (who it's about)
  - Author (who submitted it)
         ↓
Displayed based on user role:
  - Employee: Only their own feedback
  - Lead: All team feedback
  - HR: All feedback + metrics
```

### Seed Data
The database includes 8 sample feedback entries:
- **3 Positive** sentiments
- **3 Neutral** sentiments
- **2 Negative** sentiments
- Across **8 different categories**
- From **Lead** and **HR** users
- About various employees

---

## 🎯 Key Features

### For Employees
✅ **Privacy First**: Only see feedback about yourself
✅ **Easy Submission**: Simple form to provide feedback
✅ **Full Context**: See who submitted feedback and when
✅ **Organized View**: Accordion interface with color-coded sentiments

### For Leads
✅ **Complete Visibility**: View all team feedback
✅ **Rich Details**: Employee info, sentiment, category
✅ **Author Tracking**: Know who submitted each feedback
✅ **Time-based Sorting**: Most recent feedback first

### For HR
✅ **Employee Overview**: All employees with metrics
✅ **Satisfaction Scores**: Color-coded performance indicators
✅ **Feedback Counts**: Quick overview of feedback volume
✅ **Department Organization**: Structured employee list

---

## 🔄 Workflow Examples

### Daily Employee Check-in
1. Employee logs in to their dashboard
2. Checks "Feedback About Me" section for new feedback
3. Reads feedback from Lead/HR/colleagues
4. Submits feedback about a colleague they worked with
5. Logs out

### Weekly Lead Review
1. Lead logs in to dashboard
2. Navigates to "Team Feedback"
3. Reviews all new feedback from the week
4. Identifies trends (positive/negative patterns)
5. Plans follow-up conversations with team members

### Monthly HR Analysis
1. HR logs in to dashboard
2. Views "Manage Employees" page
3. Reviews satisfaction scores across departments
4. Checks feedback counts to identify engagement levels
5. Generates reports for leadership

---

## 🛡️ Security Features

### Authentication
- ✅ Session-based authentication with cookies
- ✅ Role-based access control (RBAC)
- ✅ Protected routes with redirects
- ✅ Automatic session validation

### Authorization
- ✅ Role checking on every dashboard page
- ✅ Data filtering based on user role
- ✅ API endpoint validation
- ✅ Database-level user/role management

### Data Privacy
- ✅ Employees see only their own feedback
- ✅ No cross-employee data leakage
- ✅ Author information preserved
- ✅ Audit trail with timestamps

---

## 📝 Sample Data in Database

After seeding, you'll have:
- **2 Management Users**: HR, Lead
- **5 Employee Users**: John, Jane, Bob, Alice, Charlie
- **8 Feedback Entries**: Various sentiments and categories
- **2 Activity Logs**: Sample system actions
- **2 Notifications**: Welcome messages
- **1 Report**: Monthly satisfaction report

---

## 🚀 Quick Start

### 1. Start the Application
```powershell
npm run dev
```

### 2. Test Employee Accounts
- Login as: `john.doe@company.com` / `password`
- View your feedback
- Submit feedback about Jane

### 3. Test Lead Account
- Login as: `lead@pulsecheck.dev` / `password`
- View all team feedback
- See feedback from John

### 4. Test HR Account
- Login as: `hr@pulsecheck.dev` / `password`
- View all employees
- Check satisfaction scores

---

## ✅ Summary

The system now provides:
1. **Individual accounts** for each employee
2. **Privacy-first** feedback viewing (employees see only their own)
3. **Role-based access** to different dashboards
4. **Complete feedback tracking** from submission to viewing
5. **Secure authentication** with proper authorization

All data is stored in PostgreSQL and properly separated by user roles!
