import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-2">Welcome to Next!</h1>
      <p className="text-lg text-gray-600">
        Your personal AI assistant for all your needs.
      </p>
    </div>
  );
}
