# GSF Vendor Escalation Workflow

A comprehensive ticket management system for handling service requests, vendor communications, and escalation workflows.

## Features

✅ **Ticket Management** - Track and manage service tickets with severity levels (SEV 1-5)  
✅ **Email Templates** - Pre-built templates for vendor communications  
✅ **Vendor Email Notifications** - Real-time alerts for incoming vendor responses  
✅ **Internal Communications** - Team collaboration between services and site staff  
✅ **Information Uploads** - Photo and proof of service documentation  
✅ **Audit Trail** - Complete history of all ticket changes  
✅ **Event Management** - Schedule and track service appointments  
✅ **Address Management** - Complete physical addresses for technician routing  

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)
- **Calendar:** React Big Calendar

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/gsf-vendor-escalation-workflow.git
cd gsf-vendor-escalation-workflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── ticket-list.tsx        # Ticket list and filtering
│   │   ├── ticket-details.tsx     # Ticket information display
│   │   ├── email-composer.tsx     # Email template system
│   │   ├── communications.tsx     # Team communications
│   │   ├── information-uploads.tsx # File upload management
│   │   ├── audit-trail.tsx        # Change history tracking
│   │   └── event-management.tsx   # Event scheduling
│   └── App.tsx                    # Main application
├── styles/
│   ├── theme.css                  # Tailwind theme
│   └── fonts.css                  # Font imports
└── index.tsx                      # Application entry point
```

## Usage Guide

### Managing Tickets

1. **View Tickets** - All tickets are displayed in the left sidebar
2. **Filter Tickets** - Use filters for severity, status, or vendor
3. **Select Ticket** - Click any ticket to view details
4. **Update Fields** - Click dropdowns to update SEV, Assignee, or Status
5. **Track Changes** - All updates are logged in the Audit Trail

### Email Communications

1. **Select Email Tab** - Navigate to "Email" tab
2. **Choose Template** - Select Initial Contact, Follow-up, Escalation, or Completion
3. **Review Details** - Template auto-populates with ticket info and address
4. **Send Email** - Click "Send Email" to log communication

### Vendor Notifications

1. **Simulate Email** - Click "Simulate Vendor Email" button (demo feature)
2. **View Notifications** - Red badge shows unread count
3. **Read Messages** - Vendor emails highlighted in blue
4. **Mark Read** - Click "Mark All Read" to clear notifications

### Event Scheduling

1. **Select Events Tab** - Navigate to "Events" tab
2. **View Calendar** - See all scheduled events
3. **Create Event** - Click "Create Event" button
4. **Manage Events** - View upcoming events list

### Information Uploads

1. **Select Info Tab** - Navigate to "Information" tab
2. **Upload Photos** - Drag/drop or click to upload images
3. **Add Proof** - Upload proof of service documents
4. **View Uploads** - See all attached files

## Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed AWS Amplify deployment instructions.

## Sample Data

The application includes three sample tickets:
- **MAV2** - Trash removal (SEV 2)
- **SEA9** - HVAC repair (SEV 1)
- **PDX3** - Plumbing repair (SEV 3)

Each ticket includes complete physical address information.

## Key Features Explained

### Severity Levels
- **SEV 1** - Critical, immediate attention required
- **SEV 2** - High priority, urgent response needed
- **SEV 3** - Medium priority, standard timeline
- **SEV 4** - Low priority, routine maintenance
- **SEV 5** - Very low priority, planned work

### Status Values
- **Open** - New ticket, not yet assigned
- **In Progress** - Actively being worked
- **Pending** - Waiting for external response
- **Resolved** - Completed successfully
- **Closed** - Archived

### Physical Address Format
All tickets include:
- Building number and location
- Street address
- City, State, ZIP code

This ensures technicians can locate the exact service location.

## Support

For issues or questions:
1. Check the DEPLOYMENT_GUIDE.md
2. Review the FILE_STRUCTURE.md
3. Contact your development team

## License

Internal Amazon tool - Proprietary

## Version

Version 1.0.0 - March 2026

---

**Built for GSF Procurement Operations Team**
