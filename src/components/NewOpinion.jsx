import { useActionState, use } from 'react';

import { OpinionsContext } from '../store/opinions-context';
import Submit from './Submit';

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('Title must be at least five characters long.');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 characters long.');
    }

    if (!userName.trim()) {
      errors.push('Please provide your name.');
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div className='bg-[#2e2923] text-[#f9f7f3] p-8 rounded-lg shadow-[0_0_16px_1px_rgba(0,0,0,0.5)]'>
      <h2 className='text-[#fcc586] m-0'>Share your opinion!</h2>
      <form action={formAction}>
        <div className="flex gap-4">
          <p className=" flex-1">
            <label htmlFor="userName" className='block mb-1 font-rubik text-sm font-bold text-[#d2cdc6]'>Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
              className='block w-full p-2 rounded border border-[#353331] bg-[#f9f7f3] text-[#353331] font-rubik'
            />
          </p>

          <p className="control">
            <label htmlFor="title" className='block mb-1 font-rubik text-sm font-bold text-[#d2cdc6]'>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
              className='block w-full p-2 rounded border border-[#353331] bg-[#f9f7f3] text-[#353331] font-rubik'
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body" className='block mb-1 font-rubik text-sm font-bold text-[#d2cdc6]'>Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
            className='block w-full p-2 rounded border border-[#353331] bg-[#f9f7f3] text-[#353331] font-rubik'
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
