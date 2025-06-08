export const sharedCardStyles = {
  dateIndicator:
    "w-1 bg-gradient-to-b from-brand-secondary to-brand-primary rounded-full",
  dateText: "text-sm text-text-disabled font-medium",
  title:
    "text-md sm:text-2lg text-text-secondary font-medium leading-relaxed overflow-hidden",
  profileImage: "rounded-full border-2 border-white shadow-sm",
  authorName: "text-sm text-text-Primary font-medium",
  likesBadge:
    "flex gap-1 items-center bg-text-primary px-3 py-1.5 rounded-full",
  likesText: "text-sm text-text-disabled font-medium",
  cardBase:
    "border border-card-border bg-bg-secondary rounded-xl shadow-lg overflow-hidden",
  dateContainer: "flex items-center gap-2",
  authorSection: "flex items-center gap-3",
};

export const shortCardStyles = {
  container: `w-full h-[20rem] ${sharedCardStyles.cardBase}`,
  dateIndicator: `${sharedCardStyles.dateIndicator} h-4`,

  thumbnail:
    "w-full h-[10rem] flex items-center justify-center relative overflow-hidden",
  content:
    "px-5 py-4 relative overflow-hidden flex flex-col justify-between h-[10rem]",
};

export const longCardStyles = {
  container: `w-full h-[11rem] ${sharedCardStyles.cardBase} relative flex items-center`,
  dateIndicator: `${sharedCardStyles.dateIndicator} h-5`,
  thumbnail:
    "w-[8rem] h-[8rem] rounded-xl overflow-hidden flex-shrink-0 relative shadow-md",
  content: "px-5 py-4 w-full h-full flex items-center relative z-10",
  contentNoThumbnail:
    "px-5 py-4 w-full h-full flex flex-col justify-between relative z-10",
  contentWithThumbnail: "ml-6 w-full h-full flex flex-col justify-between",
};
