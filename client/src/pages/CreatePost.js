import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_POST } from '../utils/mutations';

const CreatePost = () => {

    const [imageSelected, setImageSelected] = useState("");

    const [formState, setFormState] = useState({ title: '', plantType: '', description: '', picture: '' })
    const { title, plantType, description, picture } = formState;

    const [errorMessage, setErrorMessage] = useState('');

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

    // // upload image to cloudinary and set state
    // const uploadImage = () => {
    //     console.log(imageSelected)
    //     const formData = new FormData()
    //     formData.append('file', imageSelected)
    //     formData.append("upload_preset", "g7iqwrdf")

    //     fetch("https://api.cloudinary.com/v1_1/dk53zrwwe/image/upload", {
    //         method: 'post',
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // console.log(data)
    //             // console.log(data.secure_url)
    //             const cloudinaryUrl = data.secure_url
    //             setFormState({ ...formState, picture: cloudinaryUrl })
    //             // https://res.cloudinary.com/dk53zrwwe/image/upload/v1651765921/zev4hoz70dj6lefs0rom.png
    //         })
    // };



    // const [addPost, { error }] = useMutation(ADD_POST, {
    //     update(cache, { data: { addPost } }) {
    //         try {
    //             const { posts } = cache.readQuery({ query: QUERY_ALL_POSTS });
    //             cache.writeQuery({
    //                 query: QUERY_ALL_POSTS,
    //                 data: { posts: [addPost, ...posts] }
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    // })

    const handleFormSubmit = async e => {
        e.preventDefault();

        // upload image to cloudinary and set state
        console.log(imageSelected)
        const formData = new FormData()
        formData.append('file', imageSelected)
        formData.append("upload_preset", "g7iqwrdf")

        fetch("https://api.cloudinary.com/v1_1/dk53zrwwe/image/upload", {
            method: 'post',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // console.log(data.secure_url)
                const cloudinaryUrl = data.secure_url
                setFormState({ ...formState, picture: { cloudinaryUrl } })
                // https://res.cloudinary.com/dk53zrwwe/image/upload/v1651765921/zev4hoz70dj6lefs0rom.png
                console.log(title, plantType, description, picture)
                console.log(formState)
            })

        try {
            // add post to database
            // await addPost({
            //     variables: { formState }
            // });
            setFormState('');
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
                    <label htmlFor="title">Title</label>
                    <input type="text" onBlur={handleChange} name="title"></input>
                </div>

                <div>
                    <label htmlFor="plantType">What kind of plant do you have?</label>
                    <input type="text" onBlur={handleChange} name="plantType"></input>
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        placeholder=""
                        className=""
                        onBlur={handleChange}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="picture">Select image of your plant</label>
                    <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} name="picture"></input>
                </div>

                {errorMessage && (
                    <div>
                        <p>{errorMessage}</p>
                    </div>
                )}

                <button type="submit">
                    Submit
                </button>

                {/* {error && <span>Something went wrong...</span>} */}

            </form>
        </section>
    );
};

export default CreatePost;