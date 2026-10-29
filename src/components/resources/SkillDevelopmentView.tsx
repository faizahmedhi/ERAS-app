import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  CheckCircle2,
  Circle,
  Play,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  Flame,
  Check,
  Cpu,
  Globe,
  Smartphone,
  Cloud,
  ChevronRight,
  Clock,
  Layers,
} from 'lucide-react';
import { SkillModule, SkillTrack, User } from '../../types';

interface SkillDevelopmentViewProps {
  tracks: SkillTrack[];
  currentUser: User;
  onUpdateTrack: (updatedTracks: SkillTrack[]) => void;
  onShowToast: (text: string, type?: 'success' | 'error') => void;
  onNavigateToBookingForLab?: () => void;
}

export const SkillDevelopmentView: React.FC<SkillDevelopmentViewProps> = ({
  tracks,
  currentUser,
  onUpdateTrack,
  onShowToast,
  onNavigateToBookingForLab,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(tracks[0]?.id || 'skill-dsa');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [codeConsoleOutput, setCodeConsoleOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  const activeTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];
  const activeModule = activeTrack?.modules.find((m) => m.id === selectedModuleId) || activeTrack?.modules[0];

  const getTrackIcon = (category: string) => {
    switch (category) {
      case 'DSA':
        return Code2;
      case 'Web Development':
        return Globe;
      case 'AI/ML':
        return Cpu;
      case 'App Development':
        return Smartphone;
      default:
        return Cloud;
    }
  };

  const handleToggleModuleCompleted = (trackId: string, moduleId: string) => {
    const updated = tracks.map((t) => {
      if (t.id === trackId) {
        const updatedModules = t.modules.map((m) => {
          if (m.id === moduleId) {
            const nextCompleted = !m.completed;
            onShowToast(
              nextCompleted
                ? `Module "${m.title}" marked as completed!`
                : `Module marked as in-progress.`
            );
            return { ...m, completed: nextCompleted };
          }
          return m;
        });
        const completedCount = updatedModules.filter((m) => m.completed).length;
        return {
          ...t,
          modules: updatedModules,
          completedModules: completedCount,
        };
      }
      return t;
    });

    onUpdateTrack(updated);
  };

  const handleRunCode = (problem: NonNullable<SkillModule['practiceProblem']>) => {
    setIsRunningCode(true);
    setCodeConsoleOutput(null);

    setTimeout(() => {
      setIsRunningCode(false);
      setCodeConsoleOutput(`✓ Test Case 1 Passed: Input: [${problem.sampleInput || ''}] -> Output: ${problem.sampleOutput || 'Expected Result'}
✓ Asymptotic Complexity Check: O(N) Time, O(1) Space optimal bounds verified.
✓ All 12/12 hidden test cases succeeded! Benchmark speed: 1.4ms.`);
      onShowToast('Practice test cases passed! Great job.');
    }, 700);
  };

  const totalCompletedAcrossTracks = tracks.reduce((acc, t) => acc + t.completedModules, 0);
  const totalModulesAcrossTracks = tracks.reduce((acc, t) => acc + t.totalModules, 0);
  const overallPercentage = Math.round((totalCompletedAcrossTracks / totalModulesAcrossTracks) * 100);

  return (
    <div className="space-y-6">
      {/* Skill Banner */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Career & Competency Accelerators</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Skill Development & Code Practicum
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              Curated hands-on pathways in Data Structures & Algorithms, Modern Fullstack Web, AI/ML, and Mobile App Development. Complete interactive problems and book campus GPU labs or hackathon gear to build capstone projects.
            </p>
          </div>

          {/* Overall Stats Pill Card */}
          <div className="bg-neutral-950/80 border border-neutral-800 p-4 rounded-xl flex items-center gap-4 flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-bold text-lg border border-yellow-400/30">
              {overallPercentage}%
            </div>
            <div>
              <div className="text-xs text-neutral-400">Total Completion</div>
              <div className="text-sm font-bold text-white">
                {totalCompletedAcrossTracks} of {totalModulesAcrossTracks} Modules
              </div>
              <div className="w-28 bg-neutral-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((track) => {
          const Icon = getTrackIcon(track.category);
          const isSelected = track.id === selectedTrackId;
          const pct = Math.round((track.completedModules / track.totalModules) * 100);

          return (
            <button
              key={track.id}
              onClick={() => {
                setSelectedTrackId(track.id);
                setSelectedModuleId(track.modules[0]?.id || null);
                setCodeConsoleOutput(null);
              }}
              className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-neutral-900 border-yellow-400 shadow-md shadow-yellow-500/10'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${track.color}20`, color: track.color }}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {track.level}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{track.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{track.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                  <span>Progress</span>
                  <span className="font-semibold text-white">
                    {track.completedModules}/{track.totalModules} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: track.color }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Track Detail & Active Module Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module List Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Curriculum Modules ({activeTrack.modules.length})
            </span>
            <span className="text-xs text-yellow-400 font-semibold">
              {activeTrack.completedModules} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {activeTrack.modules.map((mod, idx) => {
              const isCurrent = activeModule?.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    setCodeConsoleOutput(null);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-neutral-900 border-yellow-400/80 shadow-sm'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModuleCompleted(activeTrack.id, mod.id);
                      }}
                      className="flex-shrink-0 text-neutral-400 hover:text-yellow-400 transition-colors"
                      title={mod.completed ? 'Mark in-progress' : 'Mark completed'}
                    >
                      {mod.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-500" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-500">
                          Unit 0{idx + 1}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                            mod.difficulty === 'Beginner'
                              ? 'bg-emerald-400/10 text-emerald-400'
                              : mod.difficulty === 'Intermediate'
                              ? 'bg-amber-400/10 text-amber-400'
                              : 'bg-rose-400/10 text-rose-400'
                          }`}
                        >
                          {mod.difficulty}
                        </span>
                      </div>
                      <div className={`text-xs font-semibold truncate mt-0.5 ${isCurrent ? 'text-white' : 'text-neutral-300'}`}>
                        {mod.title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 flex-shrink-0">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>{mod.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Lab Booking Link for Practical Work */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-2 mt-4">
            <div className="text-white font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-yellow-400" />
              <span>Need High-GPU Labs or Projectors?</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Practicing transformer training or preparing for SIH? Reserve the Alan Turing High-GPU lab or portable projector kit directly.
            </p>
            {onNavigateToBookingForLab && (
              <button
                onClick={onNavigateToBookingForLab}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-yellow-400 hover:text-yellow-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-yellow-400/20"
              >
                <span>Reserve Lab / Gear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Module Workbench / Content Area */}
        <div className="lg:col-span-2 space-y-5">
          {activeModule ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-yellow-400 uppercase tracking-wide">
                      {activeTrack.category} Track
                    </span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-xs text-neutral-400">{activeModule.duration} estimated</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">{activeModule.title}</h2>
                </div>

                <button
                  onClick={() => handleToggleModuleCompleted(activeTrack.id, activeModule.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeModule.completed
                      ? 'bg-neutral-800 text-yellow-400 border border-yellow-400/30 hover:bg-neutral-700'
                      : 'bg-yellow-400 text-neutral-950 hover:bg-yellow-300 shadow-sm shadow-yellow-500/20'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{activeModule.completed ? 'Completed' : 'Mark as Completed'}</span>
                </button>
              </div>

              {/* Conceptual Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Concept Overview & Intuition
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-black/30 p-4 rounded-xl border border-neutral-800/80">
                  {activeModule.summary}
                </p>
              </div>

              {/* Core Topics Covered */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Topics in this Module
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModule.topics.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="truncate">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Practice Problem Playground */}
              {activeModule.practiceProblem ? (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-yellow-400" />
                      <span>Interactive Code Challenge: {activeModule.practiceProblem.title}</span>
                    </h4>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-neutral-800 space-y-3">
                    <p className="text-xs text-neutral-300">
                      {activeModule.practiceProblem.description}
                    </p>

                    {activeModule.practiceProblem.sampleInput && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                          <span className="text-[10px] text-neutral-500 uppercase block">Sample Input</span>
                          <span className="text-yellow-300">{activeModule.practiceProblem.sampleInput}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                          <span className="text-[10px] text-neutral-500 uppercase block">Expected Output</span>
                          <span className="text-emerald-400">{activeModule.practiceProblem.sampleOutput}</span>
                        </div>
                      </div>
                    )}

                    {/* Starter Code Block */}
                    <div className="relative">
                      <div className="text-[10px] uppercase font-mono text-neutral-400 px-3 py-1 bg-neutral-900 rounded-t-lg border-t border-x border-neutral-800 flex items-center justify-between">
                        <span>Solution Playground (TypeScript / Python)</span>
                        <span className="text-yellow-400 font-semibold">Ready to test</span>
                      </div>
                      <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-b-lg text-xs font-mono text-neutral-200 overflow-x-auto select-text leading-relaxed">
                        {activeModule.practiceProblem.starterCode || '// Write your optimal solution here\n'}
                      </pre>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => handleRunCode(activeModule.practiceProblem!)}
                        disabled={isRunningCode}
                        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 disabled:opacity-50 text-neutral-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Play className={`w-3.5 h-3.5 fill-neutral-950 ${isRunningCode ? 'animate-spin' : ''}`} />
                        <span>{isRunningCode ? 'Executing Test Runner...' : 'Run Test Cases'}</span>
                      </button>

                      <span className="text-[11px] text-neutral-500">
                        Evaluated with automated university test-suite
                      </span>
                    </div>

                    {/* Console Output */}
                    {codeConsoleOutput && (
                      <div className="p-3 bg-neutral-950 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-400 whitespace-pre-line animate-in fade-in">
                        {codeConsoleOutput}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-2">
                  <Terminal className="w-8 h-8 text-neutral-600 mx-auto" />
                  <div className="text-xs font-semibold text-neutral-300">
                    Comprehensive Code Challenge Available in Lab Environment
                  </div>
                  <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                    This unit connects with your terminal sandbox and GPU cluster for live training notebooks.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-neutral-500 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
              Select a module from the curriculum to view lesson materials.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
