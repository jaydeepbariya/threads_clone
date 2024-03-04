function EmailSent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          Reset Your Password
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          You are just one step away... Click on the link provided in the email
          sent to you and reset your password!
        </p>
      </div>
    </div>
  );
}

export default EmailSent;
