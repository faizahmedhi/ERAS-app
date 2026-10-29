import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Search,
  Projector,
  BookOpen,
  Building2,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Booking, BookingStatus, Resource, User as UserType } from '../../types';
import { RESERVABLE_SPECIAL_ITEMS, SpecialReservableItem } from '../../data/resourcesData';

interface BookingViewProps {
  bookings: Booking[];
  resources: Resource[];
  currentUser: UserType;
  onApproveBooking: (id: string) => void;
  onRejectBooking: (id: string, reason?: string) => void;
  onRequestNew: (preselectedName?: string, category?: string) => void;
}

export const BookingView: React.FC<BookingViewProps> = ({
  bookings,
  resources,
  currentUser,
  onApproveBooking,
  onRejectBooking,
  onRequestNew,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'mine' | 'gear_catalog'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Classrooms' | 'Projectors' | 'LibraryBooks'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const canApprove = currentUser.role === 'Admin' || currentUser.role === 'HOD';

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'pending' && b.status !== 'Pending') return false;
    if (activeTab === 'mine' && b.userId !== currentUser.id) return false;

    if (categoryFilter === 'Projectors') {
      const isProj = b.resourceName.toLowerCase().includes('projector') || b.resourceName.toLowerCase().includes('kit') || b.purpose.toLowerCase().includes('sih');
      if (!isProj) return false;
    } else if (categoryFilter === 'LibraryBooks') {
      const isBook = b.resourceName.toLowerCase().includes('book') || b.resourceName.toLowerCase().includes('galvin') || b.resourceName.toLowerCase().includes('clrs');
      if (!isBook) return false;
    } else if (categoryFilter === 'Classrooms') {
      const isProjOrBook = b.resourceName.toLowerCase().includes('projector') || b.resourceName.toLowerCase().includes('book');
      if (isProjOrBook) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchResource = b.resourceName.toLowerCase().includes(q);
      const matchUser = b.userName.toLowerCase().includes(q);
      const matchPurpose = b.purpose.toLowerCase().includes(q);
      if (!matchResource && !matchUser && !matchPurpose) return false;
    }
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-xs shadow-yellow-400" />
            Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Pending Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Rejected
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            Cancelled
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    const color =
      priority === 'Urgent'
        ? 'text-rose-400 font-bold'
        : priority === 'High'
        ? 'text-yellow-400 font-semibold'
        : 'text-neutral-300 font-medium';
    return <span className={`text-xs ${color}`}>{priority}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="space-y-1.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Campus Reservation Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Reserve Classrooms, Projectors & Library Books
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Reserve academic spaces, high-lumens 4K projectors for your <strong>Smart India Hackathon (SIH)</strong> or group project demos, and physical copies of reference textbooks (e.g. Galvin OS, CLRS Algorithms).
          </p>
        </div>

        <button
          onClick={() => onRequestNew()}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-bold rounded-xl shadow-sm shadow-yellow-500/20 transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* QUICK RESERVABLE GEAR & BOOKS SHELF */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Projector className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Featured Gear for SIH & Group Projects
              </h3>
              <p className="text-xs text-neutral-400">
                Borrow projectors, hackathon prototyping kits, or reserve physical library books
              </p>
            </div>
          </div>
          <span className="text-xs text-yellow-400 font-semibold font-mono hidden sm:inline">
            Fast 1-Click Hold
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESERVABLE_SPECIAL_ITEMS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between transition-all space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-yellow-400 uppercase font-semibold">
                    {item.categoryLabel}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {item.availableQuantity} of {item.totalQuantity} Available
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[10px] text-neutral-500">
                  Location: {item.location}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[10px] text-yellow-400/90 font-mono">
                  {item.recommendedFor.split(',')[0]}
                </span>
                <button
                  onClick={() => onRequestNew(item.name, item.categoryLabel)}
                  className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                >
                  <span>Reserve</span>
                  <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar: Tabs & Search */}
      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* Segmented Tab Controls */}
        <div className="flex items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('all');
              setCategoryFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'all' && categoryFilter === 'all'
                ? 'bg-yellow-400 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('all');
              setCategoryFilter('Projectors');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              categoryFilter === 'Projectors'
                ? 'bg-yellow-400 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Projectors & SIH Gear
          </button>
          <button
            onClick={() => {
              setActiveTab('all');
              setCategoryFilter('LibraryBooks');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              categoryFilter === 'LibraryBooks'
                ? 'bg-yellow-400 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Library Books
          </button>
          <button
            onClick={() => {
              setActiveTab('pending');
              setCategoryFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-yellow-400 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Pending Review ({bookings.filter((b) => b.status === 'Pending').length})
          </button>
          <button
            onClick={() => {
              setActiveTab('mine');
              setCategoryFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'mine'
                ? 'bg-yellow-400 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            My Requests ({bookings.filter((b) => b.userId === currentUser.id).length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by space, projector, book, purpose..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Reserved Resource</th>
                <th className="py-3 px-4">Date & Time Slot</th>
                <th className="py-3 px-4">Requester</th>
                <th className="py-3 px-4">Purpose & Course/Team</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No reservations matching current view filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const isProjectorOrGear = booking.resourceName.toLowerCase().includes('projector') || booking.resourceName.toLowerCase().includes('kit');
                  const isBook = booking.resourceName.toLowerCase().includes('book');

                  return (
                    <tr key={booking.id} className="hover:bg-neutral-850/50 transition-colors">
                      {/* Space */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {isProjectorOrGear ? (
                            <Projector className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                          ) : isBook ? (
                            <BookOpen className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                          ) : (
                            <Building2 className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          )}
                          <span>{booking.resourceName}</span>
                        </div>
                        <div className="font-mono text-[11px] text-yellow-400/80">ID: {booking.id}</div>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-neutral-200">{booking.date}</div>
                        <div className="text-neutral-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-yellow-400/80" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                      </td>

                      {/* Requester */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{booking.userName}</div>
                        <div className="text-[11px] text-neutral-400">
                          {booking.userRole} · {booking.department.split('&')[0]}
                        </div>
                      </td>

                      {/* Purpose */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-neutral-200 line-clamp-1">{booking.purpose}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-2">
                          {booking.courseCode && <span className="text-yellow-400/90 font-mono">Course: {booking.courseCode}</span>}
                          <span>Att: {booking.expectedAttendance}</span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getPriorityBadge(booking.priority)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                        {booking.approvedBy && (
                          <div className="text-[10px] text-neutral-500 mt-0.5">By {booking.approvedBy}</div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {booking.status === 'Pending' && canApprove ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onApproveBooking(booking.id)}
                              className="px-2.5 py-1 text-xs font-bold text-neutral-950 bg-yellow-400 hover:bg-yellow-300 rounded-md transition-colors shadow-xs"
                              title="Approve Reservation"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setRejectingId(booking.id);
                                setRejectReason('');
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 rounded-md transition-colors"
                              title="Reject Reservation"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-neutral-500 font-mono">
                            {booking.status === 'Approved' ? 'Locked' : 'Archived'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal dialog */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 max-w-sm w-full space-y-3 shadow-2xl">
            <h3 className="font-bold text-white text-sm">Decline Reservation Request</h3>
            <p className="text-xs text-neutral-400">
              Provide a rationale for the student or faculty member regarding why this room or projector slot was declined:
            </p>
            <input
              type="text"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Priority given to scheduled exam or hackathon sprint"
              className="w-full text-xs p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingId(null)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRejectBooking(rejectingId, rejectReason);
                  setRejectingId(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-xs"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
