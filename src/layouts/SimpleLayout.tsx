export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex items-start justify-center">
      <div className="sm:w-[28.75rem] w-full mx-4 sm:py-40 py-[5.25rem] flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}
