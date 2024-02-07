'use client';
import { useFormStatus } from 'react-dom';

export default function MealsFormButton() {
    const { pending } = useFormStatus(); //pulls out just the pending property
    return (
        <button disabled={pending}>{pending ? 'Submitting...' : 'Share Meal'}</button>
    )
}
