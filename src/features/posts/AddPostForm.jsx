import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { postAdded } from './postsSlice';


const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const users = useSelector(selectAllUsers)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

    const userOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ))
    
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    name="postTitle"
                    id="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm