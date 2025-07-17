import { useState, useEffect } from 'react';
import { socket } from '../socket';
import NameEntry from '../components/student/NameEntry';
import PollVote from '../components/student/PollVote';
import PollResults from '../components/shared/PollResults';
import WaitingScreen from '../components/shared/WaitingScreen';
import KickedOut from '../components/shared/KickedOut';
import Chat from '../components/shared/Chat';

function StudentPage() {
  const [studentName, setStudentName] = useState('');
  const [hasJoined, setHasJoined] = useState(!!sessionStorage.getItem('studentName'));
  const [currentPoll, setCurrentPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isKickedOut, setIsKickedOut] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const savedName = sessionStorage.getItem('studentName');
    if (savedName) {
      setStudentName(savedName);
      setHasJoined(true);
      
      if (socket.connected) {
        console.log('Socket connected, joining as student:', savedName);
        socket.emit('join_as_student', savedName);
      } else {
        console.log('Socket not connected, waiting for connection...');
        socket.on('connect', () => {
          console.log('Socket connected, now joining as student:', savedName);
          socket.emit('join_as_student', savedName);
        });
      }
    }

    socket.on('poll_started', (poll) => {
      setCurrentPoll(poll);
      setHasVoted(false);
    });

    socket.on('poll_results', (poll) => {
      setCurrentPoll(poll);
    });

    socket.on('poll_ended', (poll) => {
      setCurrentPoll(poll);
      setHasVoted(false);
    });

    socket.on('participants_updated', (participantList) => {
      console.log('Student received participants_updated:', participantList);
      setParticipants(participantList);
    });

    socket.on('kicked_out', () => {
      setIsKickedOut(true);
      sessionStorage.removeItem('studentName');
    });

    return () => {
      socket.off('poll_started');
      socket.off('poll_results');
      socket.off('poll_ended');
      socket.off('participants_updated');
      socket.off('kicked_out');
      socket.off('connect');
    };
  }, []);

  const handleJoin = (name) => {
    console.log('Student attempting to join with name:', name);
    setStudentName(name);
    setHasJoined(true);
    sessionStorage.setItem('studentName', name);
    
    if (socket.connected) {
      console.log('Socket connected, joining as student:', name);
      socket.emit('join_as_student', name);
    } else {
      console.log('Socket not connected, waiting for connection...');
      socket.on('connect', () => {
        console.log('Socket connected, now joining as student:', name);
        socket.emit('join_as_student', name);
      });
    }
  };

  const handleVote = (optionIndex) => {
    socket.emit('submit_vote', { optionIndex });
    setHasVoted(true);
  };

  if (isKickedOut) {
    return <KickedOut />;
  }

  if (!hasJoined) {
    return <NameEntry onJoin={handleJoin} />;
  }

  const renderContent = () => {
    if (!currentPoll) {
      return <WaitingScreen />;
    }

    if (hasVoted) {
      return (
        <PollResults
          poll={currentPoll}
          participants={participants}
          userType="student"
        />
      );
    }

    return (
      <PollVote
        poll={currentPoll}
        onVote={handleVote}
        studentName={studentName}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {renderContent()}
      </main>

      <Chat 
        userType="student" 
        userName={studentName} 
        participants={participants}
      />
    </div>
  );
}

export default StudentPage;