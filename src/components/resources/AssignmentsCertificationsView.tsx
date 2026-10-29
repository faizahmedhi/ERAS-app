import React, { useState } from 'react';
import {
  FileCheck2,
  Award,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Upload,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Plus,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Assignment, Certification, User } from '../../types';

interface AssignmentsCertificationsViewProps {
  assignments: Assignment[];
  certifications: Certification[];
  currentUser: User;
  onSubmitAssignment: (assignmentId: string, fileName: string) => void;
  onAddCertification: (cert: Omit<Certification, 'id'>) => void;
  onShowToast: (text: string, type?: 'success' | 'error') => void;
}

export const AssignmentsCertificationsView: React.FC<AssignmentsCertificationsViewProps> = ({
  assignments,
  certifications,
  currentUser,
  onSubmitAssignment,
  onAddCertification,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'assignments' | 'certifications'>('assignments');
  const [assignmentFilter, setAssignmentFilter] = useState<'all' | 'pending' | 'graded'>('all');
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState<Assignment | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cert modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('AWS');
  const [certCategory, setCertCategory] = useState<Certification['category']>('Cloud');
  const [certProgress, setCertProgress] = useState(50);
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);

  const filteredAssignments = assignments.filter((asg) => {
    if (assignmentFilter === 'pending' && asg.status !== 'Pending') return false;
    if (assignmentFilter === 'graded' && asg.status !== 'Graded') return false;
    return true;
  });

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignmentForSubmission) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitAssignment(
        selectedAssignmentForSubmission.id,
        uploadFileName || 'academic_assignment_solution.zip'
      );
      onShowToast(`Assignment "${selectedAssignmentForSubmission.title}" submitted successfully!`);
      setSelectedAssignmentForSubmission(null);
      setUploadFileName('');
    }, 600);
  };

  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim()) return;

    onAddCertification({
      title: certTitle,
      issuer: certIssuer,
      category: certCategory,
      progressPercent: certProgress,
      status: certProgress === 100 ? 'Completed' : 'In Progress',
      credentialId: certProgress === 100 ? `VERIFIED-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
      skillsAcquired: ['Core Competency', 'Applied Labs', 'Industry Standard'],
    });

    onShowToast(`Certification "${certTitle}" tracked successfully!`);
    setIsCertModalOpen(false);
    setCertTitle('');
    setCertProgress(50);
  };

  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;
  const completedCertsCount = certifications.filter((c) => c.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Academic Progression & Credentials</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Assignments & Certifications Tracker
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              Track course submission deadlines, view rubrics and professor evaluations, and showcase your verified industry certifications (AWS, Meta, Google Cloud, DeepLearning.AI).
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-center min-w-[100px]">
              <div className="text-xl font-bold text-yellow-400">{pendingCount}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Pending Tasks</div>
            </div>
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-center min-w-[100px]">
              <div className="text-xl font-bold text-emerald-400">{completedCertsCount}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Certificates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'assignments'
                ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            <FileText className="w-4 h-4 stroke-[2.2]" />
            <span>Course Assignments ({assignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'certifications'
                ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            <Award className="w-4 h-4 stroke-[2.2]" />
            <span>Certifications & Badges ({certifications.length})</span>
          </button>
        </div>

        {activeTab === 'assignments' ? (
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setAssignmentFilter('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                assignmentFilter === 'all' ? 'bg-yellow-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setAssignmentFilter('pending')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                assignmentFilter === 'pending' ? 'bg-yellow-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setAssignmentFilter('graded')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                assignmentFilter === 'graded' ? 'bg-yellow-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Graded
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Track New Certification</span>
          </button>
        )}
      </div>

      {/* ASSIGNMENTS VIEW */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {filteredAssignments.map((asg) => {
            const isDueSoon = asg.daysRemaining <= 2 && asg.status === 'Pending';
            return (
              <div
                key={asg.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 uppercase font-bold">
                        {asg.courseCode}
                      </span>
                      <span className="text-xs text-neutral-400">{asg.courseTitle}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs text-neutral-400">Prof: {asg.professorName}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{asg.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">{asg.instructions}</p>
                  </div>

                  {/* Deadline & Status Badge */}
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    {asg.status === 'Graded' ? (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/15 text-emerald-400 border border-emerald-400/30">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Graded ({asg.obtainedMarks}/{asg.totalMarks} pts)</span>
                        </span>
                      </div>
                    ) : asg.status === 'Submitted' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-400/15 text-sky-400 border border-sky-400/30">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Submitted · Under Review</span>
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          isDueSoon
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse'
                            : 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Due {asg.dueDate} ({asg.daysRemaining} days left)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Rubric Preview */}
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Grading Rubric Criteria:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {asg.rubric.map((r, i) => (
                      <div key={i} className="text-xs text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graded Feedback note (if graded) */}
                {asg.feedbackNotes && (
                  <div className="p-3 bg-neutral-950/80 rounded-xl border border-emerald-500/30 text-xs space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Faculty Reviewer Feedback:</span>
                    </span>
                    <p className="text-neutral-300 text-[11px]">{asg.feedbackNotes}</p>
                    <div className="text-[10px] text-neutral-500 pt-1">
                      Submitted file: {asg.submittedFile} · Submitted at {asg.submittedAt}
                    </div>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-[11px]">
                    Total Weightage: <strong className="text-white">{asg.totalMarks} Points</strong>
                  </span>

                  {asg.status === 'Pending' && (
                    <button
                      onClick={() => {
                        setSelectedAssignmentForSubmission(asg);
                        setUploadFileName('');
                      }}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Submit Solution</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CERTIFICATIONS VIEW */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => {
            const isDone = cert.status === 'Completed';

            return (
              <div
                key={cert.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 uppercase">
                      {cert.issuer}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>VERIFIED</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
                        IN PROGRESS
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white">{cert.title}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{cert.category} Domain</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>Curriculum Mastery</span>
                      <span className="font-bold text-white">{cert.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone ? 'bg-emerald-400' : 'bg-yellow-400'
                        }`}
                        style={{ width: `${cert.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {cert.skillsAcquired.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[10px] rounded bg-neutral-950 text-neutral-400 border border-neutral-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Credential ID */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <div className="text-[11px] font-mono truncate max-w-[150px]">
                    {cert.credentialId || 'Exam in progress'}
                  </div>

                  {isDone && (
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="text-xs text-yellow-400 hover:text-yellow-300 font-bold flex items-center gap-1"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Submission Modal */}
      {selectedAssignmentForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Submit Course Assignment</h3>
                <p className="text-xs text-neutral-400">{selectedAssignmentForSubmission.courseCode}: {selectedAssignmentForSubmission.title}</p>
              </div>
              <button
                onClick={() => setSelectedAssignmentForSubmission(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Submission File Name (.zip, .pdf, .ipynb)
                </label>
                <input
                  type="text"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  placeholder="e.g. jordan_cs301_scheduler_assignment.zip"
                  required
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-neutral-800 hover:border-yellow-400/50 rounded-xl bg-neutral-950/60 text-center space-y-2 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 text-yellow-400 mx-auto" />
                <div className="font-semibold text-neutral-200">
                  Simulate Drag & Drop or Click to Attach Solution
                </div>
                <div className="text-[11px] text-neutral-500">
                  Accepts ZIP code repos, Jupyter notebooks, or PDF technical reports (max 50MB)
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg text-neutral-400 space-y-1">
                <div className="font-semibold text-white">Honor Code Declaration:</div>
                <div className="text-[11px]">
                  By submitting, you certify that this work was completed in adherence with university academic integrity rules.
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAssignmentForSubmission(null)}
                  className="px-3.5 py-2 text-neutral-400 hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Uploading...' : 'Confirm Submission'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Track New Certification</h3>
                <p className="text-xs text-neutral-400">Log external certifications to your academic profile</p>
              </div>
              <button onClick={() => setIsCertModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCertSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Certification Title *
                </label>
                <input
                  type="text"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  placeholder="e.g. Google Cloud Professional Data Engineer"
                  required
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Issuer</label>
                  <input
                    type="text"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    placeholder="e.g. AWS, Meta, Google"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Domain</label>
                  <select
                    value={certCategory}
                    onChange={(e) => setCertCategory(e.target.value as Certification['category'])}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Cloud">Cloud & Infra</option>
                    <option value="Web">Web Development</option>
                    <option value="AI/ML">AI & Machine Learning</option>
                    <option value="Algorithms">Algorithms & DSA</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-neutral-300 font-semibold">Progress Completion</label>
                  <span className="font-bold text-yellow-400">{certProgress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={certProgress}
                  onChange={(e) => setCertProgress(Number(e.target.value))}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-3.5 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg transition-colors shadow-xs"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl p-8 space-y-6 shadow-2xl relative text-center">
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Official Credential Verification
              </span>
              <h3 className="text-xl font-extrabold text-white">{previewCert.title}</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Issued by {previewCert.issuer} to {currentUser.name}
              </p>
            </div>

            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-500">Credential ID:</span>
                <span className="text-yellow-400 font-bold">{previewCert.credentialId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Issue Date:</span>
                <span className="text-neutral-300">{previewCert.issueDate || '2026-08-20'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Verification Status:</span>
                <span className="text-emerald-400 font-bold">100% Verified Cryptographic Signature</span>
              </div>
            </div>

            <button
              onClick={() => setPreviewCert(null)}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-lg transition-colors"
            >
              Close Credential
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
