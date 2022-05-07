import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';

const CreatePost = () => {
    const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;

    const [formState, setFormState] = useState({ title: '', plantType: '', description: '', picture: '' })
    const { picture } = formState;
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');

    const [imageSelected, setImageSelected] = useState('');
    const [preview, setPreview] = useState();

    const [addPost, { error }] = useMutation(ADD_POST);

    // useEffect so that user can see a preview of image before hitting submit
    useEffect(() => {
        if (!imageSelected) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(imageSelected)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [imageSelected])

    // useEffect so that the picture url from cloudinary gets updated in the formState
    useEffect(() => {
        if (!picture) {
            return
        } else {
            console.log(formState);
            updateDB();
            // try {
            //     // add post to database
            //     // await uploadImage()
            //     addPost({
            //         variables: { title: formState.title, plantType: formState.plantType, description: formState.description, picture: formState.picture }
            //     });

            //     // clear form value
            //     // setFormState({ title: '', plantType: '', description: '', picture: '' });
            // } catch (e) {
            //     console.error(e);
            // }
        }
    }, [picture, formState]);

    // form input handler
    function handleChange(e) {
        if (e.target.name === 'title' || e.target.name === 'plantType' || e.target.name === 'description') {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`)
            }
        } else {
            setErrorMessage('');
        }

        // only allow state to update with user input if there are no error messages
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value })
            // console.log(formState)
        }
    }

    // upload image to cloudinary and set state
    const uploadImage = async () => {
        // console.log(imageSelected)
        const formData = new FormData()
        formData.append('file', imageSelected)
        formData.append("upload_preset", (CLOUD_PRESET))

        fetch("https://api.cloudinary.com/v1_1/dk53zrwwe/image/upload", {
            method: 'post',
            body: formData
        })
            .then(response =>
                response.json()
            )
            .then(data => {
                // console.log(data)
                const cloudinaryUrl = data.secure_url
                console.log(cloudinaryUrl)
                setFormState({ ...formState, picture: cloudinaryUrl })
                console.log(formState)
            })
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        // upload image to cloudinary and set state
        uploadImage()
        setLoadingMessage('Working on it...')
        return
    }

    const updateDB = () => {
        try {
            // add post to database
            addPost({
                variables: { title: formState.title, plantType: formState.plantType, description: formState.description, picture: formState.picture }
            });
            // clear form value
            setLoadingMessage('')
            setFormState({ title: '', plantType: '', description: '', picture: '' });
            console.log(formState)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section>
            <h2>Submit a plant help form</h2>

            <form onSubmit={handleFormSubmit}>

                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" onBlur={handleChange} name="title"></input>
                </div>

                <div>
                    <label htmlFor="plantType">Plant Name:</label>
                    <input type="text" onBlur={handleChange} name="plantType"></input>
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        placeholder=""
                        className=""
                        onBlur={handleChange}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="picture">Upload a photo:</label>
                    <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} name="picture"></input>
                    {imageSelected && <img src={preview} alt='upload' width='400px' />}
                </div>

                {errorMessage && (
                    <div>
                        <p>{errorMessage}</p>
                    </div>
                )}

                <button type="submit">
                    Submit
                </button>

                {loadingMessage && <p>{loadingMessage}</p>}

                {error && <span>Something went wrong...</span>}


            </form>
        </section>
    );
};

export default CreatePost;