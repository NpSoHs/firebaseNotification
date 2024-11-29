export default function DashBoardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="bg-black h-screen flex flex-col max-h-screen">
          <div className="bg-[#D6D6D6] flex justify-center font-light text-black text-4xl text-center items-center py-4 h-[30vh]">
              Smart Door Bell
          </div>
          <div className="flex-grow">{children}</div>
      </div>
  );
}