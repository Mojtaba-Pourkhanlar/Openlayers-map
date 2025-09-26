import { RootState } from '@/store/interfaces';
import { toggleDirection } from '@/store/Actions/Root';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChangeDirection = () => {
    const dispatch = useDispatch();
    const direction = useSelector((state: RootState) => state?.root.direction);

    useEffect(() => {
        // Save theme preference and direction to localStorage
        localStorage.setItem("direction", direction);
        // Update HTML direction
        document.documentElement.dir = direction;
    }, [direction]);

    useEffect(() => {
        // Load theme preference and direction from localStorage on component mount
        const savedDirection = localStorage.getItem("direction");
        if (savedDirection !== null) {
            dispatch(toggleDirection());
        }
    }, [dispatch]);


    return (
        <div>
            <button onClick={() => dispatch(toggleDirection())}>
                Change Direction
            </button>
        </div>
    )
}

export default ChangeDirection