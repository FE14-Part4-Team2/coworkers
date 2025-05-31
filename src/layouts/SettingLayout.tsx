export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex items-start justify-center">
      <div className="md:w-[792px] w-full sm:mx-6 mx-4 md:pt-[100px] pt-[84px] flex flex-col items-start">
        {children}
      </div>
    </main>
  );
}
