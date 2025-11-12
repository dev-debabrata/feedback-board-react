// Opinions.jsx
import { use } from "react";
import { Opinion } from "./Opinion";
import { OpinionsContext } from "../store/opinions-context";

export function Opinions() {
  const { opinions } = use(OpinionsContext);

  const hasOpinions = opinions && opinions.length > 0;

  return (
    <div className="mt-8">
      <h2 className="font-rubik m-0 text-xl text-[#fcb25e] mb-4">User Opinions</h2>

      {hasOpinions ? (
        <ul className="list-none m-0 p-0">
          {opinions.map((o) => (
            <li
              key={o.id}
              className="my-4 p-4 rounded bg-[#e9decf] shadow-sm"
            >
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-2xl text-center text-[#938c83] mt-8">
          No opinions found. Maybe share your opinion on something?
        </p>
      )}
    </div>
  );
}
