import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlices';
import { fetchCart, mergeCart } from '../redux/slices/cartSlices';

const loginHooks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading, error, guestId } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (user && !loading && !error) {
            const userId = user._id;
            const storedGuestId = localStorage.getItem('guestId') || guestId;
            if (storedGuestId) {
                dispatch(mergeCart({ userId, guestId: storedGuestId }))
                    .unwrap()
                    .then(() => {
                        dispatch(fetchCart({ userId, guestId: null }));
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error('Failed to merge cart:', err);
                        dispatch(fetchCart({ userId, guestId: null }));
                        navigate('/');
                    });
            } else {
                dispatch(fetchCart({ userId, guestId: null }));
                navigate('/');
            }
        }
    }, [user, loading, error, guestId, dispatch, navigate]);

    return {
        email,
        password,
        loading,
        error,
        handleSubmit,
        setEmail,
        setPassword,
    };
};

export default loginHooks;