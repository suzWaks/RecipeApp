'use server';
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isinvalidText(text) {
    return (!text || text.trim() === '');
}
export async function shareMeal(prevState, formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if (isinvalidText(meal.title) ||    //Server side validation
        isinvalidText(meal.summary) ||
        isinvalidText(meal.creator) ||
        isinvalidText(meal.instructions) ||
        isinvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid Input'
        }
    }
    await saveMeal(meal);
    revalidatePath('/meals'); //Revalidate the cache belonging to the certain route path; layout attribute will allow for revalidation of the nested paths
    redirect('/meals');
}