import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  FileText,
  Search,
  ExternalLink,
  Tag,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Share2,
  X,
  Layers,
  Eye,
  FileCode2,
} from 'lucide-react';
import { DigitalResource, DigitalResourceType, User } from '../../types';

interface DigitalLibraryViewProps {
  resources: DigitalResource[];
  currentUser: User;
  onOpenFeedbackForMissing?: () => void;
  onShowToast: (text: string, type?: 'success' | 'error') => void;
  onLogResourceAccess?: (resource: DigitalResource, hours: number) => void;
}

export const DigitalLibraryView: React.FC<DigitalLibraryViewProps> = ({
  resources,
  currentUser,
  onOpenFeedbackForMissing,
  onShowToast,
  onLogResourceAccess,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DigitalResourceType | 'all'>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [readingItem, setReadingItem] = useState<DigitalResource | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['dig-eb-1', 'dig-note-2']);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const filterOptions: { label: string; value: DigitalResourceType | 'all'; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'All Resources', value: 'all', icon: Layers },
    { label: 'E-Books', value: 'ebook', icon: BookOpen },
    { label: 'Lecture Notes', value: 'notes', icon: FileText },
    { label: 'PDFs & Manuals', value: 'pdf', icon: FileCode2 },
    { label: 'Cheat Sheets', value: 'cheatsheet', icon: Sparkles },
  ];

  const departments = ['all', 'Computer Science & Engineering', 'AI & Data Science', 'Information Technology', 'Interdisciplinary Engineering'];

  const filteredResources = resources.filter((item) => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (selectedDept !== 'all' && item.department !== selectedDept) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchAuthor = item.authorOrProf.toLowerCase().includes(q);
      const matchCourse = item.courseCode?.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchAuthor && !matchCourse && !matchTags) return false;
    }
    return true;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
      onShowToast('Removed from your saved library.');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      onShowToast('Saved to your personal reading list.');
    }
  };

  const handleOpenReader = (item: DigitalResource) => {
    setReadingItem(item);
    setActiveChapterIndex(0);
    if (onLogResourceAccess) {
      onLogResourceAccess(item, 0.5);
    }
  };

  const handleDownload = (item: DigitalResource, e: React.MouseEvent) => {
    e.stopPropagation();
    const blobData = `Title: ${item.title}\nAuthor/Professor: ${item.authorOrProf}\nCourse: ${item.courseCode || 'N/A'}\n\n${item.description}\n\nContent Excerpt:\n${item.contentSnippet || 'Full institutional textbook access provided by ERAS.'}`;
    const blob = new Blob([blobData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast(`Downloaded "${item.title}" (${item.fileSize}) successfully.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Academic Repository</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Digital Library & Course Repository
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Instant digital access to required textbooks (including Operating System Concepts by Galvin, CLRS Algorithms), faculty-curated lecture handouts, syllabus blueprints, and hackathon cheat sheets.
          </p>
        </div>

        {/* Missing Resource CTA */}
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch md:items-end gap-3 flex-shrink-0">
          <button
            onClick={onOpenFeedbackForMissing}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-yellow-400 hover:text-yellow-300 text-xs font-semibold rounded-xl border border-yellow-400/30 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Missing an E-Book or Note? Request It</span>
          </button>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by book name, author, topic (e.g. Galvin, CLRS, Operating Systems, Transformers, TCP/IP)..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-yellow-400"
            >
              <option value="all">All Departments</option>
              {departments.filter((d) => d !== 'all').map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedType(opt.value)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-yellow-400 text-neutral-950 border-yellow-400 font-bold shadow-sm shadow-yellow-500/20'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-100 hover:border-neutral-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((item) => {
          const isBookmarked = bookmarkedIds.includes(item.id);
          const typeBadgeColor =
            item.type === 'ebook'
              ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30'
              : item.type === 'notes'
              ? 'bg-sky-400/10 text-sky-400 border-sky-400/30'
              : item.type === 'pdf'
              ? 'bg-purple-400/10 text-purple-400 border-purple-400/30'
              : 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30';

          return (
            <div
              key={item.id}
              onClick={() => handleOpenReader(item)}
              className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 hover:shadow-xl hover:shadow-yellow-500/5 rounded-2xl p-5 flex flex-col justify-between transition-all group cursor-pointer"
            >
              <div className="space-y-3">
                {/* Header row: Type Badge, Course Code & Bookmark */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${typeBadgeColor} uppercase tracking-wider`}>
                      {item.type}
                    </span>
                    {item.courseCode && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {item.courseCode}
                      </span>
                    )}
                    {item.featured && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(item.id, e)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked
                        ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40'
                        : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:text-white'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark this resource'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-yellow-400' : ''}`} />
                  </button>
                </div>

                {/* Title and Author */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                    <span>{item.authorOrProf}</span>
                  </p>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] rounded-md bg-neutral-800 text-neutral-400 border border-neutral-800"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-[10px] text-neutral-500">+{item.tags.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Card Footer: Metadata & Actions */}
              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3 text-xs text-neutral-400">
                <div className="flex items-center gap-3 text-[11px]">
                  <span>{item.pageCount} pages</span>
                  <span>·</span>
                  <span>{item.fileSize}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-neutral-500" />
                    {item.readCount}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDownload(item, e)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Download text excerpt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenReader(item);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                  >
                    <span>Read</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
          <BookOpen className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No matching digital resources found</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
            We couldn’t find any e-books, notes, or PDFs matching "{searchQuery}". You can submit a missing resource request and the university library team will procure it!
          </p>
          <button
            onClick={onOpenFeedbackForMissing}
            className="mt-4 px-4 py-2 bg-yellow-400 text-neutral-950 text-xs font-bold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Submit Missing Resource Request
          </button>
        </div>
      )}

      {/* Interactive E-Book / Note Reader Modal */}
      {readingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-950/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300">
                      {readingItem.type}
                    </span>
                    {readingItem.courseCode && (
                      <span className="text-[10px] font-mono text-neutral-400">
                        {readingItem.courseCode}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-bold text-white truncate">
                    {readingItem.title}
                  </h2>
                  <p className="text-xs text-neutral-400 truncate">
                    {readingItem.authorOrProf} · {readingItem.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => handleDownload(readingItem, e)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export PDF</span>
                </button>
                <button
                  onClick={() => setReadingItem(null)}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Chapter TOC + Content View */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
              {/* Left Column: Chapters / Table of Contents */}
              <div className="p-4 bg-neutral-950/40 overflow-y-auto space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 pb-1">
                  Table of Contents ({readingItem.chapters?.length || 1} Chapters)
                </div>
                {readingItem.chapters && readingItem.chapters.length > 0 ? (
                  readingItem.chapters.map((ch, idx) => (
                    <button
                      key={ch.title}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors border ${
                        activeChapterIndex === idx
                          ? 'bg-yellow-400 text-neutral-950 font-bold border-yellow-400 shadow-sm'
                          : 'bg-neutral-900/60 text-neutral-300 border-neutral-800/80 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <div className="truncate">{ch.title}</div>
                      <div className={`text-[10px] mt-0.5 ${activeChapterIndex === idx ? 'text-neutral-800' : 'text-neutral-500'}`}>
                        Pages {ch.pages}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-neutral-500 p-2">Standard full-text handout format</div>
                )}

                <div className="pt-4 border-t border-neutral-800 mt-4 px-2 space-y-2">
                  <div className="text-[11px] font-semibold text-neutral-400">Institutional Access:</div>
                  <div className="text-[11px] text-neutral-500 leading-snug">
                    Licensed to {currentUser.name} ({currentUser.role}) through university open academic access.
                  </div>
                </div>
              </div>

              {/* Right Column: High Fidelity Reader Canvas */}
              <div className="md:col-span-2 p-6 overflow-y-auto bg-neutral-900/70 space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                  <span className="font-semibold text-yellow-400">
                    {readingItem.chapters && readingItem.chapters[activeChapterIndex]
                      ? readingItem.chapters[activeChapterIndex].title
                      : 'Main Document Content'}
                  </span>
                  <span>
                    {readingItem.chapters && readingItem.chapters[activeChapterIndex]
                      ? `Page ${readingItem.chapters[activeChapterIndex].pages}`
                      : `${readingItem.pageCount} Pages Total`}
                  </span>
                </div>

                {/* Text Reader Container */}
                <div className="prose prose-invert max-w-none text-neutral-200 text-xs sm:text-sm leading-relaxed space-y-4 font-mono bg-black/40 p-5 rounded-xl border border-neutral-800/80 whitespace-pre-line select-text">
                  {readingItem.contentSnippet ||
                    `ERAS Digital Reader: Loading cached stream for "${readingItem.title}"...\n\nFull institutional verified copy.\nDepartment of ${readingItem.department}.\n\nReferenced by active syllabus CS301 / AI402. All chapters unlocked for offline caching.`}
                </div>

                {/* Additional Study Tips Box */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Academic Guidance & Study Tip</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Need clarity on this chapter? You can instantly submit a doubt to {readingItem.authorOrProf.includes('Dr.') ? readingItem.authorOrProf : 'department faculty'} from the <strong>Contact Faculty</strong> module or discuss it in your reserved study pods.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
              <span className="text-[11px]">
                Reading progress automatically saved to your <strong>Usage History</strong>.
              </span>
              <button
                onClick={() => setReadingItem(null)}
                className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg text-xs"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
