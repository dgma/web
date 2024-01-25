import cn from "classnames";

const btnBaseClass = `rounded-lg bg-indigo-600 px-5 py-2.5
text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
focus-visible:outline-indigo-600 disabled:bg-indigo-300`;

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function BaseButton({
  className,
  children,
  ...props
}: BaseButtonProps) {
  const btnClass = cn(className, btnBaseClass);
  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
}
