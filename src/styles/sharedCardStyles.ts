export const sharedCardStyles = {
  dateIndicator:
    "w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full",
  dateText: "text-sm text-text-disabled font-medium",
  title: "text-xl text-text-secondary font-medium leading-relaxed",
  profileImage: "rounded-full border-2 border-white shadow-sm",
  authorName: "text-sm text-text-Primary font-medium",
  likesBadge: "flex gap-1 items-center bg-gray-50 px-3 py-1.5 rounded-full",
  likesText: "text-sm text-text-disabled font-medium",
  cardBase:
    "border border-card-border bg-bg-secondary rounded-xl shadow-lg overflow-hidden",
  dateContainer: "flex items-center gap-2",
  authorSection: "flex items-center gap-3",
  centerIcon:
    "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 transform rotate-45 rounded-lg shadow-lg mx-auto mb-4 hover:scale-110 transition-transform",
};

export const shortCardStyles = {
  container: `w-[24rem] h-[20rem] ${sharedCardStyles.cardBase}`,
  dateIndicator: `${sharedCardStyles.dateIndicator} h-4`,
  centerIcon: `w-8 h-8 ${sharedCardStyles.centerIcon}`,
  thumbnail:
    "w-full h-[10rem] bg-blue-100 flex items-center justify-center relative overflow-hidden",
  content: "px-5 py-4 relative",
  bottomBorder: "border-t border-gray-100 pt-4",
};

export const longCardStyles = {
  container: `w-[37rem] h-[11rem] ${sharedCardStyles.cardBase} relative flex items-center`,
  dateIndicator: `${sharedCardStyles.dateIndicator} h-5`,
  centerIcon: `w-6 h-6 ${sharedCardStyles.centerIcon}`,
  thumbnail:
    "w-[128px] h-[128px] rounded-xl overflow-hidden bg-blue-100 flex-shrink-0 relative shadow-md",
  content: "px-5 py-4 w-full h-full flex items-center relative z-10",
  contentNoThumbnail:
    "px-5 py-4 w-full h-full flex flex-col justify-between relative z-10",
  contentWithThumbnail: "ml-6 w-full h-full flex flex-col justify-between",
};
