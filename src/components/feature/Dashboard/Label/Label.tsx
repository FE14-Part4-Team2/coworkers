type Props = {
  title: string;
  count?: string;
  modalButton?: string;
  showModalButton?: boolean;
  onClickModalButton?: () => void;
};

export default function Label({
  title,
  count,
  modalButton,
  showModalButton = true,
  onClickModalButton,
}: Props) {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-2">
        <div className="font-medium text-lg text-text-primary">{title}</div>
        <div className="font-normal text-lg text-text-default">{count}</div>
      </div>
      {modalButton && showModalButton && (
        <div
          className="text-brand-primary font-normal text-md cursor-pointer"
          onClick={onClickModalButton}
        >
          {modalButton}
        </div>
      )}
    </div>
  );
}
