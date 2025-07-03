import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-900 group-[.toaster]:text-gray-100 group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-400",
          actionButton: "group-[.toast]:bg-blue-700 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-800 group-[.toast]:text-gray-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
