'use client';

import styles from '@/styles/Meals/image-picker.module.css'
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {

    const [pickedImage, setPickedImage] = useState();

    const imageInput = useRef();
    function pickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0]; //Get the file chosen

        if (!file) {
            setPickedImage(null);
            return;

        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result) //For image preview
        };
        fileReader.readAsDataURL(file);
    }
    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label> {/*connect with a component with ID image */}
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill />}
                </div>
                <input
                    className={styles.input}
                    id={name}
                    type='file'
                    accept='image/png, image/jpeg'
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                >
                </input>

                <button
                    className={styles.button}
                    type='button'
                    onClick={pickClick}>
                    Pick an image
                </button>
            </div>
        </div>
    )
}
