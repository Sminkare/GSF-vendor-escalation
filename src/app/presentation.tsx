import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { cn } from "./components/ui/utils";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  notes?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "GSF Vendor Escalation Workflow Tool",
    subtitle: "Automating Manual Processes & Reducing Touch Points",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-slate-900">
            GSF Vendor Escalation
            <br />
            Workflow Tool
          </h1>
          <p className="text-2xl text-slate-600">
            Automating Manual Processes & Reducing Touch Points
          </p>
        </div>
        <div className="mt-12 text-xl text-slate-500">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Current Challenges with Manual Vendor Escalations",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Current Challenges</h2>
        <div className="grid gap-6">
          {[
            "Manual ticket review across multiple systems",
            "Time-consuming email composition (finding templates, vendor contacts)",
            "No centralized tracking of vendor communications",
            "Manual status updates and reporting",
            "Difficult to track escalation metrics",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <span className="text-3xl">❌</span>
              <p className="text-xl text-slate-700 pt-1">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-slate-100 rounded-lg">
          <p className="text-lg text-slate-700">
            <strong>Current Impact:</strong> Team spends <strong>25-45 minutes per ticket</strong> on manual coordination
            <br />
            <strong>20-50 tickets/week</strong> = <strong className="text-red-600">8-37 hours/week</strong> of manual work
          </p>
        </div>
      </div>
    ),
    notes: "Emphasize the lack of visibility and time burden on the team",
  },
  {
    id: 3,
    title: "The Solution",
    subtitle: "Automated Vendor Escalation Workflow",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">The Solution</h2>
        <div className="grid gap-6">
          {[
            "Centralized ticket queue with all information visible",
            "One-click email templates (initial contact, follow-up, escalation)",
            "Automated communication tracking",
            "Real-time analytics dashboard",
            "Complete audit trail for every escalation",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <span className="text-3xl">✅</span>
              <p className="text-xl text-slate-700 pt-1">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-lg text-slate-700">
            <strong>Built as standalone AWS-hosted application</strong>
            <br />
            No dependency on internal API access • Clean, intuitive interface designed for GSF workflows
          </p>
        </div>
      </div>
    ),
    notes: "Highlight that it's standalone and doesn't require API access",
  },
  {
    id: 4,
    title: "Key Features: Workflow",
    subtitle: "Streamlined 4-Step Process",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Streamlined 4-Step Process</h2>
        <div className="grid grid-cols-2 gap-8">
          {[
            { num: "1", title: "Select Ticket", desc: "Auto-populated from queue" },
            { num: "2", title: "Review Details", desc: "All information in one view (vendor, location, severity)" },
            { num: "3", title: "Take Action", desc: "Contact vendor, escalate, or mark complete" },
            { num: "4", title: "Send Email", desc: "Pre-filled templates with 1-click send" },
          ].map((step) => (
            <div key={step.num} className="bg-white p-8 rounded-xl shadow-lg border-2 border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
              </div>
              <p className="text-lg text-slate-600 ml-20">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-purple-50 rounded-lg">
          <p className="text-lg text-slate-700">
            <strong>Benefits:</strong> Reduces context switching • All information on one screen • Smart templates adapt to ticket details
          </p>
        </div>
      </div>
    ),
    notes: "Demo the workflow stepper if possible",
  },
  {
    id: 5,
    title: "Key Features: Communications Hub",
    subtitle: "Centralized Vendor Communication",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Communications Hub</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: "📧", title: "Email Composer", desc: "Pre-filled templates for every scenario" },
            { icon: "💬", title: "Internal Notes", desc: "Team collaboration and context sharing" },
            { icon: "📨", title: "Email Tracking", desc: "Read/unread status, vendor responses" },
            { icon: "📅", title: "Event Scheduling", desc: "Track service appointments and deadlines" },
            { icon: "📎", title: "File Attachments", desc: "Upload quotes, invoices, photos" },
            { icon: "🔔", title: "Notifications", desc: "Real-time alerts for vendor responses" },
          ].map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-500">
          <p className="text-lg text-slate-700">
            <strong>Key Benefit:</strong> All vendor correspondence in one place • No more searching through email threads
          </p>
        </div>
      </div>
    ),
    notes: "Show the communications panel with vendor email simulation",
  },
  {
    id: 6,
    title: "Key Features: Analytics Dashboard",
    subtitle: "Real-Time Performance Metrics",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Analytics Dashboard</h2>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { icon: "📊", label: "Ticket Volume", value: "Real-time" },
            { icon: "⏱️", label: "Avg Resolution", value: "Tracked" },
            { icon: "🏆", label: "Vendor Performance", value: "Ranked" },
          ].map((metric) => (
            <div key={metric.label} className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-2">{metric.icon}</div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-blue-100">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-6">
          {[
            "Ticket status distribution charts",
            "Trend analysis (daily, weekly, monthly)",
            "Vendor response time tracking",
            "Escalation patterns and bottlenecks",
            "Complete audit trail for compliance",
            "Export data for executive reporting",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-2xl">📈</span>
              <p className="text-lg text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    notes: "Show live analytics dashboard with charts",
  },
  {
    id: 7,
    title: "Time & Cost Savings",
    subtitle: "Expected Impact",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Expected Impact</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-red-50 p-8 rounded-xl border-2 border-red-300">
            <h3 className="text-2xl font-bold text-red-900 mb-6">Current State ❌</h3>
            <div className="space-y-4 text-lg text-slate-700">
              <div className="flex justify-between">
                <span>Time per ticket:</span>
                <strong className="text-red-700">25-45 min</strong>
              </div>
              <div className="flex justify-between">
                <span>Weekly tickets:</span>
                <strong>20-50</strong>
              </div>
              <div className="flex justify-between border-t-2 border-red-200 pt-4">
                <span>Weekly burden:</span>
                <strong className="text-2xl text-red-700">8-37 hrs</strong>
              </div>
              <div className="mt-4 p-4 bg-red-100 rounded">
                <p className="text-sm">Manual reporting at month-end</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-8 rounded-xl border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-900 mb-6">With Tool ✅</h3>
            <div className="space-y-4 text-lg text-slate-700">
              <div className="flex justify-between">
                <span>Time per ticket:</span>
                <strong className="text-green-700">10-15 min</strong>
              </div>
              <div className="flex justify-between">
                <span>Weekly tickets:</span>
                <strong>20-50</strong>
              </div>
              <div className="flex justify-between border-t-2 border-green-200 pt-4">
                <span>Time saved:</span>
                <strong className="text-2xl text-green-700">4-26 hrs</strong>
              </div>
              <div className="mt-4 p-4 bg-green-100 rounded">
                <p className="text-sm">Real-time dashboards (no manual reports)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-center">
          <p className="text-3xl font-bold">50-70% Time Savings</p>
          <p className="text-xl mt-2">Team can handle more escalations with same headcount</p>
        </div>
      </div>
    ),
    notes: "Emphasize the ROI and efficiency gains",
  },
  {
    id: 8,
    title: "Implementation Timeline",
    subtitle: "Fast Path to Production",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Fast Path to Production</h2>
        <div className="space-y-6">
          {[
            { week: "Week 1", status: "In Progress", tasks: ["Complete deployment (1-2 days)", "UAT testing (3-5 days)"], color: "blue" },
            { week: "Week 2", status: "Planned", tasks: ["Pilot launch with GSF Soft Services", "1-hour team training"], color: "green" },
            { week: "Week 3-4", status: "Planned", tasks: ["Gather feedback", "Minor refinements"], color: "purple" },
            { week: "Week 5+", status: "Future", tasks: ["Full rollout", "Expand to other teams"], color: "amber" },
          ].map((phase) => (
            <div key={phase.week} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-slate-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900">{phase.week}</h3>
                <span className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold",
                  phase.color === "blue" && "bg-blue-100 text-blue-700",
                  phase.color === "green" && "bg-green-100 text-green-700",
                  phase.color === "purple" && "bg-purple-100 text-purple-700",
                  phase.color === "amber" && "bg-amber-100 text-amber-700"
                )}>
                  {phase.status}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg text-slate-700">
                    <span className="text-green-500">✓</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-slate-900 text-white rounded-xl text-center">
          <p className="text-2xl font-bold">Application is 95% Complete</p>
          <p className="text-lg mt-2">Ready to deploy this week!</p>
        </div>
      </div>
    ),
    notes: "Emphasize we're almost done and ready to launch",
  },
  {
    id: 9,
    title: "Resources Needed",
    subtitle: "Low Resource Requirements",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Low Resource Requirements</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-left p-6 text-xl">Resource</th>
                <th className="text-left p-6 text-xl">Commitment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { resource: "Development", commitment: "Current developer + 2-4 hrs AWS support" },
                { resource: "GSF SME", commitment: "2-3 hours for workflow validation" },
                { resource: "Pilot Users", commitment: "2-3 team members for 1 week" },
                { resource: "Training", commitment: "1-hour onboarding session" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-6 text-lg font-semibold text-slate-900">{row.resource}</td>
                  <td className="p-6 text-lg text-slate-700">{row.commitment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { icon: "✅", text: "Minimal disruption to team operations" },
            { icon: "🎨", text: "Intuitive and user-friendly interface" },
            { icon: "☁️", text: "No ongoing maintenance burden (cloud-hosted)" },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl text-center">
              <div className="text-4xl mb-2">{benefit.icon}</div>
              <p className="text-lg font-semibold">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    notes: "Highlight the low barrier to entry",
  },
  {
    id: 10,
    title: "Scalability to Other Teams",
    subtitle: "Expand Beyond GSF",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Expand Beyond GSF</h2>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-2">Phase 1: GSF Soft Services</h3>
            <p className="text-xl">Pilot - 2 weeks</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-2">Phase 2: Other Non Grocery Teams</h3>
            <p className="text-xl">Rollout - 4 weeks</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-2">Phase 3: Other Teams</h3>
            <p className="text-xl">Facilities Operations • Procurement • Any vendor management team</p>
          </div>
        </div>
        <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Architecture Benefits</h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              "Standalone AWS deployment per team",
              "Customizable workflows and templates",
              "API-ready for future system integrations",
              "Shared analytics across teams (optional)",
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-2xl text-green-500">✅</span>
                <p className="text-lg text-slate-700 pt-1">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    notes: "Show the expansion roadmap",
  },
  {
    id: 11,
    title: "Risk Mitigation",
    subtitle: "What Could Go Wrong?",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Risk Mitigation</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-left p-6 text-xl">Risk</th>
                <th className="text-left p-6 text-xl">Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { risk: "Adoption resistance", mitigation: "1-hour training + intuitive UI design" },
                { risk: "Data loss", mitigation: "Cloud backup + LocalStorage redundancy" },
                { risk: "AWS costs", mitigation: "Free tier eligible, ~$5-10/month if exceeded" },
                { risk: "Missing features", mitigation: "Pilot feedback loop for rapid iteration" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚠️</span>
                      <span className="text-lg font-semibold text-slate-900">{row.risk}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <span className="text-lg text-slate-700">{row.mitigation}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {[
            { icon: "🛡️", text: "Low-risk pilot approach" },
            { icon: "↩️", text: "Can revert if needed" },
            { icon: "🔌", text: "No integration dependencies" },
          ].map((item, idx) => (
            <div key={idx} className="bg-green-50 border-2 border-green-300 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="text-lg font-semibold text-slate-800">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    notes: "Show that risks are manageable",
  },
  {
    id: 12,
    title: "Next Steps",
    subtitle: "Call to Action",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-8">Next Steps</h2>
        <div className="space-y-6">
          {[
            { num: 1, text: "Approve deployment (this week)", color: "blue" },
            { num: 2, text: "Identify 2-3 pilot users from GSF Soft Services", color: "green" },
            { num: 3, text: "Schedule 1-hour training session", color: "purple" },
            { num: 4, text: "Launch pilot (Week 2)", color: "amber" },
            { num: 5, text: "Review metrics after 2 weeks", color: "red" },
          ].map((step) => (
            <div key={step.num} className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-slate-300">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-white",
                step.color === "blue" && "bg-blue-600",
                step.color === "green" && "bg-green-600",
                step.color === "purple" && "bg-purple-600",
                step.color === "amber" && "bg-amber-600",
                step.color === "red" && "bg-red-600"
              )}>
                {step.num}
              </div>
              <p className="text-2xl text-slate-900">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl text-center">
          <p className="text-3xl font-bold mb-2">Ready to Deploy Immediately</p>
          <p className="text-xl">Quick wins within first 2 weeks • Scalable solution for long-term efficiency</p>
        </div>
      </div>
    ),
    notes: "Clear action items for immediate approval",
  },
  {
    id: 13,
    title: "Questions & Demo",
    subtitle: "Let's take a look",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-12">
        <h2 className="text-5xl font-bold text-slate-900 text-center">Questions & Demo</h2>
        <div className="space-y-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-2xl text-slate-700 mb-4">
              <strong>Live Demo Available</strong>
            </p>
            <p className="text-xl text-blue-600">
              [Your AWS Amplify URL]
            </p>
          </div>
          <div className="text-4xl space-y-4">
            <p>💬 Questions?</p>
            <p>🚀 Let's discuss!</p>
          </div>
        </div>
      </div>
    ),
    notes: "Open for Q&A and live demo",
  },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === "Home") {
        setCurrentSlide(0);
      } else if (e.key === "End") {
        setCurrentSlide(slides.length - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col">
      {/* Navigation Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSlide(0)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
          >
            <Home className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold">
            GSF Vendor Escalation Tool - Presentation
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen (F)"}
          </Button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl h-[75vh] bg-white rounded-2xl shadow-2xl p-12 overflow-y-auto">
          {slide.content}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <Button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                idx === currentSlide
                  ? "bg-blue-500 w-8"
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>

        <Button
          onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === slides.length - 1}
          className="bg-white/10 hover:bg-white/20 disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>

      {/* Speaker Notes (only visible when not in fullscreen) */}
      {!isFullscreen && slide.notes && (
        <div className="bg-amber-50 border-t-2 border-amber-400 px-6 py-3">
          <p className="text-sm text-amber-900">
            <strong>Speaker Notes:</strong> {slide.notes}
          </p>
        </div>
      )}
    </div>
  );
}
