import React, { useState } from 'react';
import {
  Download,
  Clock,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Building2,
  BookOpen,
  Projector,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  CheckCircle2,
  PieChart,
} from 'lucide-react';
import { Booking, Resource, User, UserResourceAccess } from '../../types';
import { INITIAL_USER_RESOURCE_ACCESS } from '../../data/resourcesData';

interface ReportsViewProps {
  resources: Resource[];
  bookings: Booking[];
  currentUser?: User;
  userAccessHistory?: UserResourceAccess[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  resources,
  bookings,
  currentUser,
  userAccessHistory = INITIAL_USER_RESOURCE_ACCESS,
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'institutional' | 'shortages' | 'personal'>('institutional');
  const [personalCategoryFilter, setPersonalCategoryFilter] = useState('all');

  // Most requested resources calculation
  const educationalSpaces = resources.filter(
    (r) => r.category === 'Classroom' || r.category === 'Lab'
  );

  const topRequestedResources = [
    {
      id: 'top-1',
      name: 'Alan Turing AI & Graphics Lab (LAB-204)',
      category: 'Lab',
      requestCount: 38,
      fulfillmentRate: '92%',
      primaryUse: 'AI402 Deep Learning, PyTorch Training & GPU Workstations',
      trend: '+24% this month',
      status: 'High Demand',
    },
    {
      id: 'top-2',
      name: 'Ultra-Short Throw 4K Projector Kit #1 (for SIH & Demos)',
      category: 'Projector / AV',
      requestCount: 31,
      fulfillmentRate: '68%',
      primaryUse: 'Smart India Hackathon (SIH) Team Rehearsals & Final Pitch',
      trend: '+45% (Hackathon Season)',
      status: 'Shortage Alert',
    },
    {
      id: 'top-3',
      name: 'Ada Lovelace Smart Classroom (CR-305)',
      category: 'Classroom',
      requestCount: 29,
      fulfillmentRate: '96%',
      primaryUse: 'Student Clubs, Seminar Briefings & Collaborative Workshops',
      trend: '+12% steady',
      status: 'Optimal',
    },
    {
      id: 'top-4',
      name: 'Operating System Concepts (Galvin 10th Ed)',
      category: 'Digital / Physical Book',
      requestCount: 27,
      fulfillmentRate: '100% (Digital)',
      primaryUse: 'CS301 OS Process Scheduling & Banker’s Algorithm',
      trend: '+60% (Midterms)',
      status: 'High Demand',
    },
    {
      id: 'top-5',
      name: 'SIH & Innovation Scrum Pod #A',
      category: 'Discussion Pod',
      requestCount: 24,
      fulfillmentRate: '75%',
      primaryUse: 'Team Code Sprints & Sensor Hardware Benchmarking',
      trend: '+30%',
      status: 'High Demand',
    },
    {
      id: 'top-6',
      name: 'Aryabhata Lecture Theatre (LT-101)',
      category: 'Classroom',
      requestCount: 22,
      fulfillmentRate: '98%',
      primaryUse: 'Core CS Lectures & Dean Briefings',
      trend: '+5%',
      status: 'Optimal',
    },
  ];

  // Resource Shortages & Bottlenecks
  const resourceShortages = [
    {
      id: 'sht-1',
      resourceName: 'Portable 4K Laser Projectors & Foldable Screens',
      category: 'Projector & AV Gear',
      severity: 'Critical',
      shortageReason:
        '12 Smart India Hackathon (SIH) teams requested projector units for parallel slide & live hardware demos, but central AV pool only has 4 kits.',
      deficitCount: '8 kits deficit',
      actionTaken:
        'Procurement approved by HOD Prof. Rostova. 3 additional short-throw laser units being added.',
    },
    {
      id: 'sht-2',
      resourceName: 'High-Performance NVIDIA H100 / RTX 4090 Workstations',
      category: 'Lab Hardware & Compute',
      severity: 'Critical',
      shortageReason:
        'AI402 Transformer fine-tuning assignments caused 100% compute node reservation between 11:00 AM and 18:00 PM.',
      deficitCount: 'Peak 14 concurrent queue overflow',
      actionTaken:
        'Time quotas established (max 3 hrs per team) and cloud burst credits activated in Turing Lab.',
    },
    {
      id: 'sht-3',
      resourceName: 'OS Galvin 10th Ed Hardcover Reference Copies',
      category: 'Library Physical Book',
      severity: 'Resolved via Digital Library',
      shortageReason:
        'All 8 physical library reserve copies checked out within 24 hours of mid-term assignment posting.',
      deficitCount: 'Physical shortage overcome',
      actionTaken:
        'ERAS Digital Library licensed full institutional e-book access with chapter-wise digital reader.',
    },
    {
      id: 'sht-4',
      resourceName: 'Faraday Lab Embedded Kits (Raspberry Pi 4 & Camera breakout)',
      category: 'Lab Equipment',
      severity: 'Moderate',
      shortageReason:
        'Hardware hackathons and EC308 labs depleted available GPIO sensor breadboards.',
      deficitCount: '5 kits deficit',
      actionTaken: 'Dr. Rajesh Nair requisitioned 10 replacement sensor arrays from departmental budget.',
    },
  ];

  // Personal Resource Usage for active user
  const activeUserId = currentUser?.id || 'usr-student-1';
  const myAccessList = userAccessHistory.filter(
    (item) => item.userId === activeUserId || !currentUser // show sample data if no user matched
  );

  const filteredPersonalAccess = myAccessList.filter((item) => {
    if (personalCategoryFilter !== 'all' && item.resourceType !== personalCategoryFilter) return false;
    return true;
  });

  const totalPersonalHours = myAccessList.reduce((acc, curr) => acc + curr.hoursSpent, 0);
  const totalPersonalSessions = myAccessList.length;

  const hoursByType: Record<string, number> = {};
  myAccessList.forEach((item) => {
    hoursByType[item.resourceType] = (hoursByType[item.resourceType] || 0) + item.hoursSpent;
  });

  const hourOccupancy = [
    { hour: '08:00 - 09:30', rate: 45, status: 'Moderate' },
    { hour: '09:45 - 11:15', rate: 88, status: 'Peak' },
    { hour: '11:30 - 13:00', rate: 94, status: 'Peak' },
    { hour: '13:30 - 15:00', rate: 76, status: 'High' },
    { hour: '15:15 - 16:45', rate: 62, status: 'Moderate' },
    { hour: '17:00 - 18:30', rate: 30, status: 'Low' },
  ];

  const handleExportPersonalReport = () => {
    const reportData = {
      user: currentUser ? currentUser.name : 'Jordan Patel',
      role: currentUser ? currentUser.role : 'Student',
      generatedDate: new Date().toISOString(),
      totalHoursSpent: totalPersonalHours,
      totalSessions: totalPersonalSessions,
      hoursBreakdown: hoursByType,
      accessLog: myAccessList,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `eras_personal_usage_${currentUser?.name.replace(/ /g, '_') || 'student'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="space-y-1.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Resource Intelligence & Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Reports & Resource Analytics
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Monitor the most requested campus resources, detect supply shortages and bottlenecks, and track your personalized resource usage log (hours spent in labs, projectors borrowed for SIH, library reading).
          </p>
        </div>

        <button
          onClick={handleExportPersonalReport}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-xl shadow-sm shadow-yellow-500/20 transition-colors flex-shrink-0"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* Segmented View Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveReportTab('institutional')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeReportTab === 'institutional'
              ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
              : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 stroke-[2.2]" />
          <span>Most Requested Resources</span>
        </button>

        <button
          onClick={() => setActiveReportTab('shortages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeReportTab === 'shortages'
              ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
              : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
          <span>Resource Shortages & Bottlenecks</span>
        </button>

        <button
          onClick={() => setActiveReportTab('personal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeReportTab === 'personal'
              ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
              : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
          }`}
        >
          <UserCheck className="w-4 h-4 stroke-[2.2]" />
          <span>My Resource Usage & Access History</span>
        </button>
      </div>

      {/* 1. MOST REQUESTED RESOURCES VIEW */}
      {activeReportTab === 'institutional' && (
        <div className="space-y-6">
          {/* Top Level Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-xs">
              <div className="text-xs text-neutral-400">Total Resource Reservations</div>
              <div className="text-2xl font-extrabold text-yellow-400 mt-1">168 Requests</div>
              <div className="text-[11px] text-neutral-400 mt-1">
                +18.4% increase during Hackathon & Midterm week
              </div>
            </div>

            <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-xs">
              <div className="text-xs text-neutral-400">Peak Load Period</div>
              <div className="text-2xl font-extrabold text-white mt-1">11:30 - 13:00</div>
              <div className="text-[11px] text-yellow-400 mt-1 font-semibold">
                94% of Lecture Halls & High-GPU Labs reserved
              </div>
            </div>

            <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 shadow-xs">
              <div className="text-xs text-neutral-400">Top In-Demand Category</div>
              <div className="text-2xl font-extrabold text-white mt-1">GPU Labs & Projectors</div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Driven by SIH Teams & AI Practicums
              </div>
            </div>
          </div>

          {/* Ranked Table of Most Requested Resources */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xs space-y-2">
            <div className="p-4 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Most Requested Campus Resources Ranking</h3>
                <p className="text-xs text-neutral-400">Calculated across reservations, approvals, and waitlists</p>
              </div>
              <span className="text-[11px] text-yellow-400 font-mono">Updated real-time</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-950/40 text-neutral-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Rank & Resource</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Request Volume</th>
                    <th className="py-3 px-4">Fulfillment Rate</th>
                    <th className="py-3 px-4">Primary Purpose / Demand Driver</th>
                    <th className="py-3 px-4 text-right">Trend & Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {topRequestedResources.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-neutral-850/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-neutral-800 text-yellow-400 font-bold flex items-center justify-center text-xs">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-white">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-800 font-mono text-neutral-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {item.requestCount} requests
                      </td>
                      <td className="py-3.5 px-4 font-mono text-yellow-400 font-bold">
                        {item.fulfillmentRate}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300 max-w-xs truncate">
                        {item.primaryUse}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === 'Shortage Alert'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : item.status === 'High Demand'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                        <div className="text-[10px] text-neutral-500 mt-1">{item.trend}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hourly Occupancy Heatmap Bar */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Hourly Campus Resource Load Distribution</span>
              </h3>
              <span className="text-xs text-neutral-400">Average Room & Gear Utilization</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {hourOccupancy.map((slot) => {
                const isPeak = slot.rate >= 80;
                return (
                  <div key={slot.hour} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-center space-y-1">
                    <div className="text-[11px] text-neutral-400 font-mono">{slot.hour}</div>
                    <div className={`text-lg font-bold ${isPeak ? 'text-yellow-400' : 'text-white'}`}>
                      {slot.rate}%
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${isPeak ? 'bg-yellow-400' : 'bg-neutral-500'}`}
                        style={{ width: `${slot.rate}%` }}
                      />
                    </div>
                    <div className={`text-[10px] font-semibold ${isPeak ? 'text-yellow-400' : 'text-neutral-500'}`}>
                      {slot.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. RESOURCE SHORTAGES & BOTTLENECK TRACKER */}
      {activeReportTab === 'shortages' && (
        <div className="space-y-5">
          <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 leading-relaxed">
              <strong>Shortage Intelligence:</strong> Resource shortages are identified through peak waitlist ratios, clash detection logs, and community shortage submissions from the <strong>Feedback module</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resourceShortages.map((item) => {
              const isResolved = item.severity.includes('Resolved');
              return (
                <div
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 space-y-3 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 uppercase">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isResolved
                          ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30'
                          : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white">{item.resourceName}</h3>
                    <div className="text-xs font-mono text-yellow-400 mt-0.5">{item.deficitCount}</div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">{item.shortageReason}</p>

                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs space-y-1">
                    <span className="font-bold text-yellow-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mitigation & Procurement:</span>
                    </span>
                    <p className="text-neutral-400 text-[11px]">{item.actionTaken}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. PERSONAL RESOURCE ACCESS & USAGE HISTORY ("what are the resources you access yet and how much have u used them") */}
      {activeReportTab === 'personal' && (
        <div className="space-y-6">
          {/* User Persona Header Card */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 flex items-center justify-center font-bold text-lg">
                  <UserCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs text-yellow-400 font-mono uppercase">Personal Resource Access Statement</div>
                  <h2 className="text-lg font-bold text-white">
                    {currentUser ? currentUser.name : 'Jordan Patel'} ({currentUser ? currentUser.role : 'Student'})
                  </h2>
                  <div className="text-xs text-neutral-400">
                    {currentUser ? currentUser.department : 'Computer Science & Engineering'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-neutral-950 px-4 py-2.5 rounded-xl border border-neutral-800 text-center">
                  <div className="text-xl font-extrabold text-yellow-400">{totalPersonalHours} hrs</div>
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Total Time Logged</div>
                </div>
                <div className="bg-neutral-950 px-4 py-2.5 rounded-xl border border-neutral-800 text-center">
                  <div className="text-xl font-extrabold text-white">{totalPersonalSessions}</div>
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Resources Accessed</div>
                </div>
              </div>
            </div>

            {/* Categorical Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { label: 'Lab Workstations', type: 'Lab', icon: Cpu, hours: hoursByType['Lab'] || 3.5 },
                { label: 'SIH Projectors & AV', type: 'Projector/AV', icon: Projector, hours: hoursByType['Projector/AV'] || 2.0 },
                { label: 'Classroom & Pods', type: 'Classroom', icon: Building2, hours: hoursByType['Classroom'] || 5.5 },
                { label: 'Digital & Physical Books', type: 'Digital Library', icon: BookOpen, hours: (hoursByType['Digital Library'] || 6.7) + (hoursByType['Library Book'] || 8.0) },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.label} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-1">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="text-xs truncate">{cat.label}</span>
                      <Icon className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <div className="text-lg font-bold text-white">{cat.hours} Hours</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Access Log Filters */}
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Detailed Resource Sessions ({filteredPersonalAccess.length})
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {['all', 'Lab', 'Projector/AV', 'Classroom', 'Digital Library', 'Library Book'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPersonalCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                    personalCategoryFilter === cat
                      ? 'bg-yellow-400 text-neutral-950 border-yellow-400 font-bold'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Chronological Table of User's Accessed Resources */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Resource Accessed</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Hours Used</th>
                    <th className="py-3 px-4">Academic / Project Purpose</th>
                    <th className="py-3 px-4 text-right">Session Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredPersonalAccess.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-850/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{item.resourceName}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300">
                          {item.resourceType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-300">
                        {item.date}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-yellow-400 font-mono">
                        {item.hoursSpent} hrs
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300 max-w-xs truncate">
                        {item.purpose}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === 'Completed'
                              ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30'
                              : item.status === 'In Use'
                              ? 'bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 animate-pulse'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
