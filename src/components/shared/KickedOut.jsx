function KickedOut() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="badge mb-8">
          <img src="/intervue-poll-icon.svg" alt="Intervue Poll Icon" className="w-4 h-4" />
          <span>Intervue Poll</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          You've been Kicked out !
        </h1>
        
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Looks like the teacher had removed you from the poll system. Please Try again sometime.
        </p>
      </div>
    </div>
  );
}

export default KickedOut; 