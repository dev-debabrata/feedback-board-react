import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="flex justify-end gap-4 mt-2">
      <button
        type="submit"
        disabled={pending}
        className={`font-rubik font-bold text-[#2e2923] rounded px-4 py-2 text-xl border transition-colors duration-200
          ${pending
            ? "bg-[#869999] border-[#869999] cursor-not-allowed"
            : "bg-[#fd9217] border-[#fd9217] hover:bg-[#f97706] hover:border-[#f97706] cursor-pointer"
          }`}
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
