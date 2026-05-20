export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <ul className="flex space-x-4">
              <li>
                <a href="/user/dashboard" className="hover:text-gray-300">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/user/profile" className="hover:text-gray-300">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {/* Main content goes here */}
          {children}
        </main>
      </body>
    </html>
  );
}
