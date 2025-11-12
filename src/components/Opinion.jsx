import { use, useActionState, useOptimistic } from 'react';

import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === 'up' ? prevVotes + 1 : prevVotes - 1)
  );

  async function upvoteAction() {
    setVotesOptimistically('up');
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically('down');
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] =
    useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction);

  const voteButtonClass = (disabled) =>
    `p-0 bg-transparent border-0 cursor-pointer ${disabled ? 'text-[#c2af93] cursor-not-allowed' : 'text-[#a38152] hover:text-[#fd9217]'
    }`;

  return (
    <article className="mb-4">
      <header>
        <h3 className='font-rubik m-0 text-xl'>{title}</h3>
        <p className='m-0 text-[#938c83] text-sm'>Shared by {userName}</p>
      </header>
      <p className="mt-2 text-base">{body}</p>
      <form className="flex gap-2 items-center mt-3">
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
          className={voteButtonClass(upvotePending || downvotePending)}
          aria-label="upvote"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span className="inline-block text-base text-[#f97706] font-bold">{optimisticVotes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
          className={voteButtonClass(upvotePending || downvotePending)}
          aria-label="upvote"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
