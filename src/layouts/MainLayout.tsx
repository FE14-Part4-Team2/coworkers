export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex items-start justify-center">
      <div className="lg:w-[1200px] w-full sm:px-6 px-4 lg:pt-[100px] pt-[84px] flex flex-col items-start">
        {children}
      </div>
    </main>
  );
}
