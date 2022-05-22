import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { Grid } from "@mui/material";

const CreatePost = () => {
    const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;

    const [formState, setFormState] = useState({
        title: "",
        plantType: "",
        description: "",
        picture: "",
    });
    const { picture } = formState;
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("");

    const [imageSelected, setImageSelected] = useState("");
    const [preview, setPreview] = useState();

    const [addPost, { error }] = useMutation(ADD_POST);

    useEffect(() => {
        if (loadingMessage === "Done!") {
            window.location.assign("/");
        }
    });

    // useEffect so that user can see a preview of image before hitting submit
    useEffect(() => {
        if (!imageSelected) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(imageSelected);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageSelected]);

    // useEffect so that the picture url from cloudinary gets updated in the formState
    useEffect(() => {
        const updateDB = () => {
            try {
                // add post to database
                addPost({
                    variables: {
                        title: formState.title,
                        plantType: formState.plantType,
                        description: formState.description,
                        picture: formState.picture,
                    },
                });
                // clear form value
                setLoadingMessage("Done!");
                setFormState({
                    title: "",
                    plantType: "",
                    description: "",
                    picture: "",
                });
                console.log(formState);
            } catch (e) {
                console.error(e);
            }
        };
        if (!picture) {
            return;
        } else {
            console.log(formState);
            updateDB();
        }
    }, [picture, formState, addPost]);

    // form input handler
    function handleChange(e) {
        if (!e.target.value.length) {
            setErrorMessage(`${e.target.name} is required.`);
        } else {
            setErrorMessage("");
        }

        // only allow state to update with user input if there are no error messages
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
            // console.log(formState)
        }
    }

    // upload image to cloudinary and set state
    const uploadImage = async () => {
        // console.log(imageSelected)
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", CLOUD_PRESET);

        fetch("https://api.cloudinary.com/v1_1/dk53zrwwe/image/upload", {
            method: "post",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                const cloudinaryUrl = data.secure_url;
                console.log(cloudinaryUrl);
                setFormState({ ...formState, picture: cloudinaryUrl });
                console.log(formState);
            });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // upload image to cloudinary and set state
        uploadImage();
        setLoadingMessage("Working on it...");
        return;
    };

    return (
        <Grid
            container
            display="flex"
            wrap="wrap"
            justifyContent="center"
            className="form-container"
        >
            <Grid item xs={9} md={9} lg={7} xl={5} className="create-post-form">
                <Grid item>
                    <h2 className="sign-in-form-heading">
                        Submit a plant help form
                    </h2>
                </Grid>

                <Grid item>
                    <form onSubmit={handleFormSubmit}>
                        <Grid
                            container
                            textAlign="left"
                            justifyContent="center"
                        >
                            <Grid item xs={12}>
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    onBlur={handleChange}
                                    name="title"
                                ></input>
                            </Grid>

                            <Grid item xs={12}>
                                <label htmlFor="plantType">
                                    Plant Species:
                                </label>
                                <input
                                    type="text"
                                    onBlur={handleChange}
                                    name="plantType"
                                ></input>
                            </Grid>

                            <Grid item xs={12}>
                                <label htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    placeholder=""
                                    className=""
                                    onBlur={handleChange}
                                ></textarea>
                            </Grid>

                            <Grid item xs={12}>
                                <label htmlFor="picture">Upload a photo:</label>
                                <input
                                    type="file"
                                    onChange={(event) =>
                                        setImageSelected(event.target.files[0])
                                    }
                                    name="picture"
                                ></input>
                                {imageSelected && (
                                    <img
                                        src={preview}
                                        alt="upload"
                                        width="400px"
                                    />
                                )}
                            </Grid>

                            {errorMessage && (
                                <div className="error-message">
                                    {errorMessage}
                                </div>
                            )}

                            <Grid>
                                <button type="submit">Submit</button>
                            </Grid>

                            {loadingMessage && <div>{loadingMessage}</div>}

                            {error && (
                                <div className="error-message">
                                    Something went wrong...
                                </div>
                            )}
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreatePost;
