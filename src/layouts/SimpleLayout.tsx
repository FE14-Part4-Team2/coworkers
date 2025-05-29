export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex items-start justify-center">
      <div className="sm:w-[460px] w-full px-4 sm:pt-40 pt-[84px] flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}
