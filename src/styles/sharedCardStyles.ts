export const sharedCardStyles = {
  dateIndicator:
    "w-1 bg-gradient-to-b from-brand-secondary to-brand-primary rounded-full",
  dateText: "text-sm text-text-disabled font-medium",
  title:
    "text-md sm:text-2lg text-text-secondary font-medium leading-relaxed overflow-hidden",
  profileImage:
    "rounded-full border-2 border-white shadow-sm w-6 h-6 sm:w-8 sm:h-8",
  authorName: "text-md text-text-Primary font-medium",
  likesBadge: "flex gap-1 items-center",
  likesText: "text-sm text-text-disabled font-medium",
  cardBase:
    "border border-card-border bg-bg-secondary rounded-xl shadow-lg overflow-hidden cursor-pointer",
  dateContainer: "flex items-center gap-2",
  authorSection: "flex items-center gap-3",
};

export const shortCardStyles = {
  container: `w-full h-72 sm:h-80 ${sharedCardStyles.cardBase}`,
  dateIndicator: `${sharedCardStyles.dateIndicator} h-4`,

  thumbnail:
    "w-full h-36 sm:h-40 flex items-center justify-center relative overflow-hidden",
  content:
    "px-5 py-4 h-36 sm:h-40 relative overflow-hidden flex flex-col justify-between",
};

export const longCardStyles = {
  container: `w-full h-[10rem] sm:h-[11rem] ${sharedCardStyles.cardBase} relative flex items-center`,
  dateIndicator: `${sharedCardStyles.dateIndicator} h-5`,
  thumbnail:
    "w-[8rem] h-[8rem] rounded-xl overflow-hidden flex-shrink-0 relative shadow-md",
  content: "px-5 py-5 w-full h-full flex items-center relative z-10",
  contentNoThumbnail:
    "px-5 pb-4 pt-5 w-full h-full flex flex-col justify-between relative z-10",
  contentWithThumbnail: "ml-6 w-full h-full flex flex-col justify-between",
};
