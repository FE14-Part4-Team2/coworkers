export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex items-start justify-center">
      <div className="sm:w-[28.75rem] w-full mx-4 my-4 sm:my-[3.75rem] md:my-[6.25rem] my-flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}
