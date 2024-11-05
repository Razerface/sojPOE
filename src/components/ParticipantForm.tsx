import React, { useState } from 'react';
import { PlusCircle, Shuffle, Trash2 } from 'lucide-react';

interface ParticipantFormProps {
  participants: string[];
  setParticipants: React.Dispatch<React.SetStateAction<string[]>>;
  onAssign: () => void;
  choicesCount: number;
  isAssigning: boolean;
}

function ParticipantForm({ participants, setParticipants, onAssign, choicesCount, isAssigning }: ParticipantFormProps) {
  const [newParticipant, setNewParticipant] = useState('');

  const handleAdd = () => {
    if (!newParticipant.trim()) return;
    setParticipants([...participants, newParticipant.trim()]);
    setNewParticipant('');
  };

  const handleRemove = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-[#00ff00] bg-black/50 rounded-xl p-6 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
      <h2 className="text-2xl font-mono font-semibold mb-4">Initialize Participants</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Participant Name"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            className="flex-1 p-2 bg-black border border-[#00ff00] rounded-lg focus:ring-2 focus:ring-[#00ff00] text-[#00ff00] placeholder-[#008800]"
          />
          <button
            onClick={handleAdd}
            className="bg-[#003300] text-[#00ff00] px-4 py-2 rounded-lg hover:bg-[#004400] transition-colors flex items-center gap-2 border border-[#00ff00]"
          >
            <PlusCircle size={20} />
            Add
          </button>
        </div>

        {participants.length > 0 && (
          <>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center justify-between border border-[#00ff00]/50 bg-black/30 p-3 rounded-lg">
                  <span className="font-mono">{participant}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onAssign}
              disabled={participants.length !== choicesCount || isAssigning}
              className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 border transition-all duration-300 ${
                participants.length === choicesCount && !isAssigning
                  ? 'bg-[#003300] text-[#00ff00] border-[#00ff00] hover:bg-[#004400]'
                  : 'bg-black/30 text-[#004400] border-[#004400] cursor-not-allowed'
              }`}
            >
              <Shuffle className={isAssigning ? 'animate-spin' : ''} size={20} />
              {isAssigning ? 'Computing...' : 'Initialize Random Assignment'}
              {!isAssigning && participants.length !== choicesCount && (
                <span className="text-sm">
                  (Need {choicesCount - participants.length} more {choicesCount - participants.length === 1 ? 'participant' : 'participants'})
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ParticipantForm;