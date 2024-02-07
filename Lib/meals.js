import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'ap-southeast-1'
});

const db = sql('meals.db'); {/*Establish db connection*/ }

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); //Adds delay; For simulation of loading state

    // throw new Error("Loading meals failed") //To simulate an error in meals page
    return db.prepare('SELECT * from meals').all(); //Fetch all rows
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); //Add dynamic values to prevent SQL Injections
}


export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true }); //generate slug based on the title and make it all lowercase
    meal.instructions = xss(meal.instructions); //Sanitize any harmful info from HTML content, i.e: instructions

    const extension = meal.image.name.split('.').pop(); //Gettting the image extension of the image uploaded by the user
    const fileName = `${meal.slug}.${extension}`; //Setting system-generated file name for the image

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();
    // stream.write(Buffer.from(bufferedImage), (error) => {
    //     if (error) {
    //         throw new Error('Saving image failed');
    //     }
    // });//Writing to the specified directory in the local file system

    s3.putObject({
        Bucket: 'suzal-udemy-nextjs-recipeapp',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    // meal.image = `/images/${fileName}` //for local file system
    meal.image = fileName;

    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES(
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}