import React, { useState } from 'react';
import {
  AcademicDoubt,
  Assignment,
  Booking,
  Certification,
  DepartmentBudget,
  DigitalResource,
  FacultyMember,
  InventoryItem,
  LectureRecap,
  Resource,
  ResourceFeedback,
  SkillTrack,
  SystemNotification,
  User,
  UserResourceAccess,
} from './types';
import {
  INITIAL_BOOKINGS,
  INITIAL_BUDGETS,
  INITIAL_INVENTORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_RESOURCES,
  INITIAL_USERS,
  SAMPLE_COURSES,
} from './data/mockData';
import {
  INITIAL_ACADEMIC_DOUBTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_CERTIFICATIONS,
  INITIAL_DIGITAL_RESOURCES,
  INITIAL_FACULTY_MEMBERS,
  INITIAL_LECTURE_RECAPS,
  INITIAL_RESOURCE_FEEDBACK,
  INITIAL_SKILL_TRACKS,
  INITIAL_USER_RESOURCE_ACCESS,
} from './data/resourcesData';
import { NavTab, Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { KpiCards } from './components/dashboard/KpiCards';
import { ResourceAvailabilityGrid } from './components/dashboard/ResourceAvailabilityGrid';
import { BookingView } from './components/booking/BookingView';
import { TimetableSchedulerView } from './components/timetable/TimetableSchedulerView';
import { BudgetAllocationView } from './components/budget/BudgetAllocationView';
import { InventoryView } from './components/inventory/InventoryView';
import { ReportsView } from './components/reports/ReportsView';
import { ArchitectureDocsView } from './components/architecture/ArchitectureDocsView';
import { RequestResourceModal } from './components/modals/RequestResourceModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { DigitalLibraryView } from './components/resources/DigitalLibraryView';
import { SkillDevelopmentView } from './components/resources/SkillDevelopmentView';
import { ResourceFeedbackView } from './components/resources/ResourceFeedbackView';
import { AssignmentsCertificationsView } from './components/resources/AssignmentsCertificationsView';
import { ContactFacultyView } from './components/resources/ContactFacultyView';
import { LectureRecapView } from './components/resources/LectureRecapView';
import {
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  Flame,
  Projector,
  FileCheck2,
  GraduationCap,
  MessageSquarePlus,
  ArrowRight,
  Sparkles,
  Video,
  Play,
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Starts as Admin
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [budgets, setBudgets] = useState<DepartmentBudget[]>(INITIAL_BUDGETS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // New Resource Ecosystem State
  const [digitalResources, setDigitalResources] = useState<DigitalResource[]>(INITIAL_DIGITAL_RESOURCES);
  const [skillTracks, setSkillTracks] = useState<SkillTrack[]>(INITIAL_SKILL_TRACKS);
  const [userAccessHistory, setUserAccessHistory] = useState<UserResourceAccess[]>(INITIAL_USER_RESOURCE_ACCESS);
  const [feedbacks, setFeedbacks] = useState<ResourceFeedback[]>(INITIAL_RESOURCE_FEEDBACK);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [certifications, setCertifications] = useState<Certification[]>(INITIAL_CERTIFICATIONS);
  const [facultyMembers] = useState<FacultyMember[]>(INITIAL_FACULTY_MEMBERS);
  const [academicDoubts, setAcademicDoubts] = useState<AcademicDoubt[]>(INITIAL_ACADEMIC_DOUBTS);
  const [lectureRecaps, setLectureRecaps] = useState<LectureRecap[]>(INITIAL_LECTURE_RECAPS);
  const latestLecture = lectureRecaps.find((l) => l.isLatest) || lectureRecaps[0];

  // UI state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [preselectedResourceId, setPreselectedResourceId] = useState<string | undefined>(undefined);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const pendingRequestsCount = bookings.filter((b) => b.status === 'Pending').length;
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleOpenRequestModal = (resourceIdOrName?: string) => {
    if (resourceIdOrName) {
      const match = resources.find((r) => r.id === resourceIdOrName || r.name === resourceIdOrName);
      if (match) {
        setPreselectedResourceId(match.id);
      } else {
        setPreselectedResourceId(undefined);
      }
    } else {
      setPreselectedResourceId(undefined);
    }
    setIsRequestModalOpen(true);
  };

  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'requestedAt'>) => {
    const newId = `bk-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdBooking: Booking = {
      ...newBookingData,
      id: newId,
      requestedAt: 'Just now',
    };

    setBookings([createdBooking, ...bookings]);

    // Also log to user access history if completed/approved
    const newAccessItem: UserResourceAccess = {
      id: `ura-${Date.now()}`,
      userId: currentUser.id,
      resourceId: createdBooking.resourceId,
      resourceName: createdBooking.resourceName,
      resourceType: createdBooking.resourceName.toLowerCase().includes('projector')
        ? 'Projector/AV'
        : createdBooking.resourceName.toLowerCase().includes('book')
        ? 'Library Book'
        : 'Classroom',
      date: createdBooking.date,
      hoursSpent: 2.0,
      purpose: createdBooking.purpose,
      status: createdBooking.status === 'Approved' ? 'Scheduled' : 'In Use',
    };
    setUserAccessHistory([newAccessItem, ...userAccessHistory]);

    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Reservation Submitted',
      message: `${createdBooking.userName} requested ${createdBooking.resourceName} for ${createdBooking.date}.`,
      timestamp: 'Just now',
      read: false,
      type: 'booking',
      priority: createdBooking.priority === 'Urgent' ? 'warning' : 'info',
      actionableId: newId,
    };
    setNotifications([newNotif, ...notifications]);

    showToast(
      createdBooking.status === 'Approved'
        ? 'Reservation confirmed and space/gear locked.'
        : 'Reservation request submitted for HOD review.'
    );
    return { success: true };
  };

  const handleApproveBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Approved', approvedBy: currentUser.name } : b))
    );
    showToast('Reservation approved successfully.');
  };

  const handleRejectBooking = (id: string, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: 'Rejected', rejectionReason: reason || 'Scheduling priority conflict' } : b
      )
    );
    showToast('Reservation request declined.', 'error');
  };

  const handleAddExpense = (
    deptId: string,
    expense: { description: string; amount: number; category: string }
  ) => {
    setBudgets((prev) =>
      prev.map((b) => {
        if (b.departmentId === deptId) {
          const newExp = {
            id: `exp-${Date.now()}`,
            description: expense.description,
            amount: expense.amount,
            date: new Date().toISOString().split('T')[0],
            approvedBy: currentUser.name,
            category: expense.category,
          };
          return {
            ...b,
            spent: b.spent + expense.amount,
            recentExpenses: [newExp, ...b.recentExpenses],
            categories: b.categories.map((c) =>
              c.name === expense.category ? { ...c, spent: c.spent + expense.amount } : c
            ),
          };
        }
        return b;
      })
    );
    showToast('Procurement transaction recorded to department budget.');
  };

  // Feedback Actions
  const handleAddFeedback = (
    newFb: Omit<ResourceFeedback, 'id' | 'submittedAt' | 'rating' | 'ratingCount' | 'comments' | 'status'>
  ) => {
    const created: ResourceFeedback = {
      ...newFb,
      id: `fb-${Date.now()}`,
      submittedAt: 'Just now',
      rating: 5,
      ratingCount: 1,
      userStarRating: 5,
      comments: [],
      status: 'Under Review',
    };
    setFeedbacks([created, ...feedbacks]);

    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: 'Missing Resource Reported',
      message: `${created.submittedBy} reported shortage of "${created.title}".`,
      timestamp: 'Just now',
      read: false,
      type: 'feedback',
      priority: created.urgency === 'Urgent' ? 'warning' : 'info',
    };
    setNotifications([notif, ...notifications]);
  };

  const handleRateFeedback = (feedbackId: string, starRating: number) => {
    setFeedbacks((prev) =>
      prev.map((fb) => {
        if (fb.id === feedbackId) {
          const hadPriorRating = fb.userStarRating !== undefined;
          const newCount = hadPriorRating ? fb.ratingCount : fb.ratingCount + 1;
          const oldSum = fb.rating * fb.ratingCount - (fb.userStarRating || 0);
          const newAvg = Math.round(((oldSum + starRating) / newCount) * 10) / 10;

          return {
            ...fb,
            rating: newAvg,
            ratingCount: newCount,
            userStarRating: starRating,
          };
        }
        return fb;
      })
    );
  };

  const handleAddComment = (feedbackId: string, text: string) => {
    const newComment = {
      id: `cmt-${Date.now()}`,
      userName: currentUser.name,
      userRole: currentUser.role,
      text,
      createdAt: 'Just now',
    };

    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === feedbackId
          ? {
              ...fb,
              comments: [...(fb.comments || []), newComment],
            }
          : fb
      )
    );
  };

  const handleUpdateFeedbackStatus = (
    feedbackId: string,
    status: ResourceFeedback['status'],
    adminNotes?: string
  ) => {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === feedbackId ? { ...fb, status, adminNotes } : fb))
    );
    showToast(`Status updated to: ${status}`);
  };

  // Assignment & Certification Actions
  const handleSubmitAssignment = (assignmentId: string, fileName: string) => {
    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === assignmentId
          ? {
              ...asg,
              status: 'Submitted',
              submittedFile: fileName,
              submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : asg
      )
    );
  };

  const handleAddCertification = (newCert: Omit<Certification, 'id'>) => {
    const cert: Certification = {
      ...newCert,
      id: `cert-${Date.now()}`,
      issueDate: new Date().toISOString().split('T')[0],
    };
    setCertifications([cert, ...certifications]);
  };

  // Faculty Doubt Actions
  const handleSubmitDoubt = (newDoubt: Omit<AcademicDoubt, 'id' | 'submittedAt' | 'status'>) => {
    const doubt: AcademicDoubt = {
      ...newDoubt,
      id: `dbt-${Date.now()}`,
      submittedAt: 'Just now',
      status: newDoubt.scheduledSlot ? 'Slot Scheduled' : 'Awaiting Faculty',
    };
    setAcademicDoubts([doubt, ...academicDoubts]);

    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: 'Academic Guidance Ticket Created',
      message: `Your query "${doubt.topic}" was delivered to ${doubt.facultyName}.`,
      timestamp: 'Just now',
      read: false,
      type: 'faculty',
      priority: 'info',
    };
    setNotifications([notif, ...notifications]);
  };

  const handleLogResourceAccess = (digitalRes: DigitalResource, hours: number) => {
    const existing = userAccessHistory.find(
      (h) => h.userId === currentUser.id && h.resourceId === digitalRes.id
    );
    if (!existing) {
      const newEntry: UserResourceAccess = {
        id: `ura-${Date.now()}`,
        userId: currentUser.id,
        resourceId: digitalRes.id,
        resourceName: digitalRes.title,
        resourceType: 'Digital Library',
        date: new Date().toISOString().split('T')[0],
        hoursSpent: hours,
        purpose: `Reading ${digitalRes.title} for ${digitalRes.courseCode || 'Self-study'}`,
        status: 'Completed',
      };
      setUserAccessHistory([newEntry, ...userAccessHistory]);
    }
  };

  return (
    <div className="flex h-screen bg-black text-neutral-100 font-sans overflow-hidden">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-yellow-400/40 animate-in fade-in slide-in-from-bottom-2">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-yellow-400 stroke-[2.5]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userRole={currentUser.role}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-black">
        {/* Top Bar with Search & Role Switcher */}
        <TopBar
          currentUser={currentUser}
          allUsers={INITIAL_USERS}
          onSwitchUser={(u) => {
            setCurrentUser(u);
            showToast(`Switched active persona to ${u.role}: ${u.name}`);
          }}
          onRequestResource={() => handleOpenRequestModal()}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          unreadNotificationsCount={unreadNotificationsCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* View Router */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-neutral-950">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 1. DASHBOARD VIEW */}
            {currentTab === 'dashboard' && (
              <>
                {/* Resources Fast Navigation Strip */}
                <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                        Resources Ecosystem
                      </h2>
                    </div>
                    <span className="text-[11px] text-yellow-400 font-mono">
                      All Academic & Project Services Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                    <button
                      onClick={() => setCurrentTab('lectures')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-yellow-400/40 hover:border-yellow-400 rounded-xl text-left transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-1 right-1.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500 text-white animate-pulse">
                        NEW
                      </div>
                      <Video className="w-4 h-4 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-yellow-400">Lecture Recaps</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Last class recording & notes</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('digital-library')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <BookOpen className="w-4 h-4 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-yellow-400">Digital Library</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Galvin OS, notes, PDFs</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('skills')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <Flame className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-amber-400">Skill Development</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">DSA, Web, AI & Apps</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('bookings')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <Projector className="w-4 h-4 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-sky-400">Booking System</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Rooms, SIH gear & books</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('assignments')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <FileCheck2 className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-emerald-400">Assignments</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Submissions & rubrics</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('reports')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-cyan-400">Reports & Analytics</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Shortages & usage log</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('faculty')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <GraduationCap className="w-4 h-4 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-rose-400">Contact Faculty</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Academic doubts & advice</div>
                    </button>

                    <button
                      onClick={() => setCurrentTab('feedback')}
                      className="p-3 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 rounded-xl text-left transition-all group"
                    >
                      <MessageSquarePlus className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-xs text-white group-hover:text-purple-400">Resource Feedback</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">Report missing books</div>
                    </button>
                  </div>
                </div>

                {/* Latest Lecture Recap Spotlight Card */}
                {latestLecture && (
                  <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-850 border border-yellow-500/30 hover:border-yellow-400/60 rounded-2xl p-5 md:p-6 transition-all shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-48 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-400/10 transition-all" />
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
                      <div className="space-y-3 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                            Taught in Last Lecture
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-yellow-400/15 text-yellow-400 text-xs font-mono font-bold border border-yellow-400/30">
                            {latestLecture.courseCode} • Lec #{latestLecture.lectureNumber}
                          </span>
                          <span className="text-xs text-neutral-400 font-medium">
                            {latestLecture.dateTaught} • {latestLecture.timeSlot} • {latestLecture.roomCode}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {latestLecture.topic}
                          </h3>
                          <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                            {latestLecture.summaryOverview}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {latestLecture.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-neutral-950/80 text-neutral-300 border border-neutral-800"
                            >
                              <Sparkles className="w-3 h-3 text-yellow-400 shrink-0" />
                              <span className="truncate max-w-[260px]">{takeaway}</span>
                            </span>
                          ))}
                          {latestLecture.associatedEBook && (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-yellow-400/10 text-yellow-300 border border-yellow-400/25">
                              <BookOpen className="w-3 h-3 text-yellow-400 shrink-0" />
                              Ref: {latestLecture.associatedEBook.title.split('(')[0].trim()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                        <div className="text-right hidden lg:block">
                          <div className="text-xs font-semibold text-white">{latestLecture.professorName}</div>
                          <div className="text-[11px] text-neutral-400">Course Instructor</div>
                        </div>
                        <button
                          onClick={() => setCurrentTab('lectures')}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold transition-all shadow-lg hover:shadow-yellow-400/20 group/btn cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-black group-hover/btn:scale-110 transition-transform" />
                          <span>Watch Recording & Full Summary</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4 Required KPI Cards */}
                <KpiCards
                  resources={resources}
                  bookings={bookings}
                  budgets={budgets}
                  onFilterAvailableRooms={() => {
                    setStatusFilter('Available');
                  }}
                  onFilterPendingRequests={() => {
                    setCurrentTab('bookings');
                  }}
                  onNavigateBudget={() => {
                    setCurrentTab('budget');
                  }}
                  onNavigateTimetable={() => {
                    setCurrentTab('timetable');
                  }}
                />

                {/* Interactive Grid View for Classroom/Lab real-time availability */}
                <ResourceAvailabilityGrid
                  resources={resources}
                  onSelectResourceForBooking={(r) => handleOpenRequestModal(r.id)}
                  onRequestResource={(id) => handleOpenRequestModal(id)}
                  selectedStatusFilter={statusFilter}
                  onClearStatusFilter={() => setStatusFilter(undefined)}
                />
              </>
            )}

            {/* LECTURE RECAPS & RECORDINGS VIEW */}
            {currentTab === 'lectures' && (
              <LectureRecapView
                lectures={lectureRecaps}
                currentUser={currentUser}
                onNavigateToDigitalLibrary={(resId) => {
                  setCurrentTab('digital-library');
                  if (resId) {
                    showToast('Navigated to course reference book in Digital Library');
                  }
                }}
                onNavigateToFaculty={() => setCurrentTab('faculty')}
                onNavigateToAssignment={(asgId) => {
                  setCurrentTab('assignments');
                  if (asgId) {
                    showToast('Opened assignment connected to this lecture');
                  }
                }}
                onShowToast={showToast}
              />
            )}

            {/* 2. DIGITAL LIBRARY VIEW */}
            {currentTab === 'digital-library' && (
              <DigitalLibraryView
                resources={digitalResources}
                currentUser={currentUser}
                onOpenFeedbackForMissing={() => setCurrentTab('feedback')}
                onShowToast={showToast}
                onLogResourceAccess={handleLogResourceAccess}
              />
            )}

            {/* 3. SKILL DEVELOPMENT VIEW */}
            {currentTab === 'skills' && (
              <SkillDevelopmentView
                tracks={skillTracks}
                currentUser={currentUser}
                onUpdateTrack={setSkillTracks}
                onShowToast={showToast}
                onNavigateToBookingForLab={() => setCurrentTab('bookings')}
              />
            )}

            {/* 4. BOOKINGS VIEW */}
            {currentTab === 'bookings' && (
              <BookingView
                bookings={bookings}
                resources={resources}
                currentUser={currentUser}
                onApproveBooking={handleApproveBooking}
                onRejectBooking={handleRejectBooking}
                onRequestNew={(preselectedName) => handleOpenRequestModal(preselectedName)}
              />
            )}

            {/* 5. REPORTS & ANALYTICS VIEW */}
            {currentTab === 'reports' && (
              <ReportsView
                resources={resources}
                bookings={bookings}
                currentUser={currentUser}
                userAccessHistory={userAccessHistory}
              />
            )}

            {/* 6. RESOURCE FEEDBACK & SHORTAGES VIEW */}
            {currentTab === 'feedback' && (
              <ResourceFeedbackView
                feedbacks={feedbacks}
                currentUser={currentUser}
                onSubmitFeedback={handleAddFeedback}
                onRateFeedback={handleRateFeedback}
                onAddComment={handleAddComment}
                onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
                onShowToast={showToast}
                onNavigateToDigitalLibrary={() => setCurrentTab('digital-library')}
              />
            )}

            {/* 7. ASSIGNMENTS & CERTIFICATIONS VIEW */}
            {currentTab === 'assignments' && (
              <AssignmentsCertificationsView
                assignments={assignments}
                certifications={certifications}
                currentUser={currentUser}
                onSubmitAssignment={handleSubmitAssignment}
                onAddCertification={handleAddCertification}
                onShowToast={showToast}
              />
            )}

            {/* 8. CONTACT FACULTY VIEW */}
            {currentTab === 'faculty' && (
              <ContactFacultyView
                facultyMembers={facultyMembers}
                doubts={academicDoubts}
                currentUser={currentUser}
                onSubmitDoubt={handleSubmitDoubt}
                onShowToast={showToast}
              />
            )}

            {/* 9. TIMETABLE VIEW */}
            {currentTab === 'timetable' && (
              <TimetableSchedulerView courses={SAMPLE_COURSES} resources={resources} />
            )}

            {/* 10. BUDGET VIEW */}
            {currentTab === 'budget' && (
              <BudgetAllocationView
                budgets={budgets}
                currentUser={currentUser}
                onAddExpense={handleAddExpense}
              />
            )}

            {/* 11. INVENTORY VIEW */}
            {currentTab === 'inventory' && (
              <InventoryView
                inventory={inventory}
                onUpdateInventoryItem={(updated) => {
                  setInventory((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
                }}
              />
            )}

            {/* 12. ARCHITECTURE DOCS VIEW */}
            {currentTab === 'architecture' && <ArchitectureDocsView />}
          </div>
        </main>
      </div>

      {/* Quick Request Resource Modal with Conflict Prevention */}
      <RequestResourceModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        resources={resources}
        bookings={bookings}
        currentUser={currentUser}
        preselectedResourceId={preselectedResourceId}
        onSubmitBooking={handleAddBooking}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => {
          setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
        }}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onActionClick={(notif) => {
          setIsNotificationDrawerOpen(false);
          if (notif.type === 'feedback') setCurrentTab('feedback');
          else if (notif.type === 'faculty') setCurrentTab('faculty');
          else if (notif.type === 'assignment') setCurrentTab('assignments');
          else setCurrentTab('bookings');
        }}
      />
    </div>
  );
}
