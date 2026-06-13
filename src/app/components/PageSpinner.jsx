import { Spinner } from "@heroui/react";

const PageSpinner = ({ label = "Loading data..." }) => {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#f7f8ff] px-4 py-16 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white px-10 py-8 shadow-[0_18px_55px_rgba(42,53,121,0.08)] dark:border-slate-800 dark:bg-slate-900">
        <Spinner size="lg" color="primary" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {label}
        </p>
      </div>
    </div>
  );
};

export default PageSpinner;
