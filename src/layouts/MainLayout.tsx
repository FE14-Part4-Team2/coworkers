export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex items-start justify-center">
      <div className="md:w-[75rem] w-full sm:mx-6 mx-4 md:py-[6.25rem] py-[5.25rem] flex flex-col items-start">
        {children}
      </div>
    </main>
  );
}
