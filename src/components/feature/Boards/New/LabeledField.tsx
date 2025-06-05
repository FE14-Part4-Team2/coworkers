interface LabeledFieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function LabeledField({
  id,
  label,
  required,
  children,
  className,
}: LabeledFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex gap-[0.3rem] mb-[1rem] mt-[1.5rem] sm:mt-[2rem] md:mt-[2.5rem]"
      >
        {required && (
          <span className="text-brand-tertiary text-md sm:text-lg">*</span>
        )}
        <span className="text-text-primary text-md sm:text-lg">{label}</span>
      </label>
      {children}
    </div>
  );
}
