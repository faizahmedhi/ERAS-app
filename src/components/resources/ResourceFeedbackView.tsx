import React, { useState } from 'react';
import {
  MessageSquarePlus,
  Star,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Sparkles,
  BookOpen,
  Projector,
  Cpu,
  Layers,
  X,
  Plus,
  Check,
  Send,
  Building,
  UserCheck,
  GraduationCap,
  Shield,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FeedbackComment, ResourceFeedback, User, UserRole } from '../../types';

interface ResourceFeedbackViewProps {
  feedbacks: ResourceFeedback[];
  currentUser: User;
  onSubmitFeedback: (newFeedback: Omit<ResourceFeedback, 'id' | 'submittedAt' | 'rating' | 'ratingCount' | 'comments' | 'status'>) => void;
  onRateFeedback: (feedbackId: string, rating: number) => void;
  onAddComment: (feedbackId: string, text: string) => void;
  onUpdateFeedbackStatus?: (feedbackId: string, status: ResourceFeedback['status'], adminNotes?: string) => void;
  onShowToast: (text: string, type?: 'success' | 'error') => void;
  onNavigateToDigitalLibrary?: () => void;
}

export const ResourceFeedbackView: React.FC<ResourceFeedbackViewProps> = ({
  feedbacks,
  currentUser,
  onSubmitFeedback,
  onRateFeedback,
  onAddComment,
  onUpdateFeedbackStatus,
  onShowToast,
  onNavigateToDigitalLibrary,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expanded comments tracker (set of feedback IDs that have comments open)
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'fb-101': true, // Open by default on the OS Galvin e-book example
  });

  // Comment input draft state per feedback id
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Hover star state per feedback id for interactive star rating
  const [hoveredStars, setHoveredStars] = useState<Record<string, number | null>>({});

  // New feedback modal form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ResourceFeedback['category']>('E-Book / Notes');
  const [courseOrProject, setCourseOrProject] = useState('CS301 - Operating Systems');
  const [urgency, setUrgency] = useState<ResourceFeedback['urgency']>('Urgent');
  const [description, setDescription] = useState('');

  // Quick preset suggestions
  const presetTemplates = [
    {
      label: 'OS Galvin E-Book Access',
      title: 'Operating System Concepts (Galvin 10th Ed) E-Book',
      category: 'E-Book / Notes' as const,
      course: 'CS301 - Operating Systems',
      urgency: 'Urgent' as const,
      desc: 'All 8 physical copies in central library are checked out for upcoming mid-term exams. We urgently need digital e-book access on the ERAS Digital Library.',
    },
    {
      label: 'SIH Hackathon Projector',
      title: 'Portable 4K Projector Kit for SIH Team Rehearsal',
      category: 'Projector & AV Gear' as const,
      course: 'SIH-2026 Smart India Hackathon',
      urgency: 'High' as const,
      desc: 'Our team needs a high-lumens projector to rehearse software/hardware sensor demo ahead of state-level SIH hackathon evaluations.',
    },
    {
      label: 'Embedded Sensor Kits',
      title: 'ESP32 & Raspberry Pi Camera Modules in Faraday Lab',
      category: 'Lab Hardware / Kit' as const,
      course: 'EC308 & IoT Hackathon',
      urgency: 'High' as const,
      desc: 'Insufficient camera breakout boards and ultrasonic sensors in LAB-301 for edge computer vision capstones.',
    },
  ];

  const handleApplyPreset = (preset: (typeof presetTemplates)[0]) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setCourseOrProject(preset.course);
    setUrgency(preset.urgency);
    setDescription(preset.desc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      onShowToast('Please fill in both the resource title and description.', 'error');
      return;
    }

    onSubmitFeedback({
      title,
      category,
      courseOrProject,
      urgency,
      description,
      submittedBy: currentUser.name,
      userRole: currentUser.role,
    });

    onShowToast('Resource shortage request submitted! Community can now rate and comment.');
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const toggleComments = (id: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePostComment = (feedbackId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[feedbackId]?.trim();
    if (!text) return;

    onAddComment(feedbackId, text);
    setCommentInputs((prev) => ({ ...prev, [feedbackId]: '' }));
    onShowToast('Comment posted to resource feedback discussion!');
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (activeCategory !== 'all' && fb.category !== activeCategory) return false;
    if (activeStatus !== 'all' && fb.status !== activeStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = fb.title.toLowerCase().includes(q);
      const matchDesc = fb.description.toLowerCase().includes(q);
      const matchCourse = fb.courseOrProject?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCourse) return false;
    }
    return true;
  });

  const getStatusBadge = (status: ResourceFeedback['status']) => {
    switch (status) {
      case 'Added to Library / Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-400/15 text-emerald-400 border border-emerald-400/30">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Available in Library / Stock</span>
          </span>
        );
      case 'Procurement Initiated':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-400/15 text-yellow-300 border border-yellow-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Procurement Approved</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Under HOD Review</span>
          </span>
        );
      case 'Declined':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-400/15 text-rose-400 border border-rose-400/30">
            <X className="w-3.5 h-3.5" />
            <span>Alternative Provided</span>
          </span>
        );
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return <span className="text-[10px] px-1.5 py-0.2 rounded bg-yellow-400/20 text-yellow-300 font-mono">Admin</span>;
      case 'HOD':
        return <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">HOD</span>;
      case 'Faculty':
        return <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 font-mono">Faculty</span>;
      default:
        return <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 font-mono">Student</span>;
    }
  };

  const canManage = currentUser.role === 'Admin' || currentUser.role === 'HOD';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Resource Shortage & Feedback Hub</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Resource Feedback & Shortage Requisition
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              Encountered a shortage? Whether you need an e-book not yet in the digital library (e.g. <em>OS Galvin 10th edition</em>), additional 4K projectors for your SIH team, or more lab sensor kits, report it here. Rate demand with the <strong>star-based system</strong> and discuss in <strong>comments</strong>.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-yellow-500/20 flex-shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Report Missing Resource</span>
          </button>
        </div>
      </div>

      {/* Control Filters & Search */}
      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requested resources (e.g., Galvin OS, Projector, Raspberry Pi)..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-300 focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Procurement Initiated">Procurement Initiated</option>
              <option value="Added to Library / Stock">Added to Library / Stock</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { label: 'All Categories', value: 'all' },
            { label: 'E-Books & Notes', value: 'E-Book / Notes' },
            { label: 'Projector & AV Gear', value: 'Projector & AV Gear' },
            { label: 'Lab Hardware / Kits', value: 'Lab Hardware / Kit' },
            { label: 'Study Spaces', value: 'Study Space' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeCategory === cat.value
                  ? 'bg-yellow-400 text-neutral-950 border-yellow-400 shadow-xs'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Board List */}
      <div className="space-y-5">
        {filteredFeedbacks.map((fb) => {
          const isCommentsOpen = !!expandedComments[fb.id];
          const activeHover = hoveredStars[fb.id] || null;
          const displayStarScore = activeHover !== null ? activeHover : (fb.userStarRating || Math.round(fb.rating));

          return (
            <div
              key={fb.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all space-y-4"
            >
              {/* Card Main Header & Star Rating Unit */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  {/* STAR RATING SYSTEM (Replaced like/upvote) */}
                  <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex flex-col items-center justify-center min-w-[95px] flex-shrink-0 text-center space-y-1.5">
                    <div className="flex items-center gap-1 text-yellow-400 font-extrabold text-lg leading-none">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span>{fb.rating.toFixed(1)}</span>
                    </div>

                    <div className="text-[10px] text-neutral-400 font-mono">
                      {fb.ratingCount} {fb.ratingCount === 1 ? 'rating' : 'ratings'}
                    </div>

                    {/* Interactive 5-Star Picker */}
                    <div className="pt-1 border-t border-neutral-800/80 w-full flex flex-col items-center">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((starIndex) => {
                          const isFilled = activeHover !== null
                            ? starIndex <= activeHover
                            : starIndex <= (fb.userStarRating || 0);

                          return (
                            <button
                              key={starIndex}
                              type="button"
                              onMouseEnter={() =>
                                setHoveredStars((prev) => ({ ...prev, [fb.id]: starIndex }))
                              }
                              onMouseLeave={() =>
                                setHoveredStars((prev) => ({ ...prev, [fb.id]: null }))
                              }
                              onClick={() => {
                                onRateFeedback(fb.id, starIndex);
                                onShowToast(`Rated "${fb.title}" with ${starIndex} stars!`);
                              }}
                              className="p-0.5 text-neutral-600 hover:text-yellow-400 transition-colors"
                              title={`Rate ${starIndex} stars priority`}
                            >
                              <Star
                                className={`w-3.5 h-3.5 transition-colors ${
                                  isFilled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-neutral-600 hover:text-yellow-400'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-[9px] text-neutral-500 mt-0.5">
                        {fb.userStarRating ? `You gave ${fb.userStarRating}★` : 'Click to rate'}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 uppercase">
                        {fb.category}
                      </span>
                      {fb.courseOrProject && (
                        <span className="text-[10px] font-mono text-yellow-400">
                          {fb.courseOrProject}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          fb.urgency === 'Urgent'
                            ? 'bg-rose-500/20 text-rose-400'
                            : fb.urgency === 'High'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {fb.urgency} Urgency
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{fb.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">{fb.description}</p>

                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 pt-1">
                      <span>Reported by {fb.submittedBy} ({fb.userRole})</span>
                      <span>·</span>
                      <span>{fb.submittedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  {getStatusBadge(fb.status)}
                </div>
              </div>

              {/* Administrative Resolution Box (if resolved/updated) */}
              {fb.adminNotes && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-yellow-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Academic Administration Response:</span>
                    </span>
                    {fb.status === 'Added to Library / Stock' && onNavigateToDigitalLibrary && (
                      <button
                        onClick={onNavigateToDigitalLibrary}
                        className="text-[11px] text-yellow-400 underline hover:text-yellow-300 font-semibold"
                      >
                        Open in Digital Library →
                      </button>
                    )}
                  </div>
                  <p className="text-neutral-300 text-[11px]">{fb.adminNotes}</p>
                </div>
              )}

              {/* Comment Toggle Bar & Admin Actions */}
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <button
                  onClick={() => toggleComments(fb.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 transition-colors font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Comments ({fb.comments?.length || 0})</span>
                  {isCommentsOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  )}
                </button>

                {/* Admin/HOD Status Actions */}
                {canManage && onUpdateFeedbackStatus && (
                  <div className="flex items-center gap-2">
                    {fb.status !== 'Added to Library / Stock' && (
                      <button
                        onClick={() =>
                          onUpdateFeedbackStatus(
                            fb.id,
                            'Added to Library / Stock',
                            `Marked available by ${currentUser.name}. Resource procured and indexed.`
                          )
                        }
                        className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-semibold"
                      >
                        Mark Procured / Added
                      </button>
                    )}
                    {fb.status === 'Under Review' && (
                      <button
                        onClick={() =>
                          onUpdateFeedbackStatus(
                            fb.id,
                            'Procurement Initiated',
                            `Budget approved by HOD ${currentUser.name}. Order placed with vendor.`
                          )
                        }
                        className="px-2.5 py-1 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 border border-yellow-400/40 rounded-lg text-xs font-semibold"
                      >
                        Approve Procurement
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* COMMENTS SECTION */}
              {isCommentsOpen && (
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 pb-1 border-b border-neutral-850">
                    <span>Community & Department Discussion</span>
                    <span>{fb.comments?.length || 0} comments</span>
                  </div>

                  {/* Comment List */}
                  {fb.comments && fb.comments.length > 0 ? (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                      {fb.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{comment.userName}</span>
                              {getRoleBadge(comment.userRole)}
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-neutral-300 leading-relaxed">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3 text-neutral-500 text-xs">
                      No comments yet. Be the first to share an update or context!
                    </div>
                  )}

                  {/* Add Comment Input Form */}
                  <form
                    onSubmit={(e) => handlePostComment(fb.id, e)}
                    className="flex items-center gap-2 pt-2 border-t border-neutral-850"
                  >
                    <input
                      type="text"
                      value={commentInputs[fb.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [fb.id]: e.target.value }))
                      }
                      placeholder={`Add a comment as ${currentUser.name} (${currentUser.role})...`}
                      className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[fb.id]?.trim()}
                      className="px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 disabled:opacity-40 text-neutral-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Send className="w-3 h-3 stroke-[2.5]" />
                      <span className="hidden sm:inline">Comment</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-400">
            No shortage reports found for this filter.
          </div>
        )}
      </div>

      {/* Report Missing Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
                  <MessageSquarePlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Report Missing or Insufficient Resource</h3>
                  <p className="text-xs text-neutral-400">Notify the department and library procurement committee</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="px-6 py-3 bg-neutral-950/60 border-b border-neutral-800/80">
              <div className="text-[11px] font-semibold text-neutral-400 mb-2">
                Quick autofill from common shortages:
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {presetTemplates.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="px-2.5 py-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 text-yellow-400 rounded-lg border border-neutral-700 whitespace-nowrap transition-colors"
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Resource Title / Name *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Operating System Concepts (Galvin 10th Ed) E-Book"
                  required
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Resource Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ResourceFeedback['category'])}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="E-Book / Notes">E-Book / Notes / PDF</option>
                    <option value="Projector & AV Gear">Projector & AV Gear</option>
                    <option value="Lab Hardware / Kit">Lab Hardware / Kit (RPi, ESP32)</option>
                    <option value="Study Space">Discussion Room / Study Space</option>
                    <option value="Software">Software License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as ResourceFeedback['urgency'])}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Normal">Normal (General Improvement)</option>
                    <option value="High">High (Upcoming Assignment/Project)</option>
                    <option value="Urgent">Urgent (Exam / SIH Competition Finals)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Associated Course or Project
                </label>
                <input
                  type="text"
                  value={courseOrProject}
                  onChange={(e) => setCourseOrProject(e.target.value)}
                  placeholder="e.g., CS301 Operating Systems or SIH-2026 Team"
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Why is this resource needed? (Impact of shortage) *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe why this resource is missing, why physical copies are insufficient, and how many students are affected..."
                  required
                  className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 leading-relaxed"
                />
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
