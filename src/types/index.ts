export type UserRole = 'Admin' | 'HOD' | 'Faculty' | 'Student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  phone?: string;
}

export type ResourceCategory = 'Classroom' | 'Lab' | 'Equipment' | 'Software License' | 'Projector & AV' | 'Library Book';

export type RoomStatus = 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';

export interface Resource {
  id: string;
  name: string;
  code: string;
  category: ResourceCategory;
  type: string;
  building: string;
  floor: number;
  capacity: number;
  status: RoomStatus;
  currentOccupant?: string;
  currentCourse?: string;
  currentEndsAt?: string;
  features: string[]; // e.g. ['Projector', 'GPU Workstations', 'Smart Board', 'Audio System']
  hourlyCost?: number;
}

export type BookingStatus = 'Approved' | 'Pending' | 'Rejected' | 'Cancelled';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  department: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  purpose: string;
  courseCode?: string;
  expectedAttendance: number;
  priority: PriorityLevel;
  status: BookingStatus;
  requestedAt: string;
  approvedBy?: string;
  rejectionReason?: string;
  equipmentRequested?: string[];
}

export interface DepartmentBudget {
  id: string;
  departmentId: string;
  departmentName: string;
  fiscalYear: string;
  totalAllocated: number;
  spent: number;
  pendingCommitments: number;
  categories: {
    name: string;
    allocated: number;
    spent: number;
  }[];
  recentExpenses: {
    id: string;
    description: string;
    amount: number;
    date: string;
    approvedBy: string;
    category: string;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  assetTag: string;
  category: 'Hardware' | 'AudioVisual' | 'LabEquipment' | 'Software';
  location: string;
  condition: 'Optimal' | 'Fair' | 'Under Maintenance' | 'Decommissioned';
  assignedTo?: string;
  assignedDepartment: string;
  purchaseDate: string;
  nextMaintenanceDate?: string;
  quantityTotal: number;
  quantityAvailable: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  batch: string; // e.g. 'CS-Year-3'
  studentStrength: number;
  teacherId: string;
  teacherName: string;
  weeklyHours: number;
  type: 'Lecture' | 'Lab' | 'Seminar';
  requiredFeatures: string[];
}

export interface TimetableSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  timeSlot: string; // e.g., '09:00 - 10:30'
  courseCode: string;
  courseTitle: string;
  teacherName: string;
  roomCode: string;
  roomName: string;
  batch: string;
  studentStrength: number;
  capacity: number;
}

export interface ConflictRecord {
  type: 'Double Booking' | 'Capacity Exceeded' | 'Teacher Overlap' | 'Feature Missing';
  description: string;
  courseCode: string;
  timeSlot: string;
  day: string;
  resolution: string;
}

export interface SolverResult {
  schedule: TimetableSlot[];
  conflictsDetected: number;
  conflictsResolved: number;
  unassignedCourses: Course[];
  conflictLog: ConflictRecord[];
  roomUtilizationRate: number; // percentage
  executionTimeMs: number;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking' | 'alert' | 'budget' | 'maintenance' | 'feedback' | 'assignment' | 'faculty';
  priority: 'info' | 'warning' | 'critical';
  actionableId?: string;
}

// --- Digital Library Types ---
export type DigitalResourceType = 'ebook' | 'notes' | 'pdf' | 'cheatsheet';

export interface DigitalResource {
  id: string;
  title: string;
  authorOrProf: string;
  type: DigitalResourceType;
  department: string;
  courseCode?: string;
  description: string;
  fileSize: string;
  pageCount: number;
  coverImage?: string;
  tags: string[];
  downloadsCount: number;
  readCount: number;
  featured?: boolean;
  contentSnippet?: string;
  chapters?: { title: string; pages: string }[];
}

// --- Skill Development Types ---
export interface SkillModule {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  summary: string;
  practiceProblem?: {
    title: string;
    description: string;
    sampleInput?: string;
    sampleOutput?: string;
    starterCode?: string;
    solutionSnippet?: string;
  };
  completed?: boolean;
}

export interface SkillTrack {
  id: string;
  title: string;
  category: 'DSA' | 'Web Development' | 'AI/ML' | 'App Development' | 'Cloud & DevOps';
  description: string;
  level: 'Beginner to Advanced' | 'Intermediate' | 'Intermediate to Advanced' | 'Industry Ready';
  totalModules: number;
  completedModules: number;
  color: string;
  modules: SkillModule[];
}

// --- Personal Resource Access & Usage Tracker Types ---
export interface UserResourceAccess {
  id: string;
  userId: string;
  resourceId: string;
  resourceName: string;
  resourceType: 'Classroom' | 'Lab' | 'Projector/AV' | 'Library Book' | 'Digital Library';
  date: string;
  hoursSpent: number;
  purpose: string;
  status: 'Completed' | 'In Use' | 'Scheduled';
}

// --- Resource Shortages & Feedback Types ---
export interface FeedbackComment {
  id: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  text: string;
  createdAt: string;
}

export interface ResourceFeedback {
  id: string;
  title: string;
  category: 'E-Book / Notes' | 'Projector & AV Gear' | 'Lab Hardware / Kit' | 'Study Space' | 'Software';
  description: string;
  courseOrProject?: string;
  urgency: 'Normal' | 'High' | 'Urgent';
  submittedBy: string;
  userRole: UserRole;
  submittedAt: string;
  rating: number; // average star rating (e.g. 4.9)
  ratingCount: number; // total number of ratings
  userStarRating?: number; // 1-5 stars rated by active user
  comments: FeedbackComment[];
  status: 'Under Review' | 'Procurement Initiated' | 'Added to Library / Stock' | 'Declined';
  adminNotes?: string;
}

// --- Assignments & Certifications Types ---
export interface Assignment {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  professorName: string;
  dueDate: string;
  daysRemaining: number;
  totalMarks: number;
  status: 'Pending' | 'Submitted' | 'Graded';
  obtainedMarks?: number;
  feedbackNotes?: string;
  submittedFile?: string;
  submittedAt?: string;
  instructions: string;
  rubric: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: 'Cloud' | 'Web' | 'AI/ML' | 'Algorithms' | 'DevOps';
  credentialId?: string;
  issueDate?: string;
  expiryDate?: string;
  progressPercent: number;
  status: 'In Progress' | 'Completed' | 'Expiring Soon';
  certificateUrl?: string;
  skillsAcquired: string[];
}

// --- Faculty Contact & Academic Guidance Types ---
export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  officeRoom: string;
  avatar: string;
  officeHours: string;
  researchAreas: string[];
  acceptingDoubts: boolean;
  rating?: number;
}

export interface AcademicDoubt {
  id: string;
  studentId: string;
  studentName: string;
  facultyId: string;
  facultyName: string;
  subject: string;
  topic: string;
  type: 'Assignment Doubts' | 'SIH / Project Mentorship' | 'Academic Guidance' | 'Exam Query';
  question: string;
  codeOrAttachment?: string;
  status: 'Awaiting Faculty' | 'Resolved' | 'Slot Scheduled';
  submittedAt: string;
  scheduledSlot?: string;
  facultyResponse?: string;
}

// --- Lecture Recaps & Recording Summaries Types ---
export interface LectureChapter {
  id: string;
  timeSeconds: number;
  timestamp: string; // e.g. "12:45"
  title: string;
  keyTakeaway: string;
}

export interface LectureRecap {
  id: string;
  courseCode: string; // e.g. "CS301"
  courseName: string; // e.g. "Operating Systems Internals"
  lectureNumber: number; // e.g. 18
  topic: string; // e.g. "Process Scheduling & Multi-Level Feedback Queues"
  professorName: string; // e.g. "Dr. Sarah Chen"
  professorAvatar?: string;
  roomCode: string; // e.g. "LT-101 (Aryabhata Lecture Theatre)"
  dateTaught: string; // e.g. "2026-10-25"
  timeSlot: string; // e.g. "10:30 - 12:00"
  duration: string; // e.g. "1h 22m"
  isLatest: boolean;
  videoThumbnail: string;
  videoDurationSeconds: number;
  summaryOverview: string;
  coreConcepts: {
    concept: string;
    description: string;
    formulaOrCode?: string;
  }[];
  chapters: LectureChapter[];
  keyTakeaways: string[];
  inClassDoubtsAnswered: {
    studentQuestion: string;
    facultyAnswer: string;
  }[];
  whiteboardSnapshots?: {
    caption: string;
    url: string;
  }[];
  associatedEBook?: {
    title: string;
    chapterNumber: string;
    digitalResourceId: string;
  };
  connectedAssignmentId?: string;
  tags: string[];
}


