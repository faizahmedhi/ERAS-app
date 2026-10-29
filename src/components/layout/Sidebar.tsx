import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarRange,
  DollarSign,
  Boxes,
  BarChart3,
  Code2,
  Building2,
  BookOpen,
  Flame,
  MessageSquarePlus,
  FileCheck2,
  GraduationCap,
  Video,
} from 'lucide-react';
import { UserRole } from '../../types';

export type NavTab =
  | 'dashboard'
  | 'lectures'
  | 'digital-library'
  | 'skills'
  | 'bookings'
  | 'reports'
  | 'feedback'
  | 'assignments'
  | 'faculty'
  | 'timetable'
  | 'budget'
  | 'inventory'
  | 'architecture';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userRole: UserRole;
  pendingRequestsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  pendingRequestsCount,
}) => {
  const resourceNavItems: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    description: string;
  }[] = [
    {
      id: 'lectures',
      label: 'Lecture Recaps',
      icon: Video,
      description: 'Last lecture recordings & summaries',
    },
    {
      id: 'digital-library',
      label: 'Digital Library',
      icon: BookOpen,
      description: 'E-books (Galvin), notes & PDFs',
    },
    {
      id: 'skills',
      label: 'Skill Development',
      icon: Flame,
      description: 'DSA, Web, AI/ML & App tracks',
    },
    {
      id: 'bookings',
      label: 'Booking System',
      icon: CalendarCheck,
      badge: pendingRequestsCount,
      description: 'Classrooms, SIH projectors & books',
    },
    {
      id: 'assignments',
      label: 'Assignments & Certs',
      icon: FileCheck2,
      description: 'Deadlines, rubrics & certificates',
    },
    {
      id: 'faculty',
      label: 'Contact Faculty',
      icon: GraduationCap,
      description: 'Guidance, doubts & office hours',
    },
    {
      id: 'feedback',
      label: 'Resource Feedback',
      icon: MessageSquarePlus,
      description: 'Report missing or scarce resources',
    },
  ];

  const operationsNavItems: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    description: string;
    allowedRoles?: UserRole[];
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Campus overview & room matrix',
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      description: 'Shortages, peak load & usage log',
    },
    {
      id: 'timetable',
      label: 'Timetable Matrix',
      icon: CalendarRange,
      description: 'Conflict solver & batch schedules',
    },
    {
      id: 'budget',
      label: 'Budget Allocation',
      icon: DollarSign,
      description: 'Departmental spend & ledger',
      allowedRoles: ['Admin', 'HOD'],
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Boxes,
      description: 'Lab gear & equipment pool',
    },
    {
      id: 'architecture',
      label: 'Architecture & Specs',
      icon: Code2,
      description: 'System blueprints & APIs',
    },
  ];

  const renderNavGroup = (items: typeof resourceNavItems, groupTitle: string) => {
    return (
      <div className="space-y-1 mb-4">
        <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          {groupTitle}
        </div>
        {items.map((item) => {
          const isActive = currentTab === item.id;
          const isRestricted = (item as any).allowedRoles && !(item as any).allowedRoles.includes(userRole);

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left group ${
                isActive
                  ? 'bg-yellow-400 text-neutral-950 font-bold shadow-sm shadow-yellow-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-neutral-950 stroke-[2.5]' : 'text-neutral-400 group-hover:text-yellow-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 text-[10px] font-bold rounded ${
                      isActive
                        ? 'bg-neutral-950 text-yellow-400'
                        : 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isRestricted && (
                  <span className={`text-[9px] font-mono uppercase ${isActive ? 'text-neutral-800' : 'text-neutral-400'}`}>
                    HOD/Admin
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-neutral-950 text-neutral-300 flex flex-col border-r border-neutral-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-neutral-800 bg-neutral-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-yellow-500/10 flex-shrink-0">
            <Building2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>ERAS</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-yellow-400/15 text-yellow-400 border border-yellow-400/30">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 truncate">Education Resource System</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin">
        {renderNavGroup(resourceNavItems, 'Resources')}
        {renderNavGroup(operationsNavItems, 'System Operations')}
      </nav>

      {/* Role Context Footer */}
      <div className="p-3.5 border-t border-neutral-800 bg-neutral-900/60 flex-shrink-0">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-neutral-400">Active Persona</span>
          <span className="text-yellow-400 font-bold">{userRole}</span>
        </div>
        <div className="text-[11px] text-neutral-400 leading-snug truncate">
          {userRole === 'Admin' && 'System-wide approval authority & allocations.'}
          {userRole === 'HOD' && 'Department budget, room & gear approvals.'}
          {userRole === 'Faculty' && 'Lab scheduling, doubt responses & materials.'}
          {userRole === 'Student' && 'Resource reservations, study tracks & doubts.'}
        </div>
      </div>
    </aside>
  );
};
