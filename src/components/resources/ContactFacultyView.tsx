import React, { useState } from 'react';
import {
  GraduationCap,
  MessageSquare,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  HelpCircle,
  Search,
  Plus,
  X,
  Sparkles,
  ChevronRight,
  Code,
  UserCheck,
} from 'lucide-react';
import { AcademicDoubt, FacultyMember, User } from '../../types';

interface ContactFacultyViewProps {
  facultyMembers: FacultyMember[];
  doubts: AcademicDoubt[];
  currentUser: User;
  onSubmitDoubt: (newDoubt: Omit<AcademicDoubt, 'id' | 'submittedAt' | 'status'>) => void;
  onShowToast: (text: string, type?: 'success' | 'error') => void;
}

export const ContactFacultyView: React.FC<ContactFacultyViewProps> = ({
  facultyMembers,
  doubts,
  currentUser,
  onSubmitDoubt,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'my_tickets'>('directory');
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Ask Doubt / Book Slot Modal
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [doubtType, setDoubtType] = useState<AcademicDoubt['type']>('Assignment Doubts');
  const [subject, setSubject] = useState('CS301 - Operating Systems');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [codeOrAttachment, setCodeOrAttachment] = useState('');
  const [preferSlot, setPreferSlot] = useState(false);
  const [viewingTicket, setViewingTicket] = useState<AcademicDoubt | null>(null);

  const departments = ['all', 'Computer Science & Engineering', 'AI & Data Science', 'Electrical & Electronics / Embedded Systems'];

  const filteredFaculty = facultyMembers.filter((fac) => {
    if (selectedDept !== 'all' && !fac.department.includes(selectedDept)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = fac.name.toLowerCase().includes(q);
      const matchDept = fac.department.toLowerCase().includes(q);
      const matchResearch = fac.researchAreas.some((r) => r.toLowerCase().includes(q));
      if (!matchName && !matchDept && !matchResearch) return false;
    }
    return true;
  });

  const handleOpenDoubtModal = (fac: FacultyMember, defaultType?: AcademicDoubt['type']) => {
    setSelectedFaculty(fac);
    if (defaultType) setDoubtType(defaultType);
    if (fac.department.includes('AI')) setSubject('AI402 - Deep Learning');
    else if (fac.department.includes('Electrical')) setSubject('EC308 / SIH IoT Prototyping');
    else setSubject('CS301 - Operating Systems');
  };

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaculty || !topic.trim() || !question.trim()) {
      onShowToast('Please provide a subject topic and describe your question.', 'error');
      return;
    }

    onSubmitDoubt({
      studentId: currentUser.id,
      studentName: currentUser.name,
      facultyId: selectedFaculty.id,
      facultyName: selectedFaculty.name,
      subject,
      topic,
      type: doubtType,
      question,
      codeOrAttachment: codeOrAttachment.trim() || undefined,
      scheduledSlot: preferSlot ? `Next available office slot: ${selectedFaculty.officeHours.split('|')[0]}` : undefined,
    });

    onShowToast(`Doubt ticket sent to ${selectedFaculty.name}! Faculty will review shortly.`);
    setSelectedFaculty(null);
    setTopic('');
    setQuestion('');
    setCodeOrAttachment('');
    setPreferSlot(false);
    setActiveTab('my_tickets');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Mentorship & Guidance Hub</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Contact Faculty & Academic Support
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              Connect with department professors for course assignment doubts, Smart India Hackathon (SIH) mentorship, lab project guidance, or schedule 1-on-1 office hour consultations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'directory'
                  ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
                  : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              Faculty Directory ({facultyMembers.length})
            </button>
            <button
              onClick={() => setActiveTab('my_tickets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'my_tickets'
                  ? 'bg-yellow-400 text-neutral-950 shadow-sm shadow-yellow-500/20'
                  : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              My Doubt Tickets ({doubts.length})
            </button>
          </div>
        </div>
      </div>

      {/* DIRECTORY VIEW */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          {/* Search & Department Selector */}
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty by name, department, or research domain (e.g. Operating Systems, Deep Learning, SIH)..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300 focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science & Engineering</option>
              <option value="AI">AI & Data Science</option>
              <option value="Electrical">Electrical & Embedded</option>
            </select>
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFaculty.map((fac) => (
              <div
                key={fac.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Top row: Avatar & Core Info */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={fac.avatar}
                      alt={fac.name}
                      className="w-14 h-14 rounded-xl object-cover border border-neutral-700 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">{fac.name}</span>
                        {fac.acceptingDoubts && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                            Available
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-yellow-400 font-medium">{fac.title}</div>
                      <div className="text-[11px] text-neutral-400 truncate">{fac.department}</div>
                    </div>
                  </div>

                  {/* Office Room & Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <MapPin className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                      <span className="truncate">{fac.officeRoom}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                      <span className="truncate">{fac.officeHours.split('|')[0]}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3 h-3 text-neutral-500" />
                      {fac.email}
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <Phone className="w-3 h-3 text-neutral-500" />
                      {fac.phone}
                    </span>
                  </div>

                  {/* Research / Specialization tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {fac.researchAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2 py-0.5 text-[10px] rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenDoubtModal(fac, 'Assignment Doubts')}
                    className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Send Doubt</span>
                  </button>

                  <button
                    onClick={() => {
                      handleOpenDoubtModal(fac, 'SIH / Project Mentorship');
                      setPreferSlot(true);
                    }}
                    className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Book 1-on-1 Slot</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MY TICKETS & CONSULTATIONS VIEW */}
      {activeTab === 'my_tickets' && (
        <div className="space-y-4">
          {doubts.map((dbt) => {
            const isResolved = dbt.status === 'Resolved';
            const isScheduled = dbt.status === 'Slot Scheduled';

            return (
              <div
                key={dbt.id}
                onClick={() => setViewingTicket(dbt)}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all space-y-3 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 uppercase font-bold">
                        {dbt.type}
                      </span>
                      <span className="text-xs font-mono text-neutral-300">{dbt.subject}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-xs text-neutral-400">Faculty: {dbt.facultyName}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{dbt.topic}</h3>
                    <p className="text-xs text-neutral-300 line-clamp-2">{dbt.question}</p>
                  </div>

                  <div className="flex-shrink-0">
                    {isResolved ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/15 text-emerald-400 border border-emerald-400/30">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Resolved by Faculty</span>
                      </span>
                    ) : isScheduled ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-400/15 text-yellow-300 border border-yellow-400/30">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Office Slot Booked</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Awaiting Faculty Reply</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Faculty Response Box Preview */}
                {dbt.facultyResponse && (
                  <div className="p-3 bg-neutral-950 rounded-xl border border-emerald-500/30 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Response from {dbt.facultyName}:</span>
                      </span>
                      {dbt.scheduledSlot && (
                        <span className="text-yellow-400 font-mono text-[11px]">
                          Slot: {dbt.scheduledSlot}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-300 text-[11px] line-clamp-2">{dbt.facultyResponse}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Submitted {dbt.submittedAt}</span>
                  <span className="text-yellow-400 flex items-center gap-1 font-semibold">
                    <span>View Full Discussion</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}

          {doubts.length === 0 && (
            <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-400">
              You haven't submitted any academic doubt tickets yet.
            </div>
          )}
        </div>
      )}

      {/* Ask Doubt Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFaculty.avatar}
                  alt={selectedFaculty.name}
                  className="w-10 h-10 rounded-lg object-cover border border-neutral-700"
                />
                <div>
                  <h3 className="font-bold text-white text-base">Contact {selectedFaculty.name}</h3>
                  <p className="text-xs text-neutral-400">{selectedFaculty.department} · {selectedFaculty.officeRoom}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFaculty(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitDoubt} className="p-6 space-y-4 overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Guidance / Query Category
                  </label>
                  <select
                    value={doubtType}
                    onChange={(e) => setDoubtType(e.target.value as AcademicDoubt['type'])}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Assignment Doubts">Assignment Doubts & Clarifications</option>
                    <option value="SIH / Project Mentorship">SIH / Hackathon Project Mentorship</option>
                    <option value="Academic Guidance">Academic & Career Guidance</option>
                    <option value="Exam Query">Mid-term / End-term Exam Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Subject / Course
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Specific Topic / Question Title *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Banker's Algorithm Allocation Matrix or SIH YOLOv8 Inference on RPi"
                  required
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Detailed Question / Problem Description *
                </label>
                <textarea
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Clearly describe the doubt, what you've tried, and what error or conceptual confusion you encountered..."
                  required
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Code Snippet or Math Formula (Optional)
                </label>
                <textarea
                  rows={3}
                  value={codeOrAttachment}
                  onChange={(e) => setCodeOrAttachment(e.target.value)}
                  placeholder="// Paste relevant code lines or terminal logs here..."
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg font-mono text-[11px] text-yellow-300 placeholder:text-neutral-600 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Office Hours Slot Booking Checkbox */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="slotCheck"
                  checked={preferSlot}
                  onChange={(e) => setPreferSlot(e.target.checked)}
                  className="mt-0.5 accent-yellow-400 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="slotCheck" className="cursor-pointer select-none">
                  <div className="font-semibold text-white">
                    Request 1-on-1 Office Hour Meeting Slot
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Faculty office hours: <strong className="text-yellow-400">{selectedFaculty.officeHours}</strong> at Cabin {selectedFaculty.officeRoom}.
                  </div>
                </label>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(null)}
                  className="px-3.5 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Faculty</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {viewingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-yellow-400 uppercase">
                  {viewingTicket.type} · {viewingTicket.subject}
                </span>
                <h3 className="font-bold text-white text-base mt-0.5">{viewingTicket.topic}</h3>
              </div>
              <button onClick={() => setViewingTicket(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5">
                <div className="text-neutral-400 text-[11px]">
                  Submitted by {viewingTicket.studentName} on {viewingTicket.submittedAt}
                </div>
                <p className="text-neutral-200 leading-relaxed">{viewingTicket.question}</p>
                {viewingTicket.codeOrAttachment && (
                  <pre className="p-3 bg-black rounded-lg text-yellow-300 font-mono text-[11px] overflow-x-auto">
                    {viewingTicket.codeOrAttachment}
                  </pre>
                )}
              </div>

              {viewingTicket.facultyResponse ? (
                <div className="p-4 bg-neutral-950 rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{viewingTicket.facultyName} (Faculty Reply):</span>
                    </span>
                    {viewingTicket.scheduledSlot && (
                      <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 text-[11px] font-mono">
                        {viewingTicket.scheduledSlot}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-200 leading-relaxed">{viewingTicket.facultyResponse}</p>
                </div>
              ) : (
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-center text-neutral-400">
                  Faculty has received your ticket and will provide guidance during designated office hours.
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setViewingTicket(null)}
                className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg text-xs"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
