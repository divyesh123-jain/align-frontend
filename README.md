# Live Polling System

A real-time polling application built with React and Socket.IO that allows teachers to create polls and students to participate in live voting sessions.

## ✅ Completed Features

### **Teacher Features**
- ✅ **Poll Creation**: Create polls with multiple choice questions (up to 5 options)
- ✅ **Timer Configuration**: Set custom poll duration (30s, 1min, 2min, 5min)
- ✅ **Live Results**: View real-time voting results with progress bars
- ✅ **Question Control**: Can only create new polls when no active poll exists
- ✅ **Chat System**: Communicate with students during polls
- ✅ **Participant Management**: View connected students and kick them out
- ✅ **Poll History**: Access past poll results and statistics
- ✅ **Correct Answer Marking**: Mark correct answers during poll creation

### **Student Features**
- ✅ **Name Entry**: Enter unique name (persists per browser tab)
- ✅ **Poll Participation**: Vote on active polls with visual feedback
- ✅ **Auto-Submit**: Automatic submission when 60-second timer expires
- ✅ **Live Results**: View real-time results after voting
- ✅ **Waiting Screen**: Dynamic loading screen when no polls are active
- ✅ **Chat Participation**: Send messages to teacher and other students
- ✅ **Kicked Out Handling**: Graceful handling when removed by teacher

### **Technical Features**
- ✅ **Socket.IO Integration**: Real-time bidirectional communication
- ✅ **Connection Status**: Visual indicator for server connection
- ✅ **Timer System**: Countdown timer with visual alerts for last 10 seconds
- ✅ **Session Management**: Tab-specific student names using sessionStorage
- ✅ **Responsive Design**: Modern UI with Tailwind CSS
- ✅ **State Management**: Proper React state management for real-time updates

## 🚀 Getting Started

1. **Start the Frontend**:
   ```bash
   npm install
   npm run dev
   ```

2. **Configure Backend Connection**:
   - Backend should be running on `http://localhost:4000`
   - Socket.IO connection configured in `src/socket.js`

3. **Usage**:
   - Visit `http://localhost:3000`
   - Select role (Teacher or Student)
   - Teachers can create polls, students can participate

## 📱 User Flow

### **Teacher Flow**
1. Select "I'm a Teacher" → Poll Creation Screen
2. Enter question and options
3. Set timer duration (30s-5min)
4. Mark correct answers
5. Click "Ask Question" → Live Results Screen
6. View real-time results, chat with students
7. Kick students if needed
8. Click "End Poll & Create New" for next question

### **Student Flow**
1. Select "I'm a Student" → Name Entry
2. Enter name → Waiting Screen
3. When poll starts → Voting Screen
4. Select answer and submit → Results Screen
5. View results and chat
6. Return to waiting for next poll

## 🎨 Design Features

- **Modern UI**: Clean, professional design with violet accent color
- **Visual Feedback**: Progress bars, hover effects, loading states
- **Timer Alerts**: Red background in last 10 seconds
- **Chat Interface**: Tabbed interface for chat and participants
- **Connection Status**: Real-time connection indicator
- **Responsive Layout**: Works on desktop and mobile

## 🔧 Technical Stack

- **Frontend**: React 19, Tailwind CSS, React Router
- **Real-time**: Socket.IO Client
- **State Management**: React Hooks (useState, useEffect)
- **Persistence**: sessionStorage for student names
- **Build Tool**: Vite

## 📊 Socket Events

### **Teacher Events**
- `identify_user: 'teacher'`
- `create_poll: pollData`
- `end_poll`
- `kick_user: userId`
- `send_message: messageData`
- `get_participants`
- `get_poll_history`

### **Student Events**
- `join_as_student: studentName`
- `submit_answer: optionIndex`
- `send_message: messageData`

### **Received Events**
- `poll_update: pollData`
- `poll_ended: finalResults`
- `new_poll: pollData`
- `participants_update: participantsList`
- `new_message: messageData`
- `kicked_out`
- `poll_history: historyData`

## 🎯 Key Features Implemented

1. **Timer Integration**: 60-second countdown with auto-submit
2. **Chat System**: Real-time messaging between teacher and students
3. **Kick Functionality**: Teachers can remove disruptive students
4. **Poll History**: Access to past poll results and statistics
5. **Connection Status**: Visual feedback for server connection
6. **Session Management**: Tab-specific student identification
7. **Responsive Design**: Works across different screen sizes

The application is fully functional and ready for production use with a backend Socket.IO server.
