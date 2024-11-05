import React, { useState, useEffect } from 'react';
import { X, Youtube, Link2 } from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentModalProps {
  assignments: Assignment[];
  onClose: () => void;
}

function AssignmentModal({ assignments, onClose }: AssignmentModalProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < assignments.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, assignments.length]);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#00ff00] rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-[0_0_30px_rgba(0,255,0,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#00ff00] hover:text-[#00ff00]/80 p-2"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-mono font-bold mb-6 text-center">
          Initializing Assignments
          <span className="inline-block ml-2 animate-pulse">_</span>
        </h2>

        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                index < visibleCount
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="border border-[#00ff00] bg-black/50 p-6 rounded-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-mono text-[#00ff00]">
                      {assignment.participant}
                    </h3>
                    <div className="flex gap-3">
                      {assignment.choice.pobUrl && (
                        <a
                          href={assignment.choice.pobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#002200] rounded-lg text-[#00ff00] hover:bg-[#003300] transition-colors border border-[#00ff00] text-sm"
                        >
                          <Link2 size={16} />
                          POB
                        </a>
                      )}
                      {assignment.choice.youtubeUrl && (
                        <a
                          href={assignment.choice.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#002200] rounded-lg text-[#00ff00] hover:bg-[#003300] transition-colors border border-[#00ff00] text-sm"
                        >
                          <Youtube size={16} />
                          Video
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="font-mono text-[#008800] text-lg">
                    {assignment.choice.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount === assignments.length && (
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-[#003300] text-[#00ff00] rounded-lg hover:bg-[#004400] transition-colors border border-[#00ff00] font-mono"
          >
            Continue to Assignment Matrix
          </button>
        )}
      </div>
    </div>
  );
}

export default AssignmentModal;